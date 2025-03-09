'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Contact from '../../components/sections/Contact'

export default function ContactPage() {
  return (
    <div className="pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <Contact />
      </motion.div>
    </div>
  )
} 