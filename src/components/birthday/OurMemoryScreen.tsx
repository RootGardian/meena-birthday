import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { X, ZoomIn } from 'lucide-react';
import { FallingPetals } from './FallingPetals';

// Import des 6 photos sélectionnées de Meena (fichiers meena1.jpeg à meena6.jpeg)
import photoLeft1 from '../../assets/meena1.jpeg';
import photoLeft2 from '../../assets/meena2.jpeg';
import photoLeft3 from '../../assets/meena3.jpeg';

import photoRight1 from '../../assets/meena4.jpeg';
import photoRight2 from '../../assets/meena5.jpeg';
import photoRight3 from '../../assets/meena6.jpeg';

interface PolaroidMemory {
  id: string;
  url: string;
  title: string;
  caption: string;
  date?: string;
  rotation: string;
  side: 'left' | 'right';
  topPercent: string;
  leftOrRightPercent: string;
  delay: string;
}

const MEMORIES: PolaroidMemory[] = [
  // 3 Photos côté gauche
  {
    id: '1',
    url: photoLeft1,
    title: 'Complicité & Douceur',
    caption: 'Les souvenirs les plus précieux commencent toujours par un moment partagé avec toi.',
    date: 'Moments Précieux',
    rotation: '-rotate-6',
    side: 'left',
    topPercent: '12%',
    leftOrRightPercent: '4%',
    delay: '0s',
  },
  {
    id: '2',
    url: photoLeft2,
    title: 'Ton Sourire Solaire',
    caption: 'Ce sourire éclatant qui réchauffe tous les cœurs et illumine chaque instant.',
    date: 'Rayonnante',
    rotation: 'rotate-3',
    side: 'left',
    topPercent: '44%',
    leftOrRightPercent: '2%',
    delay: '0.8s',
  },
  {
    id: '3',
    url: photoLeft3,
    title: 'Nos Plus Belles Aventures',
    caption: 'Toujours ensemble pour traverser la vie, célébrer et créer des souvenirs inoubliables.',
    date: 'Pour toujours',
    rotation: '-rotate-8',
    side: 'left',
    topPercent: '72%',
    leftOrRightPercent: '5%',
    delay: '1.6s',
  },

  // 3 Photos côté droit
  {
    id: '4',
    url: photoRight1,
    title: 'Queen Meena',
    caption: 'Une reine au grand cœur, élégante, protectrice et admirée de tous.',
    date: '',
    rotation: 'rotate-6',
    side: 'right',
    topPercent: '14%',
    leftOrRightPercent: '4%',
    delay: '0.4s',
  },
  {
    id: '5',
    url: photoRight2,
    title: 'Fête & Bonheur',
    caption: 'Entourée de ceux qui t’aiment, aujourd’hui c’est ton jour de gloire !',
    date: 'Célébration',
    rotation: '-rotate-3',
    side: 'right',
    topPercent: '42%',
    leftOrRightPercent: '2%',
    delay: '1.2s',
  },
  {
    id: '6',
    url: photoRight3,
    title: 'Amour & Gratitude',
    caption: 'Chaque seconde à tes côtés est un trésor gravé à jamais dans nos cœurs.',
    date: 'Infini Amour',
    rotation: 'rotate-8',
    side: 'right',
    topPercent: '70%',
    leftOrRightPercent: '4%',
    delay: '2.0s',
  },
];

const SPECIAL_LETTER = `À ma très chère Meena Faty,

Aujourd’hui, nous célébrons bien plus qu’un anniversaire : nous célébrons une femme extraordinaire, une sœur au cœur d’or, un pilier pour toute sa famille et une amie irremplaçable.

À travers ces 30 cadeaux et ces 30 messages venus du cœur de tes proches, tu as pu voir une fraction de tout l'amour et de l'admiration que nous te portons. Tu as cette générosité naturelle qui protège, qui console et qui rassemble.

Que cette nouvelle année t’ouvre les portes du succès absolu, d'une santé de fer, de la paix de l'âme et d'un bonheur infini. Ne change jamais ta pureté, ton sourire communicatif et cette force bienveillante qui fait de toi une reine.

Merci pour tout ce que tu as été, tout ce que tu es et tout ce que tu seras.

Joyeux Anniversaire !
Avec tout notre amour pour toujours,
Ta famille & tes proches ❤️`;

