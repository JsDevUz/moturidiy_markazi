import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Icon } from './Icons';

export default function Footer({ onNavigate }) {
  const { t } = useLanguage();

  const socialLinks = [
    { id: 'telegram', name: 'Telegram', url: 'https://t.me/moturidiymarkazi' },
    { id: 'instagram', name: 'Instagram', url: 'https://instagram.com/moturidiymarkazi' },
    { id: 'youtube', name: 'YouTube', url: 'https://youtube.com/@moturidiymarkazi' },
    { id: 'facebook', name: 'Facebook', url: 'https://facebook.com/moturidiymarkazi' },
  ];

  return (
    <footer className="footer">
      <div className="footer__in">
        
        {/* Brand */}
        <div className="footer__brand">
          <img src="/img/logo-256.png" alt="" />
          <div>
            <b>{t('brand.full')}</b>
            <p>{t('footer.about')}</p>
          </div>
        </div>

        {/* Side Nav & Address */}
        <div className="footer__side">
          <nav className="footer__nav" aria-label={t('nav.menu')}>
            <a href="#catalog" onClick={(e) => { e.preventDefault(); onNavigate('catalog'); }}>
              {t('nav.catalog')}
            </a>
            <a href="#shop" onClick={(e) => { e.preventDefault(); onNavigate('catalog', { access: 'paid' }); }}>
              {t('nav.shop')}
            </a>
            <a href="#quiz" onClick={(e) => { e.preventDefault(); onNavigate('quiz'); }}>
              {t('quiz.title')}
            </a>
            <a href="#consult" onClick={(e) => { e.preventDefault(); onNavigate('consult'); }}>
              {t('nav.consult')}
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>
              {t('about.title')}
            </a>
          </nav>

          <a 
            className="footer__addr" 
            href="https://yandex.com/maps/?text=Samarqand+Moturidiy" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Icon name="pin" size={17} />
            <span>Samarqand shahri, Moturid ko‘chasi, Imom Moturidiy yodgorlik majmuasi</span>
          </a>

          <div className="socials">
            {socialLinks.map((s) => (
              <a
                key={s.id}
                className={`soc soc--${s.id}`}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                aria-label={s.name}
              >
                <span className="text-xs font-bold uppercase">{s.id[0]}</span>
              </a>
            ))}
          </div>
        </div>

      </div>

      <div className="footer__base">
        © {new Date().getFullYear()} {t('brand.full')}. {t('footer.rights')}.
      </div>
    </footer>
  );
}
