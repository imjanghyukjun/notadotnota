import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '500'],
  variable: '--font-noto-kr',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'janghyukjun',
  description:
    'Graphic Design, Photography.',
  generator: 'v0.app',
  icons: {
    icon: 'hj.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansKr.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
