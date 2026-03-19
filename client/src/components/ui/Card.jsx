export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-dark-card border border-dark-border rounded-xl p-6
        ${hover ? 'hover:border-accent-green/30 hover:shadow-lg hover:shadow-accent-green/5 transition-all duration-300' : ''}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
