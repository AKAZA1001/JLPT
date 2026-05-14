import React from 'react';

const studyPlanData = [
  { day: '1-2', topic: 'Hiragana & Katakana', tasks: ['Learn all 46 hiragana', 'Learn all 46 katakana', 'Practice writing', 'First 50 vocab words'] },
  { day: '3-4', topic: 'Basic N5 Vocab & Grammar', tasks: ['Numbers & time', 'Basic sentences', 'Verb ます form', '100 new words'] },
  { day: '5-10', topic: 'N5 Grammar Sprint', tasks: ['Te-form mastery', 'Adjective forms', 'Permissions & requests', 'N5 practice test'] },
  { day: '11-17', topic: 'N4 Grammar Intensive', tasks: ['Potential form', 'Passive & causative', 'Conditionals', 'N4 grammar patterns'] },
  { day: '18-21', topic: 'Skills Integration', tasks: ['Reading practice', 'Listening exercises', 'Full practice tests', 'Weak area review'] },
  { day: '22-25', topic: 'Exam Preparation', tasks: ['2 full mock tests', 'Review mistakes', 'Final vocabulary pass', 'Exam day prep'] },
];

const Progress = ({ progress }) => {
  const totalItems = {
    flashcards: 200,
    quiz: 100,
    vocab: 1500,
    kanji: 300,
    grammar: 130,
  };

  const getPercentage = (key) => {
    return Math.min(100, Math.round(((progress[key] || 0) / totalItems[key]) * 100));
  };

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#BC002D', marginBottom: '8px' }}>
        📊 Your Progress
      </h1>
      <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>
        Track your JLPT N4 preparation progress
      </p>

      {/* Progress Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {[
          { key: 'flashcards', label: 'Flashcards Completed', icon: '🃏', color: '#BC002D' },
          { key: 'quiz', label: 'Quiz Questions Done', icon: '✏️', color: '#e94560' },
          { key: 'vocab', label: 'Vocabulary Studied', icon: '📖', color: '#f59e0b' },
          { key: 'kanji', label: 'Kanji Learned', icon: '漢', color: '#10b981' },
          { key: 'grammar', label: 'Grammar Points', icon: '📝', color: '#6366f1' },
        ].map((item) => (
          <div key={item.key} className="card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ fontSize: '13px', color: '#d1d5db', fontWeight: '600' }}>{item.label}</span>
              </div>
              <span style={{ fontSize: '13px', color: item.color, fontWeight: '800' }}>
                {getPercentage(item.key)}%
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${getPercentage(item.key)}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }} />
            </div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '6px' }}>
              {progress[item.key] || 0} / {totalItems[item.key]}
            </div>
          </div>
        ))}
      </div>

      {/* 25 Day Plan */}
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#BC002D', marginBottom: '16px' }}>
        📅 25-Day Study Plan Checklist
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {studyPlanData.map((phase, idx) => (
          <div key={idx} className="card" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                background: 'rgba(188,0,45,0.15)',
                border: '1px solid rgba(188,0,45,0.3)',
                borderRadius: '10px',
                padding: '8px 12px',
                textAlign: 'center',
                flexShrink: 0,
              }}>
                <div style={{ fontSize: '10px', color: '#9ca3af' }}>Day</div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: '#BC002D' }}>{phase.day}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                  {phase.topic}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {phase.tasks.map((task, tidx) => (
                    <div key={tidx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#9ca3af' }}>
                      <span style={{ color: '#BC002D', fontSize: '10px' }}>▸</span>
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exam Info */}
      <div className="card" style={{ padding: '20px', background: 'rgba(188,0,45,0.05)' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#BC002D', marginBottom: '12px' }}>
          🎯 JLPT N4 Exam Info
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            { label: 'Language Knowledge (Vocab)', time: '25 min', points: '60 pts' },
            { label: 'Language Knowledge (Grammar) + Reading', time: '55 min', points: '60 pts' },
            { label: 'Listening', time: '35 min', points: '60 pts' },
          ].map((section, idx) => (
            <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '13px', color: '#d1d5db', fontWeight: '600', marginBottom: '6px' }}>{section.label}</div>
              <div style={{ fontSize: '12px', color: '#BC002D' }}>⏱ {section.time}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>📊 {section.points}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '12px', fontSize: '13px', color: '#9ca3af' }}>
          Total: 180 points • Passing: 90 points (with minimum per section)
        </div>
      </div>
    </div>
  );
};

export default Progress;