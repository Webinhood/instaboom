import { Providers } from './providers'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Instabrabo - Conquiste 1000 seguidores no Instagram em 7 dias',
  description: 'Receba um plano personalizado e gratuito para crescer no Instagram de forma orgânica e consistente.',
  icons: {
    icon: [
      {
        url: '/img/favicon-instaboom.svg',
        type: 'image/svg+xml',
      }
    ]
  }
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
