import React, { useState, useMemo } from 'react';
import { allVocabulary } from '../materials/vocabulary';
import { grammarData } from '../materials/grammar';
import { kanjiData } from '../materials/kanji';
import { useAudio } from '../hooks/useAudio';

// ... rest of the Quiz component code stays exactly the same
// Only the imports at the top changed

const generateVocabQuestions = (items, count = 10) => {
  const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, count);
  return shuffled.map((item) => {
    const wrong = items
      .filter((v) => v.english !== item.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((v) => v.english);
    const options = [...wrong, item.english].sort(() => Math.random() - 0.5);
    return {
      question: item.word,
      questionSub: item.romaji,
      correct: item.english,
      options,
      type: 'vocab',
      audio: item.word,
    };
  });
};

const generateKanjiQuestions = (items, count = 10) => {
  const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, count);
  return shuffled.map((item) => {
    const wrong = items
      .filter((k) => k.english !== item.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((k) => k.english);
    const options = [...wrong, item.english].sort(() => Math.random() - 0.5);
    return {
      question: item.kanji,
      questionSub: `${item.onyomi} / ${item.kunyomi}`,
      correct: item.english,
      options,
      type: 'kanji',
      audio: item.kanji,
    };
  });
};

const generateGrammarQuestions = (items, count = 10) => {
  const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, count);
  return shuffled.map((item) => {
    const wrong = items
      .filter((g) => g.meaning !== item.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((g) => g.meaning);
    const options = [...wrong, item.meaning].sort(() => Math.random() - 0.5);
    return {
      question: item.pattern,
      questionSub: item.examples[0]?.japanese || '',
      correct: item.meaning,
      options,
      type: 'grammar',
      audio: item.examples[0]?.japanese || item.pattern,
    };
  });
};

