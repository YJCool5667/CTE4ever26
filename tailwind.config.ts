import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'system-ui', 'Arial', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config;
