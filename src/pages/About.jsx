import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { team } from '../data/db';
import { Icon, Shamsa } from '../components/Icons';

export default function About({ onNavigate, onSelectSection }) {
  const { t, getLoc } = useLanguage();

  return (
    <div className="wrap" style={{ maxWidth: '900px' }}>
      
      {/* Hero Panel */}
      <section className="panel tilt is-in" style={{ position: 'relative', overflow: 'hidden', marginBottom: '30px' }}>
        <div className="panel__pad" style={{ padding: '38px 34px' }}>
          <Shamsa className="seccard__medallion" />
          <div className="u-eyebrow">{t('about.title')}</div>
          <h1 style={{ margin: '10px 0 16px', maxWidth: '22ch', fontFamily: 'var(--serif)' }}>
            {t('about.full_name')}
          </h1>
          <p style={{ maxWidth: '66ch', fontSize: '17.5px', margin: 0, lineHeight: 1.6, color: 'var(--ink-2)' }}>
            {t('about.lead')}
          </p>
        </div>
      </section>

      {/* Meta Grid */}
      <dl className="metagrid" style={{ marginBottom: '34px' }}>
        <div>
          <dt>{t('about.f_founded')}</dt>
          <dd>2020</dd>
        </div>
        <div>
          <dt>{t('about.f_under')}</dt>
          <dd>{t('about.f_under_v')}</dd>
        </div>
        <div>
          <dt>{t('about.f_city')}</dt>
          <dd>{t('about.f_city_v')}</dd>
        </div>
        <div>
          <dt>{t('about.f_site')}</dt>
          <dd>
            <a href="https://moturidiy.uz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-deep)' }}>
              moturidiy.uz
            </a>
          </dd>
        </div>
      </dl>

      {/* Mission */}
      <h2 style={{ marginBottom: '18px', fontFamily: 'var(--serif)' }}>
        {t('about.mission_t')}
      </h2>

      <div className="grid-sections" style={{ marginBottom: '38px' }}>
        {[
          { id: 1, ic: 'star' },
          { id: 2, ic: 'scroll' },
          { id: 3, ic: 'users' },
          { id: 4, ic: 'shield' },
        ].map((item) => (
          <div key={item.id} className="seccard tilt is-in" style={{ cursor: 'default' }}>
            <span className="seccard__icon"><Icon name={item.ic} size={22} /></span>
            <p style={{ color: 'var(--ink)', fontSize: '15px', lineHeight: 1.5 }}>
              {t(`about.mission_${item.id}`)}
            </p>
          </div>
        ))}
      </div>

      {/* Team */}
      {team.length > 0 && (
        <>
          <div className="sechead">
            <div>
              <h2>{t('team.title')}</h2>
              <p className="u-muted u-small" style={{ margin: '4px 0 0' }}>{t('team.sub')}</p>
            </div>
          </div>

          <div className="teamgrid" style={{ marginBottom: '38px' }}>
            {team.map((m) => {
              const name = getLoc(m.name);
              const role = getLoc(m.role);
              const bio = getLoc(m.bio);

              return (
                <article key={m.id} className="tcard reveal is-in">
                  <div className="tcard__photo">
                    {m.photo ? (
                      <img src={`/${m.photo}`} alt={name} loading="lazy" />
                    ) : (
                      <span className="tcard__mono">{name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="tcard__body">
                    <b className="tcard__name">{name}</b>
                    <span className="tcard__role">{role}</span>
                    {bio && <p>{bio}</p>}
                    {m.email && (
                      <a className="tcard__link" href={`mailto:${m.email}`}>
                        <Icon name="mail" size={15} /> {m.email}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      {/* Imam section */}
      <div className="panel" style={{ marginBottom: '30px' }}>
        <div className="panel__pad" style={{ padding: '32px' }}>
          <h2 style={{ marginBottom: '16px', fontFamily: 'var(--serif)' }}>{t('about.imam_t')}</h2>
          <p style={{ maxWidth: '68ch', lineHeight: 1.6, color: 'var(--ink-2)' }}>{t('about.imam_1')}</p>
          <p style={{ maxWidth: '68ch', marginBottom: 0, lineHeight: 1.6, color: 'var(--ink-2)' }}>{t('about.imam_2')}</p>
          <hr className="rule" style={{ margin: '24px 0 18px' }} />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn--primary" 
              onClick={() => onNavigate('catalog')}
            >
              <Icon name="grid" size={17} /> {t('about.cta')}
            </button>
            <button 
              className="btn btn--ghost" 
              onClick={() => onSelectSection('moturidiy')}
            >
              {t('nav.sections')}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
