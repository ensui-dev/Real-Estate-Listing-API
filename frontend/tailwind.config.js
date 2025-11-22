/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Portuguese Azulejo-inspired palette
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dfff',
          300: '#7cc4ff',
          400: '#36a5ff',
          500: '#0c87f2',
          600: '#0066cc', // Main Portuguese blue
          700: '#0052a3',
          800: '#004585',
          900: '#003a6e',
          950: '#00254a',
        },
        // Terracotta/Coral - inspired by Portuguese rooftops
        terracotta: {
          50: '#fef6f3',
          100: '#fdeae4',
          200: '#fcd5c9',
          300: '#f9b5a1',
          400: '#f48c6d',
          500: '#eb6b47',
          600: '#d94f2a', // Main terracotta
          700: '#b53f22',
          800: '#953620',
          900: '#7a3121',
          950: '#42160d',
        },
        // Golden Yellow - inspired by Portuguese sunshine
        golden: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Warm neutrals
        sand: {
          50: '#fdfcfb',
          100: '#f9f5f1',
          200: '#f3ebe1',
          300: '#e9daca',
          400: '#dcc4a8',
          500: '#c9a87e',
          600: '#b89060',
          700: '#9a7550',
          800: '#7d6145',
          900: '#66513c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'float': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'float-lg': '0 12px 40px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(0, 102, 204, 0.3)',
        'glow-terracotta': '0 0 20px rgba(217, 79, 42, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'portuguese-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066cc' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
