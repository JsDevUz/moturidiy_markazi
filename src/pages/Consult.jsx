import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Icon, Shamsa } from '../components/Icons';

export default function Consult() {
  const { t, getLoc } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', topic: 'aqida', text: '' });
  const [sent, setSent] = useState(false);

  const topics = ['aqida', 'manba', 'qolyozma', 'talim', 'kutubxona', 'boshqa'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.text) return;
    setSent(true);
    setForm({ name: '', email: '', topic: 'aqida', text: '' });
  };

  const sampleQuestions = [
    {
      id: 1,
      topic: 'aqida',
      status: 'answered',
      date: '2026-03-28',
      q: {
        uz: 'Moturidiylik va Ash’ariylik o‘rtasidagi asosiy farqlar nimada?',
        ru: 'В чем основные различия между матуридитской и ашаритской школами калама?',
        en: 'What are the main differences between Maturidiyya and Ash‘ariyya schools?'
      },
      a: {
        uz: 'Moturidiylik maktabida aqlni bilish manbai sifatida e’tirof etish darajasi yuqoriroq bo‘lib, fe’liy sifatlarning azaliyligi va husn-qubh masalalarida o‘ziga xos qarashlar mavjud.',
        ru: 'В матуридизме степень признания разума как источника познания выше; также есть особенности в вопросах извечности деятельных качеств и концепции добра и зла (хусн ва кубх).',
        en: 'In the Maturidi school, the epistemological role of reason is emphasized, along with distinct views on the eternity of active attributes and moral reasoning (husn and qubh).'
      }
    },
    {
      id: 2,
      topic: 'manba',
      status: 'answered',
      date: '2026-03-15',
      q: {
        uz: 'Ta’vilot al-Qur’on asarining to‘liq nashri mavjudmi?',
        ru: 'Существует ли полное издание труда «Та’вилат аль-Куран»?',
        en: 'Is there a complete edition of "Ta’wilat al-Qur’an" available?'
      },
      a: {
        uz: 'Ha, markazimiz tomonidan asarning ilmiy-tanqidiy nashri va o‘zbek tiliga akademik tarjimasi bosqichma-bosqich amalga oshirilmoqda.',
        ru: 'Да, нашим центром осуществляется критическое научное издание и поэтапный академический перевод труда.',
        en: 'Yes, our center is publishing a critical scientific edition along with an academic translation.'
      }
    }
  ];

  return (
    <div className="wrap" style={{ maxWidth: '1000px' }}>
      
      {/* Hero Panel */}
      <section className="panel tilt is-in" style={{ position: 'relative', overflow: 'hidden', marginBottom: '28px' }}>
        <div className="panel__pad" style={{ padding: '36px 32px' }}>
          <Shamsa className="seccard__medallion" />
          <div className="u-eyebrow">{t('brand.name')}</div>
          <h1 style={{ margin: '10px 0 14px', maxWidth: '20ch', fontFamily: 'var(--serif)' }}>
            {t('consult.title')}
          </h1>
          <p style={{ maxWidth: '64ch', fontSize: '17.5px', margin: 0, lineHeight: 1.6, color: 'var(--ink-2)' }}>
            {t('consult.sub')}
          </p>
        </div>
      </section>

      {sent && (
        <div className="notice notice--info" style={{ marginBottom: '26px' }}>
          <Icon name="check" size={20} />
          <div>{t('consult.sent')}</div>
        </div>
      )}

      {/* Steps */}
      <ol className="steps">
        {[1, 2, 3].map((n) => (
          <li key={n}>
            <span>{n}</span>
            <p>{t(`consult.how_${n}`)}</p>
          </li>
        ))}
      </ol>

      {/* Consult Form & Side List */}
      <div className="consult">
        <div className="panel">
          <div className="panel__pad" style={{ padding: '28px' }}>
            <h2 style={{ fontSize: '23px', marginBottom: '6px', fontFamily: 'var(--serif)' }}>
              {t('consult.form_t')}
            </h2>
            <p className="u-ui u-small u-muted" style={{ marginBottom: '20px' }}>
              {t('consult.how_3')}
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="consult__row">
                <label className="field">
                  <span className="field__label">{t('consult.name')}</span>
                  <input 
                    type="text" 
                    value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  />
                </label>
                <label className="field">
                  <span className="field__label">{t('cab.email')} *</span>
                  <input 
                    type="email" 
                    required 
                    value={form.email} 
                    onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  />
                </label>
              </div>

              <div className="field__label" style={{ marginTop: '16px', marginBottom: '8px' }}>
                {t('consult.topic')}
              </div>
              <div className="topicset">
                {topics.map((code) => (
                  <label key={code}>
                    <input 
                      type="radio" 
                      name="topic" 
                      value={code} 
                      checked={form.topic === code}
                      onChange={() => setForm({ ...form, topic: code })}
                    />
                    <span>{t(`topic.${code}`)}</span>
                  </label>
                ))}
              </div>

              <label className="field" style={{ marginTop: '20px' }}>
                <span className="field__label">{t('consult.text')} *</span>
                <textarea 
                  rows={6} 
                  required 
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  placeholder={t('consult.text_ph')}
                />
              </label>

              <button className="btn btn--primary" type="submit" style={{ marginTop: '16px' }}>
                <Icon name="mail" size={17} /> {t('consult.send')}
              </button>
            </form>
          </div>
        </div>

        {/* Previous questions / FAQ */}
        <aside>
          <div className="panel">
            <div className="panel__pad" style={{ padding: '24px' }}>
              <h3 style={{ marginBottom: '14px', fontFamily: 'var(--serif)' }}>
                {t('consult.mine')}
              </h3>
              <div className="qlist">
                {sampleQuestions.map((q) => (
                  <article key={q.id} className="qitem" style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--line)' }}>
                    <div className="qitem__head" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className="chip chip--free">
                        {t('consult.status_answered')}
                      </span>
                      <span className="u-ui u-small u-muted">{q.date}</span>
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', margin: '4px 0', color: 'var(--ink)' }}>
                      {getLoc(q.q)}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--ink-2)', margin: '4px 0 0', lineHeight: 1.5 }}>
                      {getLoc(q.a)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
}
