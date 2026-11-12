import React, { useState } from 'react';
import { Heart, Sparkles, Star, Smile, Shield } from 'lucide-react';
import { SPECIAL_REASONS } from '../../data/birthdayData';

export const ReasonsFlipCards: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-400 fill-current" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-yellow-400" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-indigo-400" />;
      default:
        return <Star className="w-5 h-5 text-pink-400" />;
    }
  };

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
          <span>Ce qui te rend unique</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Pourquoi tu es la meilleure des sœurs
        </h2>
        <p className="text-xs sm:text-sm text-rose-200/70 max-w-md mx-auto">
          Clique sur chaque carte pour dévoiler une de tes plus belles qualités.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SPECIAL_REASONS.map((item) => {
          const isSelected = activeCard === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveCard(isSelected ? null : item.id)}
              className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[190px] ${
                isSelected
                  ? 'bg-rose-950/70 border-rose-500/60 shadow-xl shadow-rose-500/10 scale-105'
                  : 'bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
              }`}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-semibold text-base text-rose-100">
                  {item.title}
                </h3>
              </div>

              <div className="pt-2">
                <p className="text-xs text-rose-200/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

