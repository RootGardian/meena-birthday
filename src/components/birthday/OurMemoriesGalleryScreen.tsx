import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, ZoomIn } from 'lucide-react';
import { FallingPetals } from './FallingPetals';

// Import des 10 vraies photos de Meena depuis le dossier assets
import img1 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.08.jpeg';
import img2 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.08 (1).jpeg';
import img3 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.08 (2).jpeg';
import img5 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.08 (4).jpeg';
import img6 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.09.jpeg';
import img7 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.09 (1).jpeg';
import img8 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.09 (2).jpeg';
import img9 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.09 (3).jpeg';
import img10 from '../../assets/WhatsApp Image 2026-11-11 at 23.50.09 (4).jpeg';

interface GalleryPolaroid {
  id: number;
  url: string;
  title: string;
  caption: string;
  rotation: string;
}

const GALLERY_PHOTOS: GalleryPolaroid[] = [
  {
    id: 1,
    url: img1,
    title: 'Complicité Éternelle',
    caption: 'Des rires gravés dans nos cœurs pour l’éternité.',
    rotation: '-rotate-2',
  },
  {
    id: 2,
    url: img2,
    title: 'Ton Plus Beau Sourire',
    caption: 'Cette lumière qui rend chaque instant magique.',
    rotation: 'rotate-3',
  },
  {
    id: 3,
    url: img3,
    title: 'Aventures Ensemble',
    caption: 'Toujours là l’un pour l’autre, main dans la main.',
    rotation: '-rotate-1',
  },
  {
    id: 4,
    url: img6,
    title: 'Fête & Bonheur',
    caption: 'Le meilleur reste encore à venir ma Meena !',
    rotation: 'rotate-4',
  },
  {
    id: 6,
    url: img5,
    title: 'Moments Inoubliables',
    caption: 'Des souvenirs précieux qui ne s’effaceront jamais.',
    rotation: '-rotate-3',
  },
  {
    id: 7,
    url: img7,
    title: 'Queen Meena',
    caption: 'Une reine magnifique et admirée de tous.',
    rotation: 'rotate-1',
  },
  {
    id: 8,
    url: img8,
    title: 'La Joie Partagée',
    caption: 'Merci d’être cette personne si merveilleuse.',
    rotation: '-rotate-2',
  },
  {
    id: 9,
    url: img9,
    title: 'Fous Rires Spontanés',
    caption: 'Avec toi, chaque moment simple devient un fou rire.',
    rotation: 'rotate-3',
  },
  {
    id: 10,
    url: img10,
    title: 'Que du Bonheur',
    caption: 'Joyeux anniversaire, nous t’aimons fort ! ❤️',
    rotation: '-rotate-4',
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

  return (
    <div className="relative min-h-screen w-full bg-[#120713] text-[#f7eef2] flex flex-col items-center justify-start p-4 sm:p-8 lg:p-12 overflow-x-hidden select-none font-sans">
      {/* Ambiance nuit étoilée avec dégradé subtil bordeaux comme sur l'image */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2d1124] via-[#160817] to-[#0a030b] pointer-events-none" />

      {/* Cœurs et orbes bokeh lumineux */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Étoiles scintillantes de fond comme sur l'image */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 45 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 1}px`,
              height: `${(i % 3) + 1}px`,
              opacity: (i % 4) * 0.2 + 0.3,
              animationDuration: `${1.8 + (i % 3) * 0.8}s`,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.9)',
            }}
          />
        ))}
      </div>

      {/* Pétales de rose réalistes qui tombent doucement */}
      <FallingPetals count={22} />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl w-full text-center space-y-6 pt-8 pb-20 animate-in fade-in zoom-in-95 duration-700">

        {/* En-tête : "Our Memories" exactement comme sur l'image 2 */}
        <div className="space-y-2">
          <h1
            className="font-serif-luxury italic text-4xl sm:text-6xl md:text-7xl font-normal text-rose-100 tracking-wide drop-shadow-[0_0_30px_rgba(244,114,182,0.4)]"
            style={{ fontFamily: "'Playfair Display', 'DM Serif Display', 'Cormorant Garamond', Georgia, serif" }}
          >
            Our Memories
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-rose-200/70">
            <span className="text-amber-300 text-xs">✦</span>
            <span>every moment captured in love</span>
            <span className="text-amber-300 text-xs">✦</span>
          </div>
        </div>

        {/* Grille de Polaroids : 4 colonnes sur desktop, 2 colonnes sur mobile comme sur l'image */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7 pt-6 sm:pt-10 px-1 sm:px-4">
          {GALLERY_PHOTOS.map((photo) => {
            const isLandscape = photo.id === 6;
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className={`group cursor-pointer bg-white/95 p-2 sm:p-3 pb-6 sm:pb-8 rounded-xs shadow-[0_12px_30px_rgba(0,0,0,0.65)] hover:shadow-[0_22px_50px_rgba(244,114,182,0.5)] ${photo.rotation} hover:rotate-0 hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col justify-between`}
              >
                {/* Image dans le cadre Polaroid (affichée entièrement sans coupure) */}
                <div className="relative aspect-[4/5] bg-slate-950 overflow-hidden rounded-xs flex items-center justify-center">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className={`w-full h-full ${isLandscape ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
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
              <span>UN DERNIER MOT POUR TOI 🤍</span>
              <span className="group-hover:translate-x-1.5 transition-transform text-base lg:text-lg">→</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal d'aperçu d'une photo zoomée (Affichage 100% complet de la photo sans aucun recadrage) */}
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

            {/* Photo entière 100% visible sans coupure ni rognage */}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

