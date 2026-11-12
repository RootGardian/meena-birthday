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
  // 0: Pétale de rose classique arrondi avec courbe organique
  'M16 2 C25 2 31 10 30 20 C29 28 20 33 16 35 C12 33 3 28 2 20 C1 10 7 2 16 2 Z',
  // 1: Pétale asymétrique délicatement incurvé par le vent
  'M9 3 C17 1 28 7 30 17 C31 27 22 33 16 35 C10 33 3 27 5 17 C6 11 3 6 9 3 Z',
  // 2: Pétale soyeux en forme de cœur délicat
  'M16 5 C21 1 29 5 30 14 C31 23 22 30 16 34 C10 30 1 23 2 14 C3 5 11 1 16 5 Z',
  // 3: Pétale allongé et fin
  'M16 2 C22 3 28 11 27 20 C26 28 19 32 16 35 C13 32 6 28 5 20 C4 11 10 3 16 2 Z',
];

const VEIN_PATHS = [
  'M16 6 C16.5 15 15.5 24 16 33',
  'M12 7 C15 16 17 25 16 33',
  'M16 7 C16.5 16 15.8 24 16 32',
  'M16 5 C15.8 15 16.5 25 16 33',
];

export const FallingPetals: React.FC<{ count?: number }> = ({ count = 20 }) => {
  const petals = useMemo<PetalData[]>(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Répartition harmonieuse sur toute la largeur de l'écran
      const leftPercent = ((i * 5.2 + (i % 3) * 1.8) % 96) + 2;
      const duration = 10 + (i % 5) * 2.2 + ((i * 7) % 4); // 10s à 21s (chute lente et gracieuse)
      const delay = (i * 0.85) % 12; // Délais échelonnés
      const width = 22 + (i % 4) * 5; // 22px à 37px
      const height = Math.round(width * 1.18);
      const variant = i % 4;
      const animType = (i % 2 === 0 ? 1 : 2) as 1 | 2;
      const opacity = 0.55 + (i % 5) * 0.08; // 0.55 à 0.87
      const rotation = (i * 37) % 360;

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
              filter: 'drop-shadow(0 2px 5px rgba(225, 29, 72, 0.3))',
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
            }}
          >
            <svg
              viewBox="0 0 32 36"
              className="w-full h-full"
              style={{ transform: `rotate(${p.rotation}deg)` }}
            >
              <defs>
                {/* Dégradé radial simulant la translucidité et la texture soyeuse d'un vrai pétale */}
                <radialGradient
                  id={`petalGrad-${p.id}`}
                  cx="42%"
                  cy="32%"
                  r="68%"
                  fx="38%"
                  fy="28%"
                >
                  <stop offset="0%" stopColor="#fff1f2" stopOpacity="0.95" />
                  <stop offset="28%" stopColor="#fda4af" stopOpacity="0.92" />
                  <stop offset="65%" stopColor="#fb7185" stopOpacity="0.88" />
                  <stop offset="92%" stopColor="#f43f5e" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#be123c" stopOpacity="0.95" />
                </radialGradient>

                {/* Dégradé doux pour le contour et l'ombre subtile de volume */}
                <linearGradient
                  id={`petalStroke-${p.id}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(255, 228, 230, 0.8)" />
                  <stop offset="60%" stopColor="rgba(251, 113, 133, 0.5)" />
                  <stop offset="100%" stopColor="rgba(190, 18, 60, 0.7)" />
                </linearGradient>
              </defs>

              {/* Corps principal du pétale de rose */}
              <path
                d={path}
                fill={`url(#petalGrad-${p.id})`}
                stroke={`url(#petalStroke-${p.id})`}
                strokeWidth="0.6"
              />

              {/* Nervure centrale délicate et translucide */}
              <path
                d={vein}
                fill="none"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="0.7"
                strokeLinecap="round"
              />

              {/* Reflet de lumière sur la courbure du pétale */}
              <path
                d="M10 8 C14 5 21 8 23 14"
                fill="none"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />

              {/* Léger éclat de brillance soyeuse */}
              <ellipse
                cx="14"
                cy="14"
                rx="5"
                ry="9"
                fill="rgba(255, 255, 255, 0.14)"
                transform="rotate(-15 14 14)"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

