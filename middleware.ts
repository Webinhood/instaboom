import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Cache simples para rate limiting
const rateLimitCache = new Map<string, { count: number; timestamp: number }>()

// Limpa o cache a cada hora
setInterval(() => {
  rateLimitCache.clear()
}, 3600000)

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'

  // Aplicar rate limiting apenas nas rotas de API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const now = Date.now()
    const windowMs = 60000 // 1 minuto
    const maxRequests = 20 // requisições por minuto

    const current = rateLimitCache.get(ip) ?? { count: 0, timestamp: now }
    
    // Reset se passou o tempo da janela
    if (now - current.timestamp > windowMs) {
      current.count = 0
      current.timestamp = now
    }

    if (current.count >= maxRequests) {
      return new NextResponse('Muitas requisições. Tente novamente em alguns minutos.', {
        status: 429,
        headers: {
          'Retry-After': '60',
        },
      })
    }

    current.count++
    rateLimitCache.set(ip, current)
  }

  // Adicionar headers de segurança
  const headers = new Headers()
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  )
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  const response = NextResponse.next()
  
  // Adicionar headers à resposta
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}
