'use client';

import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === 'en-US' ? 'vi-VN' : 'en-US');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors duration-200 flex items-center"
      aria-label="Switch language"
    >
      <span className="font-medium text-sm">
        {locale === 'en-US' ? 'VI' : 'EN'}
      </span>
    </button>
  );
} 