import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, ZoomIn, Play } from 'lucide-react';
import { FallingPetals } from './FallingPetals';

// Import de toutes les photos de Meena depuis le dossier assets
import img1 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.08.jpeg';
import img2 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.08 (1).jpeg';
import img3 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.08 (2).jpeg';
import img5 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.08 (4).jpeg';
import img6 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.09.jpeg';
import img7 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.09 (1).jpeg';
import img8 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.09 (2).jpeg';
import img9 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.09 (3).jpeg';
import img10 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.09 (4).jpeg';
import img11 from '../../assets/WhatsApp Image 2026-11-12 at 08.38.28.jpeg';

// Nouvelles photos ajoutées
import img12 from '../../assets/WhatsApp Image 2026-11-12 at 13.06.49.jpeg';
import img13 from '../../assets/WhatsApp Image 2026-11-12 at 13.07.51.jpeg';
import img14 from '../../assets/WhatsApp Image 2026-11-12 at 13.08.32.jpeg';
import img15 from '../../assets/WhatsApp Image 2026-11-12 at 13.20.47.jpeg';
import img16 from '../../assets/WhatsApp Image 2026-11-12 at 13.20.53.jpeg';
import img17 from '../../assets/WhatsApp Image 2026-11-12 at 13.21.18.jpeg';
import img18 from '../../assets/WhatsApp Image 2026-11-12 at 13.21.18 (1).jpeg';
import img19 from '../../assets/WhatsApp Image 2026-11-12 at 13.21.19.jpeg';
import img20 from '../../assets/WhatsApp Image 2026-11-12 at 13.28.21.jpeg';
import img21 from '../../assets/WhatsApp Image 2026-11-12 at 14.38.38.jpeg';
import img22 from '../../assets/WhatsApp Image 2026-11-12 at 15.44.12.jpeg';
import img23 from '../../assets/WhatsApp Image 2026-11-12 at 15.44.12 (1).jpeg';
import img24 from '../../assets/WhatsApp Image 2026-11-12 at 15.44.12 (2).jpeg';
import img25 from '../../assets/WhatsApp Image 2026-11-12 at 23.40.23.jpeg';
import img26 from '../../assets/WhatsApp Image 2026-11-13 at 08.45.23.jpeg';

// Nouvelles vidéos ajoutées et leurs vignettes d'aperçu pour éviter tout écran noir
import vid1 from '../../assets/WhatsApp Video 2026-11-12 at 13.08.53.mp4';
import vid1Thumb from '../../assets/vid1-thumb.jpg';

import vid2 from '../../assets/WhatsApp Video 2026-11-12 at 13.20.49.mp4';
import vid2Thumb from '../../assets/vid2-thumb.jpg';

import vid3 from '../../assets/WhatsApp Video 2026-11-12 at 13.20.50.mp4';
import vid3Thumb from '../../assets/vid3-thumb.jpg';

import vid4 from '../../assets/WhatsApp Video 2026-11-12 at 13.20.52.mp4';
import vid4Thumb from '../../assets/vid4-thumb.jpg';

interface GalleryPolaroid {
  id: number;
  url: string;
  poster?: string;
  type?: 'image' | 'video';
  title: string;
  caption: string;
  rotation: string;
}