interface OurMemoryScreenProps {
  onBackToGifts?: () => void;
  onGoToGallery?: () => void;
}

export const OurMemoryScreen: React.FC<OurMemoryScreenProps> = ({ onGoToGallery }) => {
  const [activePhoto, setActivePhoto] = useState<PolaroidMemory | null>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [displayedChars, setDisplayedChars] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 },
    });
  }, []);

  // Typewriter pour la lettre d'amour
  useEffect(() => {
    if (!isLetterOpen) return;
    setDisplayedChars(0);
    const interval = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= SPECIAL_LETTER.length) {
          clearInterval(interval);
          return SPECIAL_LETTER.length;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  }, [isLetterOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedChars]);

  return (
    <div className="relative min-h-screen w-full bg-[#1b0b18] text-[#f7eef2] flex flex-col items-center justify-center p-4 sm:p-8 overflow-x-hidden select-none font-sans">
      {/* Fond dégradé chaleureux bordeaux/prune comme sur l'image */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a142c] via-[#210c1c] to-[#0e050d] pointer-events-none" />

      {/* Bokeh cœurs lumineux en arrière-plan */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Grands cœurs floutés créant l'effet bokeh lumineux de l'image (optimisé Safari zéro GPU lag) */}
        <div
          className="absolute top-[18%] left-[25%] w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[40%] right-[22%] w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[15%] left-[35%] w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)' }}
        />

        {/* Cœurs bokeh doux semi-transparents */}
        {[
          { top: '15%', left: '30%', size: '80px', opacity: 0.12, rot: '15deg' },
          { top: '25%', left: '60%', size: '110px', opacity: 0.14, rot: '-12deg' },
          { top: '55%', left: '20%', size: '95px', opacity: 0.13, rot: '-20deg' },
          { top: '65%', left: '65%', size: '120px', opacity: 0.15, rot: '25deg' },
          { top: '35%', left: '45%', size: '140px', opacity: 0.18, rot: '5deg' },
          { top: '75%', left: '40%', size: '100px', opacity: 0.12, rot: '-8deg' },
        ].map((h, i) => (
          <div
            key={i}
            className="absolute text-rose-300 pointer-events-none select-none blur-[2px]"
            style={{
              top: h.top,
              left: h.left,
              opacity: h.opacity,
              fontSize: h.size,
              transform: `rotate(${h.rot})`,
            }}
          >
            ❤
          </div>
        ))}

        {/* Étoiles scintillantes subtiles */}
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 19) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              opacity: (i % 4) * 0.2 + 0.2,
              animationDuration: `${2 + (i % 3)}s`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
            }}
          />
        ))}
      </div>

      {/* Pétales de rose réalistes flottants */}
      <FallingPetals count={20} />

      {/* Polaroids flottants côté gauche (adaptés mobile & desktop) */}
      <div className="fixed inset-y-0 left-0 w-[24%] sm:w-[26%] lg:w-[28%] pointer-events-none z-20">
        {MEMORIES.filter((m) => m.side === 'left').map((m) => (
          <div
            key={m.id}
            onClick={() => setActivePhoto(m)}
            className={`absolute pointer-events-auto cursor-pointer group bg-white/95 p-1.5 sm:p-2.5 lg:p-3 pb-4 sm:pb-6 lg:pb-8 rounded-xs shadow-[0_8px_20px_rgba(0,0,0,0.6)] sm:shadow-[0_15px_35px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_50px_rgba(244,114,182,0.5)] ${m.rotation} hover:rotate-0 hover:scale-110 active:scale-95 transition-all duration-300 w-[84px] sm:w-[130px] md:w-[170px] lg:w-[210px] xl:w-[240px]`}
            style={{
              top: m.topPercent,
              left: m.leftOrRightPercent,
            }}
          >
            <div className="relative aspect-[4/5] bg-slate-900 overflow-hidden rounded-xs">
              <img
                src={m.url}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="w-4 h-4 sm:w-6 sm:h-6 text-white drop-shadow-md" />
              </div>
            </div>
            <p className="text-[9px] sm:text-[11px] lg:text-xs font-cursive text-slate-800 text-center mt-1 sm:mt-2 truncate px-0.5">
              {m.title}
            </p>
          </div>
        ))}
      </div>

      {/* Polaroids flottants côté droit (adaptés mobile & desktop) */}
      <div className="fixed inset-y-0 right-0 w-[24%] sm:w-[26%] lg:w-[28%] pointer-events-none z-20">
        {MEMORIES.filter((m) => m.side === 'right').map((m) => (
          <div
            key={m.id}
            onClick={() => setActivePhoto(m)}
            className={`absolute pointer-events-auto cursor-pointer group bg-white/95 p-1.5 sm:p-2.5 lg:p-3 pb-4 sm:pb-6 lg:pb-8 rounded-xs shadow-[0_8px_20px_rgba(0,0,0,0.6)] sm:shadow-[0_15px_35px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_50px_rgba(244,114,182,0.5)] ${m.rotation} hover:rotate-0 hover:scale-110 active:scale-95 transition-all duration-300 w-[84px] sm:w-[130px] md:w-[170px] lg:w-[210px] xl:w-[240px]`}
            style={{
              top: m.topPercent,
              right: m.leftOrRightPercent,
            }}
          >
            <div className="relative aspect-[4/5] bg-slate-900 overflow-hidden rounded-xs">
              <img
                src={m.url}
                alt={m.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="w-4 h-4 sm:w-6 sm:h-6 text-white drop-shadow-md" />
              </div>
            </div>
            <p className="text-[9px] sm:text-[11px] lg:text-xs font-cursive text-slate-800 text-center mt-1 sm:mt-2 truncate px-0.5">
              {m.title}
            </p>
          </div>
        ))}
      </div>

      {/* Contenu central majestueux : Reproduction exacte du design de l'image */}
      <div className="relative z-30 max-w-[210px] sm:max-w-md lg:max-w-4xl w-full text-center space-y-4 sm:space-y-7 lg:space-y-9 animate-in fade-in zoom-in-95 duration-700 my-auto py-8 sm:py-12">
        {/* Tagline en haut */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs lg:text-sm tracking-[0.22em] sm:tracking-[0.32em] uppercase text-rose-200/90 font-medium">
          <span className="text-amber-300 text-[10px] sm:text-xs">✦</span>
          <span>A LOVE LETTER FOR YOU</span>
          <span className="text-amber-300 text-[10px] sm:text-xs">✦</span>
        </div>

        {/* Titre majestueux "Your Special Day" */}
        <div className="space-y-1 sm:space-y-2">
          <h1
            className="font-serif-luxury text-3xl sm:text-6xl md:text-7xl lg:text-9xl font-normal text-white tracking-normal drop-shadow-[0_0_35px_rgba(255,255,255,0.7)] drop-shadow-[0_0_80px_rgba(244,114,182,0.45)]"
            style={{ fontFamily: "'Playfair Display', 'DM Serif Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            Your
          </h1>
          <h1
            className="font-serif-luxury text-3xl sm:text-6xl md:text-7xl lg:text-9xl font-normal text-white tracking-normal drop-shadow-[0_0_35px_rgba(255,255,255,0.7)] drop-shadow-[0_0_80px_rgba(244,114,182,0.45)] -mt-1 sm:-mt-3"
            style={{ fontFamily: "'Playfair Display', 'DM Serif Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            Special Day
          </h1>
        </div>

        {/* Sous-titre en italique romantique */}
        <p
          className="font-serif-luxury italic text-sm sm:text-2xl md:text-3xl text-rose-200/95 font-light tracking-wide drop-shadow-sm"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
        >
          Created with love, just for you
        </p>

        {/* Bouton pill transparent cerclé fun : "✦ READY ? LET'S GOOO ! 💖 ✦" menant vers Our Memories */}
        <div className="pt-2 sm:pt-5 flex justify-center">
          <button
            onClick={onGoToGallery}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 lg:px-12 py-2.5 sm:py-3.5 lg:py-4 rounded-full bg-white/[0.06] hover:bg-rose-500/25 border border-white/40 hover:border-rose-300 backdrop-blur-md text-white font-medium text-[11px] sm:text-xs lg:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase shadow-[0_0_25px_rgba(244,114,182,0.25)] hover:shadow-[0_0_40px_rgba(244,114,182,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="text-amber-300 text-[10px] sm:text-xs group-hover:scale-125 transition-transform">✦</span>
            <span>READY ? LET'S GOOO ! 💖</span>
            <span className="text-amber-300 text-[10px] sm:text-xs group-hover:scale-125 transition-transform">✦</span>
          </button>
        </div>
      </div>

      {/* Modal d'aperçu d'une photo Polaroid zoomée (100% visible sans rognage) */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative bg-white p-3 sm:p-5 pb-6 sm:pb-8 rounded-sm shadow-2xl max-w-3xl w-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-300 text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors cursor-pointer shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo complète non rognée */}
            <div className="relative overflow-hidden rounded-xs bg-slate-950 flex items-center justify-center max-h-[75vh]">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain block mx-auto"
              />
            </div>

            <div className="pt-4 text-center space-y-1 shrink-0">
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-slate-900">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans px-2">
                {activePhoto.caption}
              </p>
              {activePhoto.date && (
                <span className="inline-block mt-1 font-cursive text-rose-600 text-sm">
                  — {activePhoto.date} —
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Lettre d'Amour complète ("READ MY LETTER") avec machine à écrire */}
      {isLetterOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0d070e]/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden select-text"
          onClick={() => setIsLetterOpen(false)}
        >
          {/* Titre au-dessus */}
          <div className="relative z-10 text-center mb-3 sm:mb-5 shrink-0">
            <h2 className="font-serif-luxury text-3xl sm:text-5xl italic font-normal text-white tracking-wide drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]">
              A Love Letter For You
            </h2>
          </div>

          {/* Carte en verre dépoli */}
          <div
            className="relative z-10 max-w-2xl sm:max-w-3xl lg:max-w-4xl w-full bg-white/[0.04] backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.7)] flex flex-col h-[82vh] max-h-[850px] animate-in zoom-in-95 duration-500 text-left"
            onClick={(e) => {
              e.stopPropagation();
              setDisplayedChars(SPECIAL_LETTER.length);
            }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0">
              <span className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-rose-200 font-semibold">
                POUR MEENA FATY 🤍
              </span>
              <button
                onClick={() => setIsLetterOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-rose-200 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corps de la lettre */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto pr-2 sm:pr-4 luxury-scrollbar scroll-smooth whitespace-pre-line text-[15px] sm:text-base lg:text-lg leading-[1.9] font-light text-rose-50/95 tracking-wide font-sans select-text pb-4"
            >
              {SPECIAL_LETTER.slice(0, displayedChars)}
              {displayedChars < SPECIAL_LETTER.length && (
                <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-rose-200 animate-pulse ml-1 align-middle shadow-[0_0_8px_rgba(255,255,255,0.85)]" />
              )}
            </div>

            {/* Bouton de fermeture */}
            <div className="pt-4 border-t border-white/10 flex justify-center shrink-0">
              <button
                onClick={() => setIsLetterOpen(false)}
                className="px-8 sm:px-10 py-2.5 sm:py-3 rounded-full bg-[#f0859a] hover:bg-[#e87087] text-white font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(240,133,154,0.65)] cursor-pointer transition-all active:scale-95"
              >
                FERMER LA LETTRE 🤍
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

