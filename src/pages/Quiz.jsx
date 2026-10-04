import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { quizzes } from '../data/db';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, ShieldCheck, Download, Sparkles } from 'lucide-react';

export default function Quiz({ onNavigate }) {
  const { t } = useLanguage();
  
  // Extract questions from quizzes.json
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
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
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

  const percentScore = Math.round((score / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Quiz Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Award className="w-4 h-4 text-amber-500" />
          <span>{t('quiz.title')}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          {t('home.quiz_banner_title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('quiz.desc')}
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              {t('quiz.question')} {currentIdx + 1} {t('quiz.of')} {questions.length}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t('quiz.score')}: {score}
            </span>
          </div>

          {/* Progress bar line */}
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.q}
            </h2>
          </div>

          {/* Options List */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correct;

              let btnClass = "border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20";

              if (isAnswered) {
                if (isCorrect) {
                  btnClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold ring-2 ring-emerald-500/30";
                } else if (isSelected) {
                  btnClass = "border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 font-semibold ring-2 ring-rose-500/30";
                } else {
                  btnClass = "opacity-50 border-slate-200 dark:border-slate-800";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-between gap-4 ${btnClass}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-mono text-xs font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </span>

                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>{currentIdx < questions.length - 1 ? t('reader.next_chapter') : t('quiz.finish')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Result & Certificate View */
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center shadow-xl">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-500 mx-auto flex items-center justify-center mb-6 shadow-inner">
              <Award className="w-10 h-10" />
            </div>

            <h2 className="font-serif text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              {t('quiz.congrats')}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              {t('quiz.result_msg')}
            </p>

            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 font-serif font-bold text-2xl mb-8">
              <span>{score} / {questions.length}</span>
              <span className="text-sm font-sans font-medium text-emerald-700 dark:text-emerald-400">({percentScore}%)</span>
            </div>

            {/* Personalized Certificate Preview */}
            <div className="max-w-xl mx-auto rounded-3xl border-4 border-amber-500/40 p-6 sm:p-8 bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/40 dark:from-slate-900 dark:to-emerald-950/40 shadow-inner relative overflow-hidden my-6">
              <div className="absolute top-2 right-2 text-amber-500/20 text-7xl font-serif select-none pointer-events-none">
                ۞
              </div>

              <div className="text-xs uppercase tracking-widest font-bold text-amber-600 mb-2">
                IMOM MOTURIDIY XALQARO ILMIY-TADQIQOT MARKAZI
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-emerald-950 dark:text-white mb-3">
                ISHTIROK SERTIFIKATI
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Mazkur sertifikat egasi Imom Moturidiy hayoti va ilmiy merosi bo‘yicha o‘tkazilgan interaktiv sinovda muvaffaqiyatli ishtirok etdi.
              </p>

              <div className="my-4">
                <input
                  type="text"
                  placeholder="Ism va familiyangizni kiriting..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full text-center px-4 py-2 rounded-xl border border-amber-400/40 bg-white/90 dark:bg-slate-800 text-sm font-serif font-bold text-emerald-900 dark:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-amber-300/40 text-[11px] text-slate-500 font-mono">
                <span>Natija: {percentScore}%</span>
                <span>Sana: {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Restart & Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('quiz.restart')}</span>
              </button>

              <button
                onClick={() => onNavigate('catalog')}
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                {t('common.explore')}
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
