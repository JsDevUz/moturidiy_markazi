import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { books, sections } from '../data/db';
import BookCard from '../components/BookCard';

export default function Catalog({ 
  initialSearch = '', 
  initialSection = '', 
  initialAccess = '',
  onSelectBook 
}) {
  const { t, getLoc } = useLanguage();
  const [q, setQ] = useState(initialSearch);
  const [section, setSection] = useState(initialSection);
  const [blang, setBlang] = useState('');
  const [access, setAccess] = useState(initialAccess);
  const [sort, setSort] = useState('popular');
  const [hasAudio, setHasAudio] = useState(false);

  const filteredBooks = useMemo(() => {
    return books
      .filter((b) => {
        if (section && b.section !== section) return false;
        if (blang && b.lang !== blang) return false;
        if (access === 'free' && b.price > 0) return false;
        if (access === 'paid' && b.price === 0) return false;
        if (hasAudio && !b.has_audio) return false;

        if (q.trim()) {
          const query = q.toLowerCase();
          const title = (getLoc(b.title) || '').toLowerCase();
          const author = (getLoc(b.author) || '').toLowerCase();
          const desc = (getLoc(b.description) || '').toLowerCase();
          if (!title.includes(query) && !author.includes(query) && !desc.includes(query)) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sort === 'popular') return (b.popularity || 0) - (a.popularity || 0);
        if (sort === 'new') return new Date(b.added || '2020-01-01') - new Date(a.added || '2020-01-01');
        if (sort === 'az') return (getLoc(a.title) || '').localeCompare(getLoc(b.title) || '');
        return 0;
      });
  }, [q, section, blang, access, sort, hasAudio, getLoc]);

  const handleReset = () => {
    setQ('');
    setSection('');
    setBlang('');
    setAccess('');
    setSort('popular');
    setHasAudio(false);
  };

  return (
    <div className="wrap">
      <div className="pagehead">
        <div className="u-eyebrow">{t('nav.library')}</div>
        <h1>{t('catalog.title')}</h1>
        <p>{t('catalog.sub')}</p>
      </div>

      <form 
        className="filterbar" 
        id="filterForm" 
        onSubmit={(e) => e.preventDefault()}
      >
        <input 
          type="search" 
          name="q" 
          value={q} 
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('common.search_ph')}
          aria-label={t('common.search')} 
        />

        <select 
          name="section" 
          value={section} 
          onChange={(e) => setSection(e.target.value)}
          aria-label={t('common.section')}
        >
          <option value="">{t('common.section')}: {t('common.all')}</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>{getLoc(s.title)}</option>
          ))}
        </select>

        <select 
          name="blang" 
          value={blang} 
          onChange={(e) => setBlang(e.target.value)}
          aria-label={t('common.language')}
        >
          <option value="">{t('common.language')}: {t('common.all')}</option>
          <option value="uz">UZ</option>
          <option value="ru">RU</option>
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>

        <select 
          name="access" 
          value={access} 
          onChange={(e) => setAccess(e.target.value)}
          aria-label={t('catalog.access')}
        >
          <option value="">{t('catalog.access')}: {t('common.all')}</option>
          <option value="free">{t('common.free')}</option>
          <option value="paid">{t('common.paid')}</option>
        </select>

        <select 
          name="sort" 
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
          aria-label={t('catalog.sort')}
        >
          <option value="popular">{t('catalog.sort_popular')}</option>
          <option value="new">{t('catalog.sort_new')}</option>
          <option value="az">{t('catalog.sort_az')}</option>
        </select>

        <label className="checkline">
          <input 
            type="checkbox" 
            name="audio" 
            checked={hasAudio} 
            onChange={(e) => setHasAudio(e.target.checked)} 
          />
          {t('catalog.has_audio')}
        </label>

        {(q || section || blang || access || hasAudio) && (
          <button 
            type="button" 
            className="btn btn--ghost btn--sm" 
            onClick={handleReset}
          >
            {t('catalog.reset')}
          </button>
        )}

        <span className="filterbar__count">
          {t('common.showing')}: {filteredBooks.length} / {books.length}
        </span>
      </form>

      {filteredBooks.length > 0 ? (
        <div className="grid-books">
          {filteredBooks.map((b) => (
            <BookCard 
              key={b.id} 
              book={b} 
              onSelect={onSelectBook}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>{t('common.empty')}</h3>
          <p>{t('catalog.empty')}</p>
          <button 
            type="button" 
            className="btn btn--ghost" 
            onClick={handleReset}
          >
            {t('catalog.reset')}
          </button>
        </div>
      )}
    </div>
  );
}
