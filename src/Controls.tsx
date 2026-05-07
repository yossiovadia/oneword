interface ControlsProps {
  wpm: number;
  fontSize: number;
  isPlaying: boolean;
  currentIndex: number;
  totalWords: number;
  onWpmChange: (wpm: number) => void;
  onFontSizeChange: (size: number) => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onRestart: () => void;
}

export function Controls({
  wpm,
  fontSize,
  isPlaying,
  currentIndex,
  totalWords,
  onWpmChange,
  onFontSizeChange,
  onTogglePlay,
  onReset,
  onRestart,
}: ControlsProps) {
  const progress = totalWords > 0 ? ((currentIndex + 1) / totalWords) * 100 : 0;
  const isDone = currentIndex >= totalWords - 1 && !isPlaying;

  return (
    <div className="controls">
      <div className="controls-row">
        <button className="control-btn" onClick={onTogglePlay} title="Space">
          {isPlaying ? '⏸' : '▶'}
        </button>

        {isDone && (
          <button className="control-btn" onClick={onRestart} title="Restart">
            ↻
          </button>
        )}

        <button className="control-btn" onClick={onReset} title="New text">
            ✕
        </button>
      </div>

      <div className="speed-control">
        <label>{wpm} wpm</label>
        <input
          type="range"
          min={100}
          max={1000}
          step={25}
          value={wpm}
          onChange={e => onWpmChange(Number(e.target.value))}
        />
      </div>

      <div className="speed-control">
        <label>{fontSize}px</label>
        <input
          type="range"
          min={24}
          max={120}
          step={4}
          value={fontSize}
          onChange={e => onFontSizeChange(Number(e.target.value))}
        />
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="word-count">
        {currentIndex + 1} / {totalWords}
      </div>
    </div>
  );
}
