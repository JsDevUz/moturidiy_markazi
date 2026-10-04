import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { books } from '../data/db';
import { Icon, BookCover } from '../components/Icons';

export default function Cabinet({ user, onLogout, onNavigate, onSelectBook }) {
  const { t, getLoc } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileName, setProfileName] = useState(user?.name || 'Ahmad Al-Farg‘oniy');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '+998 90 123 45 67');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Saved books list from localStorage
  const savedIds = (() => {
    try {
      return JSON.parse(localStorage.getItem('moturidiy_saved_books') || '[]');
    } catch {
      return [];
    }
  })();
  const savedBooks = books.filter((b) => savedIds.includes(b.id));

  const handleProfileSave = (e) => {
    e.preventDefault();
    const updated = { ...user, name: profileName, phone: profilePhone };
    localStorage.setItem('moturidiy_user', JSON.stringify(updated));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="wrap">
      <div className="pagehead" style={{ marginBottom: '24px' }}>
        <div className="u-eyebrow">{t('nav.account')}</div>
        <h1 style={{ fontFamily: 'var(--serif)', margin: '6px 0' }}>{t('cab.title')}</h1>
        <p style={{ color: 'var(--ink-2)', margin: 0 }}>
          {profileName} · {user?.email || 'user@example.com'}
        </p>
      </div>

      {savedSuccess && (
        <div className="notice notice--info" style={{ marginBottom: '22px' }}>
          <Icon name="check" size={20} />
          <div>{t('cab.profile_saved')}</div>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs" role="tablist">
        <button 
          role="tab" 
          aria-selected={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          {t('cab.profile')}
        </button>
        <button 
          role="tab" 
          aria-selected={activeTab === 'saved'} 
          onClick={() => setActiveTab('saved')}
        >
          {t('cab.saved')} ({savedBooks.length})
        </button>
        <button 
          role="tab" 
          aria-selected={activeTab === 'stats'} 
          onClick={() => setActiveTab('stats')}
        >
          {t('stats.tab')}
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <section className="tabpanel">
          <div className="panel" style={{ maxWidth: '520px' }}>
            <div className="panel__pad" style={{ padding: '28px' }}>
              <form onSubmit={handleProfileSave}>
                <label className="field">
                  <span className="field__label">{t('cab.name')}</span>
                  <input 
                    type="text" 
                    value={profileName} 
                    onChange={(e) => setProfileName(e.target.value)} 
                    required 
                  />
                </label>
                <label className="field">
                  <span className="field__label">{t('cab.email')}</span>
                  <input 
                    type="email" 
                    value={user?.email || 'user@example.com'} 
                    disabled 
                    style={{ opacity: 0.7 }} 
                  />
                </label>
                <label className="field">
                  <span className="field__label">{t('cab.phone')}</span>
                  <input 
                    type="tel" 
                    value={profilePhone} 
                    onChange={(e) => setProfilePhone(e.target.value)} 
                  />
                </label>
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button className="btn btn--primary" type="submit">
                    {t('cab.save_profile')}
                  </button>
                  <button 
                    className="btn btn--danger" 
                    type="button" 
                    onClick={onLogout}
                  >
                    <Icon name="logout" size={16} /> {t('auth.logout')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Saved Books Tab */}
      {activeTab === 'saved' && (
        <section className="tabpanel">
          {savedBooks.length === 0 ? (
            <div className="panel" style={{ padding: '36px', textAlign: 'center' }}>
              <p style={{ color: 'var(--ink-2)', margin: '0 0 16px' }}>{t('cab.saved_empty')}</p>
              <button className="btn btn--primary" onClick={() => onNavigate('catalog')}>
                {t('nav.catalog')}
              </button>
            </div>
          ) : (
            <div className="grid-books">
              {savedBooks.map((b) => (
                <article 
                  key={b.id} 
                  className="card bookcard"
                  onClick={() => onSelectBook(b)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="bookcard__cover">
                    <BookCover cover={b.cover} />
                  </div>
                  <div className="bookcard__body">
                    <h3 className="bookcard__title">{getLoc(b.title)}</h3>
                    <p className="bookcard__author">{b.author}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <section className="tabpanel">
          <div className="statcards">
            <div className="statcard">
              <span>{t('stats.finished')}</span>
              <b>1</b>
            </div>
            <div className="statcard">
              <span>{t('stats.month')}</span>
              <b>4</b>
            </div>
            <div className="statcard">
              <span>{t('stats.streak')}</span>
              <b>7</b>
            </div>
            <div className="statcard">
              <span>{t('stats.total')}</span>
              <b>128</b>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
