import type { Metadata } from 'next';
import './globals.css';
import GNB from '@/components/GNB';
import LNB from '@/components/LNB';

export const metadata: Metadata = {
  title: '발주모아 파트너스',
  description: '발주모아 파트너스 애플리케이션',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        <GNB />
        <div className="flex min-h-[calc(100vh-73px)]">
          <LNB />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
