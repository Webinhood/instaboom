'use client'

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react'

export default function HeroSection() {
  return (
    <Container maxW={'3xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Conquiste seus primeiros <br />
          <Text as={'span'} color={'blue.400'}>
            1000 seguidores
          </Text>
        </Heading>
        <Text color={'gray.500'}>
          Descubra o método comprovado que vai te ajudar a conquistar seus primeiros 1000 seguidores no Instagram em apenas 7 dias. 
          Nosso sistema analisa seu perfil e cria um plano personalizado para maximizar seu crescimento.
        </Text>
        <Stack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}>
          <Button
            colorScheme={'blue'}
            bg={'blue.400'}
            rounded={'full'}
            px={6}
            _hover={{
              bg: 'blue.500',
            }}>
            Começar Agora
          </Button>
          <Text fontSize={'sm'} color={'gray.500'}>
            Plano 100% personalizado para seu perfil
          </Text>
        </Stack>
      </Stack>
    </Container>
  )
}
