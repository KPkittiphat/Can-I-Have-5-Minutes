"use client";

import { useRouter } from "next/navigation";
import { THEMES } from "../../data/prompts";
import * as LucideIcons from "lucide-react";

export default function SelectPage() {
  const router = useRouter();

  const handleSelect = (id: string) => {
    localStorage.setItem("ci5m_selected_theme", id);
    router.push(`/session/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-6 py-20 text-center min-h-screen bg-bg antialiased">
      <div className="mb-16 md:mb-24 space-y-6 animate-fade-in max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">ความค้างคาครั้งสุดท้าย</h1>
        <p className="text-lg md:text-l text-ink-muted font-serif italic leading-relaxed">
          หากดวงวิญญาณของคุณได้รับอนุญาตให้ส่งเสียงถึงโลกใบนั้นได้อีกเพียง 5 นาที...
          <br className="hidden md:block" />
          คุณมีเรื่องอะไรที่ &quot;ยังไม่ได้บอก&quot; ใครบ้าง?
        </p>
      </div>

      {/* 📱 Responsive Grid: มือถือ 2, แท็บเล็ตขึ้นไป 3 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl w-full">
        {THEMES.map((theme, idx) => {
          const Icon = (LucideIcons as any)[theme.icon];
          return (
            <button 
              key={theme.id} 
              onClick={() => handleSelect(theme.id)} 
              style={{ animationDelay: `${idx * 0.1 + 0.6}s`, animationFillMode: 'both' }}
              className="group flex flex-col items-center justify-center p-6 md:p-10 bg-surface border border-border rounded-xl transition-all duration-700 hover:border-gold hover:scale-[1.02] animate-fade-in cursor-pointer aspect-square overflow-hidden"
            >
              {/* Icon - ปรับขนาดตามหน้าจอ */}
              <div className="mb-4 md:mb-6 text-gold-dim group-hover:text-gold transition-colors duration-700">
                {Icon && (
                  <>
                    {/* ไอคอนขนาดปกติสำหรับมือถือ */}
                    <div className="block md:hidden">
                      <Icon size={28} strokeWidth={1} />
                    </div>
                    {/* ไอคอนขนาดใหญ่สำหรับจอใหญ่ */}
                    <div className="hidden md:block">
                      <Icon size={40} strokeWidth={1} />
                    </div>
                  </>
                )}
              </div>

              {/* Label (ชื่อหัวข้อ) - ปรับขนาดตามหน้าจอ */}
              <span className="text-lg md:text-2xl text-white mb-2 md:mb-4 transition-colors font-serif font-medium leading-snug">
                {theme.label}
              </span>

              {/* Closing Text (บทความสั้นๆ) - ค่อยๆ แสดงเมื่อ Hover ในจอใหญ่ */}
              <p className="text-xs md:text-base text-ink-muted/80 font-serif italic leading-relaxed md:leading-relaxed px-1 md:px-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 md:max-h-0 md:group-hover:max-h-20 md:overflow-hidden md:transition-[opacity,max-height] md:duration-[700ms,1000ms]">
                {theme.closingText}
              </p>
            </button>
          );
        })}
      </div>
      
      <div className="mt-20 animate-fade-in delay-3 fill-mode-both">
        <p className="text-ink-faint font-serif italic text-sm tracking-widest uppercase">
          เลือกหัวข้อที่คุณเสียดายที่สุดหากไม่ได้พูดออกมา...
        </p>
      </div>
    </div>
  );
}