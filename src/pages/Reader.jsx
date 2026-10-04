import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getBookContent } from '../data/db';
import { 
  ArrowLeft, 
  Settings2, 
  ChevronLeft, 
  ChevronRight, 
  Type, 
  Sun, 
  Moon, 
  Coffee, 
  Maximize, 
  Minimize, 
  Share2,
  Check
} from 'lucide-react';

export default function Reader({ book, onBack }) {
  const { getLoc, t } = useLanguage();
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [fontSize, setFontSize] = useState(18); // in px
  const [themeMode, setThemeMode] = useState('light'); // 'light' | 'sepia' | 'dark'
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif' | 'sans' | 'arabic'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!book) return null;

  const chapters = getBookContent(book.id);
  const currentChapter = chapters[currentChapterIdx] || chapters[0];
  const title = getLoc(book.title);
  const author = getLoc(book.author);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleShareQuote = (quote) => {
    navigator.clipboard.writeText(`«${quote}» — ${title}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Theme style classes
  const themeClasses = {
    light: 'bg-[#faf9f6] text-slate-800',
    sepia: 'bg-[#f4ecd8] text-[#5b4636]',
    dark: 'bg-[#12161a] text-[#d1d5db]',
  }[themeMode];

  const headerTheme = {
    light: 'bg-[#ffffff]/90 border-slate-200/80 text-slate-800',
    sepia: 'bg-[#ede3cc]/90 border-[#dfd4ba] text-[#5b4636]',
    dark: 'bg-[#1a1f26]/90 border-slate-800 text-slate-200',
  }[themeMode];

  const fontClass = {
    serif: 'font-serif',
    sans: 'font-sans',
    arabic: 'font-serif leading-loose tracking-wide',
  }[fontFamily];

  const progressPercent = Math.round(((currentChapterIdx + 1) / chapters.length) * 100);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeClasses}`}>
      
      {/* Sticky Reader Header Bar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-6 py-3 transition-colors ${headerTheme}`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back & Book Info */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title={t('reader.back_to_book')}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t('reader.back_to_book')}</span>
            </button>

            <div className="min-w-0">
              <h2 className="font-serif font-bold text-sm truncate">
                {title}
              </h2>
              <p className="text-[11px] opacity-75 truncate">
                {author} • {currentChapter.title}
              </p>
            </div>
          </div>

          {/* Reader Controls: Settings Toggle, Fullscreen */}
          <div className="flex items-center gap-2 flex-shrink-0">
            
            {/* Quick Settings Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1 text-xs font-semibold"
                title={t('reader.settings')}
              >
                <Settings2 className="w-4 h-4" />
                <span className="text-xs hidden md:inline">{fontSize}px</span>
              </button>

              {showSettings && (
                <div className={`absolute right-0 mt-2 w-72 p-4 rounded-2xl shadow-2xl border z-50 animate-in fade-in duration-150 ${
                  themeMode === 'dark' 
                    ? 'bg-slate-900 border-slate-700 text-white' 
                    : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  <h4 className="font-serif font-bold text-xs uppercase tracking-wider mb-3 text-emerald-600 dark:text-emerald-400">
                    {t('reader.settings')}
                  </h4>

                  {/* Font Size Adjuster */}
                  <div className="mb-4">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
                      {t('reader.font_size')}
                    </span>
                    <div className="flex items-center justify-between gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl">
                      <button
                        onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                        className="p-1 px-3 rounded-lg bg-white dark:bg-slate-700 text-xs font-bold shadow-xs hover:scale-105"
                      >
                        A-
                      </button>
                      <span className="text-xs font-mono font-bold">{fontSize}px</span>
                      <button
                        onClick={() => setFontSize(Math.min(26, fontSize + 2))}
                        className="p-1 px-3 rounded-lg bg-white dark:bg-slate-700 text-xs font-bold shadow-xs hover:scale-105"
                      >
                        A+
                      </button>
                    </div>
                  </div>

                  {/* Theme Mode Selector */}
                  <div className="mb-4">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
                      {t('reader.theme')}
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setThemeMode('light')}
                        className={`p-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border ${
                          themeMode === 'light' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200'
                        }`}
                      >
                        <Sun className="w-3.5 h-3.5" />
                        <span>{t('reader.light')}</span>
                      </button>
                      <button
                        onClick={() => setThemeMode('sepia')}
                        className={`p-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border bg-[#f4ecd8] text-[#5b4636] ${
                          themeMode === 'sepia' ? 'ring-2 ring-amber-600 font-bold' : 'border-[#dfd4ba]'
                        }`}
                      >
                        <Coffee className="w-3.5 h-3.5" />
                        <span>{t('reader.sepia')}</span>
                      </button>
                      <button
                        onClick={() => setThemeMode('dark')}
                        className={`p-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border bg-[#12161a] text-white ${
                          themeMode === 'dark' ? 'ring-2 ring-emerald-500 font-bold' : 'border-slate-800'
                        }`}
                      >
                        <Moon className="w-3.5 h-3.5" />
                        <span>{t('reader.dark')}</span>
                      </button>
                    </div>
                  </div>

                  {/* Font Family Selector */}
                  <div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
                      {t('reader.font_type')}
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {['serif', 'sans', 'arabic'].map((ff) => (
                        <button
                          key={ff}
                          onClick={() => setFontFamily(ff)}
                          className={`p-1.5 rounded-lg border capitalize font-medium ${
                            fontFamily === ff 
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 font-bold' 
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {ff}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title="To'liq ekran"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Reading Progress Top Line */}
        <div className="h-0.5 bg-black/10 dark:bg-white/10 w-full mt-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Reader Content Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        
        {/* Chapter Title & Header */}
        <div className="text-center mb-10 pb-8 border-b border-black/10 dark:border-white/10">
          <div className="text-xs uppercase tracking-widest font-semibold opacity-70 mb-2">
            {t('reader.chapter_of')} {currentChapterIdx + 1} / {chapters.length}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight mb-4">
            {currentChapter.title}
          </h1>
          {currentChapter.arabic && (
            <div className="font-serif text-xl sm:text-2xl text-emerald-700 dark:text-emerald-400 font-medium tracking-wide my-4 select-none">
              {currentChapter.arabic}
            </div>
          )}
        </div>

        {/* Chapter Text Body */}
        <article 
          className={`space-y-6 leading-relaxed transition-all ${fontClass}`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
        >
          {currentChapter.content.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="text-justify indent-6 sm:indent-8">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Chapter End Ornament */}
        <div className="text-center my-12 text-2xl select-none opacity-40 font-serif">
          ۞ ۞ ۞
        </div>

        {/* Chapter Navigation Bottom Bar */}
        <div className="flex items-center justify-between gap-4 pt-8 border-t border-black/10 dark:border-white/10">
          <button
            onClick={() => {
              if (currentChapterIdx > 0) {
                setCurrentChapterIdx(currentChapterIdx - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            disabled={currentChapterIdx === 0}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentChapterIdx === 0 
                ? 'opacity-30 cursor-not-allowed border-transparent' 
                : 'border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t('reader.prev_chapter')}</span>
          </button>

          <span className="text-xs font-mono opacity-60">
            {progressPercent}% {t('reader.progress')}
          </span>

          <button
            onClick={() => {
              if (currentChapterIdx < chapters.length - 1) {
                setCurrentChapterIdx(currentChapterIdx + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            disabled={currentChapterIdx === chapters.length - 1}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentChapterIdx === chapters.length - 1 
                ? 'opacity-30 cursor-not-allowed border-transparent' 
                : 'border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <span>{t('reader.next_chapter')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </main>

    </div>
  );
}
