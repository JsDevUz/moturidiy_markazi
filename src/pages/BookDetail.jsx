import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { books, sections } from '../data/db';
import BookCard from '../components/BookCard';
import { 
  ArrowLeft, 
  BookOpen, 
  Headphones, 
  Download, 
  Share2, 
  Bookmark, 
  Calendar, 
  Layers, 
  Globe, 
  Check, 
  Star 
} from 'lucide-react';

export default function BookDetail({ 
  book, 
  onBack, 
  onRead, 
  onListen, 
  onSelectBook, 
  isSaved, 
  onToggleSave 
}) {
  const { getLoc, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!book) return null;

  const title = getLoc(book.title);
  const author = getLoc(book.author);
  const desc = getLoc(book.description);
  const sectionObj = sections.find(s => s.id === book.section);
  const sectionTitle = sectionObj ? getLoc(sectionObj.title) : book.section;

  // Related books in the same section
  const relatedBooks = books
    .filter(b => b.section === book.section && b.id !== book.id)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('common.back')}</span>
      </button>

      {/* Main Book Hero Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Book Cover & Quick Actions */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative aspect-[3/4] w-full max-w-[280px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-950 to-teal-950 border border-emerald-500/30 flex items-center justify-center p-3">
              {book.cover ? (
                <img
                  src={`/${book.cover}`}
                  alt={title}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}

              {/* Fallback stylized cover */}
              <div 
                className="w-full h-full rounded-xl bg-emerald-950 border border-emerald-500/20 p-5 flex flex-col justify-between items-center text-center"
                style={{ display: book.cover ? 'none' : 'flex' }}
              >
                <div className="text-amber-400 font-serif text-3xl font-bold tracking-widest opacity-70">
                  ﷽
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif font-bold text-white text-lg leading-snug">
                    {title}
                  </h4>
                  <p className="text-emerald-300 text-xs font-medium">
                    {author}
                  </p>
                </div>
                <span className="text-[10px] text-amber-400/80 uppercase tracking-widest font-semibold">
                  Moturidiy Markazi
                </span>
              </div>
            </div>

            {/* Quick Action buttons under cover */}
            <div className="w-full max-w-[280px] space-y-3 mt-6">
              <button
                onClick={() => onRead(book)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <BookOpen className="w-5 h-5" />
                <span>{t('common.read')}</span>
              </button>

              {book.has_audio && (
                <button
                  onClick={() => onListen(book)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Headphones className="w-5 h-5" />
                  <span>{t('common.listen')}</span>
                </button>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onToggleSave(book.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isSaved
                      ? 'bg-amber-500 border-amber-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? t('common.saved') : t('common.save')}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? t('common.copied') : t('common.share')}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Book Details, Meta & Description */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              {/* Category & Section Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {sectionTitle}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 capitalize">
                  {book.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  ★ {book.popularity}% {t('common.popularity')}
                </span>
              </div>

              {/* Book Title */}
              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2">
                {title}
              </h1>

              {/* Author */}
              <p className="text-base sm:text-lg font-medium text-emerald-800 dark:text-emerald-400 mb-6">
                {author}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-8">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t('common.year')}</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">{book.year}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-amber-500" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t('common.pages')}</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">{book.pages}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-teal-600" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t('common.language')}</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white uppercase">{book.lang || 'uz'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t('common.free')}</span>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">{t('common.free')}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  Asar haqida
                </h3>
                <p>
                  {desc}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  Mazkur elektron nashr Imom Moturidiy xalqaro ilmiy-tadqiqot markazi tomonidan raqamlashtirilgan bo‘lib, ilmiy-ma’rifiy maqsadlarda foydalanish uchun taqdim etiladi. Matn original manbalar bilan qiyosiy tekshirilgan.
                </p>
              </div>
            </div>

            {/* Read / Listen Bottom Notice */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <span>Fayl formati: PDF, HTML Reflow matn</span>
              {book.has_audio && (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  Audiokitob davomiyligi: ~{Math.round(book.audio_seconds / 60) || 3} daqiqa
                </span>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Related Books in same section */}
      {relatedBooks.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Bo‘limdagi boshqa asarlar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedBooks.map((relBook) => (
              <BookCard
                key={relBook.id}
                book={relBook}
                onSelect={onSelectBook}
                onRead={onRead}
                onListen={onListen}
                isSaved={false}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
