'use client';

const tickers = [
  { name: 'NASDAQ', value: '18 120.4', change: '+1.2%', up: true },
  { name: 'GOLD', value: '2 154.5', change: '-0.3%', up: false },
  { name: 'BRENT', value: '82.1', change: '+0.5%', up: true },
  { name: 'S&P 500', value: '5 130.2', change: '+0.8%', up: true },
  { name: 'BTC/USD', value: '67 420', change: '+2.1%', up: true },
  { name: 'EUR/USD', value: '1.0854', change: '-0.1%', up: false },
  { name: 'AAPL', value: '185.7', change: '+0.6%', up: true },
  { name: 'TSLA', value: '192.3', change: '-1.4%', up: false },
  { name: 'ETH/USD', value: '3 421', change: '+1.8%', up: true },
  { name: 'SILVER', value: '24.31', change: '+0.4%', up: true },
];

function UpArrow() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="inline-block">
      <path d="M4 1L7 5H1L4 1Z" fill="currentColor" />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="inline-block">
      <path d="M4 7L1 3H7L4 7Z" fill="currentColor" />
    </svg>
  );
}

export default function TickerTape() {
  // Duplicate tickers for seamless loop
  const items = [...tickers, ...tickers, ...tickers];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-8 overflow-hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-[rgba(8,9,14,0.82)] backdrop-blur-md border-b border-white/[0.06]" />

      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#08090E] to-transparent pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#08090E] to-transparent pointer-events-none" />

      {/* Scrolling strip */}
      <div className="relative flex items-center h-full">
        <div className="ticker-scroll flex items-center gap-0 whitespace-nowrap">
          {items.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-4 text-[11px] font-medium">
              <span className="text-white/35 tracking-wide">{t.name}</span>
              <span className="text-white/70 tabular-nums">{t.value}</span>
              <span className={`flex items-center gap-0.5 ${t.up ? 'text-[#00D4AA]' : 'text-[#FF3B30]'}`}>
                {t.up ? <UpArrow /> : <DownArrow />}
                {t.change}
              </span>
              <span className="text-white/10 pl-3">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
