import React, { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: any;
  }
}

// Meek Mill - All Eyes On You ft. Chris Brown & Nicki Minaj (Clean Audio)
const YOUTUBE_VIDEO_ID = 'PK-jBvqsdJ4';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [useLocalAudio, setUseLocalAudio] = useState(false);
  const ytPlayerRef = useRef<any>(null);
  const localAudioRef = useRef<HTMLAudioElement | null>(null);

  // Vérifier d'abord si un fichier audio local est disponible dans /all-eyes-on-you.mp3 ou /music.mp3
  useEffect(() => {
    const audio = new Audio('/all-eyes-on-you.mp3');
    audio.addEventListener('canplaythrough', () => {
      setUseLocalAudio(true);
    });
    audio.addEventListener('error', () => {
      // Pas de fichier local, utilisation du lecteur YouTube haute fidélité
      setUseLocalAudio(false);
    });
    localAudioRef.current = audio;
  }, []);

  // Initialisation de l'API YouTube IFrame pour le streaming audio haute qualité en boucle
  useEffect(() => {
    if (useLocalAudio) return;

    let playerInstance: any = null;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerInstance = new window.YT.Player('yt-music-frame', {
        height: '1',
        width: '1',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            ytPlayerRef.current = event.target;
            setPlayerReady(true);
            // Tente de jouer directement
            event.target.playVideo();
            // Vérifie l'état après tentative d'autoplay
            setTimeout(() => {
              if (event.target.getPlayerState && event.target.getPlayerState() === 1) {
                setIsPlaying(true);
              }
            }, 800);
          },
          onStateChange: (event: any) => {
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              // Fin de la musique : boucle infinie immédiate
              event.target.seekTo(0);
              event.target.playVideo();
              setIsPlaying(true);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (playerInstance && playerInstance.destroy) {
        try {
          playerInstance.destroy();
        } catch {
          // ignore cleanup error
        }
      }
    };
  }, [useLocalAudio]);

  // Autoplay au premier clic/touch de l'utilisateur n'importe où sur l'écran (contourne le blocage navigateur)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying) {
        if (useLocalAudio && localAudioRef.current) {
          localAudioRef.current.loop = true;
          localAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        } else if (ytPlayerRef.current && ytPlayerRef.current.playVideo) {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlaying, useLocalAudio, playerReady]);

  return (
    <>
      {/* Lecteur YouTube invisible en arrière-plan */}
      <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none overflow-hidden">
        <div id="yt-music-frame" />
      </div>

      {/* Lecteur audio local de secours */}
      {useLocalAudio && (
        <audio ref={localAudioRef} src="/all-eyes-on-you.mp3" loop preload="auto" />
      )}
    </>
  );
};
