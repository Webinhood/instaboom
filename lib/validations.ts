import { z } from 'zod'

export const formSchema = z.object({
  email: z
    .string()
    .email('Email inválido')
    .min(5, 'Email muito curto')
    .max(100, 'Email muito longo'),
  instagram_link: z
    .string()
    .min(3, 'Link do Instagram muito curto')
    .max(100, 'Link do Instagram muito longo')
    .regex(
      /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/,
      'Link do Instagram inválido'
    ),
  area_atuacao: z
    .string()
    .min(3, 'Área de atuação muito curta')
    .max(100, 'Área de atuação muito longa')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Área de atuação contém caracteres inválidos'),
  descricao: z
    .string()
    .min(10, 'Descrição muito curta')
    .max(300, 'Descrição muito longa')
    .regex(/^[^<>]*$/, 'Descrição contém caracteres inválidos'),
  objetivo: z.enum(['vender', 'autoridade', 'seguidores', 'monetizar'], {
    required_error: 'Selecione um objetivo',
  }),
  dificuldade: z
    .string()
    .min(5, 'Dificuldade muito curta')
    .max(200, 'Dificuldade muito longa')
    .regex(/^[^<>]*$/, 'Dificuldade contém caracteres inválidos'),
})
