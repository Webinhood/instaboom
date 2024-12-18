import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { CheckCircleIcon } from '@chakra-ui/icons'

const slides = [
  {
    title: "Como criar uma bio irresistível",
    content: [
      {
        subtitle: "Estrutura ideal:",
        items: [
          "Primeira linha: Frase de impacto ou sua principal transformação",
          "Segunda linha: Sua credencial ou prova social",
          "Terceira linha: Call-to-action (CTA) claro"
        ]
      },
      {
        subtitle: "Exemplo:",
        items: [
          "✨ Ensino estratégias de Instagram que funcionam",
          "🚀 +500 alunos | Especialista em Marketing Digital",
          "👇 Baixe meu guia gratuito de crescimento"
        ]
      }
    ]
  },
  {
    title: "Foto de perfil profissional",
    content: [
      {
        items: [
          "Use uma foto com boa iluminação",
          "Mantenha 60% do rosto enquadrado",
          "Sorria para criar conexão",
          "Evite fundos muito chamativos"
        ]
      }
    ]
  },
  {
    title: "Nome de usuário estratégico",
    content: [
      {
        items: [
          "Fácil de escrever e lembrar",
          "Evite underlines e números aleatórios",
          "Use seu nome ou marca",
          "Mantenha consistência nas redes sociais"
        ]
      }
    ]
  },
  {
    title: "Pilares de conteúdo",
    content: [
      {
        items: [
          "Educacional: ensine algo valioso",
          "Inspiracional: mostre resultados e cases",
          "Entretenimento: conteúdo leve e engajador",
          "Autoridade: Demonstre expertise",
          "Relacionamento: Conecte-se com a audiência"
        ]
      }
    ]
  },
  {
    title: "Reels",
    content: [
      {
        items: [
          "Duração ideal: 15-30 segundos",
          "Primeiros 3 segundos decisivos",
          "Use tendências do momento",
          "Texto na tela sempre",
          "Música envolvente"
        ]
      },
      {
        subtitle: "Estrutura de reels de sucesso:",
        items: [
          "Hook poderoso",
          "Problema/solução clara",
          "Passos práticos",
          "Call-to-action"
        ]
      }
    ]
  },
  {
    title: "Stories",
    content: [
      {
        items: [
          "Poste stories todo dia",
          "Use enquetes e questões",
          "Mostre bastidores",
          "Reposte menções",
          "Mantenha consistência"
        ]
      }
    ]
  },
  {
    title: "Feed",
    content: [
      {
        items: [
          "Fotos de alta qualidade",
          "Carrosséis educativos",
          "Legendas que geram valor",
          "Call-to-action claro",
          "Estética consistente"
        ]
      }
    ]
  },
  {
    title: "Como o algoritmo funciona",
    content: [
      {
        subtitle: "O Instagram prioriza:",
        items: [
          "Conteúdo que gera interação",
          "Tempo gasto no conteúdo",
          "Salvamentos e compartilhamentos",
          "Comentários significativos",
          "Visualizações completas de Reels"
        ]
      }
    ]
  },
  {
    title: "Hashtags",
    content: [
      {
        subtitle: "Utilize 3-5 hashtags por post:",
        items: [
          "1 hashtag principal do nicho",
          "2 hashtags específicas",
          "1 hashtag de localização",
          "1 hashtag de tendência"
        ]
      }
    ]
  },
  {
    title: "Copywriting para legendas",
    content: [
      {
        subtitle: "Estrutura:",
        items: [
          "Hook poderoso",
          "Linha do problema",
          "Sua solução",
          "Prova social",
          "Call-to-action"
        ]
      },
      {
        subtitle: "Exemplo:",
        items: [
          "Descobri o segredo para ganhar 1000 seguidores em 7 dias",
          "Estava frustrado tentando crescer no Instagram...Até que desenvolvi uma estratégia que mudou tudo.",
          "O resultado? +1000 seguidores orgânicos / Engajamento de 8.5% / Primeiros clientes",
          "Quer saber como? Deixa um QUERO nos comentários!",
          "#CrescimentoInstagram #MarketingDigital"
        ]
      }
    ]
  },
  {
    title: "Resolvendo problemas",
    content: [
      {
        subtitle: "1. Baixo engajamento",
        items: [
          "Revise qualidade do conteúdo",
          "Teste diferentes horários",
          "Aumente interações",
          "Melhore calls-to-action",
          "Use trending songs"
        ]
      },
      {
        subtitle: "2. Crescimento lento",
        items: [
          "Aumente frequência de Reels",
          "Melhore qualidade do conteúdo",
          "Expanda networking",
          "Otimize hashtags",
          "Teste diferentes formatos"
        ]
      },
      {
        subtitle: "3. Pouca retenção",
        items: [
          "Melhore valor do conteúdo",
          "Mantenha consistência",
          "Engage com seguidores",
          "Crie série de conteúdos",
          "Otimize bio"
        ]
      }
    ]
  }
]

export const EducationalCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <Box w="full">
      <Card variant="filled">
        <CardHeader>
          <HStack justify="space-between" align="center" w="full">
            <Heading size="md">{slides[currentSlide].title}</Heading>
            <HStack spacing={4}>
              <Button
                onClick={prevSlide}
                leftIcon={<ChevronLeftIcon />}
                isDisabled={currentSlide === 0}
                variant="ghost"
                size="sm"
              >
                Anterior
              </Button>
              <Button
                onClick={nextSlide}
                rightIcon={<ChevronRightIcon />}
                isDisabled={currentSlide === slides.length - 1}
                variant="ghost"
                size="sm"
              >
                Próximo
              </Button>
            </HStack>
          </HStack>
        </CardHeader>

        <CardBody>
          <Box 
            bg="gray.900" 
            p={6} 
            borderRadius="md"
            minH={{ base: "auto", md: "300px" }}
          >
            <VStack align="start" spacing={6} w="full">
              {slides[currentSlide].content.map((section, index) => (
                <VStack key={index} align="start" spacing={4} w="full">
                  {section.subtitle && (
                    <Text fontWeight="bold" fontSize="md">
                      {section.subtitle}
                    </Text>
                  )}
                  <VStack align="start" spacing={3} w="full">
                    {section.subtitle?.includes("Exemplo:") ? (
                      // Renderiza exemplos como texto corrido
                      section.items.map((item, idx) => (
                        <Text key={idx}>{item}</Text>
                      ))
                    ) : (
                      // Renderiza outros itens com ícone de check
                      section.items.map((item, idx) => (
                        <HStack key={idx} align="start" spacing={3}>
                          <Icon as={CheckCircleIcon} boxSize={5} color="purple.400" mt={1} />
                          <Text>{item}</Text>
                        </HStack>
                      ))
                    )}
                  </VStack>
                </VStack>
              ))}
            </VStack>
          </Box>
        </CardBody>
      </Card>

      <HStack justify="center" mt={4} w="full">
        {slides.map((_, index) => (
          <Box
            key={index}
            w="8px"
            h="8px"
            borderRadius="full"
            bg={currentSlide === index ? 'purple.500' : 'whiteAlpha.100'}
            cursor="pointer"
            onClick={() => setCurrentSlide(index)}
            transition="all 0.2s"
          />
        ))}
      </HStack>
    </Box>
  )
}
