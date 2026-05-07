import { useEffect, useState } from 'react';
import { useRsvp } from './useRsvp';
import { TextInput } from './TextInput';
import { WordDisplay } from './WordDisplay';
import { Controls } from './Controls';
import './App.css';

function App() {
  const {
    words,
    currentIndex,
    isPlaying,
    wpm,
    isReading,
    setWpm,
    startReading,
    togglePlayPause,
    stepBack,
    stepForward,
    reset,
    restart,
  } = useRsvp();

  const [fontSize, setFontSize] = useState(48);

  useEffect(() => {
    if (!isReading) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        stepBack();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        stepForward();
      } else if (e.code === 'Escape') {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReading, togglePlayPause, stepBack, stepForward, reset]);

  if (!isReading) {
    return <TextInput onStart={startReading} />;
  }

  return (
    <div className="reader-view">
      <div className="focus-box">
        <WordDisplay word={words[currentIndex] || ''} fontSize={fontSize} />
      </div>
      <Controls
        wpm={wpm}
        fontSize={fontSize}
        isPlaying={isPlaying}
        currentIndex={currentIndex}
        totalWords={words.length}
        onWpmChange={setWpm}
        onFontSizeChange={setFontSize}
        onTogglePlay={togglePlayPause}
        onReset={reset}
        onRestart={restart}
      />
    </div>
  );
}

export default App;