const Quiz = ({ updateProgress }) => {
  const [quizType, setQuizType] = useState('vocab');
  const [level, setLevel] = useState('All');
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const { speak } = useAudio();

  const startQuiz = () => {
    let qs = [];
    const filteredVocab = allVocabulary.filter((v) => level === 'All' || v.level === level);
    const filteredKanji = kanjiData.filter((k) => level === 'All' || k.level === level);
    const filteredGrammar = grammarData.filter((g) => level === 'All' || g.level === level);

    if (quizType === 'vocab') qs = generateVocabQuestions(filteredVocab, 10);
    else if (quizType === 'kanji') qs = generateKanjiQuestions(filteredKanji, 10);
    else if (quizType === 'grammar') qs = generateGrammarQuestions(filteredGrammar, 10);
    else {
      const v = generateVocabQuestions(filteredVocab, 4);
      const k = generateKanjiQuestions(filteredKanji, 3);
      const g = generateGrammarQuestions(filteredGrammar, 3);
      qs = [...v, ...k, ...g].sort(() => Math.random() - 0.5);
    }

    setQuestions(qs);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setQuizStarted(true);
  };

  const handleAnswer = (option) => {
    if (selected) return;
    setSelected(option);
    const isCorrect = option === questions[currentQ].correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      updateProgress('quiz', 1);
    }
    setAnswers((prev) => [...prev, { question: questions[currentQ], selected: option, correct: isCorrect }]);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    } else {
      setFinished(true);
      setQuizStarted(false);
    }
  };

  const getScoreColor = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 80) return '#22c55e';
    if (pct >= 60) return '#f59e0b';
    return '#ef4444';
  };

  if (finished) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>
            {score / questions.length >= 0.8 ? '🎉' : score / questions.length >= 0.6 ? '📚' : '💪'}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>Quiz Complete!</h2>
          <div style={{ fontSize: '48px', fontWeight: '900', color: getScoreColor(), marginBottom: '8px' }}>
            {score}/{questions.length}
          </div>
          <div style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '20px' }}>
            {Math.round((score / questions.length) * 100)}% correct
          </div>
          <div style={{ fontSize: '14px', color: '#d1d5db', marginBottom: '24px' }}>
            {score === questions.length ? '🌟 Perfect! すばらしい！' :
              score / questions.length >= 0.8 ? '🎊 Excellent work! よくできました！' :
                score / questions.length >= 0.6 ? '📖 Good job! Keep studying! がんばって！' :
                  '💪 Keep practicing! 練習しましょう！'}
          </div>
          <button className="btn-primary" onClick={() => { setFinished(false); setQuizStarted(false); }} style={{ marginRight: '10px', fontSize: '14px' }}>
            🔄 New Quiz
          </button>
          <button className="btn-secondary" onClick={startQuiz} style={{ fontSize: '14px' }}>
            ↺ Retry Same
          </button>
        </div>

        {/* Review Answers */}
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#BC002D', marginBottom: '12px' }}>
          📋 Review Answers
        </h3>
        {answers.map((ans, idx) => (
          <div key={idx} className="card" style={{
            padding: '14px',
            marginBottom: '8px',
            borderColor: ans.correct ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '18px', fontFamily: 'Noto Sans JP', color: '#fff', marginBottom: '4px' }}>
                  {idx + 1}. {ans.question.question}
                </div>
                <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '4px' }}>
                  Your answer: <span style={{ color: ans.correct ? '#22c55e' : '#ef4444' }}>{ans.selected}</span>
                </div>
                {!ans.correct && (
                  <div style={{ fontSize: '13px', color: '#22c55e' }}>
                    Correct: {ans.question.correct}
                  </div>
                )}
              </div>
              <span style={{ fontSize: '20px' }}>{ans.correct ? '✅' : '❌'}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="animate-fade-in">
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#BC002D', marginBottom: '8px' }}>
          ✏️ Quiz Mode
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>
          Test your knowledge of vocabulary, kanji, and grammar
        </p>

        <div className="card" style={{ padding: '24px', maxWidth: '480px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Configure Quiz</h3>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>Quiz Type</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { id: 'vocab', label: '📖 Vocabulary' },
                { id: 'kanji', label: '漢 Kanji' },
                { id: 'grammar', label: '📝 Grammar' },
                { id: 'mixed', label: '🎯 Mixed' },
              ].map((type) => (
                <button key={type.id} onClick={() => setQuizType(type.id)}
                  className={quizType === type.id ? 'btn-primary' : 'btn-secondary'}
                  style={{ fontSize: '13px', padding: '10px' }}>
                  {type.label}
                </button>
              ))}
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

          <div style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center', marginBottom: '16px' }}>
            10 questions • Multiple choice • Instant feedback
          </div>

          <button className="btn-primary" onClick={startQuiz} style={{ width: '100%', fontSize: '15px', padding: '12px' }}>
            🚀 Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '560px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', color: '#9ca3af' }}>
          Question {currentQ + 1} / {questions.length}
        </div>
        <div style={{ fontSize: '14px', color: '#22c55e' }}>Score: {score}</div>
      </div>

      {/* Progress */}
      <div className="progress-bar" style={{ marginBottom: '24px' }}>
        <div className="progress-fill" style={{ width: `${(currentQ / questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="card" style={{ padding: '28px', marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
          {q.type.toUpperCase()}
        </div>
        <div style={{ fontSize: '48px', fontFamily: 'Noto Sans JP', color: '#fff', marginBottom: '8px' }}>
          {q.question}
        </div>
        {q.questionSub && (
          <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '12px', fontFamily: 'Noto Sans JP' }}>
            {q.questionSub}
          </div>
        )}
        <button className="audio-btn" onClick={() => speak(q.audio)} style={{ margin: '0 auto', width: '44px', height: '44px', fontSize: '18px' }}>
          🔊
        </button>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option)}
            className={`quiz-option ${selected
              ? option === q.correct
                ? 'correct'
                : option === selected && option !== q.correct
                  ? 'wrong'
                  : ''
              : ''
              }`}
          >
            <span style={{ color: '#6b7280', marginRight: '10px', fontSize: '13px' }}>
              {String.fromCharCode(65 + idx)}.
            </span>
            {option}
          </button>
        ))}
      </div>

      {/* Next Button */}
      {selected && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '14px',
            marginBottom: '12px',
            color: selected === q.correct ? '#22c55e' : '#ef4444',
            fontWeight: '600',
          }}>
            {selected === q.correct ? '✅ Correct! せいかい！' : `❌ Wrong. Correct: ${q.correct}`}
          </div>
          <button className="btn-primary" onClick={nextQuestion} style={{ fontSize: '14px', padding: '10px 32px' }}>
            {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results 🎯'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;