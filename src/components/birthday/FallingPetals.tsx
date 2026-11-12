import React, { useMemo } from 'react';

interface PetalData {
  id: number;
  left: string;
  duration: string;
  delay: string;
  width: number;
  height: number;
  variant: number;
  animType: 1 | 2;
  opacity: number;
  rotation: number;
}

// Formes vectorielles réalistes de pétales de rose / cerisier
const PETAL_PATHS = [
  'M16 2 C25 2 31 10 30 20 C29 28 20 33 16 35 C12 33 3 28 2 20 C1 10 7 2 16 2 Z',
  'M9 3 C17 1 28 7 30 17 C31 27 22 33 16 35 C10 33 3 27 5 17 C6 11 3 6 9 3 Z',
  'M16 5 C21 1 29 5 30 14 C31 23 22 30 16 34 C10 30 1 23 2 14 C3 5 11 1 16 5 Z',
  'M16 2 C22 3 28 11 27 20 C26 28 19 32 16 35 C13 32 6 28 5 20 C4 11 10 3 16 2 Z',
];

const VEIN_PATHS = [
  'M16 6 C16.5 15 15.5 24 16 33',
  'M12 7 C15 16 17 25 16 33',
  'M16 7 C16.5 16 15.8 24 16 32',
  'M16 5 C15.8 15 16.5 25 16 33',
];

export const FallingPetals: React.FC<{ count?: number }> = ({ count = 16 }) => {
  const petals = useMemo<PetalData[]>(() => {
    return Array.from({ length: count }).map((_, i) => {
      const leftPercent = ((i * 6.3 + (i % 3) * 2.1) % 96) + 2;
      const duration = 11 + (i % 5) * 2.5 + ((i * 7) % 3);
      const delay = (i * 0.9) % 10;
      const width = 20 + (i % 4) * 4; // 20px à 32px
      const height = Math.round(width * 1.18);
      const variant = i % 4;
      const animType = (i % 2 === 0 ? 1 : 2) as 1 | 2;
      const opacity = 0.6 + (i % 4) * 0.08;
      const rotation = (i * 41) % 360;

      return {
        id: i,
        left: `${leftPercent}%`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        width,
        height,
        variant,
        animType,
        opacity,
        rotation,
      };
    });
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {/* Définitions uniques partagées pour optimiser la mémoire GPU sur Safari WebKit */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <radialGradient id="sharedPetalGrad" cx="42%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#fda4af" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#fb7185" stopOpacity="0.88" />
            <stop offset="92%" stopColor="#f43f5e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#be123c" stopOpacity="0.95" />
          </radialGradient>
          <linearGradient id="sharedPetalStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 228, 230, 0.7)" />
            <stop offset="60%" stopColor="rgba(251, 113, 133, 0.4)" />
            <stop offset="100%" stopColor="rgba(190, 18, 60, 0.6)" />
          </linearGradient>
        </defs>
      </svg>

      {petals.map((p) => {
        const path = PETAL_PATHS[p.variant];
        const vein = VEIN_PATHS[p.variant];
        const animClass = p.animType === 1 ? 'animate-petal-1' : 'animate-petal-2';

        return (
          <div
            key={p.id}
            className={animClass}
            style={{
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay,
              width: `${p.width}px`,
              height: `${p.height}px`,
              top: '-8%',
              opacity: p.opacity,
              transform: 'translate3d(0, 0, 0)',
              WebkitTransform: 'translate3d(0, 0, 0)',
            }}
          >
            <svg
              viewBox="0 0 32 36"
              className="w-full h-full"
              style={{
                transform: `rotate(${p.rotation}deg)`,
                WebkitTransform: `rotate(${p.rotation}deg)`,
              }}
            >
              <path
                d={path}
                fill="url(#sharedPetalGrad)"
                stroke="url(#sharedPetalStroke)"
                strokeWidth="0.6"
              />
              <path
                d={vein}
                fill="none"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="0.7"
                strokeLinecap="round"
              />
              <path
                d="M10 8 C14 5 21 8 23 14"
                fill="none"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};
