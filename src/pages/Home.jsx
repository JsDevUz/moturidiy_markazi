import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { books, sections, hikmatlar } from '../data/db';
import BookCard from '../components/BookCard';
import { Icon, Shamsa } from '../components/Icons';

export default function Home({ onNavigate, onSelectBook, onSelectSection }) {
  const { t, getLoc } = useLanguage();
  const [hikmatIdx, setHikmatIdx] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const quotes = hikmatlar.slice(0, 6);

  // Auto-play hikmat slider with progress indicator
  useEffect(() => {
    let startTime = performance.now();
    const duration = 10000; // 10 seconds per slide

    const interval = setInterval(() => {
      setHikmatIdx((prev) => (prev + 1) % quotes.length);
      startTime = performance.now();
    }, duration);

    let animFrame;
    const updateProgress = () => {
      const elapsed = performance.now() - startTime;
      const ratio = Math.min(1, elapsed / duration);
      setProgressWidth(ratio * 100);
      animFrame = requestAnimationFrame(updateProgress);
    };
    animFrame = requestAnimationFrame(updateProgress);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animFrame);
    };
  }, [hikmatIdx, quotes.length]);

  const countBooks = (secId) => books.filter((b) => b.section === secId).length;

  return (
    <div className="wrap">
      
      {/* ============ IMZO ELEMENTI: unvan — qo'lyozma sarlavha bezagi ============ */}
      <section className="unwan">
        <svg className="unwan__pattern" viewBox="0 0 1200 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="girihNet" width="80" height="80" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="#2FA9B0" strokeWidth=".9" opacity=".38">
                <path d="M40 6 49 31 74 40 49 49 40 74 31 49 6 40 31 31z"/>
                <circle cx="40" cy="40" r="17"/>
                <path d="M0 0h80v80H0z"/>
              </g>
            </pattern>
            <radialGradient id="fade" cx="50%" cy="0%" r="90%">
              <stop offset="0%" stopColor="#fff" stopOpacity=".55"/>
              <stop offset="70%" stopColor="#fff" stopOpacity="0"/>
            </radialGradient>
            <mask id="fadeMask"><rect width="1200" height="460" fill="url(#fade)"/></mask>
          </defs>
          <rect width="1200" height="460" fill="url(#girihNet)" mask="url(#fadeMask)"/>
          <g stroke="#E3CE96" fill="none" opacity=".3">
            <path d="M100 30h1000M100 430h1000" strokeWidth="1"/>
            <path d="M140 44h920M140 416h920" strokeWidth=".6"/>
          </g>
        </svg>

        <div className="unwan__inner">
          <div className="u-eyebrow unwan__eyebrow">{t('home.eyebrow')}</div>
          <img className="unwan__logo" src="/img/logo-256.png" alt="" />
          <h1 className="unwan__title">{t('brand.name')}</h1>
          <p className="unwan__lede">{t('footer.about')}</p>

          <div className="unwan__cta">
            <a 
              className="btn btn--brand" 
              href="#catalog"
              onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }}
            >
              <Icon name="grid" size={17} /> {t('home.all_catalog')}
            </a>
            <a 
              className="btn btn--ghost" 
              style={{ borderColor: 'rgba(227,206,150,.4)', color: '#F1E8D2' }}
              href="#about"
              onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
            >
              {t('common.details')}
            </a>
          </div>

          {/* Kun hikmati slider */}
          {quotes.length > 0 && (
            <div className="unwan__quote hikmat" id="hikmat">
              <span className="u-eyebrow">{t('home.hikmat')}</span>
              <div className="hikmat__viewport">
                <div 
                  className="hikmat__track" 
                  id="hikmatTrack"
                  style={{ 
                    display: 'flex', 
                    transform: `translateX(-${hikmatIdx * 100}%)`,
                    transition: 'transform 0.4s ease'
                  }}
                >
                  {quotes.map((q) => (
                    <figure className="hikmat__slide" key={q.id}>
                      <p>«{getLoc(q.text)}»</p>
                      <cite>— {getLoc(q.source)}</cite>
                    </figure>
                  ))}
                </div>
              </div>

              {/* Progress Dots */}
              <div className="hikmat__dots" id="hikmatDots" role="tablist" aria-label={t('home.hikmat')}>
                {quotes.map((q, idx) => {
                  const isCurrent = idx === hikmatIdx;
                  const isDone = idx < hikmatIdx;
                  return (
                    <button
                      key={q.id}
                      role="tab"
                      aria-selected={isCurrent ? 'true' : 'false'}
                      className={isDone ? 'is-done' : ''}
                      onClick={() => setHikmatIdx(idx)}
                      aria-label={`${idx + 1}`}
                    >
                      <i 
                        style={{ 
                          width: isCurrent 
                            ? `${progressWidth}%` 
                            : isDone 
                              ? '100%' 
                              : '0%' 
                        }} 
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STATLINE */}
      <div className="statline reveal is-in">
        <div><b>{books.length}</b><span>{t('home.stat_books')}</span></div>
        <div><b>{books.filter(b => b.has_audio).length}</b><span>{t('home.stat_audio')}</span></div>
        <div><b>{sections.length}</b><span>{t('home.stat_sections')}</span></div>
        <div><b>3</b><span>{t('home.stat_langs')}</span></div>
      </div>

      {/* =========================== 6 ta asosiy bo'lim =========================== */}
      <div className="sechead">
        <div>
          <h2>{t('home.sections_title')}</h2>
          <p className="u-muted u-small" style={{ margin: '4px 0 0' }}>
            {t('home.sections_sub')}
          </p>
        </div>
      </div>

      <div className="grid-sections">
        {sections.filter(s => s.on_home).map((s) => (
          <a 
            key={s.id}
            className="seccard tilt reveal is-in" 
            href={`#section-${s.id}`}
            onClick={(e) => { e.preventDefault(); onSelectSection(s.id); }}
          >
            <Shamsa className="seccard__medallion" />
            <span className="seccard__icon"><Icon name={s.icon || 'star'} size={22} /></span>
            <h3>{getLoc(s.title)}</h3>
            <p>{getLoc(s.lead)}</p>
            <span className="seccard__count">{countBooks(s.id)} {t('common.books')} →</span>
          </a>
        ))}
      </div>

      {/* ============================ Yangi qo'shilganlar ========================= */}
      <div className="sechead" style={{ marginTop: '48px' }}>
        <h2>{t('home.new_title')}</h2>
        <a 
          href="#catalog"
          onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }}
        >
          {t('home.all_catalog')} →
        </a>
      </div>

      <div className="grid-books">
        {books.slice(0, 8).map((b) => (
          <BookCard 
            key={b.id} 
            book={b} 
            onSelect={onSelectBook}
          />
        ))}
      </div>

    </div>
  );
}
