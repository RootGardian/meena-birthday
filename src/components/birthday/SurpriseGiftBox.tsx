import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../../data/birthdayData';

export const SurpriseGiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto text-center space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Gift className="w-3.5 h-3.5 text-amber-400" />
          <span>Surprise Spéciale</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Un paquet cadeau rien que pour toi
        </h2>
        <p className="text-xs sm:text-sm text-rose-200/70">
          Touche le paquet ci-dessous pour découvrir ce qu'il renferme...
        </p>
      </div>

      <div className="flex flex-col items-center">
        {!isOpen ? (
          <div
            onClick={handleOpenGift}
            className="group relative cursor-pointer transform hover:scale-110 transition-all duration-300 p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-md glow-box"
          >
            {/* Gift Box Icon with animated bounce & ribbon */}
            <div className="relative">
              <span className="text-7xl sm:text-8xl select-none block animate-bounce drop-shadow-[0_0_25px_rgba(244,114,182,0.4)]">
                🎁
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-rose-200 group-hover:text-amber-300 transition-colors flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Clique pour déballer le cadeau !</span>
            </p>
          </div>
        ) : (
          <div className="relative w-full bg-gradient-to-br from-rose-950/80 to-purple-950/80 border border-rose-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-500 space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center mx-auto text-3xl shadow-inner">
              ✨
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-100">
                Joyeux Anniversaire {BIRTHDAY_CONFIG.sisterName} !
              </h3>
              <p className="text-sm sm:text-base text-rose-200/90 leading-relaxed font-light max-w-xl mx-auto">
                {BIRTHDAY_CONFIG.surpriseMessage}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  confetti({ particleCount: 60, spread: 60 });
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Encore des confettis ! 🎉</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

