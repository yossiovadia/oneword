import { getOrpIndex } from './orp';
import { useRef, useLayoutEffect, useState } from 'react';

interface WordDisplayProps {
  word: string;
  fontSize: number;
}

export function WordDisplay({ word, fontSize }: WordDisplayProps) {
  const orpIdx = getOrpIndex(word);
  const beforeRef = useRef<HTMLSpanElement>(null);
  const orpRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState(0);

  const before = word.slice(0, orpIdx);
  const orp = word[orpIdx];
  const after = word.slice(orpIdx + 1);

  useLayoutEffect(() => {
    if (beforeRef.current && orpRef.current) {
      const beforeWidth = beforeRef.current.offsetWidth;
      const orpWidth = orpRef.current.offsetWidth;
      setOffset(beforeWidth + orpWidth / 2);
    }
  }, [word, fontSize]);

  return (
    <div className="word-display">
      <div className="word-anchor" style={{ left: `calc(50% - ${offset}px)` }}>
        <span className="word-text" style={{ fontSize: `${fontSize}px` }}>
          <span className="word-before" ref={beforeRef}>{before}</span>
          <span className="word-orp" ref={orpRef}>{orp}</span>
          <span className="word-after">{after}</span>
        </span>
      </div>
    </div>
  );
}
