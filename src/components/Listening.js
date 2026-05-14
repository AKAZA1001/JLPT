import React, { useState } from 'react';
import { useAudio } from '../hooks/useAudio';

const listeningExercises = [
  {
    id: 1,
    title: 'Basic Greetings',
    level: 'N5',
    category: 'Conversation',
    sentences: [
      { japanese: 'おはようございます。今日もよろしくお願いします。', english: 'Good morning. Please treat me well today too.' },
      { japanese: 'こんにちは！元気ですか？', english: 'Hello! Are you well?' },
      { japanese: 'はじめまして。田中といいます。どうぞよろしく。', english: 'Nice to meet you. My name is Tanaka. Please take care of me.' },
    ]
  },
  {
    id: 2,
    title: 'Daily Life',
    level: 'N5',
    category: 'Daily Life',
    sentences: [
      { japanese: '毎朝七時に起きます。そしてシャワーを浴びて、朝ごはんを食べます。', english: 'I wake up at 7 AM every morning. Then I shower and eat breakfast.' },
      { japanese: '学校は九時に始まります。', english: 'School starts at 9 o\'clock.' },
      { japanese: '今日の天気はどうですか？今日は晴れです。', english: 'How is the weather today? It is sunny today.' },
    ]
  },
  {
    id: 3,
    title: 'Shopping Dialogue',
    level: 'N5',
    category: 'Shopping',
    sentences: [
      { japanese: 'すみません、これはいくらですか？', english: 'Excuse me, how much is this?' },
      { japanese: 'これは三百円です。', english: 'This is 300 yen.' },
      { japanese: 'じゃあ、これをください。', english: 'Then, please give me this.' },
      { japanese: 'ありがとうございます。またどうぞ。', english: 'Thank you. Please come again.' },
    ]
  },
  {
    id: 4,
    title: 'N4 Conversation - Plans',
    level: 'N4',
    category: 'Conversation',
    sentences: [
      { japanese: '来週、友達と旅行するつもりです。', english: 'I intend to travel with friends next week.' },
      { japanese: '新幹線のチケットをもう予約しておきました。', english: 'I have already reserved the Shinkansen ticket in advance.' },
      { japanese: '天気が良ければ、富士山に登りたいと思っています。', english: 'If the weather is good, I am thinking of climbing Mt. Fuji.' },
    ]
  },
  {
    id: 5,
    title: 'N4 Grammar in Context',
    level: 'N4',
    category: 'Grammar',
    sentences: [
      { japanese: '日本語が話せるようになりました。毎日練習したからです。', english: 'I became able to speak Japanese. It\'s because I practiced every day.' },
      { japanese: 'この薬を飲めば、すぐよくなるはずです。', english: 'If you take this medicine, you should get better soon.' },
      { japanese: 'もっと早く来てくれれば良かったのに。', english: 'I wish you had come earlier.' },
    ]
  },
  {
    id: 6,
    title: 'Directions',
    level: 'N5',
    category: 'Navigation',
    sentences: [
      { japanese: 'すみません、駅はどこですか？', english: 'Excuse me, where is the station?' },
      { japanese: 'この道をまっすぐ行って、信号で右に曲がってください。', english: 'Go straight down this road, and turn right at the traffic light.' },
      { japanese: '駅は歩いて五分ぐらいです。', english: 'The station is about 5 minutes on foot.' },
    ]
  },
  {
    id: 7,
    title: 'N4 - Giving & Receiving',
    level: 'N4',
    category: 'Grammar',
    sentences: [
      { japanese: '先生が宿題のやり方を教えてくれました。', english: 'The teacher taught me how to do the homework.' },
      { japanese: '友達にプレゼントを買ってあげました。', english: 'I bought a present for my friend.' },
      { japanese: '母に料理を作ってもらいました。', english: 'I had my mother cook for me.' },
    ]
  },
  {
    id: 8,
    title: 'Expressing Opinions',
    level: 'N4',
    category: 'Conversation',
    sentences: [
      { japanese: 'この映画はとても面白いと思います。', english: 'I think this movie is very interesting.' },
      { japanese: '環境問題はもっと真剣に考えるべきだと思います。', english: 'I think environmental issues should be considered more seriously.' },
      { japanese: '来年、日本に行けるかもしれません。楽しみです。', english: 'I might be able to go to Japan next year. I\'m looking forward to it.' },
    ]
  },
];

const Listening = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [playingId, setPlayingId] = useState(null);
  const [showTranslation, setShowTranslation] = useState({});
