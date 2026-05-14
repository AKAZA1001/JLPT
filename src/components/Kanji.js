import React, { useState } from 'react';
import { kanjiData } from '../materials/kanji';
import { useAudio } from '../hooks/useAudio';

const Kanji = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selected, setSelected] = useState(null);
  const { speak } = useAudio();

  const filtered = kanjiData.filter((k) =>
    selectedLevel === 'All' || k.level === selectedLevel
  );

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#BC002D', marginBottom: '8px' }}>
          漢 Kanji — N5 & N4
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          {kanjiData.length} kanji with readings, meanings, and examples
        </p>
      </div>

      {/* Level Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['All', 'N5', 'N4'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={selectedLevel === lvl ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '13px', padding: '8px 16px' }}
          >
            {lvl} ({lvl !== 'All'
              ? kanjiData.filter((k) => k.level === lvl).length
              : kanjiData.length})
          </button>
        ))}
      </div>

      {/* Selected Kanji Detail */}
      {selected && (
        <div className="card" style={{
          padding: '24px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(188,0,45,0.1), #16213e)',
        }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{
              fontSize: '100px',
              fontFamily: 'Noto Sans JP, sans-serif',
              lineHeight: '1',
              color: '#fff',
              textShadow: '0 0 30px rgba(188,0,45,0.5)',
            }}>
              {selected.kanji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
                {selected.english}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '12px',
              }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#BC002D',
                    fontWeight: '700',
                    marginBottom: '4px',
                  }}>
                    ON Reading (音読み)
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontFamily: 'Noto Sans JP',
                    color: '#fff',
                  }}>
                    {selected.onyomi}
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{
                    fontSize: '11px',
                    color: '#e94560',
                    fontWeight: '700',
                    marginBottom: '4px',
                  }}>
                    KUN Reading (訓読み)
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontFamily: 'Noto Sans JP',
                    color: '#fff',
                  }}>
                    {selected.kunyomi}
                  </div>
                </div>
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '8px',
                padding: '10px',
                marginBottom: '12px',
              }}>
                <div style={{
                  fontSize: '11px',
                  color: '#f59e0b',
                  fontWeight: '700',
                  marginBottom: '4px',
                }}>
                  Example (例文)
                </div>
                <div style={{
                  fontSize: '14px',
                  fontFamily: 'Noto Sans JP',
                  color: '#fff',
                }}>
                  {selected.example}
                </div>
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
                <button
                  className="btn-primary"
                  onClick={() => speak(selected.kanji)}
                  style={{ fontSize: '13px', padding: '8px 16px' }}
                >
                  🔊 Hear Kanji
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => speak(selected.example.split(' ')[0])}
                  style={{ fontSize: '13px', padding: '8px 16px' }}
                >
                  🔊 Hear Example
                </button>
                <span style={{
                  fontSize: '12px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: selected.level === 'N5'
                    ? 'rgba(34,197,94,0.15)'
                    : 'rgba(188,0,45,0.15)',
                  color: selected.level === 'N5' ? '#22c55e' : '#BC002D',
                  border: `1px solid ${selected.level === 'N5'
                    ? 'rgba(34,197,94,0.3)'
                    : 'rgba(188,0,45,0.3)'}`,
                }}>
                  {selected.level} • {selected.strokes} strokes
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kanji Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '10px',
      }}>
        {filtered.map((item) => (
          <button
            key={item.kanji}
            onClick={() => { setSelected(item); speak(item.kanji); }}
            className="card"
            style={{
              padding: '16px',
              textAlign: 'center',
              border: 'none',
              cursor: 'pointer',
              background: selected?.kanji === item.kanji
                ? 'linear-gradient(135deg, rgba(188,0,45,0.3), #16213e)'
                : undefined,
              borderColor: selected?.kanji === item.kanji ? '#BC002D' : undefined,
            }}
          >
            <div style={{
              fontSize: '42px',
              fontFamily: 'Noto Sans JP, sans-serif',
              color: '#fff',
              marginBottom: '6px',
            }}>
              {item.kanji}
            </div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>
              {item.english}
            </div>
            <div style={{
              fontSize: '10px',
              color: '#6b7280',
              fontFamily: 'Noto Sans JP',
            }}>
              {item.onyomi.split('、')[0]}
            </div>
            <div style={{
              fontSize: '9px',
              marginTop: '4px',
              padding: '2px 6px',
              borderRadius: '10px',
              background: item.level === 'N5'
                ? 'rgba(34,197,94,0.1)'
                : 'rgba(188,0,45,0.1)',
              color: item.level === 'N5' ? '#22c55e' : '#BC002D',
              display: 'inline-block',
            }}>
              {item.level}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Kanji;