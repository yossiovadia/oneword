import { useState, useCallback, useEffect, useRef } from 'react';

export interface RsvpState {
  words: string[];
  currentIndex: number;
  isPlaying: boolean;
  wpm: number;
}

export function useRsvp() {
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(300);
  const [isReading, setIsReading] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startReading = useCallback((text: string) => {
    const parsed = text.split(/\s+/).filter(w => w.length > 0);
    if (parsed.length === 0) return;
    setWords(parsed);
    setCurrentIndex(0);
    setIsPlaying(true);
    setIsReading(true);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (words.length === 0) return;
    setIsPlaying(prev => !prev);
  }, [words]);

  const stepBack = useCallback(() => {
    if (!isPlaying) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  }, [isPlaying]);

  const stepForward = useCallback(() => {
    if (!isPlaying) {
      setCurrentIndex(prev => Math.min(words.length - 1, prev + 1));
    }
  }, [isPlaying, words.length]);

  const reset = useCallback(() => {
    setWords([]);
    setCurrentIndex(0);
    setIsPlaying(false);
    setIsReading(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isPlaying && words.length > 0) {
      const ms = 60000 / wpm;
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= words.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, ms);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, wpm, words.length]);

  return {
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
  };
}
