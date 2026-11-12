import { useState, lazy, Suspense, useEffect } from 'react';
import { CountdownScreen } from './components/birthday/CountdownScreen';
import { MusicPlayer } from './components/birthday/MusicPlayer';

// Chargement différé intelligent (Code Splitting) : l'écran de compte à rebours s'affiche instantanément sur Safari
const ThirtyGiftsScreen = lazy(() =>
  import('./components/birthday/ThirtyGiftsScreen').then((m) => ({ default: m.ThirtyGiftsScreen }))
);
const OurMemoryScreen = lazy(() =>
  import('./components/birthday/OurMemoryScreen').then((m) => ({ default: m.OurMemoryScreen }))
);
const OurMemoriesGalleryScreen = lazy(() =>
  import('./components/birthday/OurMemoriesGalleryScreen').then((m) => ({ default: m.OurMemoriesGalleryScreen }))
);
const EndingScreen = lazy(() =>
  import('./components/birthday/EndingScreen').then((m) => ({ default: m.EndingScreen }))
);

type ScreenState = 'countdown' | 'gifts' | 'special-day' | 'memories-gallery' | 'ending';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('countdown');

  // Préchargement léger de l'écran suivant uniquement quand Safari est au repos
  useEffect(() => {
    const prefetchTimer = setTimeout(() => {
      import('./components/birthday/ThirtyGiftsScreen');
    }, 3500);

    return () => clearTimeout(prefetchTimer);
  }, []);

  return (
    <div className="min-h-screen bg-[#171018] text-white">
      {/* Lecteur de musique continue en arrière-plan (All Eyes On You - Meek Mill & Chris Brown) */}
      <MusicPlayer />

      <Suspense fallback={<div className="min-h-screen bg-[#171018]" />}>
        {currentScreen === 'countdown' && (
          <CountdownScreen onUnlock={() => setCurrentScreen('gifts')} />
        )}
        {currentScreen === 'gifts' && (
          <ThirtyGiftsScreen
            onBackToCountdown={() => setCurrentScreen('countdown')}
            onGoToOurMemory={() => setCurrentScreen('special-day')}
          />
        )}
        {currentScreen === 'special-day' && (
          <OurMemoryScreen
            onGoToGallery={() => setCurrentScreen('memories-gallery')}
          />
        )}
        {currentScreen === 'memories-gallery' && (
          <OurMemoriesGalleryScreen
            onBack={() => setCurrentScreen('special-day')}
            onGoToEnd={() => setCurrentScreen('ending')}
          />
        )}
        {currentScreen === 'ending' && (
          <EndingScreen />
        )}
      </Suspense>

      {/* Signature discrète en bas à droite sur chaque page */}
      <div className="fixed bottom-2.5 right-3 sm:bottom-3 sm:right-4 z-40 pointer-events-none select-none">
        <p className="text-[10px] sm:text-[11px] font-sans tracking-widest text-rose-100/45 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          Powered by <span className="font-medium text-rose-200/70">Awa Faty</span>
        </p>
      </div>
    </div>
  );
}

export default App;
