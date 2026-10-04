import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, BookOpen, Award, Sparkles, BookCopy, FileText, Headphones, Users } from 'lucide-react';

export default function Hero({ onSearchSubmit, onNavigate }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(query);
    }
  };

  const stats = [
    { label: t('home.stats_books'), value: '45+', icon: BookCopy },
    { label: t('home.stats_manuscripts'), value: '120+', icon: FileText },
    { label: t('home.stats_audio'), value: '18+', icon: Headphones },
    { label: t('home.stats_readers'), value: '15,000+', icon: Users },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-900 text-white pt-16 pb-20 border-b border-emerald-800/40">
      
      {/* Decorative Islamic Background Pattern & Glows */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-islamic-pattern" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-amber-300 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t('home.eyebrow')}</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-sm">
          {t('home.title')}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-100/80 mb-10 leading-relaxed font-light">
          {t('home.desc')}
        </p>

        {/* Global Search Bar */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-white/95 dark:bg-slate-900/95 border border-emerald-400/30 p-1.5 focus-within:ring-2 focus-within:ring-amber-400 transition-all">
            <Search className="w-5 h-5 text-emerald-700 dark:text-emerald-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('common.search_ph')}
              className="w-full px-3 py-3 text-slate-800 dark:text-white placeholder-slate-400 text-sm bg-transparent outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-medium text-sm transition-all shadow-md flex items-center gap-1.5"
            >
              <span>{t('common.search')}</span>
            </button>
          </div>
        </form>

        {/* CTA quick links */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          <button
            onClick={() => onNavigate('catalog')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('common.explore')}</span>
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="px-5 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-400/40 text-emerald-100 font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 backdrop-blur-md"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>{t('home.quiz_btn')}</span>
          </button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-emerald-800/40">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-700/20 backdrop-blur-xs flex flex-col items-center">
                <Icon className="w-5 h-5 text-amber-400 mb-1.5" />
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs text-emerald-200/70 font-medium text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
