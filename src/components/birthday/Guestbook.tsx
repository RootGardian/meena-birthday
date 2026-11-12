import React, { useState, useEffect } from 'react';
import { MessageCircleHeart, Send } from 'lucide-react';
import { INITIAL_WISHES, type WishMessage } from '../../data/birthdayData';
import confetti from 'canvas-confetti';

export const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<WishMessage[]>(() => {
    try {
      const saved = localStorage.getItem('birthday_wishes_meena');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  const [sender, setSender] = useState('');
  const [relation, setRelation] = useState('Frère / Sœur');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('birthday_wishes_meena', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender.trim() || !message.trim()) return;

    const colors = [
      'bg-rose-500',
      'bg-pink-500',
      'bg-amber-500',
      'bg-indigo-500',
      'bg-emerald-500',
      'bg-purple-500'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newWish: WishMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: sender.trim(),
      relation,
      message: message.trim(),
      date: 'À l’instant',
      avatarColor: randomColor
    };

    setWishes([newWish, ...wishes]);
    setSender('');
    setMessage('');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider">
          <MessageCircleHeart className="w-3.5 h-3.5 text-rose-400" />
          <span>Livre d'or interactif</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Le Mur des Vœux & Mots Doux
        </h2>
        <p className="text-xs sm:text-sm text-rose-200/70 max-w-md mx-auto">
          Laisse un petit mot d'anniversaire qui restera gravé dans ses souvenirs.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md glow-box">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-rose-200/80 mb-1.5">
                Ton prénom / nom *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Ton grand frère"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-rose-200/30 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-rose-200/80 mb-1.5">
                Lien / Relation
              </label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full bg-[#201522] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 cursor-pointer"
              >
                <option value="Frère / Sœur">Frère / Sœur</option>
                <option value="Parents">Parents</option>
                <option value="Famille">Famille</option>
                <option value="Meilleure amie">Meilleure amie</option>
                <option value="Ami(e) proche">Ami(e) proche</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-rose-200/80 mb-1.5">
              Ton message d'anniversaire *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Écris ici ton vœu le plus chaleureux pour elle..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/15 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-rose-200/30 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publier mon message</span>
            </button>
          </div>
        </form>
      </div>

      {/* List of Messages */}
      <div className="space-y-4">
        {wishes.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-6 bg-white/[0.03] border border-white/10 rounded-2xl flex items-start gap-4 transition-all hover:bg-white/[0.06]"
          >
            <div
              className={`w-10 h-10 rounded-full ${item.avatarColor} text-white font-bold flex items-center justify-center shrink-0 shadow-md text-sm`}
            >
              {item.sender.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-rose-100">{item.sender}</h4>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-medium">
                    {item.relation}
                  </span>
                </div>
                <span className="text-[10px] text-rose-200/40 font-mono">{item.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed font-light">
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
