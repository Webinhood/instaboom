'use client'

import { VStack, HStack, Text, Icon } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

interface FeaturesListProps {
  textColor: string
}

export function FeaturesList({ textColor }: FeaturesListProps) {
  const features = [
    'Plano personalizado para seu nicho',
    'Estratégias comprovadas de crescimento',
    'Calendário de conteúdo para 7 dias',
    'Exemplos de legendas otimizadas',
    'Dicas de hashtags estratégicas',
  ]

  return (
    <VStack spacing={3} align="start">
      {features.map((feature, index) => (
        <HStack key={index} spacing={3}>
          <Icon as={CheckCircleIcon} boxSize={5} color="purple.400" />
          <Text color={textColor}>{feature}</Text>
        </HStack>
      ))}
    </VStack>
  )
}
