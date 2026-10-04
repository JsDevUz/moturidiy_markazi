import React from 'react';

const paths = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v18H5.5A1.5 1.5 0 0 1 4 19.5z"/><path d="M8 3v18"/>',
  star: '<path d="M12 2.6 14.4 9l6.4 2.4-6.4 2.4L12 20.2 9.6 13.8 3.2 11.4 9.6 9z"/>',
  scroll: '<path d="M6 3h11a2 2 0 0 1 2 2v13a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6"/><path d="M4 6a2 2 0 0 1 2-2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  shield: '<path d="M12 3 20 6v6c0 4.6-3.3 8-8 9-4.7-1-8-4.4-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  play: '<path d="M7 4.5 19 12 7 19.5z"/>',
  pause: '<path d="M8 4h3v16H8zM13 4h3v16h-3z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  shop: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  bookmark: '<path d="M6 3.5h12v17l-6-4.2-6 4.2z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21c1.2-4 4-6 7.5-6s6.3 2 7.5 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  left: '<path d="m14.5 5-7 7 7 7"/>',
  right: '<path d="m9.5 5 7 7-7 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  note: '<path d="M5 3.5h14v17H5z"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
  marker: '<path d="M4 20h16"/><path d="m6.5 16.5 8-8 3 3-8 8H6.5z"/><path d="m14.5 8.5 2-2 3 3-2 2"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15"/>',
  share: '<circle cx="18" cy="5.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="m8.2 10.8 7.6-4M8.2 13.2l7.6 4"/>',
  sparkle: '<path d="M12 3.5 13.8 9 19 10.8 13.8 12.6 12 18l-1.8-5.4L5 10.8 10.2 9z"/><path d="M18.5 15.5 19.2 18l2.3.8-2.3.8-.7 2.4-.8-2.4-2.2-.8 2.2-.8z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  logout: '<path d="M15 5H6v14h9"/><path d="m13 15 3-3-3-3M16 12H9"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.4 3.4-5.2 6.5-5.2s5.5 1.8 6.5 5.2"/><path d="M16.5 5.2a3.5 3.5 0 0 1 0 5.9M18 14.4c2 .8 3.3 2.5 3.9 5.1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.3l3.4 2"/>',
  tag: '<path d="M3 11.5V4h7.5L21 14.5 14.5 21z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
  download: '<path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 20h16"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4.5h12l-2 4 2 4H5z"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3.2"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2M6.3 6.3 4.8 4.8M19.2 19.2l-1.5-1.5M17.7 6.3l1.5-1.5M4.8 19.2l1.5-1.5"/>',
  moon: '<path d="M20.2 14.2A8.4 8.4 0 0 1 9.8 3.8a8.5 8.5 0 1 0 10.4 10.4z"/>',
  pin: '<path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10.3" r="2.6"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.4 9.3a2.7 2.7 0 0 1 5.2.9c0 1.8-2.6 2.2-2.6 3.8"/><path d="M12 17.2h.01"/>',
  chat: '<path d="M4 5.5h16v11H9.5L5.5 20v-3.5H4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  text: '<path d="M4 6h16M4 10h16M4 14h12M4 18h8"/>',
  pages: '<rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  volume: '<path d="M4 9.5h3.5L12 5.5v13L7.5 14.5H4z"/><path d="M15.5 9.2a4 4 0 0 1 0 5.6"/><path d="M18 6.8a7.5 7.5 0 0 1 0 10.4"/>'
};

export function Icon({ name = 'book', size = 18, className = '' }) {
  const p = paths[name] || paths['book'];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: p }}
    />
  );
}

export function Flag({ code = 'uz', w = 18 }) {
  const h = Math.round(w * 0.66);
  if (code === 'uz') {
    return (
      <svg width={w} height={h} viewBox="0 0 60 40" aria-hidden="true" className="flagicon">
        <rect width="60" height="40" fill="#fff"/>
        <rect width="60" height="12.6" fill="#0099B5"/>
        <rect y="27.4" width="60" height="12.6" fill="#1EB53A"/>
        <rect y="12.6" width="60" height="1.4" fill="#CE1126"/>
        <rect y="26" width="60" height="1.4" fill="#CE1126"/>
        <circle cx="12" cy="6.6" r="4.2" fill="#fff"/>
        <circle cx="13.9" cy="6.6" r="4.2" fill="#0099B5"/>
        <g fill="#fff">
          <circle cx="21" cy="3.4" r="0.85"/><circle cx="24.6" cy="3.4" r="0.85"/>
          <circle cx="28.2" cy="3.4" r="0.85"/><circle cx="21" cy="7" r="0.85"/>
          <circle cx="24.6" cy="7" r="0.85"/><circle cx="28.2" cy="7" r="0.85"/>
          <circle cx="24.6" cy="10.4" r="0.85"/><circle cx="28.2" cy="10.4" r="0.85"/>
        </g>
      </svg>
    );
  } else if (code === 'ru') {
    return (
      <svg width={w} height={h} viewBox="0 0 60 40" aria-hidden="true" className="flagicon">
        <rect width="60" height="40" fill="#fff"/>
        <rect y="13.3" width="60" height="13.4" fill="#0039A6"/>
        <rect y="26.7" width="60" height="13.3" fill="#D52B1E"/>
      </svg>
    );
  } else {
    return (
      <svg width={w} height={h} viewBox="0 0 60 40" aria-hidden="true" className="flagicon">
        <clipPath id="ukclip"><rect width="60" height="40"/></clipPath>
        <g clipPath="url(#ukclip)">
          <rect width="60" height="40" fill="#012169"/>
          <path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8"/>
          <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="13"/>
          <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="8"/>
        </g>
      </svg>
    );
  }
}

