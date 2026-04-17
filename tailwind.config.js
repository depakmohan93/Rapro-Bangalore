/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#73B130',
          dark: '#0D631B',
          mid: '#2C7B30',
          light: '#81D922',
          pale: '#D7FFD4',
          muted: '#ECFBEB',
          bg: '#F9F9F9',
        },
        text: {
          primary: '#1A1C1E',
          secondary: '#40493D',
          muted: '#4B4B4B',
          light: '#6B7280',
          gray: '#A5A5A5',
        },
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mulish: ['Mulish', 'sans-serif'],
      },
      boxShadow: {
        'form': '0px 25px 42.7px -12px rgba(44, 123, 48, 0.36)',
        'card': '0px 4px 3.4px rgba(0, 0, 0, 0.16)',
        'nav': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        'btn': '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
