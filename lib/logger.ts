import fs from 'fs'
import path from 'path'

class Logger {
  private logDir: string
  private errorLogPath: string
  private maxLogSize: number = 5 * 1024 * 1024 // 5MB

  constructor() {
    this.logDir = path.join(process.cwd(), 'logs')
    this.errorLogPath = path.join(this.logDir, 'error.log')
    this.initializeLogDirectory()
  }

  private initializeLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir)
    }
  }

  private formatLogMessage(error: Error | string, context?: any): string {
    const timestamp = new Date().toISOString()
    const errorMessage = error instanceof Error ? error.stack : error
    const contextStr = context ? `\nContext: ${JSON.stringify(context, null, 2)}` : ''
    
    return `\n[${timestamp}] ${errorMessage}${contextStr}\n${'='.repeat(80)}\n`
  }

  private async rotateLogFileIfNeeded() {
    try {
      if (fs.existsSync(this.errorLogPath)) {
        const stats = fs.statSync(this.errorLogPath)
        if (stats.size >= this.maxLogSize) {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
          const archivePath = path.join(this.logDir, `error-${timestamp}.log`)
          fs.renameSync(this.errorLogPath, archivePath)
        }
      }
    } catch (error) {
      console.error('Erro ao rotacionar arquivo de log:', error)
    }
  }

  async error(error: Error | string, context?: any) {
    try {
      await this.rotateLogFileIfNeeded()
      const logMessage = this.formatLogMessage(error, context)
      fs.appendFileSync(this.errorLogPath, logMessage)
      
      // Também loga no console em desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        console.error(logMessage)
      }
    } catch (err) {
      console.error('Erro ao escrever no arquivo de log:', err)
    }
  }

  async getRecentErrors(maxSize: number = 1024 * 1024): Promise<string> {
    try {
      if (!fs.existsSync(this.errorLogPath)) {
        return ''
      }

      const content = fs.readFileSync(this.errorLogPath, 'utf-8')
      return content
    } catch (error) {
      console.error('Erro ao ler logs:', error)
      return ''
    }
  }
}

// Singleton instance
export const logger = new Logger()
