import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import openai from '@/lib/openai'
import { UserSubmission, GeneratedPlan } from '@/types'
import { logger } from '@/lib/logger'
import crypto from 'crypto'
import { formSchema } from '@/lib/validations'
import { ZodError } from 'zod'

// Cache para controle de submissões por email
const submissionCache = new Map<string, number>()

export async function POST(request: Request) {
  try {
    const data: UserSubmission = await request.json()
    
    // Validação do schema
    try {
      formSchema.parse(data)
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
        return NextResponse.json({ error: 'Dados inválidos', errors }, { status: 400 })
      }
    }

    // Verificar submissões recentes do mesmo email
    const lastSubmission = submissionCache.get(data.email)
    const now = Date.now()
    if (lastSubmission && now - lastSubmission < 3600000) { // 1 hora
      return NextResponse.json(
        { error: 'Aguarde 1 hora antes de gerar um novo plano' },
        { status: 429 }
      )
    }

    // Sanitizar dados
    const sanitizedData = {
      ...data,
      email: data.email.toLowerCase().trim(),
      instagram_link: data.instagram_link.trim(),
      area_atuacao: data.area_atuacao.trim(),
      descricao: data.descricao.trim(),
      dificuldade: data.dificuldade.trim()
    }

    // Validação básica
    if (!sanitizedData.email || !sanitizedData.area_atuacao || !sanitizedData.descricao || !sanitizedData.objetivo || !sanitizedData.instagram_link) {
      const error = 'Campos obrigatórios faltando'
      await logger.error(error, { data })
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Gerar hash único para URL
    const hash = crypto.randomBytes(16).toString('hex')
    const pageUrl = `/plano/${hash}`

    // Gerar plano personalizado com OpenAI
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Você é um especialista em crescimento no Instagram. 
            IMPORTANTE: Você DEVE responder APENAS com um JSON válido, sem texto adicional, seguindo exatamente esta estrutura:
            {
              "analise_nicho": "Análise detalhada do nicho",
              "bio_otimizada": "Bio otimizada para o perfil",
              "calendario_conteudo": [
                {
                  "dia": 1,
                  "feed": [
                    {
                      "tipo": "foto ou carrossel",
                      "tema": "Descrição do conteúdo",
                      "horario": "HH:MM"
                    }
                  ],
                  "reels": [
                    {
                      "tema": "Descrição do conteúdo",
                      "tipo": "Tipo de Reels (ex: tutorial, bastidores)",
                      "horario": "HH:MM"
                    }
                  ],
                  "stories": {
                    "temas": ["Tema 1", "Tema 2", "Tema 3"],
                    "horarios": ["HH:MM", "HH:MM", "HH:MM"]
                  }
                }
              ],
              "plano_acao": [
                {
                  "dia": 1,
                  "tarefas": [
                    {
                      "tipo": "engajamento/analise/planejamento/networking",
                      "descricao": "Descrição detalhada da tarefa",
                      "horario_sugerido": "HH:MM",
                      "duracao_minutos": 30
                    }
                  ],
                  "dicas": ["Dica 1", "Dica 2"]
                }
              ],
              "exemplos_legenda": ["exemplo1", "exemplo2", "..."]
            }`
          },
          {
            role: "user",
            content: `
              LEMBRE-SE: Responda APENAS com o JSON, sem texto adicional.
              
              Crie um plano personalizado para:
              
              Área: ${sanitizedData.area_atuacao}
              Descrição: ${sanitizedData.descricao}
              Objetivo: ${sanitizedData.objetivo}
              Dificuldade: ${sanitizedData.dificuldade}

              LEMBRE-SE: O Instagram prioriza conteúdos que geram interação, salvamentos, compartilhamentos, comentários relevantes e visualizações completas de Reels.
              
              Requisitos específicos:
              1. Analise_nicho: Faça uma análise profunda do mercado e concorrência
              2. Bio_otimizada: Crie uma biografia profissional em três partes: destaque sua transformação ou impacto, apresente uma credencial ou prova social, e finalize com um CTA claro para engajamento
              3. Calendario_conteudo: 
                 - Para cada um dos 7 dias, sugira:
                 - 2 posts para o feed: fotos de alta qualidade ou carrosséis educativos, legendas que gerem valor, CTA claro e estética consistente
                 - 1 reel de 15-30 segundos com hook poderoso, problema/solução clara, passos práticos, CTA direto, texto na tela e música envolvente
                 - 3 stories ao longo do dia com enquetes, perguntas, bastidores e reposts, mantendo consistência no conteúdo
                 - Horários estratégicos para cada publicação
              4. Plano_acao:
                 - 3-4 tarefas diárias além das publicações
                 - Foco em engajamento, interação,análise, planejamento e networking
                 - Tempo estimado para cada tarefa
                 - 2 dicas práticas por dia
              5. Exemplos_legenda: Escreva 3 legendas seguindo esta estrutura: hook poderoso, problema, solução, prova social e um CTA claro.
              
              LEMBRE-SE: Gere resposta para 7 dias sem pular nenhum dia.

            `
          }
        ],
        temperature: 0.7
      })

      let planoGerado: GeneratedPlan

      try {
        planoGerado = JSON.parse(completion.choices[0].message.content || '{}') as GeneratedPlan
        
        // Validação básica do plano gerado
        if (!planoGerado.analise_nicho || !planoGerado.bio_otimizada || 
            !planoGerado.calendario_conteudo || !planoGerado.plano_acao || !planoGerado.exemplos_legenda) {
          throw new Error('Plano gerado está incompleto')
        }
      } catch (error) {
        await logger.error('Erro ao processar resposta da OpenAI', { 
          error, 
          openAiResponse: completion.choices[0].message.content 
        })
        return NextResponse.json(
          { error: 'Erro ao gerar plano personalizado' },
          { status: 500 }
        )
      }

      // Salvar no Supabase
      const { error: supabaseError } = await supabase
        .from('users')
        .insert([
          {
            email: sanitizedData.email,
            area_atuacao: sanitizedData.area_atuacao,
            descricao: sanitizedData.descricao,
            objetivo: sanitizedData.objetivo,
            dificuldade: sanitizedData.dificuldade,
            instagram_link: sanitizedData.instagram_link,
            page_url: pageUrl,
            plano: planoGerado
          }
        ])

      if (supabaseError) {
        await logger.error('Erro ao salvar no Supabase', { 
          supabaseError,
          userData: sanitizedData 
        })
        return NextResponse.json(
          { error: 'Erro ao salvar seus dados' },
          { status: 500 }
        )
      }

      // Atualizar cache de submissões
      submissionCache.set(sanitizedData.email, Date.now())

      return NextResponse.json({ 
        success: true, 
        pageUrl,
        hash
      })

    } catch (openAiError) {
      await logger.error('Erro na chamada da OpenAI', { 
        openAiError,
        userData: sanitizedData 
      })
      return NextResponse.json(
        { error: 'Erro ao gerar plano personalizado' },
        { status: 500 }
      )
    }

  } catch (error) {
    await logger.error('Erro geral na submissão', { error })
    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação' },
      { status: 500 }
    )
  }
}
