import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Library, Mail, MapPin, Phone, Globe, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900/60 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900/40">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center p-0.5 shadow-md">
                <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center text-amber-400 font-serif font-bold text-xl">
                  M
                </div>
              </div>
              <div>
                <h3 className="font-serif font-bold text-white text-lg">
                  {t('brand.name')}
                </h3>
                <p className="text-xs text-amber-400/90 font-medium">
                  {t('brand.sub')}
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-300/80 leading-relaxed">
              {t('brand.full')} — Movarounnahr kalom va tafsir merosini dunyoga targ‘ib etuvchi raqamli ilmiy platforma.
            </p>

            <div className="pt-2 text-xs text-amber-400/80 font-serif italic">
              «Aql — ilmning o‘lchovi, naql esa uning chirog‘i»
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm tracking-wider uppercase mb-4 text-amber-400">
              {t('nav.sections')}
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/80">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors">
                  {t('nav.catalog')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sections')} className="hover:text-amber-400 transition-colors">
                  {t('nav.sections')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('audiobooks')} className="hover:text-amber-400 transition-colors">
                  {t('nav.audiobooks')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hikmatlar')} className="hover:text-amber-400 transition-colors">
                  {t('nav.hikmat')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-amber-400 transition-colors">
                  {t('nav.quiz')}
                </button>
              </li>
            </ul>
          </div>

          {/* Useful services */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm tracking-wider uppercase mb-4 text-amber-400">
              {t('nav.about')}
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-200/80">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  {t('about.title')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('consult')} className="hover:text-amber-400 transition-colors">
                  {t('nav.consult')}
                </button>
              </li>
              <li>
                <a href="#faq" onClick={() => onNavigate('consult')} className="hover:text-amber-400 transition-colors">
                  {t('consult.faq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif font-bold text-white text-sm tracking-wider uppercase mb-4 text-amber-400">
              {t('about.contact_info')}
            </h4>
            <ul className="space-y-3 text-xs text-emerald-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Samarqand shahri, Imom Moturidiy yodgorlik majmuasi</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="mailto:info@moturidiy.uz" className="hover:text-amber-400 transition-colors">
                  info@moturidiy.uz
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="tel:+998662330000" className="hover:text-amber-400 transition-colors">
                  +998 (66) 233-00-00
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href="https://moturidiy.uz" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">
                  moturidiy.uz
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <p>© {new Date().getFullYear()} {t('brand.full')}.</p>
          <p className="flex items-center gap-1.5">
            ReactJS & Tailwind CSS bilan tayyorlangan
          </p>
        </div>

      </div>
    </footer>
  );
}
