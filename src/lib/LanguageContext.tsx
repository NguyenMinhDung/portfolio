'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define supported locales
export type Locale = 'en-US' | 'vi-VN';

// Language context type
interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Basic translations
const translations: Record<Locale, Record<string, string>> = {
  'en-US': {
    'home': 'Home',
    'about': 'About',
    'skills': 'Skills',
    'projects': 'Projects',
    'blog': 'Blog',
    'contact': 'Contact',
    // Add more translations as needed
  },
  'vi-VN': {
    'home': 'Trang chủ',
    'about': 'Giới thiệu',
    'skills': 'Kỹ năng',
    'projects': 'Dự án',
    'blog': 'Blog',
    'contact': 'Liên hệ',
    // Add more translations as needed
  }
};

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Default to English or browser preference
  const [locale, setLocale] = useState<Locale>('en-US');

  // Initialize locale from localStorage or browser setting on client-side
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'en-US' || savedLocale === 'vi-VN')) {
      setLocale(savedLocale);
    } else {
      // Check browser language preference
      const browserLang = navigator.language;
      if (browserLang.startsWith('vi')) {
        setLocale('vi-VN');
      }
    }
  }, []);

  // Save locale to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  // Translation function
  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 