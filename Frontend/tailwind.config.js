/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          base: '#0F1117',
          surface: '#151922',
          surfaceLight: '#1A1F2B',
        },
        card: {
          base: '#1E2433',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
        accent: {
          indigo: '#6366F1',
          blue: '#3B82F6',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          glow: 'rgba(99, 102, 241, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(99, 102, 241, 0.15)',
        glowGreen: '0 0 20px rgba(16, 185, 129, 0.15)',
      }
    },
  },
  plugins: [],
}
