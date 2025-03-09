'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { fetchContactInfo } from '@/lib/contentful-service'
// Không còn sử dụng trực tiếp service Airtable
// import { saveContactToAirtable } from '@/lib/airtable-service'
import { ContactInfo } from '@/types/contentful'
import { getIcon } from '@/lib/icon-map'
import { useLanguage } from '@/lib/LanguageContext'

// Define text content for each language
const textContent = {
  'en-US': {
    title: 'Contact',
    subtitle: 'Connect with me to discuss your project',
    form: {
      name: 'Full Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Thank you! Your message has been sent successfully.',
      error: 'An error occurred while sending your message. Please try again later.'
    },
    connect: 'Connect with me'
  },
  'vi-VN': {
    title: 'Liên Hệ',
    subtitle: 'Hãy kết nối với tôi để thảo luận về dự án của bạn',
    form: {
      name: 'Họ tên',
      email: 'Email',
      message: 'Tin nhắn',
      submit: 'Gửi tin nhắn',
      sending: 'Đang gửi...',
      success: 'Cảm ơn! Tin nhắn của bạn đã được gửi thành công.',
      error: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
    },
    connect: 'Kết nối với tôi'
  }
}

export default function Contact() {
  const { locale } = useLanguage()
  const text = textContent[locale]
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{
    success: boolean
    message: string
  } | null>(null)
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const data = await fetchContactInfo(locale)
        setContactInfo(data)
      } catch (error) {
        console.error('Error loading contact information:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContactInfo()
  }, [locale])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      // Gọi API route thay vì gọi trực tiếp service Airtable
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setSubmitResult({
          success: true,
          message: text.form.success,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.error || 'Failed to save to Airtable');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({
        success: false,
        message: text.form.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Helper function to render the appropriate social icon
  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <FaGithub className="w-6 h-6" />
      case 'twitter':
        return <FaTwitter className="w-6 h-6" />
      case 'linkedin':
        return <FaLinkedin className="w-6 h-6" />
      case 'email':
        return <FaEnvelope className="w-6 h-6" />
      default:
        return getIcon(platform.toLowerCase(), 'md')
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              {text.title || textContent[locale].title}
            </h1>
            <p className="text-xl text-gray-700">
              {text.subtitle || textContent[locale].subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{text.form.submit}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    {text.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                             text-gray-900 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    {text.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                             text-gray-900 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">
                    {text.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                             text-gray-900 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 
                           rounded-lg transition duration-300 ease-in-out transform hover:scale-105 ${
                             isSubmitting ? 'bg-blue-400 cursor-not-allowed' : ''
                           }`}
                >
                  {isSubmitting ? text.form.sending : text.form.submit}
                </button>
                
                {submitResult && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {submitResult.message}
                  </div>
                )}
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{text.connect}</h3>
                {loading ? (
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-8 animate-pulse"></div>
                ) : (
                  <p className="text-gray-700 mb-8">
                    {contactInfo?.address || 'TP. Hồ Chí Minh, Việt Nam'}
                  </p>
                )}
                <div className="space-y-4">
                  {loading ? (
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 animate-pulse">
                        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-40"></div>
                      </div>
                    ))
                  ) : contactInfo?.socialLinks ? (
                    contactInfo.socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <span className="mr-3">{renderSocialIcon(social.platform)}</span>
                        {social.platform}
                      </a>
                    ))
                  ) : (
                    // Fallback content
                    <>
                      <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <FaGithub className="w-6 h-6 mr-3" />
                        GitHub
                      </a>
                      <a
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <FaTwitter className="w-6 h-6 mr-3" />
                        Twitter
                      </a>
                      <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <FaLinkedin className="w-6 h-6 mr-3" />
                        LinkedIn
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 