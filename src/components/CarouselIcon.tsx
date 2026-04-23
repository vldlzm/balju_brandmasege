export default function CarouselIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* 좌측 카드 */}
      <rect x="1" y="6" width="6" height="12" rx="1.5" strokeOpacity={0.45} />
      {/* 중앙 카드 (메인) */}
      <rect x="8" y="4" width="8" height="16" rx="2" />
      {/* 중앙 카드 내부 콘텐츠 선 */}
      <line x1="10" y1="9" x2="14" y2="9" />
      <line x1="10" y1="12" x2="14" y2="12" />
      <line x1="10" y1="15" x2="14" y2="15" />
      {/* 우측 카드 */}
      <rect x="17" y="6" width="6" height="12" rx="1.5" strokeOpacity={0.45} />
    </svg>
  );
}
