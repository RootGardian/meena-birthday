import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../data/birthdayData';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(BIRTHDAY_CONFIG.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-rose-200 dark:border-rose-950/60 rounded-3xl p-6 shadow-xl text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>Compte à rebours de la fête</span>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
          <div className="bg-rose-50 dark:bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-rose-100 dark:border-slate-700">
            <span className="block text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">
              Jours
            </span>
          </div>

          <div className="bg-rose-50 dark:bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-rose-100 dark:border-slate-700">
            <span className="block text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">
              Heures
            </span>
          </div>

          <div className="bg-rose-50 dark:bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-rose-100 dark:border-slate-700">
            <span className="block text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">
              Minutes
            </span>
          </div>

          <div className="bg-rose-50 dark:bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-rose-100 dark:border-slate-700">
            <span className="block text-2xl sm:text-4xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase font-medium">
              Secondes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
