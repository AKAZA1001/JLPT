import React, { useState } from 'react';
import { katakanaData, katakanaWords } from '../materials/katakana';
import { useAudio } from '../hooks/useAudio';

const Katakana = () => {
  const [selected, setSelected] = useState(null);
  const [showRomaji, setShowRomaji] = useState(true);
  const { speak } = useAudio();

  const handleClick = (item) => {
    setSelected(item);
    speak(item.kana);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#BC002D', marginBottom: '8px' }}>
          ア Katakana — Complete Guide
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          All 46 katakana characters with audio. Used for foreign words.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', color: '#d1d5db' }}>
          <input
            type="checkbox"
            checked={showRomaji}
            onChange={(e) => setShowRomaji(e.target.checked)}
            style={{ accentColor: '#BC002D' }}
          />
          Show Romaji
        </label>
      </div>

      {/* Selected */}
      {selected && (
        <div className="card" style={{
          padding: '24px',
          marginBottom: '24px',
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: '80px', fontFamily: 'Noto Sans JP', color: '#fff' }}>
            {selected.kana}
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#BC002D' }}>
              {selected.romaji}
            </div>
            {selected.hiragana && (
              <div style={{ fontSize: '18px', color: '#9ca3af', fontFamily: 'Noto Sans JP' }}>
                Hiragana equivalent: {selected.hiragana}
              </div>
            )}
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <button
                className="btn-primary"
                onClick={() => speak(selected.kana)}
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                🔊 Hear It
              </button>
              <button
                className="btn-secondary"
                onClick={() => speak(selected.kana, 'ja-JP', 0.4)}
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                🐌 Slow
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {katakanaData.map((item) => (
          <button
            key={item.kana}
            onClick={() => handleClick(item)}
            className="kana-card"
            style={{
              width: '70px',
              minHeight: '70px',
              border: 'none',
              cursor: 'pointer',
              background: selected?.kana === item.kana
                ? 'linear-gradient(135deg, #BC002D, #e94560)'
                : undefined,
            }}
          >
            <div style={{ fontSize: '26px', fontFamily: 'Noto Sans JP', color: '#fff' }}>
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

      {/* Loan Words */}
      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#BC002D', marginBottom: '16px' }}>
        🌍 Common Loan Words (外来語)
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
        {katakanaWords.map((word, idx) => (
          <div key={idx} className="card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '18px', fontFamily: 'Noto Sans JP', color: '#fff', marginBottom: '2px' }}>
                {word.kana}
              </div>
              <div style={{ fontSize: '12px', color: '#BC002D', marginBottom: '2px' }}>
                {word.romaji}
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                {word.english}
              </div>
            </div>
            <button
              className="audio-btn"
              onClick={() => speak(word.kana)}
              style={{ fontSize: '16px' }}
            >
              🔊
            </button>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className="card" style={{ padding: '16px', marginTop: '24px', background: 'rgba(188,0,45,0.05)' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#BC002D', marginBottom: '8px' }}>
          💡 Study Tip
        </h4>
        <p style={{ fontSize: '13px', color: '#9ca3af' }}>
          Katakana is mainly used for foreign loan words, foreign names, and 
          emphasis. Once you know hiragana, katakana follows the same sounds.
          Practice by reading product labels and menus!
        </p>
      </div>
    </div>
  );
};

export default Katakana;