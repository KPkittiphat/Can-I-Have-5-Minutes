"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hourglass } from "lucide-react";

export default function SimulationPage() {
  const router = useRouter();
  const [scene, setScene] = useState(1);
  const [userData, setUserData] = useState<{
    name: string;
    age: number;
  } | null>(null);
  const [filledYears, setFilledYears] = useState<number[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("ci5m_user");
    if (!data) {
      router.push("/");
      return;
    }
    setUserData(JSON.parse(data));

    const t1 = setTimeout(() => setScene(2), 7000); // เพิ่มเวลาให้คนได้อ่านบทกลอนหน่อย
    const t2 = setTimeout(() => router.push("/select"), 16000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [router]);

  useEffect(() => {
    if (scene === 2 && userData) {
      let current = 0;
      const interval = setInterval(() => {
        if (current < userData.age && current < 75) {
          setFilledYears((prev) => [...prev, current]);
          current++;
        } else clearInterval(interval);
      }, 60); // เร่งความเร็วการถมช่องนิดหนึ่งให้ดูสมูท
      return () => clearInterval(interval);
    }
  }, [scene, userData]);

  if (!userData) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-bg selection:bg-gold/30">
      
      {/* 🌑 Background Fade Effect */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_140%)] opacity-80" />

      {scene === 1 ? (
        <div className="relative z-10 space-y-12 animate-fade-in max-w-2xl">
          <Hourglass
            className="w-12 h-12 text-gold-dim animate-pulse mx-auto mb-8"
            strokeWidth={1}
          />
          
          {/* บทกลอน Scene 1: การสะท้อนสิ่งที่ผ่านมา */}
          <div className="space-y-6 text-ink-muted font-serif italic mb-12">
            <p className="text-xl md:text-2xl animate-fade-in [animation-delay:1s] fill-mode-both">
              กาลเวลา... ไหลผ่านเงียบเชียบ
            </p>
            <p className="text-xl md:text-2xl animate-fade-in [animation-delay:2.5s] fill-mode-both">
              ดั่งทรายในแก้ว... ที่ไม่มีวันหวนกลับ
            </p>
          </div>

          <div className="space-y-4 animate-fade-in [animation-delay:4.5s] fill-mode-both">
             <h2 className="text-2xl md:text-4xl font-serif text-white/90">
              คุณ {userData.name} ใช้ชีวิตมาแล้ว {userData.age} ปี
            </h2>
            <h2 className="text-xl md:text-2xl font-serif text-gold-dim/70 tracking-widest uppercase">
              ≈ {(userData.age * 365).toLocaleString()} วัน
            </h2>
          </div>
        </div>
      ) : (
        <div className="relative z-10 animate-fade-in flex flex-col items-center w-full max-w-4xl">
          
          {/* Life Grid */}
          <div className="grid grid-cols-15 gap-2 md:gap-3 mb-12 px-4">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 md:w-5 md:h-5 rounded-[2px] transition-all duration-1000 border ${
                  filledYears.includes(i) 
                  ? "bg-gold border-gold scale-110 shadow-[0_0_15px_rgba(200,169,110,0.4)]" 
                  : "border-border/40 bg-transparent"
                }`}
              />
            ))}
          </div>

          <p className="text-ink-faint font-mono text-[15px] tracking-[0.4em] uppercase mb-16 opacity-50">
            1 ช่องสีทอง = 1 ปีที่เลือนหาย 
          </p>

          {/* บทกลอน Scene 2: การตั้งคำถามถึงสิ่งที่เหลือ */}
          <div className="space-y-8 text-white/90 font-serif italic mb-8">
            <p className="text-xl md:text-2xl animate-fade-in [animation-delay:1s] fill-mode-both">
              แต่ละช่องที่ว่างเปล่า... คือโอกาสที่ยังเหลือ
            </p>
            <p className="text-xl md:text-2xl animate-fade-in [animation-delay:3s] fill-mode-both text-gold-dim">
              หากนี่คือ... วันที่คุณได้จากโลกนี้ไปแล้ว
            </p>
            <p className="text-2xl md:text-3xl font-serif not-italic font-light animate-fade-in [animation-delay:5s] fill-mode-both pt-4">
              คุณเสียดายชีวิตที่เหลือไหม?... และถ้าคุณมีโอกาสได้กลับมา5นาที คุณอยากจะทำอะไร?
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        .grid-cols-15 { 
          display: grid;
          grid-template-columns: repeat(15, minmax(0, 1fr)); 
        }
      `}</style>
    </div>
  );
}