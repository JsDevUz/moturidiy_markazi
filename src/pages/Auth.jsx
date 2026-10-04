import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Icon, Flag } from '../components/Icons';

export default function Auth({ onNavigate, onLoginSuccess }) {
  const { lang, setLang, t } = useLanguage();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [showPw, setShowPw] = useState(false);
  const [showRegPw, setShowRegPw] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: ''
  });
  const [pwScore, setPwScore] = useState(0);
  const [error, setError] = useState('');

  const langs = [
    { code: 'uz', short: 'UZ', label: 'O‘zbekcha' },
    { code: 'ru', short: 'RU', label: 'Русский' },
    { code: 'en', short: 'EN', label: 'English' },
  ];

  const calcPwStrength = (v) => {
    let score = 0;
    if (v.length >= 8) score++;
    if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++;
    if (/\d/.test(v)) score++;
    if (/[^\w\s]/.test(v) || v.length >= 14) score++;
    return score;
  };

  const handleRegPwChange = (e) => {
    const val = e.target.value;
    setRegForm({ ...regForm, password: val });
    setPwScore(calcPwStrength(val));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPw) {
      setError(t('auth.need_login'));
      return;
    }
    const user = {
      name: loginEmail.split('@')[0],
      email: loginEmail,
      isLoggedIn: true
    };
    localStorage.setItem('moturidiy_user', JSON.stringify(user));
    if (onLoginSuccess) onLoginSuccess(user);
    onNavigate('home');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.email || !regForm.password) {
      setError('Barcha maydonlarni to‘ldiring');
      return;
    }
    const user = {
      name: `${regForm.firstName} ${regForm.lastName}`.trim() || regForm.email.split('@')[0],
      email: regForm.email,
      phone: regForm.phone,
      isLoggedIn: true
    };
    localStorage.setItem('moturidiy_user', JSON.stringify(user));
    if (onLoginSuccess) onLoginSuccess(user);
    onNavigate('home');
  };

  return (
    <div className="authpage">
      <header className="authtop">
        <a 
          className="authtop__brand" 
          href="#home"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
        >
          <img src="/img/logo-256.png" alt="" />
          <span className="authtop__name">
            {t('brand.name')}
            <span>{t('brand.sub')}</span>
          </span>
        </a>
        <div className="authtop__spacer" />
        <nav className="langswitch" aria-label={t('nav.lang')}>
          {langs.map((l) => (
            <a
              key={l.code}
              href={`#lang-${l.code}`}
              onClick={(e) => { e.preventDefault(); setLang(l.code); }}
              title={l.label}
              aria-current={l.code === lang ? 'true' : undefined}
            >
              <Flag code={l.code} w={18} />
              {l.short}
            </a>
          ))}
        </nav>
        <a 
          className="authtop__home" 
          href="#home"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
        >
          <Icon name="left" size={15} /> {t('auth.back_home')}
        </a>
      </header>

      <main className="authmain">
        <div style={{ width: 'min(980px, 100%)' }}>
          <div className="authhead">
            <div className="u-eyebrow">{t('brand.sub')}</div>
            <h1>{t('about.full_name')}</h1>
          </div>

          <div className="auth" id="auth" data-mode={mode}>
            {/* SIGN IN PANE */}
            <section 
              className="pane pane--signin" 
              id="paneSignin"
              style={{ pointerEvents: mode === 'signup' ? 'none' : 'auto' }}
            >
              <h2>{t('auth.login')}</h2>
              <div className="pane__rule" />

              {error && mode === 'signin' && (
                <div className="f-error">
                  <Icon name="close" size={17} />
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} noValidate>
                <div className="f-field">
                  <label htmlFor="li-email">{t('cab.email')}</label>
                  <input 
                    type="email" 
                    id="li-email" 
                    required 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <span className="f-field__icon" aria-hidden="true">
                    <Icon name="user" size={17} />
                  </span>
                </div>

                <div className="f-field">
                  <label htmlFor="li-pw">{t('auth.password')}</label>
                  <input 
                    type={showPw ? 'text' : 'password'} 
                    id="li-pw" 
                    required 
                    value={loginPw}
                    onChange={(e) => setLoginPw(e.target.value)}
                    autoComplete="current-password"
                  />
                  <button 
                    type="button" 
                    className="f-field__icon" 
                    onClick={() => setShowPw(!showPw)}
                    aria-label={t('auth.show_pw')}
                    style={{ color: showPw ? 'var(--brand)' : '' }}
                  >
                    <Icon name="eye" size={17} />
                  </button>
                </div>

                <div className="f-row">
                  <label>
                    <input type="checkbox" defaultChecked /> {t('auth.keep')}
                  </label>
                  <a 
                    className="f-link" 
                    href="#forgot"
                    onClick={(e) => { e.preventDefault(); alert(t('auth.forgot')); }}
                  >
                    {t('auth.forgot')}
                  </a>
                </div>

                <button className="f-submit" type="submit">
                  {t('auth.login')}
                </button>
              </form>

              <p className="f-switch">
                {t('auth.to_register')}{' '}
                <button type="button" onClick={() => { setMode('signup'); setError(''); }}>
                  {t('auth.register')}
                </button>
              </p>
              <p className="f-note">{t('auth.privacy')}</p>
            </section>

            {/* SIGN UP PANE */}
            <section 
              className="pane pane--signup" 
              id="paneSignup"
              style={{ pointerEvents: mode === 'signin' ? 'none' : 'auto' }}
            >
              <h2>{t('auth.register')}</h2>
              <div className="pane__rule" />

              {error && mode === 'signup' && (
                <div className="f-error">
                  <Icon name="close" size={17} />
                  <div>{error}</div>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} noValidate>
                <div className="f-pair">
                  <div className="f-field">
                    <label htmlFor="su-first">{t('auth.first_name')}</label>
                    <input 
                      type="text" 
                      id="su-first" 
                      required
                      value={regForm.firstName}
                      onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                      autoComplete="given-name"
                    />
                    <span className="f-field__icon" aria-hidden="true">
                      <Icon name="user" size={17} />
                    </span>
                  </div>
                  <div className="f-field">
                    <label htmlFor="su-last">{t('auth.last_name')}</label>
                    <input 
                      type="text" 
                      id="su-last" 
                      required
                      value={regForm.lastName}
                      onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div className="f-field">
                  <label htmlFor="su-phone">{t('auth.phone')}</label>
                  <input 
                    type="tel" 
                    id="su-phone" 
                    placeholder="+998 90 123 45 67"
                    required
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    autoComplete="tel"
                  />
                </div>

                <div className="f-field">
                  <label htmlFor="su-email">{t('cab.email')}</label>
                  <input 
                    type="email" 
                    id="su-email" 
                    required
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    autoComplete="email"
                  />
                  <span className="f-field__icon" aria-hidden="true">
                    <Icon name="mail" size={17} />
                  </span>
                </div>

                <div className="f-field">
                  <label htmlFor="su-pw">{t('auth.password')}</label>
                  <input 
                    type={showRegPw ? 'text' : 'password'} 
                    id="su-pw" 
                    required
                    value={regForm.password}
                    onChange={handleRegPwChange}
                    autoComplete="new-password"
                  />
                  <button 
                    type="button" 
                    className="f-field__icon" 
                    onClick={() => setShowRegPw(!showRegPw)}
                    aria-label={t('auth.show_pw')}
                    style={{ color: showRegPw ? 'var(--brand)' : '' }}
                  >
                    <Icon name="eye" size={17} />
                  </button>
                  <div className="f-hint">
                    <span className="f-meter" id="pwMeter">
                      <i className={pwScore >= 1 ? 'is-on' : ''} />
                      <i className={pwScore >= 2 ? 'is-on' : ''} />
                      <i className={pwScore >= 3 ? 'is-on' : ''} />
                      <i className={pwScore >= 4 ? 'is-on' : ''} />
                    </span>
                    <span>{t('auth.pw_hint')}</span>
                  </div>
                </div>

                <button className="f-submit" type="submit">
                  {t('auth.register')}
                </button>
              </form>

              <p className="f-switch">
                {t('auth.to_login')}{' '}
                <button type="button" onClick={() => { setMode('signin'); setError(''); }}>
                  {t('auth.login')}
                </button>
              </p>
            </section>

            {/* 1:1 SLIDING BAND (TIG') */}
            <div className="auth__band" aria-hidden="true">
              <span className="band__edge band__edge--lead" />
              <span className="band__edge band__edge--tail" />

              <div className="band__inner">
                <svg className="band__pattern" viewBox="0 0 900 520" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="authGirih" width="72" height="72" patternUnits="userSpaceOnUse">
                      <g fill="none" stroke="#2FA9B0" strokeWidth=".9" opacity=".3">
                        <path d="M36 6 44 28 66 36 44 44 36 66 28 44 6 36 28 28z"/>
                        <circle cx="36" cy="36" r="15"/>
                      </g>
                    </pattern>
                  </defs>
                  <rect width="900" height="520" fill="url(#authGirih)"/>
                </svg>

                <div className="band__page band__page--welcome">
                  <div className="u-eyebrow">{t('brand.name')}</div>
                  <h3>{t('auth.welcome_title')} <em>{t('auth.welcome_em')}</em></h3>
                  <p>{t('auth.welcome_sub')}</p>
                </div>

                <div className="band__page band__page--start">
                  <div className="u-eyebrow">{t('brand.name')}</div>
                  <h3>{t('auth.start_title')} <em>{t('auth.start_em')}</em></h3>
                  <p>{t('auth.start_sub')}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="authfoot">© {new Date().getFullYear()} {t('about.full_name')}</p>
        </div>
      </main>
    </div>
  );
}
