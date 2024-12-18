'use client'
import { Box, Container, SimpleGrid, VStack, Heading, Text, Card, CardBody } from '@chakra-ui/react'
import SignupForm from '@/components/SignupForm'
import { FeaturesList } from '@/components/FeaturesList'
import { Testimonials } from '@/components/Testimonials'

export default function Home() {
  const bgColor = '#000'
  const cardBg = 'gray.950'
  const borderColor = 'whiteAlpha.50'
  const textColor = '#fff'
  const subtitleColor = 'whiteAlpha.800'

  return (
    <Box bg={bgColor} minH="100vh" py={20}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} alignItems="center">
          {/* Lado Esquerdo - Apresentação */}
          <VStack spacing={8} align="start">
            <Card 
              bg={bgColor} 
              borderWidth="0px" 
              borderColor={borderColor}
              w="full"
            >
              <CardBody>
                <VStack spacing={6} align="start">
                  <Heading 
                    as="h1" 
                    size="2xl" 
                    color={textColor}
                    lineHeight="shorter"
                  >
                    Conquiste 1000 seguidores no Instagram em 7 dias
                  </Heading>
                  <Text fontSize="xl" color={subtitleColor}>
                    Receba um plano personalizado e gratuito para crescer seu Instagram de forma orgânica e consistente
                  </Text>
                  <FeaturesList textColor={textColor} />
                </VStack>
              </CardBody>
            </Card>


          </VStack>

          {/* Lado Direito - Formulário */}
          <Card 
            bg={cardBg} 
            borderWidth="1px" 
            borderColor={borderColor}
            w="full"
          >
            <CardBody>
              <SignupForm />
            </CardBody>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
