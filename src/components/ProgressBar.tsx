export default function ProgressBar({ current, total }: { current: number, total: number }) {
  const progress = (current / total) * 100;
  return (
    <div className="w-full max-w-xs h-[1px] bg-border relative overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full bg-gold transition-all duration-700 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}