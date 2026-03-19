const variants = {
  green: 'bg-accent-green-soft text-accent-green border-accent-green/20',
  blue:  'bg-accent-blue-soft text-accent-blue border-accent-blue/20',
  red:   'bg-accent-red-soft text-accent-red border-accent-red/20',
  indigo: 'bg-accent-indigo/10 text-accent-indigo border-accent-indigo/20',
  gray:  'bg-white/60 text-ink-tertiary border-glass-stroke',
};

export default function Badge({ children, variant = 'green', className = '' }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
        text-xs font-medium border
        backdrop-blur-sm
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  );
}
