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
        // Dark theme base
        dark: {
          DEFAULT: '#08090E',
          card: '#0D1117',
          'card-2': '#111520',
          hover: 'rgba(255,255,255,0.04)',
          border: 'rgba(255,255,255,0.07)',
          'border-strong': 'rgba(255,255,255,0.14)',
        },
        // Glass (dark)
        glass: {
          DEFAULT: 'rgba(13,17,23,0.70)',
          strong: 'rgba(13,17,23,0.85)',
          border: 'rgba(255,255,255,0.08)',
          stroke: 'rgba(255,255,255,0.07)',
        },
        // Surface (compat)
        surface: {
          DEFAULT: '#08090E',
          secondary: '#0D1117',
          card: 'rgba(13,17,23,0.70)',
          hover: 'rgba(255,255,255,0.04)',
        },
        // Accent — teal/cyan (RevGuard style)
        accent: {
          green: '#00D4AA',
          'green-hover': '#00B890',
          'green-soft': 'rgba(0,212,170,0.10)',
          'green-glow': 'rgba(0,212,170,0.20)',
          red: '#FF3B30',
          'red-hover': '#D93025',
          'red-soft': 'rgba(255,59,48,0.10)',
          blue: '#00B8FF',
          'blue-hover': '#0099DD',
          'blue-soft': 'rgba(0,184,255,0.10)',
          indigo: '#7C6FFF',
          teal: '#00D4AA',
        },
        // Text on dark bg
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255,255,255,0.55)',
          muted: 'rgba(255,255,255,0.30)',
        },
        // ink — light on dark
        ink: {
          DEFAULT: '#FFFFFF',
          secondary: 'rgba(255,255,255,0.70)',
          tertiary: 'rgba(255,255,255,0.45)',
          muted: 'rgba(255,255,255,0.30)',
          placeholder: 'rgba(255,255,255,0.20)',
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
        glass: '0 2px 20px rgba(0,0,0,0.40)',
        'glass-md': '0 4px 32px rgba(0,0,0,0.50)',
        'glass-lg': '0 8px 48px rgba(0,0,0,0.60)',
        'glass-hover': '0 8px 40px rgba(0,0,0,0.60)',
        'skeu-button': '0 1px 3px rgba(0,0,0,0.40)',
        'skeu-button-pressed': '0 0 1px rgba(0,0,0,0.3)',
        'skeu-input': '0 2px 6px rgba(0,0,0,0.30) inset',
        green: '0 4px 24px rgba(0,212,170,0.30)',
        'green-lg': '0 8px 40px rgba(0,212,170,0.40)',
        blue: '0 4px 24px rgba(0,184,255,0.20)',
        float: '0 20px 60px rgba(0,0,0,0.50), 0 4px 16px rgba(0,0,0,0.30)',
      },
      backdropBlur: {
        xs: '4px',
        '2xl': '40px',
        '3xl': '64px',
      },
      backgroundImage: {
        'page-gradient': 'linear-gradient(145deg, #08090E 0%, #0D1117 50%, #08090E 100%)',
        'glass-gradient': 'linear-gradient(145deg, rgba(13,17,23,0.85) 0%, rgba(13,17,23,0.60) 100%)',
        'button-primary': 'linear-gradient(135deg, #00D4AA 0%, #00B890 100%)',
        'button-primary-hover': 'linear-gradient(135deg, #00E0B5 0%, #00C9A0 100%)',
        'orb-teal': 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)',
        'orb-blue': 'radial-gradient(circle, rgba(0,184,255,0.10) 0%, transparent 70%)',
        'planet-glow': 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,212,170,0.18) 0%, transparent 70%)',
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
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'orb-drift': 'orbDrift 12s ease-in-out infinite',
        'pulse-green': 'pulseGreen 2.5s ease-in-out infinite',
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
          '0%, 100%': { boxShadow: '0 4px 24px rgba(0,212,170,0.20)' },
          '50%': { boxShadow: '0 4px 32px rgba(0,212,170,0.40)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,212,170,0.25)' },
          '50%': { boxShadow: '0 0 40px rgba(0,212,170,0.55)' },
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
