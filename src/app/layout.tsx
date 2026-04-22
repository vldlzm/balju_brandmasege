import type { Metadata } from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
