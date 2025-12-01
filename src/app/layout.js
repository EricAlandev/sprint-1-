
import { FuncoesGlobais } from '@/node/globalContext/GlobalContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // pesos que você vai usar
})

export const metadata = {
  title: 'projeto',
  description: 'projeto',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>
        
          <FuncoesGlobais>
            {children}
          </FuncoesGlobais>
      </body>
    </html>
  )
}
