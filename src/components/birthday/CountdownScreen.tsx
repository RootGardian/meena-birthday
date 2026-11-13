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
    // Empêcher tout défilement sur la page de compte à rebours
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

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
    return () => {
      clearInterval(interval);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleButtonClick = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    if (onUnlock) onUnlock();
  };

  return (
    <div className="relative h-screen h-[100dvh] max-h-screen w-full bg-[#171018] text-[#f7eef2] flex flex-col items-center justify-center p-3 sm:p-5 lg:p-6 overflow-hidden select-none font-sans">
      {/* Background radial atmosphere & bokeh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#38202d] via-[#1c121b] to-[#0d090d]" />
      
      {/* Halo lumineux fluide zéro-coût GPU optimisé Safari */}
      <div
        className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)' }}
      />

      {/* Pétales de rose réalistes flottants */}
      <FallingPetals count={22} />

      {/* Main Content Box - S'adapte automatiquement à la hauteur sans jamais déborder */}
      <div className="relative z-10 max-w-2xl sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl w-full text-center flex flex-col items-center justify-center gap-3 sm:gap-5 md:gap-6 lg:gap-7 my-auto animate-in fade-in zoom-in-95 duration-700">
        
        {/* Top Tagline */}
        <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs lg:text-sm tracking-[0.28em] uppercase text-rose-200/80 font-medium">
          <span className="text-rose-300 text-xs">✦</span>
          <span>COMPTE À REBOURS</span>
          <span className="text-rose-300 text-xs">✦</span>
        </div>

        {/* Main Title */}
        <div className="space-y-0.5 sm:space-y-1">
          <h1 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-rose-50 tracking-wide drop-shadow-md leading-tight">
            Her Special Day
          </h1>
          <p className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal italic text-rose-200/90 tracking-normal drop-shadow-sm leading-tight">
            is Coming
          </p>
        </div>

        {/* Subtitle */}
        <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-rose-200/80 font-light tracking-wide flex items-center justify-center gap-1.5">
          <span>Une surprise merveilleuse t'attend</span>
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-rose-400 fill-rose-400 inline" />
        </p>

        {/* 4 Countdown Cards */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-5 lg:gap-7">
          {/* Card: Days */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-22 md:w-28 lg:w-36 xl:w-40 h-18 sm:h-24 md:h-30 lg:h-36 xl:h-42 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md flex items-center justify-center glow-box transition-transform hover:scale-105 duration-300">
              <span className="font-serif-luxury text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-rose-50 glow-text">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase text-rose-200/70 mt-1.5 sm:mt-2">
              JOURS
            </span>
          </div>

          <span className="text-lg sm:text-2xl md:text-3xl lg:text-5xl text-rose-300/60 font-serif -mt-3 sm:-mt-5">:</span>

          {/* Card: Hours */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-22 md:w-28 lg:w-36 xl:w-40 h-18 sm:h-24 md:h-30 lg:h-36 xl:h-42 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md flex items-center justify-center glow-box transition-transform hover:scale-105 duration-300">
              <span className="font-serif-luxury text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-rose-50 glow-text">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase text-rose-200/70 mt-1.5 sm:mt-2">
              HEURES
            </span>
          </div>

          <span className="text-lg sm:text-2xl md:text-3xl lg:text-5xl text-rose-300/60 font-serif -mt-3 sm:-mt-5">:</span>

          {/* Card: Minutes */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-22 md:w-28 lg:w-36 xl:w-40 h-18 sm:h-24 md:h-30 lg:h-36 xl:h-42 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md flex items-center justify-center glow-box transition-transform hover:scale-105 duration-300">
              <span className="font-serif-luxury text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-rose-50 glow-text">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase text-rose-200/70 mt-1.5 sm:mt-2">
              MINUTES
            </span>
          </div>

          <span className="text-lg sm:text-2xl md:text-3xl lg:text-5xl text-rose-300/60 font-serif -mt-3 sm:-mt-5">:</span>

          {/* Card: Seconds */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-22 md:w-28 lg:w-36 xl:w-40 h-18 sm:h-24 md:h-30 lg:h-36 xl:h-42 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md flex items-center justify-center glow-box transition-transform hover:scale-105 duration-300">
              <span className="font-serif-luxury text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-rose-50 glow-text">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase text-rose-200/70 mt-1.5 sm:mt-2">
              SECONDES
            </span>
          </div>
        </div>

        {/* Subtext */}
        <div className="text-[11px] sm:text-xs md:text-sm lg:text-base text-rose-200/80 font-light flex items-center justify-center gap-1.5">
          <span>⏳</span>
          <span>Plus que quelques instants...</span>
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400 fill-rose-400 inline" />
        </div>

        {/* Locked Button */}
        <div className="relative flex flex-col items-center">
          <button
            onClick={handleButtonClick}
            className={`group px-6 sm:px-10 lg:px-12 py-2.5 sm:py-3.5 rounded-full text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold tracking-[0.16em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              timeLeft.isTargetReached
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-xl shadow-rose-500/40 hover:scale-105 glow-btn'
                : 'bg-white/[0.06] hover:bg-rose-500/30 text-rose-100/90 hover:text-white border border-white/20 hover:border-rose-400/70 backdrop-blur-md hover:shadow-lg hover:shadow-rose-500/30 hover:scale-[1.02]'
            }`}
          >
            <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-300 group-hover:text-rose-200 group-hover:scale-110 transition-transform" />
            <span>
              {timeLeft.isTargetReached
                ? 'OUVRIR LA SURPRISE ! 🎁'
                : "PATIENTE JUSQU'AU 14 NOVEMBRE"}
            </span>
            <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-300 group-hover:text-rose-200 group-hover:scale-110 transition-transform" />
          </button>

          {/* Remaining Caption */}
          <p className="text-[10px] sm:text-xs text-rose-200/50 mt-2 sm:mt-2.5 font-mono">
            Rendez-vous le 14 Novembre • {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m restants
          </p>
        </div>

      </div>
    </div>
  );
};
