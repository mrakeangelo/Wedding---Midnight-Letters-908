/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#0B1426',
        'ink': '#1A1A1A',
        'navy': '#1E2A4A',
        'rose-gold': '#E8B4A0',
        'dusty-burgundy': '#8B4B6B',
        'moonlight': '#E6E6FA',
        'parchment': '#F5F2E8',
        'candle-glow': '#FFF8DC'
      },
      fontFamily: {
        'script': ['Dancing Script', 'cursive'],
        'serif': ['Playfair Display', 'serif'],
        'body': ['Source Sans Pro', 'sans-serif']
      },
      backgroundImage: {
        'stars': "radial-gradient(2px 2px at 20px 30px, #E6E6FA, transparent), radial-gradient(2px 2px at 40px 70px, #E6E6FA, transparent), radial-gradient(1px 1px at 90px 40px, #E6E6FA, transparent), radial-gradient(1px 1px at 130px 80px, #E6E6FA, transparent), radial-gradient(2px 2px at 160px 30px, #E6E6FA, transparent)",
        'parchment-texture': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cg fill-opacity=\"0.03\"%3E%3Cpolygon fill=\"%23000\" points=\"50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40\"/%3E%3C/g%3E%3C/svg%3E')"
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'unfold': 'unfold 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' }
        },
        unfold: {
          '0%': { opacity: '0', transform: 'rotateX(-90deg)' },
          '100%': { opacity: '1', transform: 'rotateX(0deg)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(232, 180, 160, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(232, 180, 160, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}