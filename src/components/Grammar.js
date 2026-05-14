import React, { useState } from 'react';
import { grammarData } from '../materials/grammar';
import { useAudio } from '../hooks/useAudio';

const Grammar = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const { speak } = useAudio();

  const categories = ['All', ...new Set(grammarData.map((g) => g.category))];

  const filtered = grammarData.filter((g) => {
    const matchLvl = selectedLevel === 'All' || g.level === selectedLevel;
    const matchCat = selectedCategory === 'All' || g.category === selectedCategory;
    return matchLvl && matchCat;
  });

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#BC002D', marginBottom: '8px' }}>
          📝 Grammar — N5 & N4 Patterns
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          {grammarData.length} grammar patterns with examples and audio
        </p>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {['All', 'N5', 'N4'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={selectedLevel === lvl ? 'btn-primary' : 'btn-secondary'}
              style={{ fontSize: '12px', padding: '6px 14px' }}
            >
              {lvl}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                borderRadius: '20px',
                border: '1px solid',
                cursor: 'pointer',
                borderColor: selectedCategory === cat ? '#BC002D' : 'rgba(188,0,45,0.3)',
                background: selectedCategory === cat ? 'rgba(188,0,45,0.2)' : 'transparent',
                color: selectedCategory === cat ? '#BC002D' : '#9ca3af',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
        {filtered.length} patterns shown
      </div>

      {/* Grammar Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((grammar) => (
          <div key={grammar.id} className="card" style={{ overflow: 'hidden' }}>
            <button
              onClick={() => setExpanded(expanded === grammar.id ? null : grammar.id)}
              style={{
                width: '100%',
                padding: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  background: 'rgba(188,0,45,0.15)',
                  border: '1px solid rgba(188,0,45,0.3)',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  fontSize: '13px',
                  color: '#BC002D',
                  fontWeight: '700',
                  fontFamily: 'Noto Sans JP, sans-serif',
                  whiteSpace: 'nowrap',
                }}>
                  {grammar.pattern}
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#e5e7eb', fontWeight: '600' }}>
                    {grammar.meaning}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>
                    {grammar.category} • {grammar.level}
                  </div>
                </div>
              </div>
              <div style={{
                fontSize: '18px',
                color: '#BC002D',
                transform: expanded === grammar.id ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s ease',
              }}>
                ▼
              </div>
            </button>

            {expanded === grammar.id && (
              <div style={{ padding: '0 16px 16px', borderTop: '1px solid rgba(188,0,45,0.1)' }}>
                <div style={{ marginTop: '14px', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '13px', color: '#BC002D', marginBottom: '6px', fontWeight: '700' }}>
                    📖 Explanation
                  </h4>
                  <p style={{ fontSize: '13px', color: '#d1d5db', lineHeight: '1.6' }}>
                    {grammar.explanation}
                  </p>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '13px', color: '#BC002D', marginBottom: '10px', fontWeight: '700' }}>
                    💬 Examples
                  </h4>
                  {grammar.examples.map((ex, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                      padding: '12px',
                      marginBottom: '8px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{
                          fontSize: '15px',
                          fontFamily: 'Noto Sans JP, sans-serif',
                          color: '#fff',
                        }}>
                          {ex.japanese}
                        </span>
                        <button
                          className="audio-btn"
                          onClick={() => speak(ex.japanese)}
                          style={{ width: '28px', height: '28px', fontSize: '12px' }}
                        >
                          🔊
                        </button>
                      </div>
                      <div style={{ fontSize: '12px', color: '#BC002D', marginBottom: '2px' }}>
                        {ex.romaji}
                      </div>
                      <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                        {ex.english}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                }}>
                  <div style={{ fontSize: '12px', color: '#f59e0b', fontWeight: '700', marginBottom: '4px' }}>
                    💡 Study Tip
                  </div>
                  <div style={{ fontSize: '12px', color: '#d1d5db' }}>
                    {grammar.tip}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grammar;