'use client';

const variants = {
  primary: 'bg-accent-green hover:bg-accent-green-hover text-dark font-semibold',
  secondary: 'bg-dark-card hover:bg-dark-hover text-text-primary border border-dark-border',
  danger: 'bg-accent-red hover:bg-accent-red-hover text-white font-semibold',
  ghost: 'bg-transparent hover:bg-dark-card text-text-secondary hover:text-text-primary',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2
        ${variants[variant]} ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
