import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getBookContent } from '../data/db';
import { Icon } from '../components/Icons';

export default function Reader({ book, onBack }) {
  const { t, getLoc } = useLanguage();
  const [chapterIdx, setChapterIdx] = useState(0);
  const [theme, setTheme] = useState('light'); // 'light', 'sepia', 'gray', 'night'
  const [zoom, setZoom] = useState(100);
  const [font, setFont] = useState('serif'); // 'serif', 'sans'
  const [showSettings, setShowSettings] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!book) return null;

  const chapters = getBookContent(book.id);
  const currentChapter = chapters[chapterIdx] || chapters[0];
  const title = getLoc(book.title);
  const author = getLoc(book.author);

  const progress = Math.round(((chapterIdx + 1) / chapters.length) * 100);

  return (
    <div className="reader" data-theme={theme} data-mode="flow" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Reader Topbar */}
      <header className="rtop">
        <button 
          className="ricon" 
          onClick={onBack}
          title={t('reader.exit')} 
          aria-label={t('reader.exit')}
        >
          <Icon name="left" size={20} />
        </button>

        <div className="rtop__title">
          <b>{title}</b>
          <span>{author} · {currentChapter.title}</span>
        </div>

        <div className="rtop__spacer" />

        <button 
          className="ricon" 
          onClick={() => setIsBookmarked(!isBookmarked)}
          aria-pressed={isBookmarked ? 'true' : 'false'}
          title={t('reader.bookmark')}
        >
          <Icon name="bookmark" size={19} />
        </button>

        <button 
          className="ricon" 
          onClick={() => setShowSettings(!showSettings)}
          title={t('reader.settings')}
        >
          <Icon name="settings" size={19} />
        </button>

        <div className="rprogress">
          <i style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* Reader Body */}
      <div className="rbody" style={{ flex: 1, display: 'flex', position: 'relative' }}>
        
        <div className="rstage" id="stage" style={{ flex: 1, overflowY: 'auto', padding: '32px 16px' }}>
          
          <article 
            className="rflow" 
            style={{ 
              display: 'block', 
              maxWidth: '720px', 
              margin: '0 auto',
              fontFamily: font === 'serif' ? 'var(--serif)' : 'var(--ui)',
              fontSize: `${zoom * 0.19}px`,
              lineHeight: '1.8'
            }}
          >
            {/* Chapter Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '1px solid var(--line)', paddingBottom: '24px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '6px' }}>
                {chapterIdx + 1} / {chapters.length} bob
              </div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: '28px', margin: '0 0 12px' }}>
                {currentChapter.title}
              </h1>
              {currentChapter.arabic && (
                <div style={{ fontSize: '24px', color: 'var(--brand-deep)', margin: '14px 0', fontFamily: 'var(--serif)' }}>
                  {currentChapter.arabic}
                </div>
              )}
            </div>

            {/* Paragraphs */}
            {currentChapter.content.split('\n\n').map((para, idx) => (
              <p key={idx} style={{ marginBottom: '18px', textAlign: 'justify', textIndent: '24px' }}>
                {para}
              </p>
            ))}

            {/* Chapter Navigator Bottom */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => {
                  if (chapterIdx > 0) {
                    setChapterIdx(chapterIdx - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={chapterIdx === 0}
                style={{ opacity: chapterIdx === 0 ? 0.3 : 1 }}
              >
                <Icon name="left" size={16} /> Oldingi bob
              </button>

              <span style={{ fontSize: '12px', opacity: 0.7 }}>
                {progress}% o‘qildi
              </span>

              <button
                className="btn btn--ghost btn--sm"
                onClick={() => {
                  if (chapterIdx < chapters.length - 1) {
                    setChapterIdx(chapterIdx + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={chapterIdx === chapters.length - 1}
                style={{ opacity: chapterIdx === chapters.length - 1 ? 0.3 : 1 }}
              >
                Keyingi bob <Icon name="right" size={16} />
              </button>
            </div>
          </article>

        </div>

        {/* Reader Settings Drawer */}
        {showSettings && (
          <aside className="rpanel" style={{ display: 'block', position: 'absolute', right: 0, top: 0, bottom: 0, width: '280px', zIndex: 100 }}>
            <div className="rpanel__sec" style={{ display: 'block' }}>
              <h3>{t('reader.settings')}</h3>

              <div className="rpanel__label" style={{ marginTop: '16px' }}>{t('reader.theme')}</div>
              <div className="themeset">
                <button 
                  className="th-light" 
                  aria-pressed={theme === 'light'} 
                  onClick={() => setTheme('light')}
                >
                  {t('reader.theme_light')}
                </button>
                <button 
                  className="th-sepia" 
                  aria-pressed={theme === 'sepia'} 
                  onClick={() => setTheme('sepia')}
                >
                  {t('reader.theme_sepia')}
                </button>
                <button 
                  className="th-gray" 
                  aria-pressed={theme === 'gray'} 
                  onClick={() => setTheme('gray')}
                >
                  {t('reader.theme_gray')}
                </button>
                <button 
                  className="th-night" 
                  aria-pressed={theme === 'night'} 
                  onClick={() => setTheme('night')}
                >
                  {t('reader.theme_night')}
                </button>
              </div>

              <div className="rpanel__label" style={{ marginTop: '20px' }}>{t('reader.zoom')}</div>
              <div className="zoomrow">
                <button className="zoombtn" onClick={() => setZoom(Math.max(80, zoom - 10))}>
                  <Icon name="minus" size={18} />
                </button>
                <output>{zoom}%</output>
                <button className="zoombtn" onClick={() => setZoom(Math.min(150, zoom + 10))}>
                  <Icon name="plus" size={18} />
                </button>
              </div>

              <div className="rpanel__label" style={{ marginTop: '20px' }}>{t('reader.font')}</div>
              <div className="modeset">
                <button 
                  aria-pressed={font === 'serif'} 
                  onClick={() => setFont('serif')}
                  style={{ fontFamily: 'var(--serif)' }}
                >
                  Serif
                </button>
                <button 
                  aria-pressed={font === 'sans'} 
                  onClick={() => setFont('sans')}
                  style={{ fontFamily: 'var(--ui)' }}
                >
                  Sans
                </button>
              </div>

              <div style={{ marginTop: '28px' }}>
                <button 
                  className="btn btn--primary btn--sm" 
                  style={{ width: '100%' }}
                  onClick={() => setShowSettings(false)}
                >
                  {t('common.close')}
                </button>
              </div>
            </div>
          </aside>
        )}

      </div>
    </div>
  );
}
