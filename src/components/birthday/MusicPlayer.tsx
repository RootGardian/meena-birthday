import React, { useEffect, useRef } from 'react';

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const shouldPlayRef = useRef<boolean>(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.85;

    // Fonction robuste pour démarrer la lecture
    const startAudio = () => {
      if (!shouldPlayRef.current) return;
      audio.play().catch(() => {
        // En attente d'interaction utilisateur
      });
    };

    // Tenter de jouer immédiatement
    startAudio();

    // Déverrouillage immédiat au premier geste utilisateur (tactile, clic, scroll ou appui)
    const unlockAudio = () => {
      startAudio();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('touchend', unlockAudio);
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('scroll', unlockAudio, true);
    };

    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('touchend', unlockAudio, { passive: true });
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('scroll', unlockAudio, { passive: true, capture: true });

    // Boucle continue : si la musique se termine, redémarrer instantanément
    const handleEnded = () => {
      if (shouldPlayRef.current) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    // Protection anti-coupure : si le navigateur mobile tente de mettre en pause sur un scroll ou un appui long
    const handlePause = () => {
      if (shouldPlayRef.current && !audio.ended) {
        // Reprendre la lecture immédiatement
        setTimeout(() => {
          if (shouldPlayRef.current && audio.paused) {
            audio.play().catch(() => {});
          }
        }, 50);
      }
    };

    // Quand la page redevient active (retour d'onglet ou fin d'action tactile)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && shouldPlayRef.current) {
        if (audio.paused) {
          audio.play().catch(() => {});
        }
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Watchdog régulier pour s'assurer que la musique ne s'arrête jamais en cours de route
    const watchdog = setInterval(() => {
      if (shouldPlayRef.current && audio.paused && !audio.ended) {
        audio.play().catch(() => {});
      }
    }, 1500);

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('touchend', unlockAudio);
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('scroll', unlockAudio, true);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(watchdog);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      preload="none"
      playsInline
      className="hidden pointer-events-none"
    >
      <source src="/all-eyes-on-you.mp3" type="audio/mp3" />
      <source src="/all-eyes-on-you.m4a" type="audio/mp4" />
      <source src="/all-eyes-on-you.webm" type="audio/webm" />
    </audio>
  );
};
