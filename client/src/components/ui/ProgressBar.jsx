export default function ProgressBar({ value = 0, className = '' }) {
  return (
    <div className={`w-full bg-dark-border rounded-full h-2 ${className}`}>
      <div
        className="bg-accent-green h-2 rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
