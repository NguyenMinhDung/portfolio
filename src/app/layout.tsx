import React from 'react'
import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import Navigation from '@/components/layout/Navigation'
import './globals.css'
import { fetchSiteConfig } from '@/lib/contentful-service'
import { LanguageProvider } from '@/lib/LanguageContext'

// This is a dynamic metadata function
export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await fetchSiteConfig();
  
  return {
    title: {
      default: siteConfig?.siteName || 'BetoAI - AI Engineer Portfolio',
      template: `%s | ${siteConfig?.siteName || 'BetoAI'}`
    },
    description: siteConfig?.siteDescription || 'BetoAI, Tiết kiệm thời gian, tận hưởng cuộc sống.',
    keywords: ['AI Engineer', 'Machine Learning', 'Automation', 'Python', 'Golang', 'Cloud Computing'],
    authors: [{ name: 'Your Name' }],
    creator: 'Your Name',
    openGraph: {
      type: 'website',
      locale: 'vi_VN',
      url: 'https://www.your-portfolio-url.com',
      siteName: siteConfig?.siteName || 'BetoAI',
      title: siteConfig?.siteName || 'BetoAI - AI Engineer Portfolio',
      description: siteConfig?.siteDescription || 'BetoAI, Tiết kiệm thời gian, tận hưởng cuộc sống.',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteConfig?.siteName || 'BetoAI'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig?.siteName || 'BetoAI - AI Engineer Portfolio',
      description: siteConfig?.siteDescription || 'BetoAI, Tiết kiệm thời gian, tận hưởng cuộc sống.',
      images: ['/images/og-image.jpg'],
      creator: '@yourtwitterhandle'
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Head content */}
      </head>
      <body>
        <LanguageProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  )
} 