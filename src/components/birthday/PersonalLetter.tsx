import React from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../data/birthdayData';

export const PersonalLetter: React.FC = () => {
  return (
    <section id="lettre" className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold uppercase tracking-wider">
          <Feather className="w-3.5 h-3.5" />
          <span>Lettre du Cœur</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white">
          Un mot tout particulier pour toi
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Quelques lignes écrites avec tendresse pour célébrer ton jour.
        </p>
      </div>

      <div className="relative bg-amber-50/60 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 rounded-3xl p-6 sm:p-12 shadow-xl backdrop-blur-xs">
        {/* Decorative stamp in top right */}
        <div className="absolute top-6 right-6 w-14 h-16 border-2 border-dashed border-rose-300 dark:border-rose-700 rounded-xl flex flex-col items-center justify-center p-1 bg-white/70 dark:bg-slate-800/80 shadow-xs">
          <Heart className="w-5 h-5 text-rose-500 fill-current" />
          <span className="text-[9px] font-mono text-rose-600 dark:text-rose-400 font-bold mt-1">
            SPECIAL
          </span>
        </div>

        <div className="space-y-6 max-w-2xl font-serif">
          <h3 className="text-xl sm:text-2xl text-slate-800 dark:text-rose-200 italic font-semibold">
            Chère {BIRTHDAY_CONFIG.sisterName},
          </h3>

          <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans">
            {BIRTHDAY_CONFIG.personalLetter}
          </div>

          <div className="pt-6 border-t border-amber-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-medium italic">Avec tout mon amour et ma tendresse</span>
            </div>
            <span className="text-sm font-serif font-bold text-slate-900 dark:text-white">
              ❤️ Pour toujours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
