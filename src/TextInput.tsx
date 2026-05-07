import { useState } from 'react';

interface TextInputProps {
  onStart: (text: string) => void;
}

export function TextInput({ onStart }: TextInputProps) {
  const [text, setText] = useState('');

  const handleStart = () => {
    if (text.trim().length > 0) {
      onStart(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();
      handleStart();
    }
  };

  return (
    <div className="text-input-view">
      <h1 className="title">OneWord</h1>
      <p className="subtitle">That's just like, literally what it is, man. One word at a time.</p>
      <textarea
        className="text-area"
        placeholder="Paste or type your text here..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button
        className="start-btn"
        onClick={handleStart}
        disabled={text.trim().length === 0}
      >
        Start Reading
      </button>
      <p className="hint">⌘ + Enter to start</p>
    </div>
  );
}
