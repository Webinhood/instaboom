import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Criar rate limiter
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests por minuto
})

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'

  // Aplicar rate limiting apenas nas rotas de API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`
    )

    if (!success) {
      return new NextResponse('Muitas requisições. Tente novamente em alguns minutos.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      })
    }
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
