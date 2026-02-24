import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'star' | 'balloon';
}

export default function Particles({ triggerExplosion }: { triggerExplosion: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [explosionParticles, setExplosionParticles] = useState<Particle[]>([]);

  useEffect(() => {

    const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      type: Math.random() > 0.7 ? 'balloon' : (Math.random() > 0.5 ? 'heart' : 'star')
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (triggerExplosion) {
      const explosion: Particle[] = Array.from({ length: 50 }).map((_, i) => ({
        id: i + 100,
        x: 50, // Start from center
        y: 50,
        size: Math.random() * 30 + 10,
        duration: Math.random() * 2 + 1,
        delay: 0,
        type: 'heart'
      }));
      setExplosionParticles(explosion);
    }
  }, [triggerExplosion]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          initial={{ 
            left: `${p.x}vw`, 
            top: '110vh',
            opacity: 0,
            rotate: 0,
            scale: p.type === 'balloon' ? 1.5 : 1
          }}
          animate={{ 
            top: '-10vh',
            opacity: [0, 0.8, 0],
            rotate: 360,
            x: `calc(${p.x}vw + ${Math.sin(p.id) * 50}px)` // Drift side to side
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            delay: p.delay,
            ease: "linear"
          }}
        >
          {p.type === 'heart' && <Heart className="text-pink-500/30 fill-pink-500/20" size={p.size} />}
          {p.type === 'star' && <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_#fff]" style={{ width: p.size/5, height: p.size/5 }} />}
          {p.type === 'balloon' && (
            <div className="relative">
              <div className="w-8 h-10 bg-gradient-to-br from-pink-400/40 to-purple-500/40 rounded-[50%] backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(236,72,153,0.2)]"></div>
              <div className="absolute -bottom-4 left-1/2 w-[1px] h-6 bg-white/20"></div>
            </div>
          )}
        </motion.div>
      ))}

      
      {triggerExplosion && explosionParticles.map((p) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20; // vw
        const destX = 50 + Math.cos(angle) * distance;
        const destY = 50 + Math.sin(angle) * distance;

        return (
          <motion.div
            key={p.id}
            className="absolute"
            initial={{ 
              left: '50vw', 
              top: '50vh',
              opacity: 1,
              scale: 0
            }}
            animate={{ 
              left: `${destX}vw`,
              top: `${destY}vh`,
              opacity: 0,
              scale: Math.random() * 1.5 + 0.5,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: p.duration,
              ease: "easeOut"
            }}
          >
            <Heart className="text-pink-400 fill-pink-400" size={p.size} />
          </motion.div>
        );
      })}
    </div>
  );
}
