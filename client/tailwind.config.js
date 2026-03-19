/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light glassmorphism 2.0 palette
        surface: {
          DEFAULT: '#F2F5FF',    // page background
          secondary: '#EBF0FF',  // secondary bg
          card: 'rgba(255,255,255,0.72)',
          hover: 'rgba(255,255,255,0.88)',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.65)',
          strong: 'rgba(255,255,255,0.82)',
          border: 'rgba(255,255,255,0.90)',
          stroke: 'rgba(99,120,180,0.14)',
        },
        accent: {
          green: '#30D158',       // Apple system green
          'green-hover': '#25A244',
          'green-soft': 'rgba(48,209,88,0.12)',
          red: '#FF3B30',         // Apple system red
          'red-hover': '#D93025',
          'red-soft': 'rgba(255,59,48,0.10)',
          blue: '#007AFF',        // Apple system blue
          'blue-hover': '#0062CC',
          'blue-soft': 'rgba(0,122,255,0.10)',
          indigo: '#5856D6',
          teal: '#30B0C7',
        },
        ink: {
          DEFAULT: '#1D1D1F',     // Apple primary text
          secondary: '#48484A',
          tertiary: '#6C6C70',
          muted: '#8E8E93',
          placeholder: '#AEAEB2',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        // Apple-inspired layered shadows
        glass: '0 2px 20px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(0,0,0,0.04) inset',
        'glass-md': '0 4px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.95) inset',
        'glass-lg': '0 8px 48px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,1) inset',
        'glass-hover': '0 8px 40px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.95) inset',
        'skeu-button': '0 1px 3px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.8) inset, 0 -1px 0 rgba(0,0,0,0.08) inset',
        'skeu-button-pressed': '0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.08) inset',
        'skeu-input': '0 2px 6px rgba(0,0,0,0.05) inset, 0 1px 0 rgba(255,255,255,0.9)',
        'green': '0 4px 24px rgba(48,209,88,0.25)',
        'blue': '0 4px 24px rgba(0,122,255,0.20)',
        float: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.05)',
      },
      backdropBlur: {
        xs: '4px',
        '2xl': '40px',
        '3xl': '64px',
      },
      backgroundImage: {
        'page-gradient': 'linear-gradient(145deg, #F2F5FF 0%, #EBF0FF 35%, #F5F0FF 70%, #F0F8FF 100%)',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 100%)',
        'button-primary': 'linear-gradient(180deg, #34C759 0%, #2DB34A 100%)',
        'button-primary-hover': 'linear-gradient(180deg, #3FD668 0%, #30D158 100%)',
        'button-blue': 'linear-gradient(180deg, #1A8BFF 0%, #007AFF 100%)',
        'orb-green': 'radial-gradient(circle, rgba(48,209,88,0.18) 0%, transparent 70%)',
        'orb-blue': 'radial-gradient(circle, rgba(0,122,255,0.12) 0%, transparent 70%)',
        'orb-indigo': 'radial-gradient(circle, rgba(88,86,214,0.10) 0%, transparent 70%)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16,1,0.3,1)',
        'scale-in': 'scaleIn 0.35s cubic-bezier(0.16,1,0.3,1)',
        'spring-bounce': 'springBounce 0.6s cubic-bezier(0.34,1.56,0.64,1)',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'orb-drift': 'orbDrift 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        springBounce: {
          '0%': { opacity: '0', transform: 'scale(0.88)' },
          '60%': { opacity: '1', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { boxShadow: '0 4px 24px rgba(48,209,88,0.20)' },
          '50%': { boxShadow: '0 4px 32px rgba(48,209,88,0.40)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        orbDrift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.95)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34,1.56,0.64,1)',
        apple: 'cubic-bezier(0.16,1,0.3,1)',
      },
    },
  },
  plugins: [],
};
