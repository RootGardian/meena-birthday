import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowLeft, PartyPopper } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../data/birthdayData';
import { MemoryGallery } from './MemoryGallery';
import { ReasonsFlipCards } from './ReasonsFlipCards';
import { Guestbook } from './Guestbook';

interface CelebrationViewProps {
  onBackToCountdown: () => void;
}

export const CelebrationView: React.FC<CelebrationViewProps> = ({ onBackToCountdown }) => {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 1 }
      });
    }, 250);
  };

  const handleBlowCandle = () => {
    setCandleBlown(true);
    confetti({ particleCount: 50, spread: 60 });
  };

  // Pétales flottants en arrière-plan
  const petals = Array.from({ length: 16 }).map((_, i) => ({
    id: i,
    left: `${(i * 6.5) % 100}%`,
    duration: `${6 + (i % 5) * 2}s`,
    delay: `${(i % 6) * 1.2}s`,
    size: `${12 + (i % 4) * 5}px`
  }));

  return (
    <div className="relative min-h-screen w-full bg-[#171018] text-[#f7eef2] flex flex-col items-center justify-start p-4 sm:p-8 overflow-x-hidden select-none font-sans">
      {/* Background radial ambiance */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#38202d] via-[#1c121b] to-[#0d090d] pointer-events-none" />
      
      {/* Blurred glowing spots */}
      <div className="fixed top-1/4 left-1/3 w-80 h-80 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Petals */}
      {petals.map((p) => (
        <span
          key={p.id}
          className="animate-petal text-rose-300/40 text-base select-none fixed"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            fontSize: p.size,
            top: '-5%'
          }}
        >
          🌸
        </span>
      ))}

      {/* Top Navigation: Return to Countdown */}
      <div className="fixed top-6 left-6 z-40">
        <button
          onClick={onBackToCountdown}
          className="inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] text-rose-200/80 hover:text-white text-xs font-medium px-4 py-2 rounded-full border border-white/10 backdrop-blur-md transition-all cursor-pointer shadow-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au compte à rebours</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-12 pt-16 pb-20 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Top Tagline */}
        <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs tracking-[0.28em] uppercase text-rose-200/80 font-medium">
          <span className="text-rose-300">✦</span>
          <span>LE GRAND JOUR EST ARRIVÉ</span>
          <span className="text-rose-300">✦</span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-rose-50 tracking-wide drop-shadow-md">
            Joyeux Anniversaire
          </h1>
          <p className="font-serif-luxury text-3xl sm:text-5xl font-normal italic text-rose-200/90 tracking-normal drop-shadow-sm">
            {BIRTHDAY_CONFIG.sisterName} ✨
          </p>
        </div>

        {/* Phase 1: Interactive Gift Box */}
        {!isGiftOpened ? (
          <div className="space-y-6 pt-4">
            <p className="text-xs sm:text-sm text-rose-200/80 font-light flex items-center justify-center gap-1.5">
              <span>Un paquet cadeau n'attend que toi...</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
            </p>

            {/* Clickable 3D Gift Box */}
            <div
              onClick={handleOpenGift}
              className="inline-block p-10 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-md hover:bg-white/[0.09] transition-all cursor-pointer group shadow-2xl hover:scale-105 duration-300 glow-box"
              title="Clique pour ouvrir ton cadeau !"
            >
              <div className="text-7xl sm:text-8xl select-none animate-bounce drop-shadow-[0_0_30px_rgba(244,114,182,0.4)]">
                🎁
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-200/90 group-hover:text-amber-300 transition-colors mt-4 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Touche le cadeau pour l'ouvrir</span>
              </p>
            </div>
          </div>
        ) : (
          /* Phase 2: Unwrapped Gift & Personal Message */
          <div className="space-y-16 pt-2 animate-in fade-in zoom-in-95 duration-500">
            {/* The Letter Card */}
            <div className="bg-white/[0.05] border border-white/15 rounded-3xl p-6 sm:p-10 backdrop-blur-md glow-box text-left space-y-6 relative overflow-hidden max-w-2xl mx-auto">
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-rose-500/20 border border-rose-400/30 text-rose-300 text-[10px] font-mono font-bold px-3 py-1 rounded-full">
                <PartyPopper className="w-3 h-3 text-rose-300" />
                <span>14 NOVEMBRE</span>
              </div>

              <div className="space-y-4 font-serif">
                <h2 className="text-xl sm:text-2xl font-bold text-rose-100 font-serif-luxury italic">
                  Ma chère sœur,
                </h2>
                <div className="text-xs sm:text-sm text-rose-200/90 leading-relaxed font-sans whitespace-pre-line font-light">
                  {BIRTHDAY_CONFIG.personalLetter}
                </div>
              </div>

              {/* Birthday Cake with blow candle */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div
                  onClick={handleBlowCandle}
                  className="flex items-center gap-3 cursor-pointer group hover:opacity-100 transition-opacity"
                >
                  <span className="text-3xl select-none group-hover:scale-110 transition-transform">
                    🎂
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-rose-100 group-hover:text-amber-300 transition-colors">
                      {!candleBlown ? 'Souffle la bougie virtuelle !' : '✨ Vœu exaucé ! ✨'}
                    </p>
                    <p className="text-[10px] text-rose-200/60 font-light">
                      {!candleBlown ? 'Fais un vœu et clique ici' : 'Que cette année t’apporte le meilleur'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => confetti({ particleCount: 60, spread: 70 })}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-semibold tracking-wider transition-all cursor-pointer shadow-md"
                >
                  🎉 Confettis !
                </button>
              </div>
            </div>

            {/* Section 2: Flip cards (Pourquoi tu es unique) */}
            <ReasonsFlipCards />

            {/* Section 3: Souvenirs & Galerie photos */}
            <MemoryGallery />

            {/* Section 4: Livre d'or */}
            <Guestbook />
          </div>
        )}

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 text-center text-xs text-rose-300/40 space-y-2">
          <div className="flex items-center justify-center gap-2 text-rose-400">
            <Sparkles className="w-4 h-4" />
            <span className="font-serif italic text-sm">Fait avec tout mon cœur pour ma sœur Meena Faty</span>
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <p>© 14 Novembre — Une journée inoubliable</p>
        </footer>

      </div>
    </div>
  );
};
