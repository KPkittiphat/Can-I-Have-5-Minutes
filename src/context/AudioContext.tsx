"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioContext = createContext<{
  playMusic: () => void;
  pauseMusic: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  isPlaying: boolean;
}>({
  playMusic: () => {},
  pauseMusic: () => {},
  isMuted: false,
  toggleMute: () => {},
  isPlaying: false,
});

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/sounds/melody.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const playMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        let vol = 0;
        const fadeIn = setInterval(() => {
          if (vol < 0.7) {
            vol += 0.01;
            if (audioRef.current) audioRef.current.volume = vol;
          } else {
            clearInterval(fadeIn);
          }
        }, 150);
      }).catch(err => console.log("Audio play blocked", err));
    }
  };

  const pauseMusic = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <AudioContext.Provider value={{ playMusic, pauseMusic, isMuted, toggleMute, isPlaying }}>
      {children}
      {/* ปุ่ม Mute แบบ Global จะปรากฏทุกหน้าเมื่อเพลงเล่นแล้ว */}
      {isPlaying && (
        <button 
          onClick={toggleMute}
          className="fixed bottom-8 right-8 z-[9999] text-gold-dim/40 hover:text-gold transition-all p-3 bg-black/20 rounded-full backdrop-blur-md border border-white/5"
        >
          {isMuted ? <span className="text-[10px]">OFF</span> : <span className="text-[10px]">ON</span>}
        </button>
      )}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);