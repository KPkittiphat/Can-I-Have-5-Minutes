"use client";

import { useRouter } from "next/navigation";
import { useStorage } from "../../hooks/useStorage";
import { useEffect, useState } from "react";
import { FINAL_POEMS } from "../../data/prompts";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Coffee, Music, Info } from "lucide-react";

export default function ClosingPage() {
  const router = useRouter();
  const { clearAll } = useStorage();
  const [poem, setPoem] = useState("");
  const [isFinalized, setIsFinalized] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    const selectedTheme = typeof window !== 'undefined' ? localStorage.getItem("ci5m_selected_theme") || "self" : "self";
    const themePoems = FINAL_POEMS[selectedTheme] || FINAL_POEMS['self'];
    const randomPoem = themePoems[Math.floor(Math.random() * themePoems.length)];
    setPoem(randomPoem);

    const timer = setTimeout(() => setIsFinalized(true), 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    clearAll();
    localStorage.removeItem("ci5m_selected_theme");
    router.push("/");
  };

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center px-6 text-center overflow-hidden font-sans antialiased">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,169,110,0.06)_0%,transparent_80%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-16 flex flex-col items-center">
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="text-xl md:text-3xl text-white/70 font-serif italic"
        >
          แสงสว่างสุดท้ายมอดดับลงแล้ว...
        </motion.p>
        
        <div className="min-h-[160px] flex items-center justify-center px-4">
          <motion.p 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.5, duration: 3 }}
            className="text-2xl md:text-4xl text-gold-dim font-serif font-medium leading-[1.8] drop-shadow-[0_0_15px_rgba(200,169,110,0.2)]"
          >
            &quot; {poem} &quot;
          </motion.p>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8, duration: 2.5 }}
          className="text-lg md:text-xl text-ink-muted/50 font-serif italic leading-relaxed"
        >
          ขอบคุณที่คุณกล้าหาญพอจะเผชิญหน้ากับความจริง <br />
          ในห้วงนาทีสุดท้ายของลมหายใจจำลองนี้
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isFinalized ? 1 : 0 }}
          transition={{ duration: 3 }}
          className="pt-10 flex flex-col items-center gap-10"
        >
          <button 
            onClick={handleFinish}
            className="group relative text-ink-faint/60 hover:text-white text-[10px] tracking-[0.6em] uppercase transition-all duration-1000 border border-border/20 px-12 py-4 rounded-full hover:border-gold hover:shadow-[0_0_20px_rgba(200,169,110,0.1)] cursor-pointer"
          >
            ก้าวกลับสู่โลกความเป็นจริง
          </button>

          <button 
            onClick={() => setShowCredits(true)}
            className="flex items-center gap-2 text-[10px] text-white/30 hover:text-gold-dim tracking-[0.4em] uppercase font-mono cursor-pointer transition-all duration-500 hover:scale-105"
          >
            <Info size={14} strokeWidth={1} />
            Credits & Support
          </button>
        </motion.div>
      </div>

      <p className="absolute bottom-10 text-[9px] font-mono text-ink-faint/10 tracking-[1.5em] uppercase animate-pulse pointer-events-none">
        End of Transmission
      </p>

      <AnimatePresence>
        {showCredits && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setShowCredits(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-surface border border-gold/30 p-10 md:p-14 rounded-3xl max-w-lg w-full relative shadow-[0_0_80px_rgba(0,0,0,1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowCredits(false)}
                className="absolute top-6 right-6 text-gold-dim/40 hover:text-gold transition-colors p-2"
              >
                <X size={24} strokeWidth={1} />
              </button>

              <div className="space-y-10 text-center">
                <div className="space-y-4">
                  <p className="text-[10px] tracking-[0.5em] text-gold-dim/50 uppercase font-mono">Created by</p>
                  <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide">Kittiphat Phengnamkham</h2>
                  <a 
                    href="https://www.instagram.com/p.phxnkhm" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-gold-dim hover:text-gold transition-colors border-b border-gold/20 pb-1"
                  >
                    <Camera size={18} strokeWidth={1.5} />
                    <span className="font-mono text-sm tracking-widest uppercase">Instagram</span>
                  </a>
                </div>

                <div className="space-y-3 py-6 border-y border-white/5">
                  <div className="flex justify-center gap-2 text-gold-dim/60 mb-1">
                    <Music size={14} strokeWidth={1.5} />
                    <p className="text-[9px] tracking-[0.3em] uppercase font-mono">Soundtrack</p>
                  </div>
                  <p className="text-sm md:text-base text-ink-muted leading-relaxed italic">
                    เพลง ยื้อ - ปรีชา ปัดภัย <br />
                    <span className="text-[10px] opacity-60 uppercase tracking-widest">เซิ้ง Music Ost. สัปเหร่อ Story</span>
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 bg-gold/5 rounded-full">
                      <Coffee className="text-gold" size={24} strokeWidth={1} />
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      หากเรื่องราวนี้ช่วยให้คุณรู้สึกดีขึ้นเล็กน้อย <br />
                      สามารถสนับสนุนค่ากาแฟเป็นกำลังใจให้คนพัฒนาได้ที่นี่
                    </p>
                  </div>

                  <div className="relative aspect-square max-w-[180px] mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden p-2 shadow-inner group">
                    <img 
                      src="/images/pay.jpg" 
                      alt="Donation QR Code" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('bg-black/40');
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-[9px] uppercase tracking-widest opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">Support QR Code</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}