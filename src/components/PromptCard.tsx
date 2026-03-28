import { ReactNode } from "react";

interface PromptCardProps {
  children: ReactNode;
  step: number; // ใช้ step เป็น key เพื่อกระตุ้น animation
}

export default function PromptCard({ children, step }: PromptCardProps) {
  return (
    <div 
      key={step} 
      className="w-full flex flex-col items-center justify-center animate-fade-in min-h-[200px]"
    >
      <div className="max-w-2xl w-full px-4">
        {children}
      </div>
    </div>
  );
}