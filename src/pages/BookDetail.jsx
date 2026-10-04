import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { books, sections } from '../data/db';
import BookCard from '../components/BookCard';
import { BookCoverSVG, Icon } from '../components/Icons';

export default function BookDetail({ 
  book, 
  onBack, 
  onRead, 
  onListen, 
  onQuiz,
  onSelectBook,
  onSelectSection,
  isSaved, 
  onToggleSave 
}) {
  const { t, getLoc } = useLanguage();

  if (!book) return null;

  const title = getLoc(book.title);
  const author = getLoc(book.author);
  const desc = getLoc(book.description);
  const sectionObj = sections.find((s) => s.id === book.section);
  const sectionTitle = sectionObj ? getLoc(sectionObj.title) : book.section;

  const related = books
    .filter((b) => b.section === book.section && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="wrap">
      
      {/* Top back button */}
      <div style={{ marginBottom: '18px' }}>
        <button 
          className="btn btn--ghost btn--sm" 
          onClick={onBack}
        >
          <Icon name="left" size={16} /> {t('common.back')}
        </button>
      </div>

      <div className="bookhero">
        <div>
          <div className="bookhero__cover">
            <BookCoverSVG book={book} title={title} small={false} />
          </div>
        </div>

        <div>
          <div className="u-eyebrow">
            <a 
              href={`#section-${book.section}`} 
              onClick={(e) => { e.preventDefault(); onSelectSection(book.section); }}
            >
              {sectionTitle}
            </a>
          </div>

          <h1>{title}</h1>
          <div className="bookhero__author">{author}</div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '14px 0 20px' }}>
            {book.price ? (
              <span className="chip chip--paid">{book.price.toLocaleString()} {t('common.sum')}</span>
            ) : (
              <span className="chip chip--free">{t('common.free')}</span>
            )}
            {book.has_audio && <span className="chip chip--audio">{t('common.audio')}</span>}
            <span className="chip">{book.lang ? book.lang.toUpperCase() : 'UZ'}</span>
          </div>

          {/* Action buttons */}
          <div className="bookhero__acts">
            <button 
              className="btn btn--primary" 
              onClick={() => onRead(book)}
            >
              <Icon name="book" size={17} /> <span>{t('book.start')}</span>
            </button>

            {book.has_audio && (
              <button 
                className="btn btn--ghost" 
                onClick={() => onListen(book)}
              >
                <Icon name="play" size={17} /> {t('common.listen')}
              </button>
            )}

            <button 
              className="btn btn--gold" 
              onClick={() => onQuiz(book)}
            >
              <Icon name="check" size={17} /> {t('quiz.cta')}
            </button>

            <button 
              className="btn btn--ghost" 
              onClick={() => onToggleSave(book.id)}
            >
              <Icon name="bookmark" size={17} />
              <span>{isSaved ? t('common.saved') : t('common.save')}</span>
            </button>
          </div>

          {/* Metadata Grid */}
          <dl className="metagrid">
            <div>
              <dt>{t('common.author')}</dt>
              <dd>{author}</dd>
            </div>
            <div>
              <dt>{t('common.year')}</dt>
              <dd>{book.year}</dd>
            </div>
            <div>
              <dt>{t('common.pages')}</dt>
              <dd>{book.pages}</dd>
            </div>
            <div>
              <dt>{t('common.language')}</dt>
              <dd>{book.lang ? book.lang.toUpperCase() : 'UZ'}</dd>
            </div>
            {book.has_audio && (
              <div>
                <dt>{t('common.audio')}</dt>
                <dd>{Math.round(book.audio_seconds / 60)} daq</dd>
              </div>
            )}
          </dl>

          <h2 style={{ margin: '34px 0 12px', fontSize: '22px' }}>{t('book.about')}</h2>
          <p style={{ maxWidth: '70ch', lineHeight: '1.7', color: 'var(--ink-2)' }}>
            {desc}
          </p>
        </div>
      </div>

      {/* Related Books */}
      {related.length > 0 && (
        <div style={{ marginTop: '54px' }}>
          <div className="sechead">
            <h2>{t('book.related')}</h2>
          </div>
          <div className="grid-books">
            {related.map((b) => (
              <BookCard 
                key={b.id} 
                book={b} 
                onSelect={onSelectBook}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
