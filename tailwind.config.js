/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'Noto Sans', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        dark: {
          bg: '#101a23',
          card: '#223649',
          text: '#90aecb',
          border: '#314d68',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
