import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookCoverSVG } from './Icons';

export default function BookCard({ book, onSelect, onRead, showProgress = false, progress = 0 }) {
  const { getLoc, t } = useLanguage();

  if (!book) return null;

  const title = getLoc(book.title);
  const author = getLoc(book.author);

  return (
    <article className="bookcard reveal is-in" data-book={book.id}>
      <a 
        className="bookcard__cover" 
        href={`#book-${book.id}`}
        onClick={(e) => { e.preventDefault(); onSelect(book); }}
      >
        <BookCoverSVG book={book} title={title} small={true} />
        <span className="bookcard__flags">
          {book.price ? (
            <span className="chip chip--paid">{t('common.paid')}</span>
          ) : (
            <span className="chip chip--free">{t('common.free')}</span>
          )}
          {book.has_audio && (
            <span className="chip chip--audio">{t('common.audio')}</span>
          )}
        </span>
      </a>

      <div>
        <a 
          className="bookcard__title" 
          href={`#book-${book.id}`}
          onClick={(e) => { e.preventDefault(); onSelect(book); }}
        >
          {title}
        </a>
        <div className="bookcard__author">{author}</div>
        <div className="bookcard__meta">
          {book.year} · {book.pages} {t('common.pages')}
        </div>
      </div>

      {showProgress && (
        <div className="bookcard__prog">
          <i style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
      )}
    </article>
  );
}
