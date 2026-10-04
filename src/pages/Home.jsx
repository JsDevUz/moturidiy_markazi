import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { books } from '../data/db';
import Hero from '../components/Hero';
import HikmatBanner from '../components/HikmatBanner';
import SectionsGrid from '../components/SectionsGrid';
import BookCard from '../components/BookCard';
import { BookOpen, Headphones, Award, ArrowRight } from 'lucide-react';

export default function Home({ 
  onNavigate, 
  onSelectBook, 
  onReadBook, 
  onListenBook, 
  onSelectSection,
  savedBookIds,
  onToggleSaveBook
}) {
  const { t } = useLanguage();

  // Featured books (highest popularity)
  const featuredBooks = [...books]
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 4);

  // Audio books
  const audioBooks = books.filter(b => b.has_audio).slice(0, 4);

  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <Hero 
        onNavigate={onNavigate}
        onSearchSubmit={(q) => {
          onNavigate('catalog', { search: q });
        }}
      />

      {/* Quote of the Day */}
      <HikmatBanner />

      {/* Featured Books Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>{t('brand.name')}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t('home.featured_title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('home.featured_desc')}
            </p>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group"
          >
            <span>{t('common.all')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onSelect={onSelectBook}
              onRead={onReadBook}
              onListen={onListenBook}
              isSaved={savedBookIds.includes(book.id)}
              onToggleSave={onToggleSaveBook}
            />
          ))}
        </div>
      </section>

      {/* Scholarly Sections */}
      <SectionsGrid onSelectSection={onSelectSection} />

      {/* Audiobooks Showcase Section */}
      {audioBooks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Headphones className="w-4 h-4" />
                <span>{t('nav.audiobooks')}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {t('home.audio_title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t('home.audio_desc')}
              </p>
            </div>

            <button
              onClick={() => onNavigate('audiobooks')}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition-colors group"
            >
              <span>{t('common.all')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audioBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onSelect={onSelectBook}
                onRead={onReadBook}
                onListen={onListenBook}
                isSaved={savedBookIds.includes(book.id)}
                onToggleSave={onToggleSaveBook}
              />
            ))}
          </div>
        </section>
      )}

      {/* Interactive Quiz CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-emerald-800 to-teal-900 p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              {t('quiz.title')}
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              {t('home.quiz_banner_title')}
            </h3>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
              {t('home.quiz_banner_desc')}
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigate('quiz')}
              className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm tracking-wider uppercase shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>{t('home.quiz_btn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
