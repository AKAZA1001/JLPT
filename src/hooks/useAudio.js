import { useState, useCallback, useRef, useEffect } from 'react';

// ── Brave-compatible Audio Engine ─────────────────────────────
// Uses Web Speech API with aggressive voice loading
// Works in Brave without any settings changes

export const useAudio = () => {
  const [playing, setPlaying]         = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [ready, setReady]             = useState(false);
  const voicesRef                     = useRef([]);
  const audioRef                      = useRef(null);

  // ── Load voices aggressively ──────────────────────────────────
  useEffect(() => {
    let attempts = 0;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        voicesRef.current = voices;
        setReady(true);
        return true;
      }
      return false;
    };

    // Try immediately
    if (!loadVoices()) {
      // Keep trying every 200ms for 5 seconds
      const interval = setInterval(() => {
        attempts++;
        if (loadVoices() || attempts > 25) {
          clearInterval(interval);
          setReady(true);
        }
      }, 200);

      // Also use the event
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        loadVoices();
        setReady(true);
      });

      return () => clearInterval(interval);
    }
  }, []);

  // ── Get best available voice ──────────────────────────────────
  const getBestVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    voicesRef.current = voices;

    // Priority list - Brave usually has these
    const priority = [
      // Japanese voices (best)
      (v) => v.lang === 'ja-JP' && v.localService === true,
      (v) => v.lang === 'ja-JP',
      (v) => v.lang === 'ja',
      (v) => v.lang.startsWith('ja'),
      (v) => v.name.toLowerCase().includes('japanese'),
      (v) => v.name.toLowerCase().includes('japan'),
      // English fallback (at least something plays)
      (v) => v.lang === 'en-US' && v.localService === true,
      (v) => v.lang.startsWith('en'),
    ];

    for (const check of priority) {
      const found = voices.find(check);
      if (found) return found;
    }
    return null;
  }, []);

  // ── Core Web Speech speak ─────────────────────────────────────
  const speakWebSpeech = useCallback((text, rate = 0.85, pitch = 1) => {
    return new Promise((resolve, reject) => {
      // Cancel anything playing
      window.speechSynthesis.cancel();

      const attempt = () => {
        const utt    = new SpeechSynthesisUtterance(text);
        utt.lang     = 'ja-JP';
        utt.rate     = rate;
        utt.pitch    = pitch;
        utt.volume   = 1;

        const voice  = getBestVoice();
        if (voice) {
          utt.voice  = voice;
          utt.lang   = voice.lang;
        }

        // Brave sometimes needs this timeout
        let resolved = false;
        const timeout = setTimeout(() => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        }, (text.length * 150) + 2000);

        utt.onstart = () => setPlaying(true);

        utt.onend = () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            resolve();
          }
        };

        utt.onerror = (e) => {
          clearTimeout(timeout);
          if (e.error === 'interrupted') {
            resolve(); // Interrupted is OK
          } else {
            reject(e);
          }
        };

        window.speechSynthesis.speak(utt);

        // Brave fix: resume if paused
        setTimeout(() => {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        }, 100);
      };

      // Small delay for Brave
      setTimeout(attempt, 150);
    });
  }, [getBestVoice]);

  // ── Brave-specific fix: keepAlive ────────────────────────────
  // Brave pauses speechSynthesis after ~15 seconds
  // This keeps it alive
  useEffect(() => {
    const keepAlive = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
    return () => clearInterval(keepAlive);
  }, []);

  // ── Main speak function ───────────────────────────────────────
  const speak = useCallback(async (text, lang = 'ja-JP', rate = 0.85) => {
    if (!text) return;

    // Stop current audio
    window.speechSynthesis.cancel();
    setPlaying(true);
    setCurrentText(text);

    try {
      await speakWebSpeech(text, rate);
    } catch (err) {
      console.warn('Speech error:', err);
    } finally {
      setPlaying(false);
      setCurrentText('');
    }
  }, [speakWebSpeech]);

  // ── Slow speak ────────────────────────────────────────────────
  const speakSlow = useCallback(async (text) => {
    if (!text) return;

    window.speechSynthesis.cancel();
    setPlaying(true);
    setCurrentText(text);

    try {
      await speakWebSpeech(text, 0.5, 0.9);
    } catch (err) {
      console.warn('Slow speech error:', err);
    } finally {
      setPlaying(false);
      setCurrentText('');
    }
  }, [speakWebSpeech]);

  // ── Stop ──────────────────────────────────────────────────────
  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlaying(false);
    setCurrentText('');
  }, []);

  return {
    speak,
    speakSlow,
    stop,
    playing,
    currentText,
    ready,
    getBestVoice,
  };
};