/**
 * Fonctions de validation réutilisables pour les formulaires
 */

export const validators = {
  required: (value: any, message = 'Ce champ est obligatoire'): string | null => {
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
      return message;
    }
    return null;
  },

  email: (value: string, message = 'Adresse email invalide'): string | null => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : message;
  },

  minLength: (min: number, message?: string) => (value: string): string | null => {
    if (!value) return null;
    return value.length >= min
      ? null
      : message || `Ce champ doit contenir au moins ${min} caractères`;
  },

  maxLength: (max: number, message?: string) => (value: string): string | null => {
    if (!value) return null;
    return value.length <= max
      ? null
      : message || `Ce champ ne doit pas dépasser ${max} caractères`;
  }
};

