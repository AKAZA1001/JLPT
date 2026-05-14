import React, { useState, useMemo } from 'react';
import { allVocabulary, categories } from '../materials/vocabulary';
import { useAudio } from '../hooks/useAudio';

const Vocabulary = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRomaji, setShowRomaji] = useState(true);
  const { speak } = useAudio();

  const filtered = useMemo(() => {
    return allVocabulary.filter((v) => {
      const matchCat = selectedCategory === 'All' || v.category === selectedCategory;
      const matchLvl = selectedLevel === 'All' || v.level === selectedLevel;
      const matchSearch = !searchTerm ||
        v.word.includes(searchTerm) ||
        v.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.romaji.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchLvl && matchSearch;
    });
  }, [selectedCategory, selectedLevel, searchTerm]);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '26px',
          fontWeight: '800',
          color: '#BC002D',
          marginBottom: '8px',
        }}>
          📖 Vocabulary — N5 & N4
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          {allVocabulary.length} words with audio pronunciation
        </p>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '16px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Search words in Japanese, English, or Romaji..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            background: '#0a0a1a',
            border: '1px solid rgba(188,0,45,0.3)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '14px',
            marginBottom: '12px',
            outline: 'none',
          }}
        />

        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '8px',
          alignItems: 'center',
        }}>
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
          <div style={{ marginLeft: 'auto' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              color: '#d1d5db',
            }}>
              <input
                type="checkbox"
                checked={showRomaji}
                onChange={(e) => setShowRomaji(e.target.checked)}
                style={{ accentColor: '#BC002D' }}
              />
              Show Romaji
            </label>
          </div>
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
                borderColor: selectedCategory === cat
                  ? '#BC002D'
                  : 'rgba(188,0,45,0.3)',
                background: selectedCategory === cat
                  ? 'rgba(188,0,45,0.2)'
                  : 'transparent',
                color: selectedCategory === cat ? '#BC002D' : '#9ca3af',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
        Showing {filtered.length} words
      </div>

      {/* Vocabulary Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '12px',
      }}>
        {filtered.map((vocab, idx) => (
          <div key={idx} className="card" style={{ padding: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '8px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  fontSize: '22px',
                  fontFamily: 'Noto Sans JP, sans-serif',
                  color: '#fff',
                }}>
                  {vocab.word}
                </div>
                <button
                  className="audio-btn"
                  onClick={() => speak(vocab.word)}
                  style={{ width: '32px', height: '32px', fontSize: '14px' }}
                >
                  🔊
                </button>
              </div>
              <div style={{
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '12px',
                background: vocab.level === 'N5'
                  ? 'rgba(34,197,94,0.15)'
                  : 'rgba(188,0,45,0.15)',
                color: vocab.level === 'N5' ? '#22c55e' : '#BC002D',
                border: `1px solid ${vocab.level === 'N5'
                  ? 'rgba(34,197,94,0.3)'
                  : 'rgba(188,0,45,0.3)'}`,
                flexShrink: 0,
              }}>
                {vocab.level}
              </div>
            </div>

            {showRomaji && (
              <div style={{
                fontSize: '13px',
                color: '#BC002D',
                marginBottom: '4px',
              }}>
                {vocab.romaji}
              </div>
            )}

            <div style={{
              fontSize: '14px',
              color: '#d1d5db',
              marginBottom: '8px',
            }}>
              {vocab.english}
            </div>

            <div style={{
              fontSize: '11px',
              color: '#6b7280',
              background: 'rgba(0,0,0,0.3)',
              padding: '4px 8px',
              borderRadius: '6px',
              display: 'inline-block',
            }}>
              {vocab.category}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '48px',
          color: '#6b7280',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔍</div>
          <div>No words found. Try a different search.</div>
        </div>
      )}
    </div>
  );
};

export default Vocabulary;