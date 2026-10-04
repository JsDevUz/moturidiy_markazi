import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { hikmatlar } from '../data/db';
import { Sparkles, RefreshCw, Quote, Copy, Check } from 'lucide-react';

export default function HikmatBanner() {
  const { getLoc, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentHikmat = hikmatlar[currentIndex] || hikmatlar[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % hikmatlar.length);
  };

  const handleCopy = () => {
    const text = `«${getLoc(currentHikmat.text)}» — ${getLoc(currentHikmat.source)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 my-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-6 sm:p-10 text-white shadow-xl border border-emerald-500/20">
        
        {/* Decorative background watermark */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none font-serif text-[180px] leading-none select-none text-amber-300">
          ۞
        </div>

        <div className="relative z-10">
          
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-bold text-amber-300 tracking-wider uppercase">
                {t('home.hikmat_title')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                title="Nusxa olish"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? t('common.copied') : t('common.share')}</span>
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-amber-300 hover:text-amber-200 transition-colors text-xs flex items-center gap-1.5"
                title="Boshqa hikmat"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('home.next_hikmat')}</span>
              </button>
            </div>
          </div>

          <div className="my-4">
            <p className="font-serif text-lg sm:text-2xl font-medium text-white leading-relaxed italic">
              «{getLoc(currentHikmat.text)}»
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-emerald-800/60 text-xs text-amber-400/90 font-medium">
            <span>— {getLoc(currentHikmat.source)}</span>
            <span className="font-mono text-emerald-400/60">
              {currentIndex + 1} / {hikmatlar.length}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
