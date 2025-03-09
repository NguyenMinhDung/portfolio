import React from 'react'
import About from '../components/sections/About'
import Projects from '../components/sections/Projects'
import Contact from '../components/sections/Contact'
import Skills from '../components/sections/Skills'
import RecentPosts from '../components/sections/RecentPosts'
import { fetchHeroSection } from '@/lib/contentful-service'
import { useLanguage } from '@/lib/LanguageContext'

const textContent = {
  'en-US': {
    title: 'Hello! I am a AI Engineer',
    subtitle: 'Optimize your work and life with AI',
    description: 'I am a AI Engineer specializing in building intelligent automation solutions to help businesses and individuals optimize their work and life.'
  },
  'vi-VN': {
    title: 'Xin chào! Tôi là một AI Engineer',
    subtitle: 'Tiết kiệm thời gian, tận hưởng cuộc sống',
    description: 'Tôi là một AI Engineer chuyên về phát triển các giải pháp tự động hóa thông minh giúp doanh nghiệp và cá nhân tối ưu hóa công việc.'
  }
}


export default async function Home() {
  const heroData = await fetchHeroSection()

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">
              {heroData?.title}
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-gray-700">
              {heroData?.subtitle}
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-600">
              {heroData?.description}
            </p>
            {heroData?.ctaText && heroData?.ctaLink && (
              <a
                href={heroData.ctaLink}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                {heroData.ctaText}
              </a>
            )}
          </div>
        </div>
      </div>
      <About />
      <Skills />
      <Projects />
      <RecentPosts />
      <Contact />
    </>
  )
} 