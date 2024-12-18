'use client'
import { Box, Container, SimpleGrid, VStack, Heading, Text, Card, CardBody, Image } from '@chakra-ui/react'
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
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} alignItems="start">
          {/* Lado Esquerdo - Apresentação */}
          <VStack spacing={8} align="start">
            <Card 
              bg={bgColor} 
              borderWidth="0px" 
              borderColor={borderColor}
              w="full"
            >
              <CardBody>

                  <Image
                    src="/img/instaboom.png"
                    alt="Instabrabo Logo"
                    width={300}
                    height="auto"
                    mb={16}
                  />
                  <Heading 
                    as="h1" 
                    size="2xl" 
                    color={textColor}
                    lineHeight="shorter"
                    mb={4}
                  >
                    +1000 seguidores no Instagram em 7 dias!
                  </Heading>
                  <Text fontSize="3xl" color={subtitleColor} mb={8}>
                    Receba um plano personalizado e gratuito para crescer seu Instagram:
                  </Text>
                  <FeaturesList textColor={textColor} />

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
