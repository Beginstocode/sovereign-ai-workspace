/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#05070D",
        surface: {
          50: "#0b0f19",
          100: "#0f1627",
          200: "#151e36",
          300: "#1d2949",
        },
        brand: {
          violet: "#7C3AED",
          purple: "#9333EA",
          cyan: "#06B6D4",
          blue: "#2563EB",
          orange: "#F97316",
          emerald: "#10B981",
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.25) 0%, rgba(6, 182, 212, 0.1) 40%, transparent 70%)',
        'subtle-grid': 'radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
        'hero-gradient': 'linear-gradient(to bottom, #05070d 0%, #080c16 50%, #05070d 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(124, 58, 237, 0.4))' },
          '100%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.6))' },
        }
      }
    },
  },
  plugins: [],
}
