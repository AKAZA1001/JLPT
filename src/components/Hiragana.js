import React, { useState } from 'react';
import { hiraganaData, hiraganaRows } from '../materials/hiragana';
import { useAudio } from '../hooks/useAudio';

const Hiragana = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const [mode, setMode] = useState('learn');
  const [showRomaji, setShowRomaji] = useState(true);
  const { speak, playing } = useAudio();

  const handleCharClick = (char) => {
    const found = hiraganaData.find((h) => h.kana === char);
    if (found) {
      setSelectedChar(found);
      speak(found.kana);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#BC002D', marginBottom: '8px' }}>
          あ Hiragana — Complete Guide
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          Master all 46 hiragana characters with audio pronunciation
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={() => setMode('learn')}
          className={mode === 'learn' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '13px', padding: '8px 16px' }}
        >
          📖 Learn Mode
        </button>
        <button
          onClick={() => setMode('practice')}
          className={mode === 'practice' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '13px', padding: '8px 16px' }}
        >
          ✏️ Practice Mode
        </button>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#d1d5db' }}>
          <input
            type="checkbox"
            checked={showRomaji}
            onChange={(e) => setShowRomaji(e.target.checked)}
            style={{ accentColor: '#BC002D' }}
          />
          Show Romaji
        </label>
      </div>

      {/* Selected Character Detail */}
      {selectedChar && (
        <div className="card" style={{
          padding: '24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          background: 'linear-gradient(135deg, rgba(188,0,45,0.1), #16213e)',
        }}>
          <div style={{
            fontSize: '80px',
            fontFamily: 'Noto Sans JP, sans-serif',
            lineHeight: '1',
            color: '#fff',
          }}>
            {selectedChar.kana}
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#BC002D' }}>
              {selectedChar.romaji}
            </div>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '4px' }}>
              Click any character to see details and hear pronunciation
            </p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <button
                className="btn-primary"
                onClick={() => speak(selectedChar.kana)}
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                🔊 Hear Normal Speed
              </button>
              <button
                className="btn-secondary"
                onClick={() => speak(selectedChar.kana, 'ja-JP', 0.4)}
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                🐌 Hear Slow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hiragana Grid by Rows */}
      {hiraganaRows.map((row) => (
        <div key={row.name} style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', fontWeight: '600' }}>
            {row.name}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {row.chars.map((char, idx) => {
              const data = hiraganaData.find((h) => h.kana === char);
              if (!char) return (
                <div key={idx} style={{ width: '70px', height: '70px' }} />
              );
              return (
                <button
                  key={idx}
                  onClick={() => handleCharClick(char)}
                  className="kana-card"
                  style={{
                    width: '70px',
                    minHeight: '70px',
                    border: 'none',
                    cursor: 'pointer',
                    background: selectedChar?.kana === char
                      ? 'linear-gradient(135deg, #BC002D, #e94560)'
                      : undefined,
                  }}
                >
                  <div style={{
                    fontSize: '28px',
                    fontFamily: 'Noto Sans JP, sans-serif',
                    color: '#fff',
                    lineHeight: '1',
                  }}>
                    {char}
                  </div>
                  {showRomaji && data && (
                    <div style={{ fontSize: '11px', color: '#d1d5db', marginTop: '4px' }}>
                      {data.romaji}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* All characters with Dakuten */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#BC002D', marginBottom: '16px' }}>
          All Characters with Dakuten & Combinations
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {hiraganaData.filter((h) =>
            !hiraganaRows.some((r) => r.chars.includes(h.kana))
          ).map((item) => (
            <button
              key={item.kana}
              onClick={() => { setSelectedChar(item); speak(item.kana); }}
              className="kana-card"
              style={{
                width: '70px',
                minHeight: '70px',
                border: 'none',
                cursor: 'pointer',
                background: selectedChar?.kana === item.kana
                  ? 'linear-gradient(135deg, #BC002D, #e94560)'
                  : undefined,
              }}
            >
              <div style={{ fontSize: '26px', fontFamily: 'Noto Sans JP, sans-serif', color: '#fff' }}>
                {item.kana}
              </div>
              {showRomaji && (
                <div style={{ fontSize: '11px', color: '#d1d5db', marginTop: '4px' }}>
                  {item.romaji}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="card" style={{ padding: '16px', marginTop: '24px', background: 'rgba(188,0,45,0.05)' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#BC002D', marginBottom: '8px' }}>
          💡 Study Tip
        </h4>
        <p style={{ fontSize: '13px', color: '#9ca3af' }}>
          Click each character to hear its pronunciation. Practice writing each
          character 5-10 times. Master the vowel row first (あいうえお), then go
          row by row. Use mnemonics: あ looks like an A, い looks like two i's standing.
        </p>
      </div>
    </div>
  );
};

export default Hiragana;