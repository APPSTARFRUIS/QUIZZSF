import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLocale, Translations } from '../types';
import { TRANSLATIONS } from '../constants';

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (lang: SupportedLocale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_LANG_KEY = 'sf_quiz_lang';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>('fr');

  useEffect(() => {
    const storedLang = localStorage.getItem(STORAGE_LANG_KEY) as SupportedLocale;
    if (storedLang && ['fr', 'en', 'es', 'it'].includes(storedLang)) {
      setLocaleState(storedLang);
    }
  }, []);

  const setLocale = (lang: SupportedLocale) => {
    setLocaleState(lang);
    localStorage.setItem(STORAGE_LANG_KEY, lang);
  };

  const t = TRANSLATIONS[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
