import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Icon, Flag } from './Icons';

export default function Topbar({ onToggleNav, onNavigate, onSearch, activePage }) {
  const { lang, setLang, t } = useLanguage();
  const { cycleTheme, isSpun } = useTheme();
  const [searchVal, setSearchVal] = useState('');

  const langs = [
    { code: 'uz', short: 'UZ', label: 'O‘zbekcha' },
    { code: 'ru', short: 'RU', label: 'Русский' },
    { code: 'en', short: 'EN', label: 'English' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchVal);
  };

  return (
    <header className="topbar">
      <button 
        className="topbar__burger" 
        id="navToggle" 
        onClick={onToggleNav}
        aria-label={t('nav.open')}
      >
        <Icon name="menu" size={20} />
      </button>

      <a 
        className="topbar__brand" 
        href="#" 
        onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
      >
        <img className="topbar__logo" src="/img/logo-256.png" alt="" />
        <span className="topbar__name">
          {t('brand.name')}
          <span>{t('brand.sub')}</span>
        </span>
      </a>

      <div className="topbar__spacer" />

      {/* Sun/Moon Theme Button with animated Orb */}
      <button 
        className={`themebtn ${isSpun ? 'is-spun' : ''}`} 
        id="themeBtn" 
        type="button"
        onClick={cycleTheme}
        title={t('theme.switch')} 
        aria-label={t('theme.switch')}
      >
        <span className="themebtn__orb" aria-hidden="true">
          <span className="themebtn__sun"><Icon name="sun" size={17} /></span>
          <span className="themebtn__moon"><Icon name="moon" size={17} /></span>
        </span>
      </button>

      {/* Topbar Search Form */}
      <form className="searchbox" onSubmit={handleSearchSubmit} role="search">
        <Icon name="search" size={17} />
        <input 
          type="search" 
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder={t('common.search_ph')} 
          aria-label={t('common.search')} 
        />
      </form>

      {/* Flag Language Switcher */}
      <nav className="langswitch" aria-label={t('nav.lang')}>
        {langs.map((l) => (
          <a
            key={l.code}
            href={`#lang-${l.code}`}
            onClick={(e) => { e.preventDefault(); setLang(l.code); }}
            title={l.label}
            aria-current={l.code === lang ? 'true' : undefined}
          >
            <Flag code={l.code} w={18} />
            {l.short}
          </a>
        ))}
      </nav>

      {/* Auth / Profile button */}
      <button 
        className="btn btn--primary btn--sm"
        onClick={() => onNavigate('quiz')}
      >
        {t('auth.login')}
      </button>
    </header>
  );
}
