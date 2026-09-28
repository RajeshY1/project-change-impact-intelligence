/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8eb6ff',
          400: '#598dff',
          500: '#3366ff',
          600: '#1d4ed8',
          700: '#1a3fbf',
          800: '#1b3699',
          900: '#1c2f7a',
          950: '#141d4d',
        },
        ink: {
          50: '#f7f8fa',
          100: '#eef0f4',
          200: '#dde1e8',
          300: '#c2c8d4',
          400: '#9aa1b1',
          500: '#737a8c',
          600: '#565d70',
          700: '#424961',
          800: '#2f354a',
          900: '#1e2335',
          950: '#131726',
        },
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(19,23,38,0.06), 0 1px 2px -1px rgba(19,23,38,0.04)',
        'card-hover': '0 4px 12px -2px rgba(19,23,38,0.08), 0 2px 6px -2px rgba(19,23,38,0.04)',
        elevated: '0 10px 30px -10px rgba(19,23,38,0.15), 0 4px 12px -4px rgba(19,23,38,0.06)',
      },
    },
  },
  plugins: [],
};
