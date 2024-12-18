import { Providers } from './providers'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'InstaBoom - 1000 Seguidores em 7 Dias',
  description: 'Alcance 1000 seguidores reais no Instagram em apenas 7 dias com nosso método comprovado.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={outfit.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
