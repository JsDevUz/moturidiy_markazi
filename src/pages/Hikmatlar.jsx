import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { hikmatlar } from '../data/db';
import { Search, Sparkles, Copy, Check, Quote } from 'lucide-react';

export default function Hikmatlar() {
  const { getLoc, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredHikmatlar = useMemo(() => {
    if (!searchTerm.trim()) return hikmatlar;
    const q = searchTerm.toLowerCase();
    return hikmatlar.filter((h) => {
      const text = (getLoc(h.text) || '').toLowerCase();
      const source = (getLoc(h.source) || '').toLowerCase();
      return text.includes(q) || source.includes(q);
    });
  }, [searchTerm, getLoc]);

  const handleCopy = (h) => {
    const quote = `«${getLoc(h.text)}» — ${getLoc(h.source)}`;
    navigator.clipboard.writeText(quote);
    setCopiedId(h.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{t('nav.hikmat')}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          {t('home.eyebrow')} hikmatlari
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Imom Moturidiy va Movarounnahr allomalarining aql, ilm, ma’rifat va odob haqidagi durdona so‘zlari
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Hikmat yoki manba bo‘yicha qidiring..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
      </div>

      {/* Hikmat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHikmatlar.map((h) => {
          const text = getLoc(h.text);
          const source = getLoc(h.source);
          const isCopied = copiedId === h.id;

          return (
            <div
              key={h.id}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-lg hover:border-emerald-500/30 transition-all flex flex-col justify-between"
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-amber-500/20 mb-2" />
                <p className="font-serif text-base sm:text-lg text-slate-800 dark:text-slate-100 font-medium leading-relaxed italic">
                  «{text}»
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  — {source}
                </span>

                <button
                  onClick={() => handleCopy(h)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
                  title="Nusxa olish"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span className="text-[11px]">{isCopied ? t('common.copied') : t('common.share')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
