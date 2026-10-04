import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themePref, setThemePref] = useState(() => {
    return localStorage.getItem('site-theme') || 'auto';
  });

  const [activeTheme, setActiveTheme] = useState('light');
  const [isSpun, setIsSpun] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const resolve = (pref) => {
      return pref === 'auto' ? (media.matches ? 'dark' : 'light') : pref;
    };

    const resolved = resolve(themePref);
    setActiveTheme(resolved);
    document.documentElement.dataset.themePref = themePref;
    document.documentElement.dataset.theme = resolved;
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('site-theme', themePref);

    const handleMediaChange = () => {
      if ((localStorage.getItem('site-theme') || 'auto') === 'auto') {
        const newRes = resolve('auto');
        setActiveTheme(newRes);
        document.documentElement.dataset.theme = newRes;
        if (newRes === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    media.addEventListener('change', handleMediaChange);
    return () => media.removeEventListener('change', handleMediaChange);
  }, [themePref]);

  const cycleTheme = () => {
    const order = ['light', 'dark', 'auto'];
    const nextIdx = (order.indexOf(themePref) + 1) % order.length;
    setThemePref(order[nextIdx]);
    
    // trigger spin animation
    setIsSpun(true);
    setTimeout(() => setIsSpun(false), 500);
  };

  return (
    <ThemeContext.Provider value={{ themePref, activeTheme, cycleTheme, isSpun }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
