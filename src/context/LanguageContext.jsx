import React, { createContext, useContext, useState, useEffect } from 'react';
import translationsData from '../data/translations.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('moturidiy_lang') || 'uz';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('moturidiy_lang', newLang);
    document.cookie = `lang=${newLang};path=/;max-age=31536000`;
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Translate key: e.g. t('brand.name') -> 'Moturidiy markazi'
  const t = (key, fallback = '') => {
    if (!key) return '';
    const entry = translationsData[key];
    if (!entry) return fallback || key;
    if (typeof entry === 'string') return entry;
    return entry[lang] || entry['uz'] || entry['en'] || fallback || key;
  };

  // Localize an object: e.g. { uz: '...', ru: '...', en: '...' }
  const getLoc = (obj, fallback = '') => {
    if (!obj) return fallback;
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj['uz'] || obj['en'] || fallback;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, getLoc }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
