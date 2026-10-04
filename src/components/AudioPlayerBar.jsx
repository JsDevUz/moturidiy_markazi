import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  X, 
  Headphones,
  Maximize2
} from 'lucide-react';

export default function AudioPlayerBar({ currentBook, onClose, onOpenDetail }) {
  const { getLoc, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(currentBook?.audio_seconds || 180);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    setIsPlaying(true);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policy
        setIsPlaying(false);
      });
    }
  }, [currentBook]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const skipTime = (amount) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + amount));
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    setPlaybackRate(speeds[nextIdx]);
  };

  if (!currentBook) return null;

  const title = getLoc(currentBook.title);
  const author = getLoc(currentBook.author);
  const audioSrc = currentBook.audio_file ? `/${currentBook.audio_file}` : '/audio/namuna.mp3';

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 dark:bg-slate-900/95 border-t border-emerald-900/10 dark:border-emerald-500/20 shadow-2xl glass-nav transition-all duration-200">
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        autoPlay
      />

      {/* Progress Bar scrubber on very top border */}
      <div className="relative w-full h-1.5 bg-slate-200 dark:bg-slate-800 cursor-pointer group">
        <div 
          className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 rounded-r-full transition-all duration-100"
          style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
        />
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Book Info */}
        <div className="flex items-center gap-3 min-w-0 max-w-xs sm:max-w-sm">
          <div className="w-12 h-14 rounded-lg bg-emerald-900 overflow-hidden flex-shrink-0 shadow-sm border border-emerald-500/30">
            {currentBook.cover ? (
              <img src={`/${currentBook.cover}`} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-amber-400 font-serif font-bold text-xs">
                M
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h4 
              onClick={() => onOpenDetail && onOpenDetail(currentBook)}
              className="font-serif font-bold text-sm text-slate-900 dark:text-white truncate cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              {title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {author}
            </p>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t('common.listen')}
            </span>
          </div>
        </div>

        {/* Central Playback Controls */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => skipTime(-10)}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              title="-10 soniya"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={() => skipTime(10)}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              title="+10 soniya"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Right Tools: Speed, Mute, Close */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={cycleSpeed}
            className="px-2 py-1 rounded-md text-xs font-bold font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
            title="Tezlik"
          >
            {playbackRate}x
          </button>

          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }
            }}
            className="hidden sm:block p-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
