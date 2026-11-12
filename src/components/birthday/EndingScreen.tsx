import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FallingPetals } from './FallingPetals';

const TITLES = [
  'Happy Birthday',
  'With All My Love',
  'Always & Forever',
];

interface EndingScreenProps {
  onRestart?: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  // Confetti délicat au chargement
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
    });
  }, []);

  // Changement de texte toutes les 5 secondes avec effet machine à écrire
  useEffect(() => {
    const targetTitle = TITLES[titleIndex];
    let currentChar = 0;
    setDisplayedText('');

    // Vitesse d'écriture lettre par lettre
    const typeInterval = setInterval(() => {
      currentChar++;
      setDisplayedText(targetTitle.slice(0, currentChar));
      if (currentChar >= targetTitle.length) {
        clearInterval(typeInterval);
      }
    }, 45);

    // Changement de phrase toutes les 5 secondes
    const switchTimeout = setTimeout(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 5000);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(switchTimeout);
    };
  }, [titleIndex]);

  return (
    <div className="relative min-h-screen w-full bg-[#180b19] text-[#f7eef2] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden select-none font-sans">
      {/* Fond violet / bordeaux galaxie avec dégradé subtil comme sur les 3 images */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#38162f] via-[#1e0d1f] to-[#0d050e] pointer-events-none" />

      {/* Bokeh lumineux rose et doré */}
      <div className="fixed top-1/3 left-1/3 w-96 h-96 bg-rose-500/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/3 w-96 h-96 bg-pink-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Étoiles scintillantes douces comme sur les photos */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 19) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              opacity: (i % 4) * 0.2 + 0.25,
              animationDuration: `${2 + (i % 3)}s`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.85)',
            }}
          />
        ))}
      </div>

      {/* Pétales de rose réalistes flottants */}
      <FallingPetals count={22} />

      {/* Contenu central majestueux : reproduction exacte des 3 images */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-1000 px-4">
        
        {/* Titre en gras qui change toutes les 5 secondes avec curseur clignotant | */}
        <div className="min-h-[90px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center">
          <h1
            className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-normal drop-shadow-[0_0_35px_rgba(255,255,255,0.85)] drop-shadow-[0_0_75px_rgba(244,114,182,0.45)]"
            style={{ fontFamily: "'Playfair Display', 'DM Serif Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
          >
            <span>{displayedText}</span>
            <span className="inline-block w-1 sm:w-1.5 h-8 sm:h-14 lg:h-16 bg-white/90 animate-pulse ml-2 sm:ml-3 align-middle shadow-[0_0_10px_rgba(255,255,255,0.95)]" />
          </h1>
        </div>

        {/* Sous-titres émouvants en typographie luxe romantique comme sur les captures */}
        <div className="space-y-2 sm:space-y-3 pt-2">
          <p
            className="font-serif-luxury italic text-xs sm:text-base lg:text-lg text-rose-100/90 font-light tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
          >
            Thank you for being part of my life.
          </p>
          <p
            className="font-serif-luxury italic text-xs sm:text-base lg:text-lg text-rose-200/90 font-light tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
          >
            I hope this little gift can make your special day even more beautiful.
          </p>
          <p
            className="font-serif-luxury italic text-xs sm:text-sm lg:text-base text-rose-100/80 font-light pt-2 flex items-center justify-center gap-2"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
          >
            <span>Forever yours.</span>
            <span className="text-pink-300 inline-block text-sm sm:text-base not-italic">🤍</span>
          </p>
        </div>

      </div>
    </div>
  );
};

