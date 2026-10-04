import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Headphones, Calendar, Bookmark, Eye } from 'lucide-react';

export default function BookCard({ book, onRead, onListen, onSelect, isSaved, onToggleSave }) {
  const { getLoc, t } = useLanguage();

  const title = getLoc(book.title);
  const author = getLoc(book.author);
  const desc = getLoc(book.description);

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top badges & Cover container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-950 flex items-center justify-center p-4">
        {book.cover ? (
          <img
            src={`/${book.cover}`}
            alt={title}
            className="w-full h-full object-cover object-center rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}

        {/* Fallback stylized book cover */}
        <div 
          className="w-full h-full rounded-lg bg-emerald-950/80 border border-emerald-500/30 p-4 flex flex-col justify-between items-center text-center shadow-inner"
          style={{ display: book.cover ? 'none' : 'flex' }}
        >
          <div className="text-amber-400 font-serif text-2xl font-bold tracking-widest opacity-60">
            ﷽
          </div>
          <div className="space-y-1 my-auto">
            <h4 className="font-serif font-bold text-white text-base leading-snug line-clamp-3">
              {title}
            </h4>
            <p className="text-emerald-300/90 text-xs font-medium">
              {author}
            </p>
          </div>
          <span className="text-[10px] text-emerald-400/60 uppercase tracking-widest">
            Moturidiy Markazi
          </span>
        </div>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {book.has_audio && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/90 text-white backdrop-blur-md shadow-sm">
              <Headphones className="w-3 h-3" />
              <span>{t('common.audio')}</span>
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-700/90 text-white backdrop-blur-md">
            {t('common.free')}
          </span>
        </div>

        {/* Bookmark button */}
        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(book.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
              isSaved 
                ? 'bg-amber-500 text-white shadow-md' 
                : 'bg-black/30 text-white hover:bg-black/50'
            }`}
            title="Saqlash"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Hover Quick Actions Overlay */}
        <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2.5 p-4 z-20">
          <button
            onClick={() => onRead(book)}
            className="w-full max-w-[170px] py-2 px-3 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-transform hover:scale-105"
          >
            <BookOpen className="w-4 h-4 text-emerald-700" />
            {t('common.read')}
          </button>

          {book.has_audio && onListen && (
            <button
              onClick={() => onListen(book)}
              className="w-full max-w-[170px] py-2 px-3 rounded-xl bg-amber-500 text-white hover:bg-amber-600 text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-transform hover:scale-105"
            >
              <Headphones className="w-4 h-4" />
              {t('common.listen')}
            </button>
          )}

          <button
            onClick={() => onSelect(book)}
            className="w-full max-w-[170px] py-1.5 px-3 rounded-xl bg-emerald-800/80 text-white hover:bg-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            {t('common.details')}
          </button>
        </div>
      </div>

      {/* Book Info Card Bottom */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="capitalize font-medium text-emerald-700 dark:text-emerald-400">
              {book.category}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{book.year}</span>
            </div>
          </div>

          <h3 
            onClick={() => onSelect(book)}
            className="font-serif font-bold text-slate-900 dark:text-white text-base leading-snug hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer transition-colors line-clamp-2"
          >
            {title}
          </h3>

          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
            {author}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{book.pages} {t('common.pages')}</span>
          <span className="text-[11px] font-medium text-slate-400">
            ★ {book.popularity}% {t('common.popularity')}
          </span>
        </div>
      </div>

    </div>
  );
}
