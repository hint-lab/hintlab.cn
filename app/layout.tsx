import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'H!NT Lab',
  description: 'Human-Intelligence iNTegration Lab',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
  metadataBase: new URL('https://www.hintlab.cn')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
