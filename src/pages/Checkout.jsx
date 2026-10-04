import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Icon, BookCover } from '../components/Icons';

export default function Checkout({ book, onBack, onComplete }) {
  const { t, getLoc } = useLanguage();
  const [method, setMethod] = useState('Payme');
  const [success, setSuccess] = useState(false);

  const methods = ['Payme', 'Click', 'Uzum Bank', 'Visa / Mastercard'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      if (onComplete) onComplete(book);
    }, 1500);
  };

  const formatMoney = (n) => {
    return n ? n.toLocaleString('uz-UZ') : '0';
  };

  if (!book) return null;

  return (
    <div className="wrap" style={{ maxWidth: '720px' }}>
      <button 
        className="btn btn--ghost btn--sm" 
        onClick={onBack}
        style={{ marginBottom: '20px' }}
      >
        <Icon name="left" size={16} /> {t('common.back')}
      </button>

      <div className="pagehead">
        <div className="u-eyebrow">{t('shop.title')}</div>
        <h1 style={{ fontFamily: 'var(--serif)', margin: '6px 0' }}>{t('shop.checkout')}</h1>
      </div>

      <div className="panel" style={{ marginTop: '24px' }}>
        <div className="panel__pad" style={{ padding: '28px' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'var(--brand-wash)', color: 'var(--brand)', marginBottom: '16px' }}>
                <Icon name="check" size={36} />
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', margin: '0 0 8px' }}>To‘lov muvaffaqiyatli amalga oshirildi!</h2>
              <p style={{ color: 'var(--ink-2)' }}>Kitob shaxsiy kabinetingizga biriktirildi.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                <div style={{ width: '74px', flex: '0 0 74px', borderRadius: '8px', overflow: 'hidden' }}>
                  <BookCover cover={book.cover} />
                </div>
                <div>
                  <div style={{ fontSize: '19px', fontWeight: 600 }}>{getLoc(book.title)}</div>
                  <div className="bookcard__author" style={{ color: 'var(--ink-2)' }}>{book.author}</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div className="u-ui u-small u-muted">{t('shop.total')}</div>
                  <div style={{ fontFamily: 'var(--ui)', fontSize: '23px', fontWeight: 800 }}>
                    {formatMoney(book.price)} <span style={{ fontSize: '14px' }}>{t('common.sum')}</span>
                  </div>
                </div>
              </div>

              <hr className="rule" style={{ margin: '26px 0', border: '0', borderTop: '1px solid var(--line)' }} />

              <form onSubmit={handleSubmit}>
                <div className="field__label" style={{ marginBottom: '12px' }}>{t('shop.method')}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', marginBottom: '24px' }}>
                  {methods.map((m) => (
                    <label 
                      key={m}
                      className="checkline" 
                      style={{ 
                        padding: '13px 15px', 
                        border: `1px solid ${method === m ? 'var(--brand)' : 'var(--line)'}`, 
                        borderRadius: 'var(--r-sm)', 
                        background: method === m ? 'var(--brand-wash)' : 'var(--surface)',
                        cursor: 'pointer' 
                      }}
                    >
                      <input 
                        type="radio" 
                        name="method" 
                        value={m} 
                        checked={method === m}
                        onChange={() => setMethod(m)} 
                      />
                      <span style={{ fontWeight: method === m ? 700 : 500 }}>{m}</span>
                    </label>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button className="btn btn--brand" type="submit">
                    <Icon name="check" size={17} /> {t('shop.pay')} {formatMoney(book.price)} {t('common.sum')}
                  </button>
                  <button className="btn btn--ghost" type="button" onClick={onBack}>
                    {t('common.cancel')}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
