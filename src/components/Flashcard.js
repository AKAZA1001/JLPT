import React, { useState, useMemo } from 'react';
import { allVocabulary } from '../materials/vocabulary';
import { kanjiData } from '../materials/kanji';
import { useAudio } from '../hooks/useAudio';

const Flashcard = ({ updateProgress }) => {
  const [mode, setMode] = useState('vocab'); // 'vocab' | 'kanji'
  const [level, setLevel] = useState('All');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, wrong: 0, skipped: 0 });
  const [sessionCards, setSessionCards] = useState([]);
  const [sessionStarted, setSessionStarted] = useState(false);
  const { speak } = useAudio();

  const availableCards = useMemo(() => {
    if (mode === 'vocab') {
      return allVocabulary.filter((v) => level === 'All' || v.level === level);
    } else {
      return kanjiData.filter((k) => level === 'All' || k.level === level);
    }
  }, [mode, level]);

  const startSession = () => {
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5).slice(0, 20);
    setSessionCards(shuffled);
    setCurrentIdx(0);
    setFlipped(false);
    setScore({ correct: 0, wrong: 0, skipped: 0 });
    setSessionStarted(true);
  };

  const currentCard = sessionCards[currentIdx];

  const handleAnswer = (result) => {
    setScore((prev) => ({ ...prev, [result]: prev[result] + 1 }));
    if (result === 'correct') updateProgress('flashcards', 1);
    setFlipped(false);
    setTimeout(() => {
      if (currentIdx < sessionCards.length - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        setSessionStarted(false);
      }
    }, 300);
  };

  const speakCurrent = () => {
    if (!currentCard) return;
    if (mode === 'vocab') {
      speak(currentCard.word);
    } else {
      speak(currentCard.kanji);
    }
  };

  if (!sessionStarted) {
    return (
      <div className="animate-fade-in">
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#BC002D', marginBottom: '8px' }}>
          🃏 Flashcard Study
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>
          SRS-style flashcards for vocabulary and kanji
        </p>

        {/* Score Summary */}
        {(score.correct > 0 || score.wrong > 0) && (
          <div className="card" style={{ padding: '20px', marginBottom: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>📊 Session Complete!</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#22c55e' }}>{score.correct}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>Correct ✓</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#ef4444' }}>{score.wrong}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>Wrong ✗</div>
              </div>
              <div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#f59e0b' }}>{score.skipped}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>Skipped →</div>
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#d1d5db', marginTop: '12px' }}>
              Accuracy: {score.correct + score.wrong > 0
                ? Math.round((score.correct / (score.correct + score.wrong)) * 100)
                : 0}%
            </div>
          </div>
        )}

        {/* Setup */}
        <div className="card" style={{ padding: '24px', maxWidth: '480px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Configure Session</h3>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>Card Type</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setMode('vocab')} className={mode === 'vocab' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1, fontSize: '13px' }}>
                📖 Vocabulary
              </button>
              <button onClick={() => setMode('kanji')} className={mode === 'kanji' ? 'btn-primary' : 'btn-secondary'} style={{ flex: 1, fontSize: '13px' }}>
                漢 Kanji
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>Level</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'N5', 'N4'].map((lvl) => (
                <button key={lvl} onClick={() => setLevel(lvl)}
                  className={level === lvl ? 'btn-primary' : 'btn-secondary'}
                  style={{ flex: 1, fontSize: '13px' }}>
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px', textAlign: 'center' }}>
            {availableCards.length} cards available • Session: 20 cards (shuffled)
          </div>

          <button className="btn-primary" onClick={startSession} style={{ width: '100%', fontSize: '15px', padding: '12px' }}>
            🚀 Start Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#BC002D' }}>🃏 Flashcards</h1>
        <div style={{ display: 'flex', gap: '12px', fontSize: '13px' }}>
          <span style={{ color: '#22c55e' }}>✓ {score.correct}</span>
          <span style={{ color: '#ef4444' }}>✗ {score.wrong}</span>
          <span style={{ color: '#9ca3af' }}>→ {score.skipped}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="progress-bar" style={{ marginBottom: '16px' }}>
        <div className="progress-fill" style={{ width: `${((currentIdx) / sessionCards.length) * 100}%` }} />
      </div>
      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '24px' }}>
        Card {currentIdx + 1} of {sessionCards.length}
      </div>

      {/* Flashcard */}
      {currentCard && (
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div
            className={`flashcard ${flipped ? 'flipped' : ''}`}
            onClick={() => { setFlipped(!flipped); if (!flipped) speakCurrent(); }}
            style={{ marginBottom: '20px' }}
          >
            <div className="flashcard-inner">
              {/* Front */}
              <div className="flashcard-front">
                {mode === 'vocab' ? (
                  <>
                    <div style={{ fontSize: '48px', fontFamily: 'Noto Sans JP', color: '#fff', marginBottom: '8px' }}>
                      {currentCard.word}
                    </div>
                    <div style={{ fontSize: '14px', color: '#BC002D' }}>{currentCard.category} • {currentCard.level}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '12px' }}>Click to reveal answer</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '80px', fontFamily: 'Noto Sans JP', color: '#fff' }}>
                      {currentCard.kanji}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '12px' }}>Click to reveal answer</div>
                  </>
                )}
              </div>
              {/* Back */}
              <div className="flashcard-back">
                {mode === 'vocab' ? (
                  <>
                    <div style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>{currentCard.english}</div>
                    <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>{currentCard.romaji}</div>
                    <div style={{ fontSize: '14px', fontFamily: 'Noto Sans JP', color: 'rgba(255,255,255,0.6)' }}>
                      {currentCard.word}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>{currentCard.english}</div>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>ON: {currentCard.onyomi}</div>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>KUN: {currentCard.kunyomi}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Noto Sans JP' }}>
                      {currentCard.example}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Audio & Actions */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            <button className="audio-btn" onClick={speakCurrent} style={{ width: '44px', height: '44px', fontSize: '18px' }}>🔊</button>
          </div>

          {/* Answer Buttons */}
          {flipped && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <button
                onClick={() => handleAnswer('wrong')}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(239,68,68,0.3)',
                  background: 'rgba(239,68,68,0.1)',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '700',
                }}
              >
                ✗ Wrong
              </button>
              <button
                onClick={() => handleAnswer('skipped')}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(156,163,175,0.3)',
                  background: 'rgba(156,163,175,0.1)',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '700',
                }}
              >
                → Skip
              </button>
              <button
                onClick={() => handleAnswer('correct')}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(34,197,94,0.3)',
                  background: 'rgba(34,197,94,0.1)',
                  color: '#22c55e',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '700',
                }}
              >
                ✓ Correct
              </button>
            </div>
          )}

          {!flipped && (
            <div style={{ textAlign: 'center' }}>
              <button
                className="btn-secondary"
                onClick={() => handleAnswer('skipped')}
                style={{ fontSize: '13px', padding: '10px 24px' }}
              >
                → Skip Card
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Flashcard;