import { useState } from 'react';

type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string | null;
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

/**
 * Hook personnalisé générique pour gérer les formulaires et leur validation
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    // Efface l'erreur dès que l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    if (!validationRules) return true;

    const newErrors: FormErrors<T> = {};
    let isValid = true;

    for (const key in validationRules) {
      const rule = validationRules[key];
      if (rule) {
        const error = rule(values[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (onSubmit: (values: T) => Promise<void> | void) => {
    return async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (!validate()) return;

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    };
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
}

