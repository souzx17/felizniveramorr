import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login.toLowerCase() === 'login-aqui' && password.toLowerCase() === 'senha-aqui') { //Login e senha
      onLogin();
    } else {
      setError('Hmm… o coração ainda não reconheceu você 💔'); // Aviso de usuario e senha errado
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0514]">
      {/* Fundo Animads */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0514] to-[#0a0514]"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(236,72,153,0.15)] mx-4"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-4"
          >
            <Heart className="w-12 h-12 text-pink-500 fill-pink-500/20" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            Faça o Login
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Seu nome"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all outline-none text-white placeholder-white/30"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Nome da gata"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all outline-none text-white placeholder-white/30"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium hover:from-pink-500 hover:to-purple-500 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] active:scale-95"
          >
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
}
