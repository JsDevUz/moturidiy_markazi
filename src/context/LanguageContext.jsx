import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { t: i18nT } = useTranslation();
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('moturidiy_lang') || i18n.language || 'uz';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('moturidiy_lang', newLang);
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Helper to extract localized value from an object: { uz: "...", ru: "...", en: "..." }
  const getLoc = (obj, fallback = '') => {
    if (!obj) return fallback;
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['uz'] || obj['en'] || fallback;
  };

  const t = (key) => {
    return i18nT(key);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, getLoc, i18n }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
