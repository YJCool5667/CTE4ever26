import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'CTE | Climate-Tech Energy',
    template: '%s | CTE'
  },
  description: 'CTE — Climate-Tech Carbon Credit Business Development'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
