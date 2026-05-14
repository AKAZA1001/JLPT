import React from 'react';

const stats = [
  { label: 'Hiragana', total: 46, icon: 'あ', color: '#BC002D' },
  { label: 'Katakana', total: 46, icon: 'ア', color: '#e94560' },
  { label: 'N5 Vocab', total: 800, icon: '📖', color: '#f59e0b' },
  { label: 'N4 Vocab', total: 1500, icon: '📚', color: '#10b981' },
  { label: 'Kanji', total: 300, icon: '漢', color: '#6366f1' },
  { label: 'Grammar', total: 130, icon: '📝', color: '#ec4899' },
];

const studyPlan = [
  { day: '1-2', topic: 'Hiragana & Katakana', icon: 'あ' },
  { day: '3-4', topic: 'Basic N5 Vocab & Grammar', icon: '📖' },
  { day: '5-10', topic: 'N5 Grammar Sprint', icon: '🔥' },
  { day: '11-17', topic: 'N4 Grammar Intensive', icon: '⚡' },
  { day: '18-21', topic: 'Skills Integration', icon: '🎯' },
  { day: '22-25', topic: 'Exam Preparation', icon: '✅' },
];

const quickLinks = [
  { label: 'Learn Hiragana', page: 'hiragana', icon: 'あ', desc: '46 characters' },
  { label: 'Learn Katakana', page: 'katakana', icon: 'ア', desc: '46 characters' },
  { label: 'Vocabulary', page: 'vocabulary', icon: '📖', desc: '1500+ words' },
  { label: 'Kanji', page: 'kanji', icon: '漢', desc: '300 kanji' },
  { label: 'Grammar', page: 'grammar', icon: '📝', desc: '130 patterns' },
  { label: 'Flashcards', page: 'flashcards', icon: '🃏', desc: 'SRS practice' },
  { label: 'Quiz Mode', page: 'quiz', icon: '✏️', desc: 'Test yourself' },
  { label: 'Listening', page: 'listening', icon: '🎧', desc: 'Audio practice' },
];

const Dashboard = ({ setCurrentPage, progress }) => {
  const totalStudied = Object.values(progress).reduce((a, b) => a + b, 0);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #BC002D 0%, #1a1a2e 60%)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '20px', top: '10px', fontSize: '100px', opacity: '0.1' }}>🇯🇵</div>
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
          JLPT N4 Master App 🎌
        </h1>
        <p style={{ color: '#d1d5db', fontSize: '15px', marginBottom: '20px' }}>
          Complete Japanese N4 preparation — Hiragana to Grammar
        </p>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>{totalStudied}</div>
            <div style={{ color: '#9ca3af', fontSize: '12px' }}>Items Studied</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>25</div>
            <div style={{ color: '#9ca3af', fontSize: '12px' }}>Day Plan</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>N4</div>
            <div style={{ color: '#9ca3af', fontSize: '12px' }}>Target Level</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {stats.map((stat) => (
          <div key={stat.label} className="card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>{stat.icon}</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: stat.color }}>{stat.total}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Start */}
      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#BC002D' }}>
        🚀 Quick Start
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {quickLinks.map((link) => (
          <button
            key={link.page}
            onClick={() => setCurrentPage(link.page)}
            className="card"
            style={{ padding: '20px', textAlign: 'center', border: 'none', cursor: 'pointer', color: '#fff' }}
          >
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{link.icon}</div>
            <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{link.label}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{link.desc}</div>
          </button>
        ))}
      </div>

      {/* 25 Day Plan */}
      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#BC002D' }}>
        📅 25-Day Study Plan
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {studyPlan.map((item, idx) => (
          <div key={idx} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(188,0,45,0.15)',
              border: '1px solid rgba(188,0,45,0.3)',
              borderRadius: '10px',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#BC002D', fontWeight: '600' }}>Day {item.day}</div>
              <div style={{ fontSize: '13px', color: '#e5e7eb' }}>{item.topic}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: '#BC002D' }}>
          💡 Daily Study Tips
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
          {[
            'Study 6-8 hours daily for 25 days',
            'Use the audio button on every card',
            'Take quizzes after each section',
            'Review flashcards every morning',
            'Sleep 7+ hours for memory consolidation',
            'Label objects in Japanese at home',
          ].map((tip, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px' }}>
              <span style={{ color: '#BC002D', fontSize: '16px', flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: '13px', color: '#d1d5db' }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;