import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { hikmatlar } from '../data/db';
import { Icon } from '../components/Icons';

export default function Hikmatlar() {
  const { t, getLoc } = useLanguage();

  const handleCopy = (h) => {
    const text = `«${getLoc(h.text)}» — ${getLoc(h.source)}`;
    navigator.clipboard.writeText(text);
    const toastEl = document.getElementById('toast');
    if (toastEl) {
      toastEl.textContent = t('common.copied');
      toastEl.classList.add('is-on');
      setTimeout(() => toastEl.classList.remove('is-on'), 2000);
    }
  };

  return (
    <div className="wrap">
      <div className="pagehead">
        <div className="u-eyebrow">{t('home.eyebrow')}</div>
        <h1>{t('nav.hikmat')}</h1>
        <p>Imom Moturidiy va Movarounnahr allomalarining durdona so‘zlari</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {hikmatlar.map((h) => (
          <div key={h.id} className="panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontStyle: 'italic', margin: '0 0 16px', lineHeight: '1.6' }}>
              «{getLoc(h.text)}»
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--line)', fontSize: '13px' }}>
              <span style={{ color: 'var(--gold-ink)', fontWeight: '600' }}>
                — {getLoc(h.source)}
              </span>
              <button 
                className="btn btn--ghost btn--sm" 
                onClick={() => handleCopy(h)}
                style={{ padding: '4px 8px' }}
                title={t('common.share')}
              >
                <Icon name="copy" size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
