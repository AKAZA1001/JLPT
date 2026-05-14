import React, { useState, useEffect } from 'react';

const AudioTest = () => {
  const [voices, setVoices]       = useState([]);
  const [selected, setSelected]   = useState('');
  const [playing, setPlaying]     = useState(false);
  const [status, setStatus]       = useState('');
  const [rate, setRate]           = useState(0.85);
  const [testText, setTestText]   = useState('こんにちは！日本語を勉強しています。');
  const [shieldsOff, setShieldsOff] = useState(false);

  // ── Load all voices ───────────────────────────────────────────
  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        setVoices(v);

        // Auto select best Japanese voice
        const jp =
          v.find((x) => x.lang === 'ja-JP' && x.localService) ||
          v.find((x) => x.lang === 'ja-JP') ||
          v.find((x) => x.lang.startsWith('ja'));

        if (jp) {
          setSelected(jp.name);
          setStatus(`✅ Japanese voice found: ${jp.name}`);
        } else {
          setStatus('⚠️ No Japanese voice found. See steps below.');
        }
      } else {
        setStatus('⏳ Loading voices...');
      }
    };

    load();
    window.speechSynthesis.onvoiceschanged = load;

    // Keep trying for Brave
    const interval = setInterval(load, 500);
    setTimeout(() => clearInterval(interval), 5000);

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      clearInterval(interval);
    };
  }, []);

  // ── Play ──────────────────────────────────────────────────────
  const play = (text, r = rate) => {
    if (playing) return;
    window.speechSynthesis.cancel();

    setTimeout(() => {
      const utt   = new SpeechSynthesisUtterance(text);
      utt.lang    = 'ja-JP';
      utt.rate    = r;
      utt.pitch   = 1;
      utt.volume  = 1;

      if (selected) {
        const v = voices.find((x) => x.name === selected);
        if (v) { utt.voice = v; utt.lang = v.lang; }
      }

      setPlaying(true);
      setStatus(`🔊 Playing: "${text}"`);

      utt.onend = () => {
        setPlaying(false);
        setStatus('✅ Audio played successfully!');
      };

      utt.onerror = (e) => {
        setPlaying(false);
        if (e.error !== 'interrupted') {
          setStatus(`❌ Error: ${e.error}. Try steps below.`);
        }
      };

      window.speechSynthesis.speak(utt);

      // Brave resume fix
      setTimeout(() => {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }, 200);
    }, 150);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setPlaying(false);
    setStatus('⏹ Stopped');
  };

  const jpVoices    = voices.filter((v) =>
    v.lang.startsWith('ja') || v.name.toLowerCase().includes('japan')
  );
  const otherVoices = voices.filter((v) =>
    !v.lang.startsWith('ja') && !v.name.toLowerCase().includes('japan')
  );

  const quickTests = [
    { text: 'あいうえお',          label: 'Vowels' },
    { text: 'こんにちは',          label: 'Hello' },
    { text: 'ありがとうございます', label: 'Thank You' },
    { text: 'おはようございます',   label: 'Good Morning' },
    { text: '日本語',              label: 'Japanese' },
    { text: '私は学生です',         label: 'I am a student' },
    { text: 'たべます',            label: 'To Eat' },
    { text: 'がんばってください',   label: 'Good Luck' },
  ];

  return (
    <div className="animate-fade-in">

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#BC002D', marginBottom: '8px' }}>
          🔊 Audio Settings — Brave Browser
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>
          Fix Japanese audio for Brave browser step by step
        </p>
      </div>

      {/* Brave Shield Warning */}
      <div className="card" style={{
        padding: '20px',
        marginBottom: '20px',
        borderColor: 'rgba(245,158,11,0.4)',
        background: 'rgba(245,158,11,0.05)',
      }}>
        <h3 style={{
          fontSize: '15px', fontWeight: '800',
          color: '#f59e0b', marginBottom: '14px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          🦁 Step 1 — Turn Off Brave Shields (Most Important!)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          {[
            'Look at the address bar at top of browser',
            'Find the LION 🦁 icon on the right side of address bar',
            'Click on it — a popup will appear',
            'Toggle the Shields switch to OFF (it turns grey)',
            'Refresh this page (press F5 or Ctrl+R)',
            'Try audio buttons below',
          ].map((step, idx) => (
            <div key={idx} style={{
              display: 'flex', gap: '10px',
              alignItems: 'flex-start',
              fontSize: '13px', color: '#d1d5db',
            }}>
              <span style={{
                background: '#f59e0b',
                color: '#000',
                borderRadius: '50%',
                width: '20px', height: '20px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px', fontWeight: '800',
                flexShrink: 0,
              }}>
                {idx + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
        <label style={{
          display: 'flex', alignItems: 'center',
          gap: '8px', cursor: 'pointer',
          fontSize: '13px', color: '#d1d5db',
        }}>
          <input
            type="checkbox"
            checked={shieldsOff}
            onChange={(e) => setShieldsOff(e.target.checked)}
            style={{ accentColor: '#f59e0b', width: '16px', height: '16px' }}
          />
          ✅ I turned off Brave Shields
        </label>
      </div>

      {/* Allow Sound Setting */}
      <div className="card" style={{
        padding: '20px',
        marginBottom: '20px',
        borderColor: 'rgba(99,102,241,0.4)',
        background: 'rgba(99,102,241,0.05)',
      }}>
        <h3 style={{
          fontSize: '15px', fontWeight: '800',
          color: '#818cf8', marginBottom: '14px',
        }}>
          🔊 Step 2 — Allow Sound in Brave Settings
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          {[
            'Open a new tab in Brave',
            'Copy and paste this in address bar:',
            'Under "Allowed to play sound" click Add button',
            'Type exactly:  localhost:3000',
            'Click Add, then come back here',
            'Refresh this page and test audio',
          ].map((step, idx) => (
            <div key={idx} style={{
              display: 'flex', gap: '10px',
              alignItems: 'flex-start',
              fontSize: '13px', color: '#d1d5db',
            }}>
              <span style={{
                background: '#6366f1',
                color: '#fff',
                borderRadius: '50%',
                width: '20px', height: '20px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px', fontWeight: '800',
                flexShrink: 0,
              }}>
                {idx + 1}
              </span>
              <div>
                {step}
                {idx === 1 && (
                  <div style={{
                    marginTop: '6px',
                    padding: '8px 12px',
                    background: '#0a0a1a',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    color: '#818cf8',
                    userSelect: 'all',
                    cursor: 'text',
                  }}>
                    brave://settings/content/sound
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="card" style={{
        padding: '14px 18px',
        marginBottom: '20px',
        borderColor: status.includes('✅')
          ? 'rgba(34,197,94,0.4)'
          : status.includes('❌')
            ? 'rgba(239,68,68,0.4)'
            : 'rgba(188,0,45,0.3)',
        background: status.includes('✅')
          ? 'rgba(34,197,94,0.05)'
          : status.includes('❌')
            ? 'rgba(239,68,68,0.05)'
            : 'rgba(188,0,45,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '13px', color: '#d1d5db', marginBottom: '4px' }}>
            {status || '⏳ Loading voices...'}
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>
            Total voices: {voices.length} |
            Japanese voices: {jpVoices.length}
          </div>
        </div>
        {playing && (
          <button onClick={stop} style={{
            padding: '6px 14px', borderRadius: '6px',
            background: '#ef4444', border: 'none',
            color: '#fff', cursor: 'pointer', fontSize: '13px',
          }}>
            ⏹ Stop
          </button>
        )}
      </div>

      {/* Quick Tests */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{
          fontSize: '15px', fontWeight: '700',
          color: '#BC002D', marginBottom: '14px',
        }}>
          ⚡ Step 3 — Test Audio Now!
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {quickTests.map((item) => (
            <button
              key={item.text}
              onClick={() => play(item.text)}
              disabled={playing}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(188,0,45,0.3)',
                background: playing ? 'rgba(0,0,0,0.2)' : 'rgba(188,0,45,0.1)',
                color: playing ? '#6b7280' : '#fff',
                cursor: playing ? 'not-allowed' : 'pointer',
                fontSize: '12px',
              }}
            >
              🔊 {item.label}
              <div style={{
                fontSize: '11px',
                color: '#BC002D',
                fontFamily: 'Noto Sans JP',
                marginTop: '2px',
              }}>
                {item.text}
              </div>
            </button>
          ))}
        </div>

        {/* Custom text */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>
            Custom text:
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              style={{
                flex: 1, padding: '10px 14px',
                background: '#0a0a1a',
                border: '1px solid rgba(188,0,45,0.3)',
                borderRadius: '8px', color: '#fff',
                fontSize: '14px', outline: 'none',
                fontFamily: 'Noto Sans JP',
              }}
              placeholder="日本語テキスト..."
            />
            <button
              className="btn-primary"
              onClick={() => play(testText)}
              disabled={playing}
            >
              {playing ? '⏳' : '🔊'} Play
            </button>
          </div>
        </div>

        {/* Speed */}
        <div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>
            Speed: <span style={{ color: '#BC002D', fontWeight: '700' }}>{rate}x</span>
          </div>
          <input
            type="range" min="0.3" max="1.5" step="0.05"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#BC002D' }}
          />
        </div>
      </div>

      {/* Voice List */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <h3 style={{
          fontSize: '15px', fontWeight: '700',
          color: '#BC002D', marginBottom: '14px',
        }}>
          🎤 Available Voices on Your Computer
        </h3>

        {/* Japanese Voices */}
        {jpVoices.length > 0 ? (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '12px', color: '#22c55e',
              fontWeight: '700', marginBottom: '8px',
            }}>
              ✅ Japanese Voices ({jpVoices.length} found)
            </div>
            {jpVoices.map((v) => (
              <button
                key={v.name}
                onClick={() => {
                  setSelected(v.name);
                  setStatus(`✅ Voice selected: ${v.name}`);
                  play('こんにちは、テストです。');
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  marginBottom: '6px',
                  borderRadius: '8px',
                  border: `1px solid ${selected === v.name ? '#BC002D' : 'rgba(34,197,94,0.3)'}`,
                  background: selected === v.name
                    ? 'rgba(188,0,45,0.2)'
                    : 'rgba(34,197,94,0.05)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '13px',
                }}
              >
                <span>
                  {selected === v.name ? '✓ ' : ''}{v.name}
                </span>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>
                  {v.lang} • {v.localService ? '🖥 Local' : '🌐 Online'}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div style={{
            padding: '16px',
            borderRadius: '10px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            marginBottom: '16px',
          }}>
            <div style={{
              fontSize: '14px', fontWeight: '700',
              color: '#ef4444', marginBottom: '8px',
            }}>
              ❌ No Japanese voices found on your system
            </div>
            <div style={{ fontSize: '13px', color: '#d1d5db' }}>
              Follow Step 4 below to install Japanese voices for Windows
            </div>
          </div>
        )}

        {/* All other voices */}
        {otherVoices.length > 0 && (
          <div>
            <div style={{
              fontSize: '12px', color: '#f59e0b',
              fontWeight: '700', marginBottom: '8px',
            }}>
              Other voices ({otherVoices.length}) — Can be used as fallback
            </div>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              style={{
                width: '100%', padding: '10px',
                background: '#0a0a1a',
                border: '1px solid rgba(188,0,45,0.3)',
                borderRadius: '8px', color: '#fff',
                fontSize: '13px', outline: 'none',
              }}
            >
              <option value="">-- Select a voice to test --</option>
              {otherVoices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Install Japanese Voice Guide */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{
          fontSize: '15px', fontWeight: '700',
          color: '#BC002D', marginBottom: '16px',
        }}>
          🪟 Step 4 — Install Japanese Voice on Windows
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            {
              title: 'Windows 11 — Install Microsoft Haruka (Japanese)',
              color: '#BC002D',
              steps: [
                'Press Windows Key + I to open Settings',
                'Go to Time & Language → Speech',
                'Click "Add voices" button',
                'Search for "Japanese"',
                'Select "Microsoft Nanami" (Female) or "Microsoft Keita" (Male)',
                'Click Add and wait for download (needs internet)',
                'Restart Brave browser completely',
                'Come back and test audio above',
              ],
              shortcut: 'ms-settings:speech',
            },
            {
              title: 'Windows 10 — Install Japanese Voice',
              color: '#e94560',
              steps: [
                'Press Windows Key + I to open Settings',
                'Go to Ease of Access → Narrator',
                'Click "Add more voices"',
                'Find Japanese voices and install',
                'Restart Brave browser',
                'Test audio above',
              ],
              shortcut: 'ms-settings:narrator',
            },
          ].map((section, idx) => (
            <div key={idx} style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              padding: '16px',
              borderLeft: `3px solid ${section.color}`,
            }}>
              <div style={{
                fontSize: '14px', fontWeight: '700',
                color: '#fff', marginBottom: '10px',
              }}>
                {section.title}
              </div>
              {section.steps.map((step, sidx) => (
                <div key={sidx} style={{
                  display: 'flex', gap: '8px',
                  fontSize: '13px', color: '#9ca3af',
                  marginBottom: '4px',
                }}>
                  <span style={{ color: section.color, flexShrink: 0 }}>
                    {sidx + 1}.
                  </span>
                  {step}
                </div>
              ))}
              <div style={{ marginTop: '10px' }}>
                <div style={{
                  fontSize: '11px', color: '#6b7280',
                  marginBottom: '4px',
                }}>
                  Quick shortcut — copy this into Run dialog (Win+R):
                </div>
                <div style={{
                  padding: '8px 12px',
                  background: '#0a0a1a',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: section.color,
                  userSelect: 'all',
                }}>
                  {section.shortcut}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AudioTest;