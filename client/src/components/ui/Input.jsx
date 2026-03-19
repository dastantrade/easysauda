'use client';

export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm text-text-secondary mb-1.5">{label}</label>
      )}
      <input
        className={`w-full px-4 py-2.5 bg-dark border rounded-lg text-text-primary placeholder:text-text-muted
          focus:outline-none focus:ring-2 focus:ring-accent-green/50 focus:border-accent-green transition-colors
          ${error ? 'border-accent-red' : 'border-dark-border'}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-accent-red">{error}</p>}
    </div>
  );
}
