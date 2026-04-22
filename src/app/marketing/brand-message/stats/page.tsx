'use client';

import StatsPopup from '@/components/StatsPopup';
import KakaoBrandMessageList from '@/components/KakaoBrandMessageList';

export default function StatsPage() {
  return (
    <div className="relative">
      <KakaoBrandMessageList />
      <StatsPopup />
    </div>
  );
}
