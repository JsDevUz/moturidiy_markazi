import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { quizzes } from '../data/db';
import confetti from 'canvas-confetti';
import { Icon } from '../components/Icons';

export default function Quiz({ onNavigate }) {
  const { t } = useLanguage();
  
  const allQuizzes = Object.values(quizzes);
  const questions = allQuizzes[0]?.questions || [
    {
      id: "q-1",
      q: "Abu Mansur Moturidiy qaysi shahar yaqinida tug‘ilgan?",
      options: ["Termiz", "Marv", "Samarqand", "Buxoro"],
      correct: 2
    },
    {
      id: "q-2",
      q: "Allomaning nisbasi qaysi joy nomidan olingan?",
      options: ["Motur qishlog‘i", "Moturiya vodiysi", "Moturid mahallasi", "Motrud qal’asi"],
      correct: 2
    },
    {
      id: "q-3",
      q: "Imom Moturidiy taxminan qaysi yilda vafot etgan?",
      options: ["1111-yil", "944-yil", "1037-yil", "870-yil"],
      correct: 1
    },
    {
      id: "q-4",
      q: "“Kitob at-Tavhid” asari qaysi ilm sohasiga oid?",
      options: ["Kalom", "Astronomiya", "Grammatika", "Tibbiyot"],
      correct: 0
    },
    {
      id: "q-5",
      q: "Imom Moturidiyning Qur’on tafsiriga bag‘ishlangan bosh asari qaysi?",
      options: ["Tafsiri Tabariy", "Ta’vilot al-Qur’on", "Al-Kashshof", "Mafotih al-G‘ayb"],
      correct: 1
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userName, setUserName] = useState('');

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const percent = Math.round((score / questions.length) * 100);

  return (
    <div className="wrap">
      <div className="pagehead">
        <div className="u-eyebrow">{t('quiz.title')}</div>
        <h1>{t('quiz.cta')}</h1>
        <p>Imom Moturidiy hayoti va ilmiy merosi bo‘yicha interaktiv sinov</p>
      </div>

      {!isFinished ? (
        <div className="panel" style={{ maxWidth: '680px', margin: '0 auto', padding: '32px' }}>
          
          {/* Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--ink-3)', marginBottom: '12px' }}>
            <span>Savol {currentIdx + 1} / {questions.length}</span>
            <span>Ball: {score}</span>
          </div>

          <div style={{ height: '4px', background: 'var(--line)', borderRadius: '2px', overflow: 'hidden', marginBottom: '28px' }}>
            <div style={{ height: '100%', background: 'var(--brand)', width: `${((currentIdx + 1) / questions.length) * 100}%`, transition: 'width .3s' }} />
          </div>

          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '22px', margin: '0 0 24px', lineHeight: '1.4' }}>
            {currentQ.q}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correct;

              let style = {
                padding: '14px 18px',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--line)',
                background: 'var(--surface)',
                color: 'var(--ink)',
                cursor: isAnswered ? 'default' : 'pointer',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '15px',
                transition: 'all .2s'
              };

              if (isAnswered) {
                if (isCorrect) {
                  style.borderColor = 'var(--brand)';
                  style.background = 'var(--brand-wash)';
                  style.fontWeight = '600';
                } else if (isSelected) {
                  style.borderColor = 'var(--danger)';
                  style.background = 'var(--danger-wash)';
                } else {
                  style.opacity = '0.5';
                }
              }

              return (
                <button
                  key={idx}
                  style={style}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                >
                  <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                  {isAnswered && isCorrect && <Icon name="check" size={18} />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
              <button className="btn btn--brand" onClick={handleNext}>
                {currentIdx < questions.length - 1 ? 'Keyingi savol' : 'Natijani ko‘rish'} <Icon name="right" size={16} />
              </button>
            </div>
          )}

        </div>
      ) : (
        <div className="panel" style={{ maxWidth: '640px', margin: '0 auto', padding: '40px', textAlign: 'center' }}>
          <div style={{ color: 'var(--gold)', marginBottom: '16px' }}>
            <Icon name="star" size={48} />
          </div>

          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', margin: '0 0 10px' }}>
            Sinov yakunlandi!
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: '15px', margin: '0 0 24px' }}>
            Siz barcha savollarga javob berdingiz.
          </p>

          <div style={{ display: 'inline-block', padding: '12px 28px', background: 'var(--brand-wash)', border: '1px solid var(--brand-line)', borderRadius: 'var(--r-md)', color: 'var(--brand-ink)', fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>
            {score} / {questions.length} ({percent}%)
          </div>

          {/* Certificate */}
          <div style={{ border: '2px solid var(--gold-soft)', borderRadius: 'var(--r-md)', padding: '24px', background: 'var(--gold-wash)', marginBottom: '28px', textAlign: 'center' }}>
            <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '11px', color: 'var(--gold-ink)', fontWeight: 'bold' }}>
              IMOM MOTURIDIY XALQARO ILMIY-TADQIQOT MARKAZI
            </div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', margin: '8px 0 12px', color: 'var(--ink)' }}>
              ISHTIROK SERTIFIKATI
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-2)', marginBottom: '16px' }}>
              Moturidiylik ta’limoti bo‘yicha interaktiv test sinovida muvaffaqiyatli qatnashganligi uchun
            </p>
            <input
              type="text"
              placeholder="Ism-familiyangizni kiriting..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ width: '80%', padding: '8px 12px', textAlign: 'center', border: '1px solid var(--gold)', borderRadius: 'var(--r-sm)', background: 'var(--surface)', fontWeight: 'bold', fontSize: '15px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button className="btn btn--ghost" onClick={handleRestart}>
              Qayta topshirish
            </button>
            <button className="btn btn--brand" onClick={() => onNavigate('catalog')}>
              {t('nav.catalog')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
