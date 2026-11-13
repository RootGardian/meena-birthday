import { useState } from 'react';
import { CountdownScreen } from './components/birthday/CountdownScreen';
import { ThirtyGiftsScreen } from './components/birthday/ThirtyGiftsScreen';
import { OurMemoryScreen } from './components/birthday/OurMemoryScreen';
import { OurMemoriesGalleryScreen } from './components/birthday/OurMemoriesGalleryScreen';
import { EndingScreen } from './components/birthday/EndingScreen';
import { MusicPlayer } from './components/birthday/MusicPlayer';

type ScreenState = 'countdown' | 'gifts' | 'special-day' | 'memories-gallery' | 'ending';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('countdown');
  const [journeyKey, setJourneyKey] = useState(0);

  const handleRestartJourney = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    // Redémarrer la musique au début
    window.dispatchEvent(new CustomEvent('birthday-restart-music'));
    // Réinitialiser complètement les composants et la mémoire des cadeaux ouverts
    setJourneyKey((k) => k + 1);
    setCurrentScreen('countdown');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className={`min-h-screen bg-[#171018] text-white ${currentScreen === 'countdown' ? 'h-screen h-[100dvh] overflow-hidden' : ''}`}>
      {/* Lecteur de musique continue en arrière-plan (All Eyes On You - Meek Mill & Chris Brown) */}
      <MusicPlayer />

      {currentScreen === 'countdown' && (
        <CountdownScreen
          key={`countdown-${journeyKey}`}
          onUnlock={() => setCurrentScreen('gifts')}
        />
      )}
      {currentScreen === 'gifts' && (
        <ThirtyGiftsScreen
          key={`gifts-${journeyKey}`}
          onBackToCountdown={() => setCurrentScreen('countdown')}
          onGoToOurMemory={() => setCurrentScreen('special-day')}
        />
      )}
      {currentScreen === 'special-day' && (
        <OurMemoryScreen
          key={`memory-${journeyKey}`}
          onGoToGallery={() => setCurrentScreen('memories-gallery')}
        />
      )}
      {currentScreen === 'memories-gallery' && (
        <OurMemoriesGalleryScreen
          key={`gallery-${journeyKey}`}
          onBack={() => setCurrentScreen('special-day')}
          onGoToEnd={() => setCurrentScreen('ending')}
        />
      )}
      {currentScreen === 'ending' && (
        <EndingScreen
          key={`ending-${journeyKey}`}
          onRestart={handleRestartJourney}
        />
      )}

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
