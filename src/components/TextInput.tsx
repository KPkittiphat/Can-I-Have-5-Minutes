interface TextInputProps {
  value: string;
  onChange: (val: string) => void;
  onEnter?: () => void;
  placeholder?: string;
  type?: string;
}

export default function TextInput({ value, onChange, onEnter, placeholder, type = "text" }: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-border focus:border-gold focus:outline-none py-3 text-[#e8e8e8] text-lg text-center transition-colors placeholder:text-ink-faint"
      autoFocus
    />
  );
}