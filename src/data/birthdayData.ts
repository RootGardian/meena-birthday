export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  year?: string;
}

export interface WishMessage {
  id: string;
  sender: string;
  relation: string;
  message: string;
  date: string;
  avatarColor: string;
}

export interface SpecialReason {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const BIRTHDAY_CONFIG = {
  sisterName: 'Meena Faty',
  nickname: 'Ma petite sœur adorée',
  targetDate: '2026-11-20T00:00:00', // Modifiable selon sa vraie date d'anniversaire
  age: 'Joyeux Anniversaire !',
  mainHeadline: 'Joyeux Anniversaire à la plus merveilleuse des sœurs !',
  subHeadline: 'Aujourd’hui, le monde célèbre une personne exceptionnelle : douce, rayonnante et irremplaçable.',
  personalLetter: `Ma chère sœur,\n\nEn ce jour si particulier, je tenais à te dédier ce petit coin du web rien que pour toi. Merci pour tous ces fous rires partagés, ton soutien infaillible et la lumière que tu apportes dans nos vies chaque jour.\n\nQue cette nouvelle année t'apporte la réussite dans tous tes projets, une santé de fer, et autant de bonheur que tu en donnes autour de toi.\n\nJe t'aime très fort ! ❤️`,
  surpriseMessage: `🎁 SURPRISE ! Tu mérites tout le bonheur du monde. Prépare-toi, une journée inoubliable et plein de belles surprises t'attendent !`
};

export const DEFAULT_MEMORIES: MemoryPhoto[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    title: 'Nos fous rires d’enfance',
    caption: 'Les souvenirs les plus précieux commencent toujours par un éclat de rire ensemble.',
    year: '2015'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    title: 'Ton magnifique sourire',
    caption: 'Ce sourire communicatif qui illumine n’importe quelle pièce où tu entres.',
    year: '2020'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    title: 'Nos aventures partagées',
    caption: 'Toujours partante pour les nouvelles aventures et les moments inoubliables.',
    year: '2023'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    title: 'Une personne rayonnante',
    caption: 'Chaque jour passé à tes côtés est une bénédiction. Reste toujours authentique.',
    year: '2026'
  }
];

export const SPECIAL_REASONS: SpecialReason[] = [
  {
    id: '1',
    icon: 'Sparkles',
    title: 'Une énergie solaire',
    description: 'Tu as ce don unique d’égayer la journée de n’importe qui en une seule phrase.'
  },
  {
    id: '2',
    icon: 'Heart',
    title: 'Un cœur en or massif',
    description: 'Ta générosité et ton attention envers ta famille et tes amis sont tout simplement incomparables.'
  },
  {
    id: '3',
    icon: 'Smile',
    title: 'La reine des fous rires',
    description: 'Avec toi, même les moments les plus simples se transforment en souvenirs hilarants.'
  },
  {
    id: '4',
    icon: 'Shield',
    title: 'Toujours là pour les siens',
    description: 'Une oreille attentive et une épaule solide sur qui l’on peut compter à 100% à toute heure.'
  }
];

export const INITIAL_WISHES: WishMessage[] = [
  {
    id: '1',
    sender: 'Ton Frère / Ta Sœur',
    relation: 'Famille',
    message: 'Joyeux anniversaire à ma complice de toujours ! Que tous tes rêves les plus fous se réalisent cette année ! 🎂✨',
    date: 'Aujourd’hui',
    avatarColor: 'bg-rose-500'
  },
  {
    id: '2',
    sender: 'Maman & Papa',
    relation: 'Parents',
    message: 'Notre fierté absolue. Joyeux anniversaire notre princesse chérie, on t’aime plus que tout au monde ! ❤️',
    date: 'Aujourd’hui',
    avatarColor: 'bg-amber-500'
  },
  {
    id: '3',
    sender: 'Aïcha',
    relation: 'Meilleure amie',
    message: 'Joyeux anniversaire à la meilleure des copines ! On fête ça dignement très vite 🎉🥂',
    date: 'Hier',
    avatarColor: 'bg-indigo-500'
  }
];
