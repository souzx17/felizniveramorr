import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, LogOut, Heart } from 'lucide-react';
import Particles from './Particles';

export default function Niversario({ onLogout }: { onLogout: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const audio = new Audio(
      '.mp3' // Apenas link de audio .mp3
    );

    audio.loop = true;
    audio.volume = 0.6;
    audio.preload = "auto";

    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => { });
    }

    setIsPlaying(prev => !prev);
  }, [isPlaying]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMousePos({
      x: x * 15,
      y: y * 15
    });
  };

  const fullMessage = `Feliz aniversário, meu amor.
Que Deus derrame sobre você bênçãos, saúde, proteção e prosperidade.
Que os Orixás abram seus caminhos e iluminem seus passos.`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#05020a] flex flex-col items-center justify-center p-4 perspective-1000"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-[#05020a] to-[#05020a]" />

      <Particles triggerExplosion={showSurprise} />

      
      <div className="absolute top-6 right-6 flex gap-4 z-50">
        <button
          onClick={toggleMusic}
          className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/70 hover:text-pink-400 hover:bg-white/10 transition-all"
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        <button
          onClick={onLogout}
          className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/70 hover:text-pink-400 hover:bg-white/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Card */}
      <motion.div
        animate={{
          rotateX: -mousePos.y,
          rotateY: mousePos.x
        }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_0_60px_rgba(236,72,153,0.15)] relative overflow-hidden">
          <div className="text-center space-y-8 relative z-10">

            <h2 className="text-pink-400/80 text-sm tracking-[0.3em] uppercase mb-4 font-medium flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" />
              Para Naiely
              <Heart className="w-4 h-4" />
            </h2>

            <TypingText text={fullMessage} />

            {!showSurprise ? (
              <button
                onClick={() => setShowSurprise(true)}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium hover:scale-105 transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] active:scale-95"
              >
                Clique aqui 💞
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-pink-500/10 border border-pink-500/20"
              >
                <p className="text-xl md:text-2xl font-medium text-pink-100 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                  EU TE AMO.<br />Hoje, amanhã e sempre. 💖
                </p>
              </motion.div>
            )}

            <p className="text-sm text-white/50 italic pt-6 border-t border-white/10">
              "Muito Axé em nossas vidas ✨"
            </p>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TypingText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index));
      index++;

      if (index > text.length) {
        clearInterval(interval);
        setFinished(true);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 className="text-2xl md:text-3xl font-semibold leading-relaxed text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-100 to-pink-300 drop-shadow-[0_0_20px_rgba(236,72,153,0.3)] whitespace-pre-line">
      {displayedText}
      {!finished && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1 h-6 md:h-8 bg-pink-400 ml-1 align-middle"
        />
      )}
    </h1>
  );
}