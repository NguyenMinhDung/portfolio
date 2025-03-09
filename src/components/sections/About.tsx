'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchAboutSection } from '@/lib/contentful-service'
import { getIcon } from '@/lib/icon-map'
import { AboutSection } from '@/types/contentful'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

const textContent = {
  'en-US': {
    title: 'About Me',
    description: 'I am a AI Engineer specializing in building intelligent automation solutions to help businesses and individuals optimize their work and life.'
  },
  'vi-VN': {
    title: 'Về Tôi',
    description: 'Tôi là một kỹ sư AI chuyên về phát triển các giải pháp tự động hóa thông minh giúp doanh nghiệp và cá nhân tối ưu hóa công việc.'
  }
}

export default function About() {
  const { locale } = useLanguage()
  const [aboutData, setAboutData] = useState<AboutSection | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const data = await fetchAboutSection(locale)
        setAboutData(data)
      } catch (error) {
        console.error('Error loading about section data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAboutData()
  }, [locale])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-pulse h-8 w-48 bg-gray-200 rounded-lg mb-8"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            {aboutData?.title || textContent[locale].title}
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            {aboutData?.description || textContent[locale].description}
          </p>

          {aboutData?.image && (
            <div className="mb-12 max-w-md mx-auto">
              <Image
                src={`https:${aboutData.image.file.url}`}
                alt={aboutData.image.description || aboutData.title}
                width={400}
                height={400}
                className="rounded-full mx-auto"
              />
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {aboutData?.skills ? (
              aboutData.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-6 bg-gray-100 rounded-lg
                    hover:bg-gray-200 transition-colors duration-300"
                >
                  <div className="mb-4 text-4xl">
                    {getIcon(skill.icon, 'lg')}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{skill.name}</h3>
                </motion.div>
              ))
            ) : (
              // Fallback content if no skills are provided
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-6 bg-gray-100 rounded-lg
                    hover:bg-gray-200 transition-colors duration-300"
                >
                  <div className="mb-4 text-4xl">{getIcon('python', 'lg')}</div>
                  <h3 className="text-lg font-medium text-gray-900">Python Expert</h3>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-6 bg-gray-100 rounded-lg
                    hover:bg-gray-200 transition-colors duration-300"
                >
                  <div className="mb-4 text-4xl">{getIcon('tensorflow', 'lg')}</div>
                  <h3 className="text-lg font-medium text-gray-900">Machine Learning</h3>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-6 bg-gray-100 rounded-lg
                    hover:bg-gray-200 transition-colors duration-300"
                >
                  <div className="mb-4 text-4xl">{getIcon('docker', 'lg')}</div>
                  <h3 className="text-lg font-medium text-gray-900">DevOps</h3>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-6 bg-gray-100 rounded-lg
                    hover:bg-gray-200 transition-colors duration-300"
                >
                  <div className="mb-4 text-4xl">{getIcon('aws', 'lg')}</div>
                  <h3 className="text-lg font-medium text-gray-900">Cloud Computing</h3>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 