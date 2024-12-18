'use client'

import { VStack, HStack, Text, Avatar, Box } from '@chakra-ui/react'

interface TestimonialsProps {
  textColor: string
  subtitleColor: string
}

export function Testimonials({ textColor, subtitleColor }: TestimonialsProps) {
  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'Coach de Carreira',
      text: 'Segui o plano por 7 dias e consegui mais de 800 seguidores orgânicos. As dicas são práticas e funcionam!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    {
      name: 'Pedro Santos',
      role: 'Empreendedor Digital',
      text: 'O calendário de conteúdo me ajudou muito a me organizar. Meu engajamento aumentou 300%!',
      avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1'
    },
  ]

  return (
    <VStack spacing={6} align="start">
      {testimonials.map((testimonial, index) => (
        <Box key={index}>
          <Text color={textColor} fontSize="md" fontStyle="italic" mb={4}>
            "{testimonial.text}"
          </Text>
          <HStack spacing={4}>
            <Avatar size="sm" src={testimonial.avatar} />
            <Box>
              <Text color={textColor} fontWeight="bold" fontSize="sm">
                {testimonial.name}
              </Text>
              <Text color={subtitleColor} fontSize="sm">
                {testimonial.role}
              </Text>
            </Box>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}
