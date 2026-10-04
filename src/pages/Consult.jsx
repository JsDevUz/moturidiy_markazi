import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { questions } from '../data/db';
import { HelpCircle, Send, CheckCircle2, ChevronDown, ChevronUp, Mail, MessageSquare } from 'lucide-react';

export default function Consult() {
  const { getLoc, t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: '', email: '', topic: '', message: '' });
  };

  // Sample or imported questions for FAQ
  const faqList = [
    {
      q: "Imom Moturidiy markazi kutubxonasidan foydalanish bepulmi?",
      a: "Ha, markaz elektron kutubxonasidagi barcha kitoblar, tarjimalar va audiokitoblar jamoatchilik uchun mutlaqo bepul va ochiq taqdim etiladi."
    },
    {
      q: "Nodir qo‘lyozmalarni yuklab olish imkoniyati bormi?",
      a: "Qo‘lyozmalarning raqamli nusxalari ilmiy-tadqiqot maqsadida sayt orqali o‘rganish uchun ochiq. Yuqori sifatli arxiv nusxalarini olish uchun rasmiy so‘rov yuborishingiz mumkin."
    },
    {
      q: "Savollarga qancha vaqt ichida javob beriladi?",
      a: "Markazimiz mutaxassislari ilmiy asoslangan javoblarni 1–3 ish kuni mobaynida ko‘rsatilgan elektron pochta manzilingizga yuborishadi."
    },
    {
      q: "Sayt orqali allomaning audio tafsirlarini tinglash mumkinmi?",
      a: "Ha, maxsus 'Audiokitoblar' bo‘limida audio fayllar professional suxandonlar va mutaxassislar tomonidan o‘qilgan holatda taqdim etilgan."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>{t('nav.consult')}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          {t('consult.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t('consult.desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                Rahmat!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {t('consult.success')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-600 transition-colors"
              >
                Yangi savol yo‘llash
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('consult.name')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masalan: Abdulloh Umarov"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('consult.email')} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nom@domain.uz"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('consult.topic')}
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  placeholder="Masalan: Ta'vilot al-Qur'on nashrlari bo'yicha"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('consult.message')} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Savolingizni batafsil bayon eting..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>{t('consult.submit')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: FAQ Accordion */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-4">
            {t('consult.faq')}
          </h3>

          <div className="space-y-3">
            {faqList.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-serif font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between gap-3"
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
