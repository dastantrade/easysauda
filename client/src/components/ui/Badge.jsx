const variants = {
  green: 'bg-accent-green/10 text-accent-green border-accent-green/20',
  blue: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
  red: 'bg-accent-red/10 text-accent-red border-accent-red/20',
  gray: 'bg-dark-border/30 text-text-secondary border-dark-border',
};

export default function Badge({ children, variant = 'green', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
