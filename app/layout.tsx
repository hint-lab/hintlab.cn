import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'H!NT Lab',
  description: 'H!NT Lab · 人机智能融合实验室。研究人类与人工智能如何在复杂、开放且充满不确定性的真实环境中，共同理解、决策与创造。',
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