const { speak } = useAudio();

  const filtered = listeningExercises.filter((ex) =>
    selectedLevel === 'All' || ex.level === selectedLevel
  );

  const speakSentence = (text, id) => {
    setPlayingId(id);
    speak(text, 'ja-JP', 0.75);
    setTimeout(() => setPlayingId(null), text.length * 200);
  };

  const speakAll = (exercise) => {
    let delay = 0;
    exercise.sentences.forEach((s, idx) => {
      setTimeout(() => {
        speak(s.japanese, 'ja-JP', 0.75);
        setPlayingId(`${exercise.id}-${idx}`);
      }, delay);
      delay += s.japanese.length * 180 + 500;
    });
  };

  const toggleTranslation = (key) => {
    setShowTranslation((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#BC002D', marginBottom: '8px' }}>
          🎧 Listening Practice
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          Audio exercises with Japanese text-to-speech. Click to hear sentences.
        </p>
      </div>

      {/* Info Card */}
      <div className="card" style={{ padding: '14px', marginBottom: '20px', background: 'rgba(188,0,45,0.05)' }}>
        <p style={{ fontSize: '13px', color: '#d1d5db' }}>
          💡 <strong style={{ color: '#BC002D' }}>How to use:</strong> Click 🔊 to hear individual sentences.
          Use "Play All" to hear the full exercise. Try to understand before revealing the translation.
          Use your browser's Japanese TTS (works best in Chrome/Edge).
        </p>
      </div>

      {/* Level Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['All', 'N5', 'N4'].map((lvl) => (
          <button key={lvl} onClick={() => setSelectedLevel(lvl)}
            className={selectedLevel === lvl ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '13px', padding: '8px 16px' }}>
            {lvl}
          </button>
        ))}
      </div>

      {/* Exercises */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map((exercise) => (
          <div key={exercise.id} className="card" style={{ padding: '20px' }}>
            {/* Exercise Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                  {exercise.title}
                </h3>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{
                    fontSize: '11px', padding: '2px 8px', borderRadius: '12px',
                    background: exercise.level === 'N5' ? 'rgba(34,197,94,0.15)' : 'rgba(188,0,45,0.15)',
                    color: exercise.level === 'N5' ? '#22c55e' : '#BC002D',
                  }}>
                    {exercise.level}
                  </span>
                  <span style={{
                    fontSize: '11px', padding: '2px 8px', borderRadius: '12px',
                    background: 'rgba(99,102,241,0.15)', color: '#818cf8',
                  }}>
                    {exercise.category}
                  </span>
                </div>
              </div>
              <button
                className="btn-primary"
                onClick={() => speakAll(exercise)}
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                ▶ Play All
              </button>
            </div>

            {/* Sentences */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exercise.sentences.map((sentence, idx) => {
                const key = `${exercise.id}-${idx}`;
                return (
                  <div key={idx} style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    padding: '14px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{
                        color: '#BC002D',
                        fontSize: '12px',
                        fontWeight: '700',
                        minWidth: '20px',
                        marginTop: '2px',
                      }}>
                        {idx + 1}.
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: '16px',
                            fontFamily: 'Noto Sans JP, sans-serif',
                            color: '#fff',
                            lineHeight: '1.6',
                          }}>
                            {sentence.japanese}
                          </span>
                          <button
                            className={`audio-btn ${playingId === key ? 'playing' : ''}`}
                            onClick={() => speakSentence(sentence.japanese, key)}
                            style={{ flexShrink: 0 }}
                          >
                            🔊
                          </button>
                          <button
                            onClick={() => speakSentence(sentence.japanese, key)}
                            style={{
                              background: 'transparent',
                              border: '1px solid rgba(188,0,45,0.3)',
                              borderRadius: '6px',
                              padding: '3px 8px',
                              fontSize: '11px',
                              color: '#9ca3af',
                              cursor: 'pointer',
                            }}
                            title="Slow speed"
                          >
                            🐌 Slow
                          </button>
                        </div>
                        <button
                          onClick={() => toggleTranslation(key)}
                          style={{
                            marginTop: '6px',
                            background: 'transparent',
                            border: '1px dashed rgba(188,0,45,0.3)',
                            borderRadius: '6px',
                            padding: '3px 10px',
                            fontSize: '11px',
                            color: '#BC002D',
                            cursor: 'pointer',
                          }}
                        >
                          {showTranslation[key] ? '🙈 Hide' : '👁 Show'} Translation
                        </button>
                        {showTranslation[key] && (
                          <div style={{
                            marginTop: '6px',
                            fontSize: '13px',
                            color: '#10b981',
                            padding: '6px 10px',
                            background: 'rgba(16,185,129,0.05)',
                            borderRadius: '6px',
                            borderLeft: '2px solid #10b981',
                          }}>
                            {sentence.english}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listening;