const GALLERY_PHOTOS: GalleryPolaroid[] = [
  {
    id: 1,
    url: img1,
    type: 'image',
    title: 'Complicité Éternelle',
    caption: 'Des rires gravés dans nos cœurs pour l’éternité.',
    rotation: '-rotate-2',
  },
  {
    id: 201,
    url: vid1,
    poster: vid1Thumb,
    type: 'video',
    title: 'Rires en Mouvement ✨',
    caption: 'Ce rire communicatif qu’on adore tant entendre !',
    rotation: 'rotate-3',
  },
  {
    id: 11,
    url: img11,
    type: 'image',
    title: 'Complicité Rayonnante',
    caption: 'Une beauté et une complicité uniques qui illuminent chaque instant.',
    rotation: '-rotate-1',
  },
  {
    id: 2,
    url: img2,
    type: 'image',
    title: 'Ton Plus Beau Sourire',
    caption: 'Cette lumière qui rend chaque instant magique.',
    rotation: 'rotate-2',
  },
  {
    id: 12,
    url: img12,
    type: 'image',
    title: 'Rayon de Soleil',
    caption: 'Ton énergie et ta joie illuminent tout autour de toi.',
    rotation: '-rotate-3',
  },
  {
    id: 202,
    url: vid2,
    poster: vid2Thumb,
    type: 'video',
    title: 'Moments Vivants 💕',
    caption: 'La joie de vivre et la complicité à l’état pur.',
    rotation: 'rotate-2',
  },
  {
    id: 3,
    url: img3,
    type: 'image',
    title: 'Aventures Ensemble',
    caption: 'Toujours là l’un pour l’autre, main dans la main.',
    rotation: '-rotate-2',
  },
  {
    id: 13,
    url: img13,
    type: 'image',
    title: 'Élégance Pure',
    caption: 'La grâce et la douceur incarnées.',
    rotation: 'rotate-1',
  },
  {
    id: 4,
    url: img6,
    type: 'image',
    title: 'Fête & Bonheur',
    caption: 'Le meilleur reste encore à venir ma Meena !',
    rotation: 'rotate-4',
  },
  {
    id: 14,
    url: img14,
    type: 'image',
    title: 'Douceur Partagée',
    caption: 'Des instants simples qui deviennent inoubliables.',
    rotation: '-rotate-3',
  },
  {
    id: 203,
    url: vid3,
    poster: vid3Thumb,
    type: 'video',
    title: 'Souvenir Précieux 🎥',
    caption: 'Un instant magique capturé pour toujours.',
    rotation: '-rotate-1',
  },
  {
    id: 6,
    url: img5,
    type: 'image',
    title: 'Moments Inoubliables',
    caption: 'Des souvenirs précieux qui ne s’effaceront jamais.',
    rotation: 'rotate-2',
  },
  {
    id: 15,
    url: img15,
    type: 'image',
    title: 'Instants Magiques',
    caption: 'Chaque instant à tes côtés est un véritable cadeau.',
    rotation: '-rotate-2',
  },
  {
    id: 7,
    url: img7,
    type: 'image',
    title: 'Queen Meena',
    caption: 'Une reine magnifique et admirée de tous.',
    rotation: 'rotate-3',
  },
  {
    id: 16,
    url: img16,
    type: 'image',
    title: 'Reine du Jour',
    caption: 'Sublime et radieuse pour célébrer ton anniversaire.',
    rotation: '-rotate-1',
  },
  {
    id: 204,
    url: vid4,
    poster: vid4Thumb,
    type: 'video',
    title: 'Fête & Énergie 🌟',
    caption: 'L’ambiance et la fête avec notre reine Meena !',
    rotation: 'rotate-2',
  },
  {
    id: 8,
    url: img8,
    type: 'image',
    title: 'La Joie Partagée',
    caption: 'Merci d’être cette personne si merveilleuse.',
    rotation: '-rotate-3',
  },
  {
    id: 17,
    url: img17,
    type: 'image',
    title: 'Éclat & Sérénité',
    caption: 'Une présence qui apaise et qui réconforte.',
    rotation: 'rotate-1',
  },
  {
    id: 9,
    url: img9,
    type: 'image',
    title: 'Fous Rires Spontanés',
    caption: 'Avec toi, chaque moment simple devient un fou rire.',
    rotation: 'rotate-3',
  },
  {
    id: 18,
    url: img18,
    type: 'image',
    title: 'Sourires Gravés',
    caption: 'Le bonheur de partager ces moments avec toi.',
    rotation: '-rotate-2',
  },
  {
    id: 10,
    url: img10,
    type: 'image',
    title: 'Que du Bonheur',
    caption: 'Joyeux anniversaire, nous t’aimons fort ! ❤️',
    rotation: '-rotate-4',
  },
  {
    id: 19,
    url: img19,
    type: 'image',
    title: 'Précieuse Meena',
    caption: 'Un trésor pour ta famille et tous ceux qui t’aiment.',
    rotation: 'rotate-2',
  },
  {
    id: 20,
    url: img20,
    type: 'image',
    title: 'Bonheur Infini',
    caption: 'Que cette nouvelle année t’apporte tout ce dont tu rêves.',
    rotation: '-rotate-2',
  },
  {
    id: 21,
    url: img21,
    type: 'image',
    title: 'Rayonnement & Grâce',
    caption: 'Une aura naturelle et éclatante qui illumine chaque journée.',
    rotation: 'rotate-2',
  },
  {
    id: 22,
    url: img22,
    type: 'image',
    title: 'Éclats de Rire',
    caption: 'La spontanéité et la joie pure qui rendent la vie si belle.',
    rotation: '-rotate-3',
  },
  {
    id: 23,
    url: img23,
    type: 'image',
    title: 'Charme & Beauté',
    caption: 'Un charme intemporel et une douceur infinie.',
    rotation: 'rotate-1',
  },
  {
    id: 24,
    url: img24,
    type: 'image',
    title: 'Regard Lumineux',
    caption: 'Toute la tendresse et la bienveillance dans un seul regard.',
    rotation: '-rotate-2',
  },
  {
    id: 25,
    url: img25,
    type: 'image',
    title: 'Douce Nuit Magique',
    caption: 'Des instants précieux et inoubliables gravés à jamais.',
    rotation: 'rotate-3',
  },
  {
    id: 26,
    url: img26,
    type: 'image',
    title: 'Aurore Radieuse',
    caption: 'Commencer chaque nouvelle page avec ton plus beau sourire.',
    rotation: '-rotate-1',
  },
];

interface OurMemoriesGalleryScreenProps {
  onBack?: () => void;
  onGoToEnd?: () => void;
}

