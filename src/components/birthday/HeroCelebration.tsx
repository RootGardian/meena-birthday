import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../data/birthdayData';

export const HeroCelebration: React.FC = () => {
  const [candleBlown, setCandleBlown] = useState(false);

  const launchConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  };

  useEffect(() => {
    launchConfetti();
  }, []);

  const handleBlowCandle = () => {
    if (!candleBlown) {
      setCandleBlown(true);
      launchConfetti();
    } else {
      setCandleBlown(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-950 via-slate-950 to-slate-900 text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 text-center">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-amber-500/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium tracking-wide">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>{BIRTHDAY_CONFIG.nickname}</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 bg-clip-text text-transparent leading-tight py-2">
          Joyeux Anniversaire <br />
          <span className="text-white drop-shadow-lg">{BIRTHDAY_CONFIG.sisterName}</span> 🎉
        </h1>

        <p className="text-base sm:text-xl text-rose-100/90 font-light max-w-2xl mx-auto leading-relaxed">
          {BIRTHDAY_CONFIG.subHeadline}
        </p>

        {/* Interactive Birthday Cake with Candle to blow */}
        <div className="pt-6 pb-4">
          <div
            onClick={handleBlowCandle}
            className="inline-block p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer group shadow-2xl hover:scale-105 duration-300"
            title="Clique pour souffler la bougie !"
          >
            <div className="relative flex flex-col items-center">
              {/* Flame */}
              <div className="h-8 flex items-center justify-center">
                {!candleBlown ? (
                  <Flame className="w-7 h-7 text-amber-400 fill-amber-400 animate-bounce drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
                ) : (
                  <span className="text-xs text-slate-400 font-mono italic animate-fade-in">
                    💨 Vœu exaucé ! ✨
                  </span>
                )}
              </div>

              {/* Candle */}
              <div className="w-3 h-7 bg-gradient-to-b from-rose-300 to-rose-400 rounded-t-sm shadow-inner" />

              {/* Cake emoji */}
              <div className="text-5xl sm:text-6xl select-none mt-0.5">
                🎂
              </div>

              <p className="text-xs text-rose-200/80 font-medium mt-3 group-hover:text-amber-300 transition-colors">
                {!candleBlown ? '✨ Clique pour souffler la bougie & faire un vœu !' : '🎉 Vœu envoyé dans les étoiles ! (Reclique pour rallumer)'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={launchConfetti}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-rose-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Lancer des confettis 🎉</span>
          </button>

          <a
            href="#lettre"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-sm px-6 py-3 rounded-full border border-white/20 transition-all cursor-pointer"
          >
            <span>Lire ma lettre 💌</span>
          </a>
        </div>
      </div>
    </div>
  );
};
