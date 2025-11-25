import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SupportedLocale } from '../types';

export const LanguageSelector: React.FC = () => {
  const { locale, setLocale } = useLanguage();

  const languages: { code: SupportedLocale; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'it', label: 'IT' },
  ];

  return (
    <div className="flex gap-2 justify-center mb-6">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
            locale === lang.code
              ? 'bg-star text-white shadow-md'
              : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};
