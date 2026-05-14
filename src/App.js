import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Hiragana from './components/Hiragana';
import Katakana from './components/Katakana';
import Vocabulary from './components/Vocabulary';
import Kanji from './components/Kanji';
import Grammar from './components/Grammar';
import Listening from './components/Listening';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';
import Progress from './components/Progress';
import AudioTest from './components/AudioTest';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('jlpt_progress');
      return saved ? JSON.parse(saved) : {
        flashcards: 0,
        quiz: 0,
        vocab: 0,
        kanji: 0,
        grammar: 0,
      };
    } catch {
      return { flashcards: 0, quiz: 0, vocab: 0, kanji: 0, grammar: 0 };
    }
  });

  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('jlpt_progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (key, amount) => {
    setProgress((prev) => ({ ...prev, [key]: (prev[key] || 0) + amount }));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':   return <Dashboard setCurrentPage={setCurrentPage} progress={progress} />;
      case 'hiragana':    return <Hiragana />;
      case 'katakana':    return <Katakana />;
      case 'vocabulary':  return <Vocabulary />;
      case 'kanji':       return <Kanji />;
      case 'grammar':     return <Grammar />;
      case 'listening':   return <Listening />;
      case 'flashcards':  return <Flashcard updateProgress={updateProgress} />;
      case 'quiz':        return <Quiz updateProgress={updateProgress} />;
      case 'progress':    return <Progress progress={progress} />;
      case 'audio':       return <AudioTest />;
      default:            return <Dashboard setCurrentPage={setCurrentPage} progress={progress} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a1a' }}>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main
        className="main-content"
        style={{
          marginLeft: '224px',
          padding: '24px',
          minHeight: '100vh',
          maxWidth: '1200px',
        }}
      >
        <div style={{ paddingTop: '8px' }}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;