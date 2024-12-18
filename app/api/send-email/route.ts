import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend('re_qkdUE5AZ_Gk9Bj3ktnqiCRtXUN6UQTFqF')

export async function POST(request: Request) {
  try {
    const { email, page_url } = await request.json()
    
    console.log('Tentando enviar email para:', email)
    console.log('URL do plano:', page_url)

    const data = await resend.emails.send({
      from: 'Webinhood - Instaboom <contato@webinhood.com.br>',
      to: email,
      subject: 'Seu plano personalizado do Instagram está pronto! 🚀',
      html: `
        <h1>Seu plano personalizado está pronto!</h1>
        <p>Olá!</p>
        <p>Seu plano personalizado para crescer no Instagram foi gerado com sucesso.</p>
        <p>Clique no botão abaixo para acessar:</p>
        <a href="${page_url}" style="display: inline-block; background-color: #805AD5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Ver meu plano
        </a>
        <p>Se o botão não funcionar, copie e cole este link no seu navegador:</p>
        <p>${page_url}</p>
        <p>Boa sorte na sua jornada!</p>
        <p>Equipe Webinhood</p>
      `
    })

    console.log('Resposta do Resend:', data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json({ 
      error: 'Erro ao enviar email',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
