/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
      '2xl': '1537px',
      '3xl': '1920px',
    },
    extend: {
      height: {
        section: '90%',
        sectionWidth: 'calc(100% - 65px)'
      },
      colors: {
        themeGreen: '#03D25C',
        themeRed: '#FF0501',
        themeYellow: '#FEED01',
        gridGreen: '#3aa938'
      },
    },
  },
  plugins: [],
}

