import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'H!NT Lab | 实验室主页',
  description: '人工智能、人机协同认知、自然语言处理实验室主页',
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
