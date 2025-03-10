'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { fetchSiteConfig } from '@/lib/contentful-service'
import { SiteConfig } from '@/types/contentful'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useLanguage } from '@/lib/LanguageContext'

// Default navigation items as fallback
const defaultNavItems = {
  'en-US': [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Skills', path: '/skills' },
    { label: 'Contact', path: '/contact' },
  ],
  'vi-VN': [
    { label: 'Trang chủ', path: '/' },
    { label: 'Giới thiệu', path: '/about' },
    { label: 'Dự án', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Kỹ năng', path: '/skills' },
    { label: 'Liên hệ', path: '/contact' },
  ]
}

export default function Navigation() {
  const pathname = usePathname()
  const { locale } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const isActivePath = (path: string): boolean => {
    // Remove basePath from current pathname for correct comparison
    const currentPath = pathname.replace(new RegExp(`^${basePath}`), '')
    // Special case for homepage
    if (path === '/' && (currentPath === '/' || currentPath === '')) {
      return true
    }
    return currentPath === path || currentPath === path + '/'
  }

  useEffect(() => {
    const loadSiteConfig = async () => {
      try {
        const data = await fetchSiteConfig(locale)
        setSiteConfig(data)
      } catch (error) {
        console.error('Error loading site configuration:', error)
      }
    }

    loadSiteConfig()
  }, [locale])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use navigation items from Contentful or fallback to default
  const navItems = siteConfig?.navigation || defaultNavItems[locale]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            {siteConfig?.siteName || 'BetoAI'}
          </Link>
          
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActivePath(item.path)
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-4 bg-gray-900 p-4 rounded-lg">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium py-2 transition-colors duration-300 ${
                    isActivePath(item.path)
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
} 