import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Icon } from '../components/Icons';

export default function Rating({ onNavigate }) {
  const { t } = useLanguage();

  const overall = [
    { rank: 1, name: 'Abdulloh Samarqandiy', score: 384, books: 12 },
    { rank: 2, name: 'Fotima Ziyodova', score: 352, books: 11 },
    { rank: 3, name: 'Sardorbek Qodirov', score: 316, books: 9 },
    { rank: 4, name: 'Dilnoza Olimova', score: 298, books: 8 },
    { rank: 5, name: 'Javohir Mansurov', score: 275, books: 7 },
    { rank: 6, name: 'Malika Karimova', score: 240, books: 6 },
    { rank: 7, name: 'Nodirbek Yusupov', score: 210, books: 5 },
  ];

  const recent = [
    { name: 'Abdulloh Samarqandiy', book: 'Kitob at-Tavhid', score: 40, total: 40, date: '2026-10-04' },
    { name: 'Fotima Ziyodova', book: 'Ta’vilot al-Qur’on', score: 36, total: 40, date: '2026-10-03' },
    { name: 'Sardorbek Qodirov', book: 'Usul al-fiqh asoslari', score: 32, total: 40, date: '2026-10-02' },
    { name: 'Dilnoza Olimova', book: 'Moturidiy aqidasi', score: 38, total: 40, date: '2026-10-01' },
  ];

  return (
    <div className="wrap" style={{ maxWidth: '940px' }}>
      <button 
        className="btn btn--ghost btn--sm" 
        onClick={() => onNavigate('quiz')}
        style={{ marginBottom: '20px' }}
      >
        <Icon name="left" size={16} /> {t('common.back')}
      </button>

      <div className="pagehead">
        <div className="u-eyebrow">{t('quiz.title')}</div>
        <h1 style={{ fontFamily: 'var(--serif)', margin: '6px 0' }}>{t('rating.title')}</h1>
        <p style={{ color: 'var(--ink-2)', margin: 0 }}>{t('rating.sub')}</p>
      </div>

      {/* Podium Top 3 */}
      <div className="podium" style={{ margin: '30px 0 40px' }}>
        {overall.slice(0, 3).map((r) => (
          <div key={r.rank} className={`podium__item podium__item--${r.rank}`}>
            <span className="podium__place">{r.rank}</span>
            <div className="podium__name">{r.name}</div>
            <div className="podium__score">
              {r.score} <span>{t('quiz.points')}</span>
            </div>
            <div className="u-ui u-small u-muted">
              {r.books} {t('quiz.books').toLowerCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Overall Leaderboard Table */}
      <div className="sechead">
        <h2 style={{ fontFamily: 'var(--serif)' }}>{t('quiz.overall')}</h2>
      </div>
      <div className="panel table--scroll" style={{ marginBottom: '34px' }}>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>{t('quiz.reader')}</th>
              <th>{t('quiz.score')}</th>
              <th>{t('quiz.books')}</th>
            </tr>
          </thead>
          <tbody>
            {overall.map((r) => (
              <tr key={r.rank}>
                <td>{r.rank}</td>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td><b>{r.score}</b></td>
                <td className="u-muted">{r.books}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Completions Table */}
      <div className="sechead">
        <h2 style={{ fontFamily: 'var(--serif)' }}>{t('rating.recent')}</h2>
      </div>
      <div className="panel table--scroll">
        <table className="table">
          <thead>
            <tr>
              <th>{t('quiz.reader')}</th>
              <th>{t('admin.title_field')}</th>
              <th>{t('quiz.score')}</th>
              <th>{t('admin.when')}</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td className="u-muted">{r.book}</td>
                <td><b>{r.score}</b> <span className="u-muted">/ {r.total}</span></td>
                <td className="u-muted">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
