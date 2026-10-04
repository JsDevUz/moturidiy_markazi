import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Icon, BookCover } from '../components/Icons';

export default function Listen({ book, onBack }) {
  const { t, getLoc } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState('1');
  const [sleepTimer, setSleepTimer] = useState(0);
  const audioRef = useRef(null);

  const duration = book.audio_seconds || 360;

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1 * parseFloat(speed);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, duration]);

  const formatTime = (secs) => {
    const s = Math.floor(secs);
    const m = Math.floor(s / 60);
    const remS = s % 60;
    return `${m}:${remS < 10 ? '0' : ''}${remS}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setProgress(ratio * duration);
  };

  const skipSeconds = (sec) => {
    setProgress((prev) => Math.max(0, Math.min(duration, prev + sec)));
  };

  return (
    <div className="wrap" style={{ maxWidth: '900px' }}>
      <button 
        className="btn btn--ghost btn--sm" 
        onClick={onBack}
        style={{ marginBottom: '20px' }}
      >
        <Icon name="left" size={16} /> {t('common.back')}
      </button>

      <div className="pagehead">
        <div className="u-eyebrow">{t('audio.title')}</div>
        <h1 style={{ fontFamily: 'var(--serif)', margin: '6px 0' }}>{getLoc(book.title)}</h1>
        <p style={{ color: 'var(--ink-2)', margin: 0 }}>{book.author}</p>
      </div>

      <div className="panel" style={{ marginTop: '24px' }}>
        <div className="panel__pad" style={{ padding: '32px' }}>
          <div className="player">
            <div className="player__cover">
              <BookCover cover={book.cover} />
            </div>

            <div>
              {/* Progress Bar / Scrubber */}
              <div 
                className="player__bar" 
                onClick={handleSeek} 
                role="slider"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                <i style={{ width: `${(progress / duration) * 100}%` }} />
                <b style={{ left: `${(progress / duration) * 100}%` }} />
              </div>

              <div className="player__time">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Controls */}
              <div className="player__controls">
                <button 
                  className="player__skip" 
                  onClick={() => skipSeconds(-15)}
                  title={t('audio.back15')}
                  aria-label={t('audio.back15')}
                >
                  <Icon name="left" size={18} />
                </button>

                <button 
                  className="player__big" 
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? t('audio.pause') : t('audio.play')}
                >
                  <Icon name={isPlaying ? 'pause' : 'play'} size={24} />
                </button>

                <button 
                  className="player__skip" 
                  onClick={() => skipSeconds(15)}
                  title={t('audio.fwd15')}
                  aria-label={t('audio.fwd15')}
                >
                  <Icon name="right" size={18} />
                </button>

                {/* Speed buttons */}
                <div className="speedset" role="group" aria-label={t('audio.speed')}>
                  {['1', '1.25', '1.5', '2'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      aria-pressed={speed === s}
                    >
                      {s}×
                    </button>
                  ))}
                </div>
              </div>

              {/* Sleep timer */}
              <div 
                className="switchrow" 
                style={{
                  fontFamily: 'var(--ui)',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  paddingTop: '18px',
                  marginTop: '16px',
                  borderTop: '1px solid var(--line)'
                }}
              >
                <span>{t('audio.sleep')}</span>
                <select 
                  value={sleepTimer}
                  onChange={(e) => setSleepTimer(Number(e.target.value))}
                  style={{
                    padding: '8px 34px 8px 12px',
                    borderRadius: '8px',
                    fontFamily: 'var(--ui)',
                    fontSize: '13.5px'
                  }}
                >
                  <option value={0}>—</option>
                  <option value={900}>15 min</option>
                  <option value={1800}>30 min</option>
                  <option value={3600}>60 min</option>
                </select>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