export function Shamsa({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
      <circle cx="60" cy="60" r="52"/><circle cx="60" cy="60" r="41"/>
      <path d="M60 8 71 39l31-11-11 31 31 11-31 11 11 31-31-11-11 31-11-31-31 11 11-31L-2 81l31-11L18 39l31 11z" transform="translate(9,9) scale(.85)"/>
      <circle cx="60" cy="60" r="16"/>
    </svg>
  );
}

export function BookCoverSVG({ book, title = '', small = true }) {
  if (book && book.cover) {
    const src = small && book.cover.startsWith('covers/') 
      ? `/${book.cover.replace('covers/', 'covers/thumbs/').replace('.png', '.jpg')}`
      : `/${book.cover}`;
    return (
      <img 
        src={src} 
        alt={title} 
        loading="lazy" 
        decoding="async"
        onError={(e) => {
          // fallback to original file if thumb missing
          if (e.target.src !== `/${book.cover}`) {
            e.target.src = `/${book.cover}`;
          }
        }} 
      />
    );
  }

  // Geometric procedurally generated Islamic Book Cover from _macros.html
  const grounds = ['#0A3C44', '#123A2F', '#1B2E4A', '#3E2A22'];
  const inks    = ['#E3CE96', '#D8C48A', '#DCC98F', '#E0CB94'];
  const glows   = ['#0E5A62', '#1B5744', '#2B4570', '#5C3E31'];
  const p = Math.abs((book?.id || 'book').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % 4;

  const words = (title || 'Kitob').split(' ');
  const lines = [];
  let cur = '';
  words.forEach(w => {
    if ((cur + ' ' + w).trim().length > 16) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = cur ? cur + ' ' + w : w;
    }
  });
  if (cur) lines.push(cur);

  const startY = 243 - (lines.length - 1) * 15;

  return (
    <svg viewBox="0 0 300 430" role="img" aria-label={title} preserveAspectRatio="xMidYMid slice" className="w-full h-full">
      <defs>
        <radialGradient id={`grad-${book?.id || 'def'}`} cx="50%" cy="42%" r="72%">
          <stop offset="0%" stopColor={glows[p]}/>
          <stop offset="100%" stopColor={grounds[p]}/>
        </radialGradient>
      </defs>
      <rect width="300" height="430" fill={`url(#grad-${book?.id || 'def'})`}/>
      <g stroke={inks[p]} fill="none" opacity=".17">
        {[0,1,2,3,4,5].map(r => [0,1,2,3,4].map(c => (
          <g key={`${r}-${c}`} transform={`translate(${18 + c * 66}, ${24 + r * 78})`}>
            <path d="M0-21 6-6 21 0 6 6 0 21-6 6-21 0-6-6z" strokeWidth=".9"/>
          </g>
        )))}
      </g>
      <rect x="13" y="13" width="274" height="404" fill="none" stroke={inks[p]} strokeWidth="1.7" opacity=".9"/>
      <rect x="20" y="20" width="260" height="390" fill="none" stroke={inks[p]} strokeWidth=".7" opacity=".55"/>
      <g transform="translate(150,102)" stroke={inks[p]} fill="none" opacity=".95">
        <circle r="35" strokeWidth="1.1"/>
        <path d="M0-32 8.8-8.8 32 0 8.8 8.8 0 32-8.8 8.8-32 0-8.8-8.8z" strokeWidth="1.3"/>
        <circle r="13" strokeWidth=".9"/>
        <circle r="4" fill={inks[p]} stroke="none"/>
      </g>
      <g fill={inks[p]} textAnchor="middle" fontFamily="Spectral, Georgia, serif" fontSize="22" fontWeight="600">
        {lines.slice(0, 4).map((line, idx) => (
          <text key={idx} x="150" y={startY + idx * 28}>{line}</text>
        ))}
      </g>
      <g transform="translate(150,352)" stroke={inks[p]} fill="none" opacity=".75">
        <path d="M-70 0h48M22 0h48" strokeWidth="1"/>
        <path d="M0-9 3.5-3.5 9 0 3.5 3.5 0 9-3.5 3.5-9 0-3.5-3.5z" strokeWidth="1.1"/>
      </g>
    </svg>
  );
}
