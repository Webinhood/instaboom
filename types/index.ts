export interface UserSubmission {
  email: string
  area_atuacao: string
  descricao: string
  objetivo: 'vender' | 'autoridade' | 'seguidores' | 'monetizar'
  dificuldade: string
  instagram_link: string
}

export interface GeneratedPlan {
  analise_nicho: string
  bio_otimizada: string
  calendario_conteudo: {
    dia: number
    feed: {
      tipo: 'foto' | 'carrossel'
      tema: string
      horario: string
    }[]
    reels: {
      tema: string
      tipo: string
      horario: string
    }[]
    stories: {
      temas: string[]
      horarios: string[]
    }
  }[]
  plano_acao: {
    dia: number
    tarefas: {
      tipo: 'engajamento' | 'analise' | 'planejamento' | 'networking'
      descricao: string
      horario_sugerido: string
      duracao_minutos: number
    }[]
    dicas: string[]
  }[]
  exemplos_legenda: string[]
}
