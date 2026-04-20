import type { Metadata } from 'next';
import './globals.css';
import GNB from '@/components/GNB';

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
        <main>{children}</main>
      </body>
    </html>
  );
}
