'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getIcon } from '@/lib/icon-map'
import { fetchSkillCategories } from '@/lib/contentful-service'
import { SkillCategory } from '@/types/contentful'
import { useLanguage } from '@/lib/LanguageContext'

const textContent = {
  'en-US': {
    title: 'Skills',
    description: 'I continuously update and expand my skills in the field of AI and software development. Here are the main technologies I use to build automation solutions.',
    noSkills: 'No skills found.',
    viewAll: 'View All Skills'
  },
  'vi-VN': {
    title: 'Kỹ năng',
    description: 'Tôi liên tục cập nhật và mở rộng kỹ năng trong lĩnh vực AI và phát triển phần mềm. Dưới đây là các công nghệ chính tôi sử dụng để xây dựng các giải pháp tự động hóa.',
    noSkills: 'Không có kỹ năng nào được tìm thấy.',
    viewAll: 'Xem tất cả kỹ năng'
  }
}

export default function Skills() {
  const { locale } = useLanguage();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSkillCategories = async () => {
      try {
        const data = await fetchSkillCategories(locale)
        setSkillCategories(data)
      } catch (error) {
        console.error('Error loading skill categories:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSkillCategories()
  }, [locale])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              {textContent[locale].title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {textContent[locale].description}
            </p>
          </motion.div>

          {loading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-40 mb-6"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-32 bg-gray-100 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {skillCategories.length > 0 ? (
                skillCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                  >
                    <h3 className="text-xl font-semibold mb-6 text-gray-800">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.skills.map((skill, index) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-gray-100 rounded-lg p-6 shadow-sm"
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            {getIcon(skill.icon, 'lg')}
                            <h4 className="text-lg font-medium text-gray-800">{skill.name}</h4>
                          </div>
                          <div className="w-full bg-gray-300 rounded-full h-2.5">
                            <div
                              className="bg-gradient-to-r from-blue-400 to-emerald-400 h-2.5 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-end mt-2">
                            <span className="text-sm text-gray-500">{skill.level}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">{textContent[locale].noSkills}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
} 