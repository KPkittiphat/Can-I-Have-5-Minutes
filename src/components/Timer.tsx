interface TimerProps {
  timeDisplay: string; // รับค่าที่ format แล้วมาจาก hook useTimer (เช่น "4:59")
  isWarning?: boolean; // ถ้าเหลือน้อยกว่า 1 นาที ให้ตัวเลขเปลี่ยนสี
}

export default function Timer({ timeDisplay, isWarning }: TimerProps) {
  return (
    <div className="flex flex-col items-center gap-2 animate-fade-in">
      <div className={`font-mono text-sm tracking-[0.5em] transition-colors duration-500 ${
        isWarning ? 'text-red-400' : 'text-gold-dim'
      }`}>
        {timeDisplay}
      </div>
      <div className="w-12 h-[1px] bg-border/50"></div>
    </div>
  );
}