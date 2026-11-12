import React, { useState } from 'react';
import { Camera, Eye, X } from 'lucide-react';
import { DEFAULT_MEMORIES, type MemoryPhoto } from '../../data/birthdayData';

export const MemoryGallery: React.FC = () => {
  const [memories] = useState<MemoryPhoto[]>(DEFAULT_MEMORIES);
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 text-xs font-semibold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>Galerie des Souvenirs</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Nos Plus Beaux Instants
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Les années passent, mais les souvenirs partagés restent gravés pour toujours.
        </p>
      </div>

      {/* Grid of Photo Polaroids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {memories.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="inline-flex items-center gap-1 text-xs text-white font-medium bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Agrandir</span>
                </span>
              </div>
              {photo.year && (
                <span className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full shadow-xs text-slate-800 dark:text-slate-200">
                  {photo.year}
                </span>
              )}
            </div>

            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-500 transition-colors">
                {photo.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Preview Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white text-slate-700 dark:text-slate-200 shadow-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/3] bg-black">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {activePhoto.title}
                </h3>
                {activePhoto.year && (
                  <span className="text-xs font-mono bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 px-3 py-1 rounded-full font-semibold">
                    Année {activePhoto.year}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
