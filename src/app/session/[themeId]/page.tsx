"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { THEMES, THEME_PROMPTS } from "../../../data/prompts";
import { useTimer } from "../../../hooks/useTimer";
import Timer from "../../../components/Timer";
import ProgressBar from "../../../components/ProgressBar";
import PromptCard from "../../../components/PromptCard";

export default function SessionPage() {
  const { themeId } = useParams();
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showSubText, setShowSubText] = useState(false);

  const prompts = useMemo(
    () => THEME_PROMPTS[themeId as string] || [],
    [themeId],
  );
  const theme = useMemo(() => THEMES.find((t) => t.id === themeId), [themeId]);

  const { timeLeft, formatTime } = useTimer(300, () => {
    router.push("/closing");
  });

  const vignetteOpacity = useMemo(() => {
    if (timeLeft > 180) return 0;
    return (1 - timeLeft / 180) * 0.8;
  }, [timeLeft]);

  const phaseLabel = useMemo(() => {
    const step = currentIdx + 1;
    if (step === 1) return "หลับตาลง... ปล่อยให้ภาพจางๆ ในความทรงจำ ค่อยๆ ชัดเจนขึ้นมา";
    if (step === 2) return "ในความเงียบสงัดนี้... มีเสียงเรียกจากหัวใจดวงไหนที่ดังที่สุด?";
    if (step === 3) return "ปลดเปลื้องทุกหัวโขน... เหลือเพียงความจริงที่ติดค้างอยู่ข้างใน";
    if (step === 4) return "หากย้อนคืนกาลเวลาได้เพียงเสี้ยวนาที... คุณจะคว้ากอดสิ่งใดไว้?";
    if (step === 5) return "ก่อนที่ทุกอย่างจะกลายเป็นละอองดาว... จงให้อภัยทุกสิ่งที่ติดค้าง";
    if (step === 6) return "เมื่อแสงสุดท้ายมอดดับลง... นี่คือสิ่งที่คุณอยากทิ้งไว้ให้โลกใบเดิม";
    return "";
  }, [currentIdx]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubText(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      setShowSubText(false); 
    };
  }, [currentIdx]);

  const handleNext = () => {
    if (currentIdx < prompts.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setAnswer("");
    } else {
      router.push("/closing");
    }
  };

  if (!theme || prompts.length === 0) return null;

  return (
    <div className="relative min-h-screen w-full bg-bg flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000">
      
      {/* 🌑 Vignette Layer: ปรับ z-index ให้อยู่หลังปุ่ม (z-40) */}
      <div
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle, transparent 20%, black 150%)`,
          opacity: vignetteOpacity,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-between px-6 text-center w-full max-w-3xl mx-auto py-8 md:py-12 min-h-screen">
        
        {/* Timer: ปรับ scale เล็กลงบนมือถือเพื่อเพิ่มพื้นที่ */}
        <div className="mt-4 md:mt-8 scale-90 md:scale-110">
          <Timer timeDisplay={formatTime()} isWarning={timeLeft < 60} />
        </div>

        {/* ส่วนเนื้อหาหลัก */}
        <div className="w-full flex-grow flex items-center justify-center py-6">
          <PromptCard step={currentIdx}>
            <div className="space-y-4 md:space-y-6">
              {/* บทกลอนนำ (SubText) */}
              <div className="min-h-[50px] md:min-h-[40px] flex items-center justify-center px-4">
                <p
                  className={`text-gold-dim/50 font-serif italic text-xs md:text-base tracking-widest transition-opacity duration-1000 leading-relaxed ${
                    showSubText ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {phaseLabel}
                </p>
              </div>

              {/* คำถามหลัก: ปรับขนาดฟอนต์ให้สมดุลบนมือถือ */}
              <h2 className="text-lg md:text-2xl font-serif text-white leading-relaxed min-h-[120px] md:min-h-[140px] flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-pulse-slow px-2">
                {prompts[currentIdx].question}
              </h2>

              {/* ช่องพิมพ์ความใจ: ลบ autoFocus ออกเพื่อประสบการณ์มือถือที่ดีขึ้น */}
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="เอ่ยความในใจของคุณที่นี่..."
                className="w-full bg-transparent border-none focus:outline-none text-base md:text-xl text-white text-center italic resize-none h-32 md:h-40 placeholder:text-ink-faint/20 scrollbar-hide drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
              />
            </div>
          </PromptCard>
        </div>

        {/* ปุ่มก้าวต่อไป และ Progress */}
        <div className="mb-8 md:mb-12 flex flex-col items-center gap-8 md:gap-12 w-full z-[60]">
          <button
            onClick={handleNext}
            className="group relative text-gold-dim hover:text-gold text-[11px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase transition-all duration-700 pb-2 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10">
              {currentIdx === prompts.length - 1
                ? "ปล่อยวางและจากลา →"
                : "เอ่ยคำนั้นออกมา →"}
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </button>

          <div className="w-full flex flex-col items-center gap-3 md:gap-4 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <ProgressBar current={currentIdx + 1} total={prompts.length} />
            <span className="text-[8px] md:text-[9px] font-mono text-ink-faint tracking-[0.2em] md:tracking-[0.3em] uppercase">
              ห้วงคำนึงที่ {currentIdx + 1} / {prompts.length}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            filter: brightness(1.1);
          }
          50% {
            opacity: 0.7;
            filter: brightness(0.9);
          }
        }
      `}</style>
    </div>
  );
}