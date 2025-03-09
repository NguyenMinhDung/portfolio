'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { fetchProjects } from '@/lib/contentful-service'
import { Project as ProjectType } from '@/types/contentful'
import { useLanguage } from '@/lib/LanguageContext'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const textContent = {
  'en-US': {
    title: "My Projects",
    description: 'Below are some of the prominent projects I have undertaken, reflecting my professional competence and commitment to creating innovative solutions.',
    noProjects: 'No projects found.'
  },
  'vi-VN': {
    title: 'Dự án của tôi',
    description: 'Dưới đây là một số dự án tiêu biểu mà tôi đã thực hiện, phản ánh khả năng chuyên môn và cam kết của tôi trong việc tạo ra giải pháp sáng tạo.',
    noProjects: 'Không có dự án nào được tìm thấy.'
  }
}

export default function Projects() {
  const { locale } = useLanguage();
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(locale)
        setProjects(data)
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [locale])

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            {textContent[locale].title}
          </h1>
          <p className="text-xl text-gray-700">
            {textContent[locale].description}
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 w-16 bg-blue-100 rounded-full"></div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`https:${project.image.file.url}`}
                      alt={project.image.description || project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      width={400}
                      height={200}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <FaGithub className="mr-2" />
                          GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <FaExternalLinkAlt className="mr-2" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">{textContent[locale].noProjects}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
} 