'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'var(--font-outfit)',
    body: 'var(--font-outfit)',
  },
  styles: {
    global: {
      body: {
        bg: '#000',
        color: '#fff'
      }
    }
  },
  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: 'gray.950', _dark: 'gray.950' },
      'chakra-body-text': { _light: '#fff', _dark: '#fff' },
    }
  },
  colors: {
    gray: {
      950: '#0a0a0a',
    },
    purple: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#CE93D8',
      300: '#BA68C8',
      400: '#AB47BC',
      500: '#9C27B0',
      600: '#8E24AA',
      700: '#553C9A',
      800: '#6A1B9A',
      900: '#4A148C',
    },
  },
  components: {
    Card: {
      defaultProps: {
        variant: 'filled',
      },
      variants: {
        filled: {
          container: {
            bg: 'gray.950',
            borderColor: 'whiteAlpha.50',
            borderWidth: '1px',
            boxShadow: 'none',
            _dark: {
              bg: 'gray.950',
            }
          },
          header: {
            borderBottomWidth: '1px',
            borderColor: 'whiteAlpha.100',
            pb: 4,
            color: '#fff'
          },
          body: {
            py: 6,
            color: '#fff'
          }
        }
      }
    },
    Button: {
      defaultProps: {
        colorScheme: 'purple',
        size: 'md'
      },
      variants: {
        solid: {
          bg: 'purple.500',
          color: '#fff',
          _hover: {
            bg: 'purple.600'
          }
        },
        ghost: {
          color: '#fff',
          bg: 'transparent',
          _hover: {
            bg: 'whiteAlpha.200'
          }
        }
      }
    },
    Badge: {
      baseStyle: {
        bg: 'transparent'
      }
    },
    Heading: {
      baseStyle: {
        color: '#fff',
        letterSpacing: '-0.02em'
      }
    },
    Text: {
      baseStyle: {
        color: '#fff'
      }
    }
  }
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
