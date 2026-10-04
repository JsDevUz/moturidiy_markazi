import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sections } from '../data/db';
import { Icon } from './Icons';

export default function Sidebar({ activePage, onNavigate, onSelectSection, savedCount = 0, user, onLogout }) {
  const { t, getLoc } = useLanguage();

  return (
    <aside className="sidebar" id="sidebar">
      {/* Menu Group */}
      <div className="sidebar__group">
        <div className="sidebar__label">{t('nav.menu')}</div>
        
        <a 
          className="navlink" 
          href="#home"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          aria-current={activePage === 'home' ? 'page' : undefined}
        >
          <Icon name="home" /> {t('nav.home')}
        </a>

        <a 
          className="navlink" 
          href="#catalog"
          onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }}
          aria-current={activePage === 'catalog' ? 'page' : undefined}
        >
          <Icon name="grid" /> {t('nav.catalog')}
        </a>

        <a 
          className="navlink" 
          href="#shop"
          onClick={(e) => { e.preventDefault(); onNavigate('catalog', { access: 'paid' }); }}
          aria-current={activePage === 'shop' ? 'page' : undefined}
        >
          <Icon name="shop" /> {t('nav.shop')}
        </a>

        <a 
          className="navlink" 
          href="#quiz"
          onClick={(e) => { e.preventDefault(); onNavigate('quiz'); }}
          aria-current={activePage === 'quiz' ? 'page' : undefined}
        >
          <Icon name="chart" /> {t('quiz.title')}
        </a>

        <a 
          className="navlink" 
          href="#consult"
          onClick={(e) => { e.preventDefault(); onNavigate('consult'); }}
          aria-current={activePage === 'consult' ? 'page' : undefined}
        >
          <Icon name="help" /> {t('nav.consult')}
        </a>

        <a 
          className="navlink" 
          href="#about"
          onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
          aria-current={activePage === 'about' ? 'page' : undefined}
        >
          <Icon name="star" /> {t('about.title')}
        </a>
      </div>

      {/* Sections Group */}
      <div className="sidebar__group">
        <div className="sidebar__label">{t('nav.sections')}</div>
        {sections.map((s) => (
          <a
            key={s.id}
            className="navlink"
            href={`#section-${s.id}`}
            onClick={(e) => { e.preventDefault(); onSelectSection(s.id); }}
          >
            <Icon name={s.icon || 'book'} />
            <span>{getLoc(s.title)}</span>
          </a>
        ))}
      </div>

      {/* Account / Library Group */}
      <div className="sidebar__group">
        <div className="sidebar__label">{t('nav.account')}</div>
        <a 
          className="navlink" 
          href="#saved"
          onClick={(e) => { e.preventDefault(); onNavigate('saved'); }}
          aria-current={activePage === 'saved' ? 'page' : undefined}
        >
          <Icon name="bookmark" /> {t('nav.saved')}
          {savedCount > 0 && <span className="navlink__badge">{savedCount}</span>}
        </a>

        <a 
          className="navlink" 
          href="#hikmat"
          onClick={(e) => { e.preventDefault(); onNavigate('hikmatlar'); }}
          aria-current={activePage === 'hikmatlar' ? 'page' : undefined}
        >
          <Icon name="sparkle" /> {t('nav.hikmat')}
        </a>

        {user?.isLoggedIn ? (
          <>
            <a 
              className="navlink" 
              href="#cabinet"
              onClick={(e) => { e.preventDefault(); onNavigate('cabinet'); }}
              aria-current={activePage === 'cabinet' ? 'page' : undefined}
            >
              <Icon name="user" /> {t('nav.cabinet')}
            </a>
            <a 
              className="navlink" 
              href="#logout"
              onClick={(e) => { e.preventDefault(); if (onLogout) onLogout(); }}
            >
              <Icon name="logout" /> {t('auth.logout')}
            </a>
          </>
        ) : (
          <a 
            className="navlink" 
            href="#auth"
            onClick={(e) => { e.preventDefault(); onNavigate('auth'); }}
            aria-current={activePage === 'auth' ? 'page' : undefined}
          >
            <Icon name="user" /> {t('auth.login')}
          </a>
        )}
      </div>
    </aside>
  );
}
