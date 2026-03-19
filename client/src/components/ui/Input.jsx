'use client';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-ink-secondary mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 rounded-[12px]
          bg-white/70 backdrop-blur-sm
          text-ink placeholder:text-ink-placeholder
          border transition-all duration-200
          shadow-[0_2px_6px_rgba(0,0,0,0.05)_inset,0_1px_0_rgba(255,255,255,0.9)]
          focus:outline-none
          focus:ring-2 focus:ring-accent-blue/30
          focus:border-accent-blue/50
          focus:bg-white/90
          focus:shadow-[0_2px_6px_rgba(0,0,0,0.04)_inset,0_1px_0_rgba(255,255,255,1),0_0_0_4px_rgba(0,122,255,0.08)]
          ${error
            ? 'border-accent-red/50 focus:ring-accent-red/30 focus:border-accent-red/60'
            : 'border-glass-stroke hover:border-glass-stroke/80'
          }
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-accent-red flex items-center gap-1">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0V5zm.75 7a1 1 0 110-2 1 1 0 010 2z"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
