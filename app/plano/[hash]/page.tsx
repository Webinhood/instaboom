'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  List,
  ListItem,
  ListIcon,
  Divider,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Icon,
  Button,
  Badge,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Grid
} from '@chakra-ui/react'
import { 
  CheckCircleIcon, 
  TimeIcon, 
  CalendarIcon, 
  StarIcon, 
  InfoIcon,
  AtSignIcon,
  ViewIcon,
  RepeatIcon,
  ChatIcon
} from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { GeneratedPlan } from '@/types'
import { EducationalCarousel } from '@/components/EducationalCarousel'

export default function PlanoPage({ params }: { params: { hash: string } }) {
  const [plano, setPlano] = useState<GeneratedPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState(1)
  const [instagram_link, setInstagramLink] = useState('')
  const bgColor = '#000'
  const cardBg = 'gray.950'
  const borderColor = 'whiteAlpha.50'
  const textColor = 'whiteAlpha.900'
  const subtitleColor = 'purple.400'

  useEffect(() => {
    const fetchPlano = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('page_url', `/plano/${params.hash}`)
        .single()

      if (error) {
        console.error('Erro ao buscar plano:', error)
        return
      }

      const planoGerado = data
      if (!planoGerado) return

      const plano = planoGerado.plano
      const instagram_link = planoGerado.instagram_link || ''

      setPlano(plano)
      setInstagramLink(instagram_link)
      setLoading(false)
    }

    fetchPlano()
  }, [params.hash])

  if (loading) {
    return (
      <Container maxW="container.xl" py={8} bg={bgColor}>
        <VStack spacing={4}>
          <Progress size="xs" isIndeterminate w="100%" />
          <Text color={textColor}>Carregando seu plano personalizado...</Text>
        </VStack>
      </Container>
    )
  }

  if (!plano) {
    return (
      <Container maxW="container.xl" py={8} bg={bgColor}>
        <Text color={textColor}>Plano não encontrado</Text>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8} bg={bgColor}>
      <VStack spacing={8} align="stretch">
        {/* 2. Header com Progresso */}
        <Card bg="gray.950">
          <CardHeader bg="gray.950">
            <Box textAlign="center" py={10} position="relative" bg="gray.950">
              {instagram_link && (
                <Text fontSize="2xl" fontWeight="bold" color="purple.500" mb={4}>
                  {instagram_link}
                </Text>
              )}
              <Heading as="h1" size="2xl" mb={4} color={textColor}>
                Seu plano de crescimento
              </Heading>
              <Text fontSize="xl" color={subtitleColor} mb={6}>
                7 dias para alcançar 1000 seguidores
              </Text>
            </Box>
          </CardHeader>
          <CardBody bg="gray.950">
            {/* 1. Informações Essenciais */}
            <Card bg="gray.950">
              <CardHeader bg="gray.950">
                <HStack>
                  <Icon as={InfoIcon} color="purple.500" />
                  <Heading size="md" color={textColor}>Informações essenciais</Heading>
                </HStack>
              </CardHeader>
              <CardBody bg="gray.950">
                <VStack align="stretch" spacing={4}>
                  <Box bg="gray.950">
                    <Text fontWeight="bold" mb={2} color={textColor}>Bio otimizada</Text>
                    <Text whiteSpace="pre-line" bg="gray.950" p={3} borderRadius="md" color={textColor}>
                      {plano.bio_otimizada}
                    </Text>
                  </Box>
                  <Box bg="gray.950">
                    <Text fontWeight="bold" mb={2} color={textColor}>Análise do nicho</Text>
                    <Text bg="gray.950" p={3} borderRadius="md" color={textColor}>
                      {plano.analise_nicho}
                    </Text>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </CardBody>
        </Card>

        {/* Navegação entre Dias */}
        <HStack spacing={2} overflowX="auto" py={2} px={4} bg="gray.950" borderRadius="lg">
          {Array.from({length: 7}, (_, i) => i + 1).map((dia) => (
            <Button
              key={dia}
              onClick={() => setSelectedDay(dia)}
              variant={selectedDay === dia ? "solid" : "ghost"}
              colorScheme="purple"
              size="sm"
              bg={selectedDay === dia ? "purple.500" : "gray.950"}
            >
              Dia {dia}
            </Button>
          ))}
        </HStack>

        {/* 3. Calendário de Conteúdo e Plano de Ação */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {/* Calendário de Conteúdo */}
          <Card bg="gray.950">
            <CardHeader bg="gray.950">
              <HStack>
                <Icon as={CalendarIcon} color="blue.500" />
                <Heading size="md" color={textColor}>Calendário de conteúdo - dia {selectedDay}</Heading>
              </HStack>
            </CardHeader>
            <CardBody bg="gray.950">
              {plano.calendario_conteudo
                .filter(dia => dia.dia === selectedDay)
                .map((dia, index) => (
                  <VStack key={index} spacing={6} align="stretch">
                    {/* Feed Posts */}
                    <Box bg="gray.950">
                      <HStack mb={3}>
                        <Icon as={ViewIcon} color="purple.500" />
                        <Heading size="sm" color={textColor}>Feed</Heading>
                      </HStack>
                      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
                        {dia.feed.map((post, pIndex) => (
                          <Box 
                            key={pIndex}
                            p={4}
                            bg="gray.950"
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor="whiteAlpha.50"
                          >
                            <HStack spacing={2} mb={2}>
                              <Badge colorScheme="purple" bg="gray.950">
                                <Icon as={TimeIcon} mr={1} />
                                {post.horario}
                              </Badge>
                            </HStack>
                            <Text color={textColor}>{post.tema}</Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>

                    {/* Reels */}
                    <Box bg="gray.950">
                      <HStack mb={3}>
                        <Icon as={RepeatIcon} color="red.500" />
                        <Heading size="sm" color={textColor}>Reels</Heading>
                      </HStack>
                      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
                        {dia.reels.map((reel, rIndex) => (
                          <Box
                            key={rIndex}
                            p={4}
                            bg="gray.950"
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor="whiteAlpha.50"
                          >
                            <HStack spacing={2} mb={2}>
                              <Badge colorScheme="red" bg="gray.950">
                                <Icon as={TimeIcon} mr={1} />
                                {reel.horario}
                              </Badge>
                            </HStack>
                            <Text color={textColor}>{reel.tema}</Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>

                    {/* Stories */}
                    <Box bg="gray.950">
                      <HStack mb={3}>
                        <Icon as={ChatIcon} color="green.500" />
                        <Heading size="sm" color={textColor}>Stories</Heading>
                      </HStack>
                      <SimpleGrid columns={2} spacing={4}>
                        {plano.calendario_conteudo[selectedDay - 1].stories.temas.map((tema, index) => (
                          <Box
                            key={index}
                            p={4}
                            bg="gray.950"
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor="whiteAlpha.50"
                          >
                            <HStack justify="space-between" mb={2}>
                              <Text fontWeight="bold" color={textColor}>Story {index + 1}</Text>
                              <Badge colorScheme="blue" bg="gray.950">
                                <Icon as={TimeIcon} mr={1} />
                                {plano.calendario_conteudo[selectedDay - 1].stories.horarios[index]}
                              </Badge>
                            </HStack>
                            <Text color={textColor}>{tema}</Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>
                  </VStack>
                ))}
            </CardBody>
          </Card>

          {/* Plano de Ação */}
          <Card bg="gray.950">
            <CardHeader bg="gray.950">
              <HStack>
                <Icon as={StarIcon} color="orange.500" />
                <Heading size="md" color={textColor}>Plano de ação - dia {selectedDay}</Heading>
              </HStack>
            </CardHeader>
            <CardBody bg="gray.950">
              <VStack spacing={6} align="stretch">
                {plano.plano_acao
                  .filter(dia => dia.dia === selectedDay)
                  .map((dia, index) => (
                    <Box key={index} bg="gray.950">
                      <List spacing={4}>
                        {dia.tarefas.map((tarefa, tIndex) => (
                          <ListItem key={tIndex}>
                            <Box 
                              p={4} 
                              bg="gray.950" 
                              borderRadius="md"
                              borderWidth="1px"
                              borderColor="whiteAlpha.50"
                            >
                              <HStack spacing={2} mb={2}>
                                <Badge colorScheme="orange" bg="gray.950">{tarefa.tipo}</Badge>
                                <Badge colorScheme="blue" bg="gray.950">
                                  <Icon as={TimeIcon} mr={1} />
                                  {tarefa.horario_sugerido}
                                </Badge>
                                <Badge colorScheme="green" bg="gray.950">{tarefa.duracao_minutos}min</Badge>
                              </HStack>
                              <Text color={textColor}>{tarefa.descricao}</Text>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                      <Box mt={4} bg="gray.950" p={4} borderRadius="md">
                        <Text fontWeight="bold" mb={2} color={textColor}>Dicas do dia:</Text>
                        <List spacing={2}>
                          {dia.dicas.map((dica, dIndex) => (
                            <ListItem key={dIndex} display="flex" alignItems="center" bg="gray.950">
                              <ListIcon as={CheckCircleIcon} color="green.500" />
                              <Text color={textColor}>{dica}</Text>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Box>
                  ))}
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* 4. Exemplos de Legendas */}
        <Card bg="gray.950">
          <CardHeader bg="gray.950">
            <HStack>
              <Icon as={AtSignIcon} color="purple.500" />
              <Heading size="md" color={textColor}>Exemplos de legendas</Heading>

            </HStack>
          </CardHeader>
          <CardBody bg="gray.950">
            <VStack spacing={4} align="stretch">
              {plano.exemplos_legenda.map((exemplo, index) => (
                <Box
                  key={index}
                  p={4}
                  bg="gray.950"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="whiteAlpha.50"
                >
                  <Text color={textColor}>{exemplo}</Text>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>

        <VStack spacing={8} align="stretch" w="full">
          <Card bg="gray.950">
            <CardHeader bg="gray.950">
              <Heading size="lg" color={textColor}>Boas práticas do Instagram</Heading>
            </CardHeader>
            <CardBody bg="gray.950">
              <EducationalCarousel />
            </CardBody>
          </Card>
        </VStack>
      </VStack>
    </Container>
  )
}
