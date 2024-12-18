import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

export async function GET() {
  try {
    const logs = await logger.getRecentErrors()
    return NextResponse.json({ logs })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao recuperar logs' },
      { status: 500 }
    )
  }
}
