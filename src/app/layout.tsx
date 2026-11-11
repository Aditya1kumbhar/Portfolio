import type { Metadata, Viewport } from 'next'
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import MotionProvider from '@/providers/MotionProvider'
import { CursorProvider } from '@/hooks/useCursor'
import CustomCursor from '@/components/CustomCursor'
import { SITE_CONFIG, profile } from '@/data/content'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const viewport: Viewport = {
  themeColor: '#FAF9F5',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.canonicalUrl),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${profile.first_name} ${profile.last_name}`,
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.canonicalUrl,
    siteName: `${profile.first_name} ${profile.last_name} Portfolio`,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${profile.first_name} ${profile.last_name} - ${profile.role}`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: '@aadityakumbhar7',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${profile.first_name} ${profile.last_name}`,
    jobTitle: profile.role,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressCountry: 'IN',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Sarhad College, Savitribai Phule Pune University',
    },
    sameAs: profile.socials
      .map((s) => s.url)
      .filter((u) => !u.startsWith('mailto:')),
  }

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <MotionProvider>
          <CursorProvider>
            <CustomCursor />
            {children}
          </CursorProvider>
        </MotionProvider>
      </body>
    </html>
  )
}
