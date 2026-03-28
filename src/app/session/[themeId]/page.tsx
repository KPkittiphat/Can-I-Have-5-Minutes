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

  // 🌑 คำนวณความมืดของขอบจอ (Vignette) ตามเวลาที่เหลือ
  const vignetteOpacity = useMemo(() => {
    if (timeLeft > 180) return 0;
    return (1 - timeLeft / 180) * 0.8;
  }, [timeLeft]);

  // 🕯️ บทกลอนนำทางความรู้สึก 6 จังหวะ
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

  // 🎭 ควบคุมการแสดงผลข้อความย่อย (Fade Effect)
  useEffect(() => {
    // 1. ลบ setShowSubText(false); ออกจากบรรทัดนี้

    // 2. ให้เริ่มนับถอยหลังเพื่อแสดงข้อความใหม่ (Fade In)
    const timer = setTimeout(() => {
      setShowSubText(true);
    }, 800);

    return () => {
      // 3. เมื่อมีการเปลี่ยนข้อ (currentIdx เปลี่ยน) 
      // Cleanup function จะทำงาน: ล้าง Timer และสั่งปิดข้อความ (Fade Out) ทันที
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
      
      {/* 🌑 Vignette Layer */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle, transparent 20%, black 150%)`,
          opacity: vignetteOpacity,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center w-full max-w-3xl mx-auto py-12">
        
        {/* Timer */}
        <div className="mb-16 scale-110">
          <Timer timeDisplay={formatTime()} isWarning={timeLeft < 60} />
        </div>

        {/* ส่วนเนื้อหาหลัก */}
        <PromptCard step={currentIdx}>
          <div className="space-y-6">
            {/* บทกลอนนำ (SubText) */}
            <div className="min-h-[40px] flex items-center justify-center">
              <p
                className={`text-gold-dim/50 font-serif italic text-sm md:text-base tracking-widest transition-opacity duration-1000 ${
                  showSubText ? "opacity-100" : "opacity-0"
                }`}
              >
                {phaseLabel}
              </p>
            </div>

            {/* คำถามหลัก */}
            <h2 className="text-xl md:text-2xl font-serif text-white leading-relaxed min-h-[140px] flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-pulse-slow">
              {prompts[currentIdx].question}
            </h2>

            {/* ช่องพิมพ์ความใจ */}
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="ความในใจของคุณ..."
              className="w-full bg-transparent border-none focus:outline-none text-lg md:text-xl text-white text-center italic resize-none h-40 placeholder:text-ink-faint/30 scrollbar-hide drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
              autoFocus
            />
          </div>
        </PromptCard>

        {/* ปุ่มก้าวต่อไป และ Progress */}
        <div className="mt-12 flex flex-col items-center gap-12 w-full">
          <button
            onClick={handleNext}
            className="group relative text-gold-dim hover:text-gold text-xs tracking-[0.5em] uppercase transition-all duration-700 pb-2 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10">
              {currentIdx === prompts.length - 1
                ? "ปล่อยวางและจากลา →"
                : "เอ่ยคำนั้นออกมา →"}
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gold/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
          </button>

          <div className="w-full flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <ProgressBar current={currentIdx + 1} total={prompts.length} />
            <span className="text-[9px] font-mono text-ink-faint tracking-[0.3em] uppercase">
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
            filter: brightness(1.2);
          }
          50% {
            opacity: 0.8;
            filter: brightness(0.8);
          }
        }
      `}</style>
    </div>
  );
}