export const OurMemoriesGalleryScreen: React.FC<OurMemoriesGalleryScreenProps> = ({ onGoToEnd }) => {
  const [activePhoto, setActivePhoto] = useState<GalleryPolaroid | null>(null);

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.4 },
    });
  }, []);

  // Couper la musique de fond lorsqu'une vidéo est ouverte dans le modal, et la reprendre à la fermeture
  useEffect(() => {
    if (activePhoto?.type === 'video') {
      window.dispatchEvent(new CustomEvent('birthday-pause-music'));
    } else {
      window.dispatchEvent(new CustomEvent('birthday-resume-music'));
    }
  }, [activePhoto]);

  return (
    <div className="relative min-h-screen w-full bg-[#120713] text-[#f7eef2] flex flex-col items-center justify-start p-4 sm:p-8 lg:p-12 overflow-x-hidden select-none font-sans">
      {/* Ambiance nuit étoilée avec dégradé subtil bordeaux comme sur l'image */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2d1124] via-[#160817] to-[#0a030b] pointer-events-none" />

      {/* Halo lumineux fluide zéro-coût GPU optimisé Safari */}
      <div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 70%)' }}
      />
      <div
        className="fixed bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)' }}
      />

      {/* Étoiles scintillantes de fond comme sur l'image */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              opacity: (i % 5) * 0.15 + 0.2,
              animationDuration: `${(i % 4) + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Pétales de roses tombants */}
      <FallingPetals count={15} />

      {/* Contenu principal centré */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* En-tête : Our Memories */}
        <div className="text-center space-y-2 sm:space-y-3 pt-4 sm:pt-6">
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.7)]">
            Our Memories
          </h1>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-rose-200/70">
            <span className="text-amber-300 text-xs">✦</span>
            <span>every moment captured in love</span>
            <span className="text-amber-300 text-xs">✦</span>
          </div>
        </div>

        {/* Grille de Polaroids : 4 colonnes sur desktop, 2 colonnes sur mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7 pt-6 sm:pt-10 px-1 sm:px-4">
          {GALLERY_PHOTOS.map((photo) => {
            const isLandscape = photo.id === 6;
            const isVideo = photo.type === 'video';

            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className={`group cursor-pointer bg-white/95 p-2 sm:p-3 pb-6 sm:pb-8 rounded-xs shadow-[0_12px_30px_rgba(0,0,0,0.65)] hover:shadow-[0_22px_50px_rgba(244,114,182,0.5)] ${photo.rotation} hover:rotate-0 hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col justify-between`}
              >
                {/* Image ou vignette vidéo dans le cadre Polaroid (jamais d'écran noir !) */}
                <div className="relative aspect-[4/5] bg-slate-950 overflow-hidden rounded-xs flex items-center justify-center">
                  {isVideo ? (
                    <>
                      <img
                        src={photo.poster}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Badge vidéo en haut à droite */}
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-rose-200 text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md z-10 pointer-events-none">
                        <Play className="w-2.5 h-2.5 fill-rose-300 text-rose-300" />
                        <span>Vidéo</span>
                      </div>
                      {/* Bouton de lecture au centre avec lueur rose */}
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.6)] group-hover:scale-110 group-hover:bg-rose-500 transition-all">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-white text-white" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className={`w-full h-full ${isLandscape ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                      </div>
                    </>
                  )}
                </div>

                {/* Légende manuscrite au bas du Polaroid */}
                <p className="font-cursive text-slate-800 text-xs sm:text-sm text-center mt-2 truncate px-1">
                  {photo.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bouton en bas de page pour aller vers la fin de la surprise */}
        {onGoToEnd && (
          <div className="pt-10 sm:pt-14 pb-4 flex justify-center animate-in fade-in slide-in-from-bottom-6 duration-700">
            <button
              onClick={onGoToEnd}
              className="group inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-3.5 sm:py-4.5 rounded-full bg-[#f0859a] hover:bg-[#e87087] active:scale-95 text-white font-semibold text-xs sm:text-sm lg:text-base tracking-[0.22em] uppercase shadow-[0_0_30px_rgba(240,133,154,0.7)] hover:shadow-[0_0_45px_rgba(240,133,154,0.95)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>UN DERNIER MOT POUR TOI 💖</span>
              <span className="group-hover:translate-x-1.5 transition-transform text-base lg:text-lg">→</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal d'aperçu d'une photo ou vidéo zoomée (Affichage 100% complet sans aucun recadrage) */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300 select-none"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative bg-white p-3 sm:p-5 pb-6 sm:pb-8 rounded-sm shadow-2xl max-w-4xl w-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-300 text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors cursor-pointer shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Média entier 100% visible sans coupure ni rognage */}
            <div className="relative overflow-hidden rounded-xs bg-slate-950 flex items-center justify-center max-h-[75vh]">
              {activePhoto.type === 'video' ? (
                <video
                  src={activePhoto.url}
                  poster={activePhoto.poster}
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="max-h-[75vh] w-auto max-w-full object-contain block mx-auto"
                />
              ) : (
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain block mx-auto"
                />
              )}
            </div>

            <div className="pt-4 text-center space-y-1 shrink-0">
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-slate-900">
                {activePhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans px-2">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
