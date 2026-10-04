import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { team } from '../data/db';
import { Library, Target, Award, Users, BookOpen, Compass, Mail, Phone, MapPin } from 'lucide-react';

export default function About() {
  const { getLoc, t } = useLanguage();

  const directions = [
    {
      title: "Moturidiylik ta’limoti tadqiqoti",
      desc: "Alloma asarlari, uning kalom maktabi va aqidaviy qarashlarini fundamental o‘rganish hamda tarjima qilish.",
      icon: BookOpen
    },
    {
      title: "Qo‘lyozmalar fondini raqamlashtirish",
      desc: "Jahon kutubxonalari va markaz jamg‘armasidagi nodir nusxalarni yuqori sifatda skanerlash va ilmiy tavsiflash.",
      icon: Library
    },
    {
      title: "Xalqaro ilmiy hamkorlik",
      desc: "Islom sivilizatsiyasi markazlari, dunyo universitetlari va sharqshunoslik institutlari bilan ilmiy aloqalar.",
      icon: Compass
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero / Overview */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
          <Library className="w-3.5 h-3.5" />
          <span>{t('about.title')}</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
          {t('brand.full')}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light">
          {t('about.lead')}
        </p>
      </div>

      {/* Mission & Values Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-emerald-500/20">
        <div className="max-w-3xl relative z-10 space-y-4">
          <span className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>{t('about.mission')}</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
            Aql va e’tiqod uyg‘unligini jahon miqyosida yoritish
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
            {t('about.mission_text')}
          </p>
        </div>
      </div>

      {/* Scholarly Directions */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
          Asosiy faoliyat yo‘nalishlari
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {directions.map((d, idx) => {
            const Icon = d.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {d.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership & Scholars */}
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">
          {t('about.team_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => {
            const name = getLoc(member.name);
            const role = getLoc(member.role);
            const bio = getLoc(member.bio);

            return (
              <div key={member.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-800 to-teal-600 text-white font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  {name.charAt(0)}
                </div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-1">
                  {name}
                </h3>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3">
                  {role}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {bio}
                </p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
