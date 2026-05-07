/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'toss-bg': '#F2F4F6',
        'toss-primary': '#3182F6',
        'toss-card': '#FFFFFF',
        'toss-border': '#E8EAED',
        'toss-text': '#333333',
        'toss-text-light': '#999999',
      },
      fontFamily: {
        sans: ['Pretendard', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        'toss': '12px',
      }
    },
  },
  plugins: [],
}
