import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sections, books } from '../data/db';
import { BookOpen, Star, Scroll, Bookmark, Compass, BookCopy, ArrowRight } from 'lucide-react';

const iconMap = {
  star: Star,
  book: BookOpen,
  scroll: Scroll,
  bookmark: Bookmark,
  compass: Compass,
  library: BookCopy,
};

export default function SectionsGrid({ onSelectSection }) {
  const { getLoc, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {t('home.sections_title')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {t('home.sections_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((sec) => {
          const Icon = iconMap[sec.icon] || BookOpen;
          const sectionBooksCount = books.filter(b => b.section === sec.id).length;
          const title = getLoc(sec.title);
          const lead = getLoc(sec.lead);

          return (
            <div
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-200">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mb-2">
                  {title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
                  {lead}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400">
                <span>{sectionBooksCount} {t('common.books')}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  {t('common.details')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
