'use client'

import { Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const messages = [
  "Analisando seu perfil e nicho...",
  "Criando estratégias personalizadas de crescimento...",
  "Desenvolvendo seu calendário de conteúdo...",
  "Otimizando suas hashtags...",
  "Preparando exemplos de legendas...",
  "Definindo melhores horários para posts...",
  "Finalizando seu plano personalizado..."
]

export function LoadingMessages() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        // Se não for a última mensagem, avança para a próxima
        if (prev < messages.length - 1) {
          return prev + 1
        }
        // Se for a última mensagem, mantém ela
        return prev
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Text
      color="whiteAlpha.800"
      fontSize="lg"
      textAlign="center"
      animation="pulse 2s infinite"
      sx={{
        '@keyframes pulse': {
          '0%': { opacity: 0.6 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0.6 }
        }
      }}
    >
      {messages[currentMessage]}
    </Text>
  )
}
