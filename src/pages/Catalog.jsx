import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { books, sections } from '../data/db';
import BookCard from '../components/BookCard';
import { Search, Filter, Headphones, ArrowUpDown, SlidersHorizontal, X } from 'lucide-react';

export default function Catalog({ 
  initialSearch = '', 
  initialSection = 'all',
  onlyAudio = false,
  onSelectBook, 
  onReadBook, 
  onListenBook,
  savedBookIds,
  onToggleSaveBook 
}) {
  const { getLoc, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedSection, setSelectedSection] = useState(initialSection);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [audioOnly, setAudioOnly] = useState(onlyAudio);
  const [sortBy, setSortBy] = useState('popularity');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(books.map(b => b.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, []);

  // Filtered & Sorted books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Section filter
        if (selectedSection !== 'all' && book.section !== selectedSection) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && book.category !== selectedCategory) {
          return false;
        }

        // Audio only filter
        if (audioOnly && !book.has_audio) {
          return false;
        }

        // Search term
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const title = (getLoc(book.title) || '').toLowerCase();
          const author = (getLoc(book.author) || '').toLowerCase();
          const desc = (getLoc(book.description) || '').toLowerCase();
          if (!title.includes(q) && !author.includes(q) && !desc.includes(q)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popularity') return (b.popularity || 0) - (a.popularity || 0);
        if (sortBy === 'year') return (b.year || 0) - (a.year || 0);
        if (sortBy === 'title') {
          const titleA = getLoc(a.title) || '';
          const titleB = getLoc(b.title) || '';
          return titleA.localeCompare(titleB);
        }
        return 0;
      });
  }, [selectedSection, selectedCategory, audioOnly, searchTerm, sortBy, getLoc]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Catalog Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
          {audioOnly ? t('nav.audiobooks') : t('catalog.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('catalog.subtitle')}
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
        
        {/* Top search & Sort row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Input */}
          <div className="relative w-full flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('common.search_ph')}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs sm:text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="popularity">{t('catalog.sort_pop')}</option>
              <option value="year">{t('catalog.sort_year')}</option>
              <option value="title">{t('catalog.sort_title')}</option>
            </select>
          </div>

        </div>

        {/* Section Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              selectedSection === 'all'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t('common.all')}
          </button>
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                selectedSection === sec.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {getLoc(sec.title)}
            </button>
          ))}
        </div>

        {/* Categories & Audio Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">{t('catalog.filter_category')}:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat === 'all' ? t('common.all') : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Audio Only Switch */}
          <button
            onClick={() => setAudioOnly(!audioOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
              audioOnly
                ? 'bg-amber-500 border-amber-600 text-white'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>{t('catalog.only_audio')}</span>
          </button>
        </div>

      </div>

      {/* Results Header count */}
      <div className="flex items-center justify-between mb-6 text-xs text-slate-500 dark:text-slate-400">
        <span>
          <strong className="text-slate-900 dark:text-white">{filteredBooks.length}</strong> {t('catalog.found')}
        </span>
        {(selectedSection !== 'all' || selectedCategory !== 'all' || searchTerm || audioOnly) && (
          <button
            onClick={() => {
              setSelectedSection('all');
              setSelectedCategory('all');
              setSearchTerm('');
              setAudioOnly(false);
            }}
            className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
          >
            Filtrlarni tozalash
          </button>
        )}
      </div>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
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
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white mb-1">
            {t('catalog.not_found')}
          </h3>
        </div>
      )}

    </div>
  );
}
