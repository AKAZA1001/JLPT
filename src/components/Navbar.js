import React, { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'hiragana', label: 'Hiragana', icon: 'あ' },
  { id: 'katakana', label: 'Katakana', icon: 'ア' },
  { id: 'vocabulary', label: 'Vocabulary', icon: '📖' },
  { id: 'kanji', label: 'Kanji', icon: '漢' },
  { id: 'grammar', label: 'Grammar', icon: '📝' },
  { id: 'listening', label: 'Listening', icon: '🎧' },
  { id: 'flashcards', label: 'Flashcards', icon: '🃏' },
  { id: 'quiz', label: 'Quiz', icon: '✏️' },
  { id: 'progress', label: 'Progress', icon: '📊' },
];

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sidebar fixed left-0 top-0 h-full w-56 z-40"
        style={{
          background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)',
          borderRight: '1px solid rgba(188,0,45,0.2)',
        }}
      >
        {/* Logo */}
        <div className="p-4 mb-4" style={{ borderBottom: '1px solid rgba(188,0,45,0.2)' }}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '28px' }}>🇯🇵</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#BC002D' }}>JLPT N4</div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Master Japanese</div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`nav-item w-full mb-1 ${currentPage === item.id ? 'active' : ''}`}
              style={{ border: 'none', background: currentPage === item.id ? 'rgba(188,0,45,0.15)' : 'transparent' }}
            >
              <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div style={{
            background: 'rgba(188,0,45,0.1)',
            border: '1px solid rgba(188,0,45,0.2)',
            borderRadius: '10px',
            padding: '12px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '20px' }}>🎯</div>
            <div style={{ fontSize: '11px', color: '#BC002D', fontWeight: '600' }}>JLPT N4</div>
            <div style={{ fontSize: '10px', color: '#6b7280' }}>25-Day Challenge</div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: '#0a0a1a', borderBottom: '1px solid rgba(188,0,45,0.2)' }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '24px' }}>🇯🇵</span>
          <span style={{ fontWeight: '700', color: '#BC002D' }}>JLPT N4</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: '#BC002D', fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-14"
          style={{ background: '#0a0a1a' }}
        >
          <nav className="p-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setMobileOpen(false); }}
                className={`nav-item w-full mb-2 ${currentPage === item.id ? 'active' : ''}`}
                style={{ border: 'none', fontSize: '16px', background: currentPage === item.id ? 'rgba(188,0,45,0.15)' : 'transparent' }}
              >
                <span style={{ fontSize: '20px', width: '30px', textAlign: 'center' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;