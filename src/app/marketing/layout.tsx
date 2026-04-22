import { Suspense } from 'react';
import GNB from '@/components/GNB';
import LNB from '@/components/LNB';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense><GNB /></Suspense>
      <div className="flex min-h-[calc(100vh-73px)]">
        <Suspense><LNB /></Suspense>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}
