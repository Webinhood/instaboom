'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function LogsPage() {
  const [logs, setLogs] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const fetchLogs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/logs')
      const data = await response.json()
      setLogs(data.logs)
    } catch (error) {
      toast({
        title: 'Erro ao carregar logs',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={6} align="stretch">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading size="lg">Logs do Sistema</Heading>
          <Button
            colorScheme="blue"
            onClick={fetchLogs}
            isLoading={loading}
          >
            Atualizar
          </Button>
        </Box>

        {loading ? (
          <Text>Carregando logs...</Text>
        ) : !logs ? (
          <Text>Nenhum log encontrado</Text>
        ) : (
          <Box
            bg="gray.50"
            p={4}
            borderRadius="md"
            maxH="80vh"
            overflowY="auto"
            sx={{
              '&::-webkit-scrollbar': {
                width: '8px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
              },
            }}
          >
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.5',
                padding: '16px',
              }}
            >
              {logs}
            </pre>
          </Box>
        )}
      </VStack>
    </Container>
  )
}
