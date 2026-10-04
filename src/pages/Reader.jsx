import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { getBookContent } from '../data/db';
import { Icon } from '../components/Icons';

export default function Reader({ book, onBack }) {
  const { t, getLoc } = useLanguage();
  const { activeTheme } = useTheme();

  // Initialize reader theme from app's activeTheme: dark -> 'night', light -> 'light'
  const [readerTheme, setReaderTheme] = useState(() => {
    return activeTheme === 'dark' ? 'night' : 'light';
  });

  const [chapterIdx, setChapterIdx] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [font, setFont] = useState('serif'); // 'serif', 'sans'
  const [showSettings, setShowSettings] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (activeTheme === 'dark' && readerTheme === 'light') {
      setReaderTheme('night');
    } else if (activeTheme === 'light' && readerTheme === 'night') {
      setReaderTheme('light');
    }
  }, [activeTheme]);

  if (!book) return null;

  const chapters = getBookContent(book.id);
  const currentChapter = chapters[chapterIdx] || chapters[0];
  const title = getLoc(book.title);
  const author = getLoc(book.author);

  const progress = Math.round(((chapterIdx + 1) / chapters.length) * 100);

  const toggleQuickTheme = () => {
    setReaderTheme((prev) => (prev === 'night' ? 'light' : 'night'));
  };

  return (
    <div 
      className="reader" 
      data-theme={readerTheme} 
      data-mode="flow" 
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
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

        {/* Quick Theme Switcher on Topbar */}
        <button 
          className="ricon" 
          onClick={toggleQuickTheme}
          title={readerTheme === 'night' ? 'Yorug‘ rejim' : 'Tungi rejim'}
        >
          <Icon name={readerTheme === 'night' ? 'sun' : 'moon'} size={19} />
        </button>

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
        
        <div className="rstage" id="stage" style={{ flex: 1, overflowY: 'auto', padding: '36px 16px 80px' }}>
          
          <article 
            className="rflow" 
            style={{ 
              display: 'block', 
              maxWidth: '740px', 
              margin: '0 auto',
              fontFamily: font === 'serif' ? 'var(--serif)' : 'var(--ui)',
              fontSize: `${zoom * 0.19}px`,
              lineHeight: '1.8'
            }}
          >
            {/* Chapter Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '1px solid var(--rd-line)', paddingBottom: '24px' }}>
              <div style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--rd-muted)', marginBottom: '8px', fontWeight: '700' }}>
                {chapterIdx + 1} / {chapters.length} bob
              </div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: '28px', margin: '0 0 12px', color: 'var(--rd-ink)' }}>
                {currentChapter.title}
              </h1>
              {currentChapter.arabic && (
                <div style={{ fontSize: '26px', color: 'var(--brand)', margin: '14px 0', fontFamily: 'var(--serif)' }}>
                  {currentChapter.arabic}
                </div>
              )}
            </div>

            {/* Paragraphs */}
            {currentChapter.content.split('\n\n').map((para, idx) => (
              <p key={idx} className="rf-b" style={{ marginBottom: '20px', textAlign: 'justify', textIndent: '24px', color: 'var(--rd-ink)' }}>
                {para}
              </p>
            ))}

            {/* Chapter Navigator Bottom */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '48px', paddingTop: '28px', borderTop: '1px solid var(--rd-line)' }}>
              <button
                type="button"
                onClick={() => {
                  if (chapterIdx > 0) {
                    setChapterIdx(chapterIdx - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={chapterIdx === 0}
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--rd-ui)',
                  color: 'var(--rd-ink)',
                  border: '1px solid var(--rd-line)',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  cursor: chapterIdx === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  opacity: chapterIdx === 0 ? 0.35 : 1
                }}
              >
                <Icon name="left" size={16} /> Oldingi bob
              </button>

              <span style={{ fontSize: '12.5px', color: 'var(--rd-muted)', fontWeight: '600' }}>
                {progress}% o‘qildi
              </span>

              <button
                type="button"
                onClick={() => {
                  if (chapterIdx < chapters.length - 1) {
                    setChapterIdx(chapterIdx + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={chapterIdx === chapters.length - 1}
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--rd-ui)',
                  color: 'var(--rd-ink)',
                  border: '1px solid var(--rd-line)',
                  padding: '9px 18px',
                  borderRadius: '999px',
                  cursor: chapterIdx === chapters.length - 1 ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  opacity: chapterIdx === chapters.length - 1 ? 0.35 : 1
                }}
              >
                Keyingi bob <Icon name="right" size={16} />
              </button>
            </div>
          </article>

        </div>

        {/* Reader Settings Drawer */}
        {showSettings && (
          <aside className="rpanel" style={{ display: 'block', position: 'absolute', right: 0, top: 0, bottom: 0, width: '320px', zIndex: 100 }}>
            <div className="rpanel__sec" style={{ display: 'block' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ margin: 0, color: 'var(--rd-ink)' }}>{t('reader.settings')}</h3>
                <button 
                  onClick={() => setShowSettings(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--rd-muted)' }}
                >
                  <Icon name="close" size={18} />
                </button>
              </div>

              <div className="rpanel__label" style={{ marginTop: '16px' }}>{t('reader.theme')}</div>
              <div className="themeset">
                <button 
                  className="th-light" 
                  aria-pressed={readerTheme === 'light'} 
                  onClick={() => setReaderTheme('light')}
                >
                  {t('reader.theme_light')}
                </button>
                <button 
                  className="th-sepia" 
                  aria-pressed={readerTheme === 'sepia'} 
                  onClick={() => setReaderTheme('sepia')}
                >
                  {t('reader.theme_sepia')}
                </button>
                <button 
                  className="th-gray" 
                  aria-pressed={readerTheme === 'gray'} 
                  onClick={() => setReaderTheme('gray')}
                >
                  {t('reader.theme_gray')}
                </button>
                <button 
                  className="th-night" 
                  aria-pressed={readerTheme === 'night'} 
                  onClick={() => setReaderTheme('night')}
                >
                  {t('reader.theme_night')}
                </button>
              </div>

              <div className="rpanel__label" style={{ marginTop: '20px' }}>{t('reader.zoom')}</div>
              <div className="zoomrow">
                <button className="zoombtn" onClick={() => setZoom(Math.max(80, zoom - 10))}>
                  <Icon name="minus" size={18} />
                </button>
                <output style={{ color: 'var(--rd-ink)' }}>{zoom}%</output>
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
