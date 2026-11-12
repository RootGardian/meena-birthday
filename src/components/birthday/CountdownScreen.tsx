import React, { useState, useEffect } from 'react';
import { Lock, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FallingPetals } from './FallingPetals';

interface CountdownScreenProps {
  onUnlock?: () => void;
}

export const CountdownScreen: React.FC<CountdownScreenProps> = ({ onUnlock }) => {
  // Cible : 14 Novembre à 00:00:00
  const calculateTargetDate = () => {
    const now = new Date();
    let year = now.getFullYear();
    let target = new Date(year, 10, 14, 0, 0, 0); // Mois 10 = Novembre
    
    if (now.getTime() > target.getTime() + 24 * 60 * 60 * 1000) {
      target = new Date(year + 1, 10, 14, 0, 0, 0);
    }
    return target;
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTargetReached: false
  });

  useEffect(() => {
    const target = calculateTargetDate().getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isTargetReached: true
        });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          isTargetReached: false
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    if (onUnlock) onUnlock();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#171018] text-[#f7eef2] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden select-none font-sans">
      {/* Background radial atmosphere & bokeh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#38202d] via-[#1c121b] to-[#0d090d]" />
      
      {/* Blurred glowing spots */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Pétales de rose réalistes flottants */}
      <FallingPetals count={22} />

      {/* Main Content Box */}
      <div className="relative z-10 max-w-3xl lg:max-w-5xl xl:max-w-6xl w-full text-center space-y-7 sm:space-y-10 lg:space-y-12 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Top Tagline */}
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs lg:text-sm tracking-[0.28em] uppercase text-rose-200/80 font-medium">
          <span className="text-rose-300">✦</span>
          <span>COMPTE À REBOURS</span>
          <span className="text-rose-300">✦</span>
        </div>

        {/* Main Title */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-rose-50 tracking-wide drop-shadow-md">
            Her Special Day
          </h1>
          <p className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic text-rose-200/90 tracking-normal drop-shadow-sm">
            is Coming
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm lg:text-base text-rose-200/80 font-light tracking-wide flex items-center justify-center gap-1.5">
          <span>Une surprise merveilleuse t'attend</span>
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 fill-rose-400 inline" />
        </p>

        {/* 4 Countdown Cards */}
        <div className="pt-2 pb-2 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {/* Card: Days */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-24 md:w-32 lg:w-40 xl:w-44 h-20 sm:h-28 md:h-36 lg:h-44 xl:h-48 rounded-2xl lg:rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md flex items-center justify-center glow-box transition-transform hover:scale-105 duration-300">
              <span className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold text-rose-50 glow-text">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase text-rose-200/70 mt-2.5 sm:mt-3.5">
              JOURS
            </span>
          </div>

          <span className="text-xl sm:text-3xl md:text-4xl lg:text-6xl text-rose-300/60 font-serif -mt-6">:</span>

          {/* Card: Hours */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-24 md:w-32 lg:w-40 xl:w-44 h-20 sm:h-28 md:h-36 lg:h-44 xl:h-48 rounded-2xl lg:rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md flex items-center justify-center glow-box transition-transform hover:scale-105 duration-300">
              <span className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold text-rose-50 glow-text">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase text-rose-200/70 mt-2.5 sm:mt-3.5">
              HEURES
            </span>
          </div>

          <span className="text-xl sm:text-3xl md:text-4xl lg:text-6xl text-rose-300/60 font-serif -mt-6">:</span>

          {/* Card: Minutes */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-24 md:w-32 lg:w-40 xl:w-44 h-20 sm:h-28 md:h-36 lg:h-44 xl:h-48 rounded-2xl lg:rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md flex items-center justify-center glow-box transition-transform hover:scale-105 duration-300">
              <span className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold text-rose-50 glow-text">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase text-rose-200/70 mt-2.5 sm:mt-3.5">
              MINUTES
            </span>
          </div>

          <span className="text-xl sm:text-3xl md:text-4xl lg:text-6xl text-rose-300/60 font-serif -mt-6">:</span>

          {/* Card: Seconds */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-24 md:w-32 lg:w-40 xl:w-44 h-20 sm:h-28 md:h-36 lg:h-44 xl:h-48 rounded-2xl lg:rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md flex items-center justify-center glow-box transition-transform hover:scale-105 duration-300">
              <span className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold text-rose-50 glow-text">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase text-rose-200/70 mt-2.5 sm:mt-3.5">
              SECONDES
            </span>
          </div>
        </div>

        {/* Subtext */}
        <div className="text-xs sm:text-sm lg:text-base text-rose-200/80 font-light flex items-center justify-center gap-1.5 pt-1">
          <span>⏳</span>
          <span>Plus que quelques instants...</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
        </div>

        {/* Locked Button */}
        <div className="pt-2 sm:pt-4 relative flex flex-col items-center">
          <button
            onClick={handleButtonClick}
            className={`group px-8 sm:px-12 lg:px-14 py-3 sm:py-4 rounded-full text-xs sm:text-sm lg:text-base font-semibold tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer ${
              timeLeft.isTargetReached
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xl shadow-rose-500/40 hover:scale-105 glow-btn'
                : 'bg-white/[0.06] hover:bg-rose-500/30 text-rose-100/90 hover:text-white border border-white/20 hover:border-rose-400/70 backdrop-blur-md hover:shadow-lg hover:shadow-rose-500/30 hover:scale-[1.02]'
            }`}
          >
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-300 group-hover:text-rose-200 group-hover:scale-110 transition-transform" />
            <span>
              {timeLeft.isTargetReached
                ? 'OUVRIR LA SURPRISE ! 🎁'
                : "PATIENTE JUSQU'AU 14 NOVEMBRE"}
            </span>
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-300 group-hover:text-rose-200 group-hover:scale-110 transition-transform" />
          </button>

          {/* Remaining Caption */}
          <p className="text-[11px] sm:text-xs lg:text-sm text-rose-200/50 mt-3 sm:mt-4 font-mono">
            Rendez-vous le 14 Novembre • {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m restants
          </p>
        </div>

      </div>
    </div>
  );
};
