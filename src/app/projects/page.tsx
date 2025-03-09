'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Projects from '../../components/sections/Projects'

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <Projects />
      </motion.div>
    </div>
  )
} 