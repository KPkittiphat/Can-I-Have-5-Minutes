"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { HeartPulse, Phone } from "lucide-react";
import { useAudio } from "../context/AudioContext";

export default function IntroPage() {
  const router = useRouter();
  const { playMusic } = useAudio();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [isAccepted, setIsAccepted] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  const handleAccept = () => {
    setShowWarning(false);
    playMusic();
    setTimeout(() => setIsAccepted(true), 800);
  };

  const handleNext = () => {
    if (step === 1 && name.trim()) setStep(2);
    else if (step === 2 && age.trim()) {
      const ageNum = parseInt(age);
      if (!isNaN(ageNum) && ageNum > 0) {
        localStorage.setItem(
          "ci5m_user",
          JSON.stringify({ name, age: ageNum }),
        );
        router.push("/simulation");
      }
    }
  };

  const containerVars: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 1.2, delayChildren: 0.2 },
    },
  };

  const itemVars: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1.5, 
        ease: [0, 0, 0.58, 1] 
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-bg flex flex-col items-center justify-center overflow-hidden font-sans antialiased">
      {/* 🌑 Background Effects */}
      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background: `radial-gradient(circle at center, transparent 10%, black 140%)`,
          opacity: 0.8,
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-10 animate-flicker opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-gold-dim rounded-full blur-[100px] md:blur-[180px]" />
      </div>

      <AnimatePresence>
        {isAccepted && (
          <motion.div
            key="main-content"
            variants={containerVars}
            initial="initial"
            animate="animate"
            className="relative z-30 flex flex-col items-center justify-between px-6 text-center max-w-2xl mx-auto w-full py-12 md:py-24 min-h-[90vh] md:min-h-[85vh]"
          >
            <div className="flex flex-col items-center w-full mt-6 md:mt-10">
              <motion.p
                variants={itemVars}
                className="text-xl md:text-4xl text-white font-serif font-light tracking-[0.1em] md:tracking-[0.15em] mb-12 md:mb-20"
              >
                &quot;ขอเวลาสัก 5 นาที... ได้ไหม?&quot;
              </motion.p>
              
              <motion.div
                variants={itemVars}
                className="space-y-6 md:space-y-8 text-ink-muted/80 font-serif italic animate-pulse-breathing"
              >
                <p className="text-lg md:text-2xl leading-relaxed tracking-wide">
                  เมื่อแสงตะวันลับขอบฟ้า... ชั่วนิรันดร์
                </p>
                <p className="text-lg md:text-2xl leading-relaxed tracking-wide">
                  เหลือเพียงความฝัน... ที่ยังไม่กล้าเอ่ย
                </p>
                <p className="text-lg md:text-2xl leading-relaxed tracking-wide">
                  แด่ความรู้สึก... ที่ละเลยตลอดมา
                </p>
              </motion.div>

              <motion.div variants={itemVars} className="mt-16 md:mt-20">
                <p className="text-base md:text-l text-gold-dim font-medium tracking-[0.15em] md:tracking-[0.2em] leading-relaxed uppercase px-4">
                  ในวินาทีที่ทุกอย่างสิ้นสุด...
                  <br />
                  คุณจะเสียดายอะไรไหม?
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
              className="w-full flex flex-col items-center max-w-sm mt-auto pb-6"
            >
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="w-full"
                  >
                    <p className="text-ink-faint mb-4 text-[13px] md:text-[15px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-mono opacity-60 font-semibold">
                      นามของท่าน
                    </p>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      placeholder="แตะเพื่อพิมพ์..."
                      className="w-full bg-transparent border-b border-border/40 focus:border-gold focus:outline-none py-3 text-lg md:text-xl text-center transition-colors font-serif text-white/90 placeholder:opacity-20"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="w-full"
                  >
                    <p className="text-ink-faint mb-4 text-[13px] md:text-[15px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-mono opacity-60 font-semibold">
                      อายุขัยของท่าน
                    </p>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNext()}
                      placeholder="0"
                      className="w-full bg-transparent border-b border-border/40 focus:border-gold focus:outline-none py-3 text-lg md:text-xl text-center transition-colors font-serif text-white/90 placeholder:opacity-20"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={handleNext}
                className="mt-12 md:mt-16 text-gold-dim/60 hover:text-gold text-[11px] md:text-[13px] tracking-[0.4em] md:tracking-[0.5em] transition-all duration-1000 uppercase font-mono border-b border-transparent hover:border-gold pb-1 cursor-pointer"
              >
                ก้าวข้ามผ่าน →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5 } }}
              className="bg-surface border border-gold/30 p-6 md:p-12 rounded-2xl max-w-lg w-full relative overflow-hidden shadow-[0_0_60px_rgba(0,0,0,1)]"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
              <div className="relative z-10 text-center space-y-6 md:space-y-8">
                <div className="flex justify-center">
                  <HeartPulse
                    className="text-gold animate-pulse"
                    size={48}
                    md-size={56}
                    strokeWidth={1}
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl md:text-3xl font-serif text-white tracking-wide">
                    แด่หัวใจที่กำลังอ่อนล้า...
                  </h3>
                  <p className="text-xs md:text-base text-ink-muted font-serif italic leading-relaxed px-2">
                    &quot;ในคืนที่มืดมิดที่สุด แสงดาวจะสว่างที่สุดเสมอ <br />
                    โลกใบนี้ยังมีที่ว่าง สำหรับรอยยิ้มของคุณเสมอ&quot;
                  </p>
                </div>
                <div className="bg-black/40 p-5 md:p-8 rounded-xl border border-white/5 text-left space-y-4 md:space-y-5 text-[13px] md:text-base text-ink-muted/90 tracking-wide leading-relaxed">
                  <p className="text-xs md:text-base opacity-80">
                    หากคุณรู้สึกไม่สบายใจ เราอยากให้คุณรู้ว่ามีคนพร้อมจะรับฟังคุณเสมอ:
                  </p>
                  <div className="space-y-3 md:space-y-4 pt-1 md:pt-3">
                    <a
                      href="tel:1323"
                      className="flex items-center gap-3 md:gap-4 text-gold-dim hover:text-gold transition-all duration-300 group"
                    >
                      <div className="p-1.5 md:p-2 bg-gold/5 rounded-full group-hover:bg-gold/10">
                        <Phone size={16} />
                      </div>
                      <span className="font-mono text-sm md:text-lg tracking-widest">
                        1323 สายด่วนสุขภาพจิต
                      </span>
                    </a>
                    <a
                      href="tel:021136793"
                      className="flex items-center gap-3 md:gap-4 text-gold-dim hover:text-gold transition-all duration-300 group"
                    >
                      <div className="p-1.5 md:p-2 bg-gold/5 rounded-full group-hover:bg-gold/10">
                        <Phone size={16} />
                      </div>
                      <span className="font-mono text-sm md:text-lg tracking-widest">
                        02-113-6793 สะมาริตันส์
                      </span>
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleAccept}
                  className="w-full py-4 md:py-5 bg-gold/10 hover:bg-gold/20 border border-gold/20 text-gold text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase rounded-xl transition-all duration-700 font-mono"
                >
                  รับทราบและเข้าสู่ระบบจำลอง
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .animate-pulse-breathing {
          animation: pulse-breathing 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-breathing {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-flicker {
          animation: flicker 18s ease-in-out infinite;
        }
        @keyframes flicker {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}