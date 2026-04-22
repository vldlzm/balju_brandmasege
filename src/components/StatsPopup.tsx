'use client';

interface StatsPopupProps {
  onClose?: () => void;
}

const STAT_DATA = {
  title: '3월 봄 맞이 유아동 의류 신규 입고 안내',
  sentAt: '2025.03.28 오전 10:00',
  formatType: '와이드 이미지',
  targetCount: 284,
  sentCount: 278,
  openRate: 38.2,
  clickCount: 156,
  points: 4260,
};

export default function StatsPopup({ onClose }: StatsPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-bold text-gray-900">발송 통계</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* 메시지 정보 */}
        <div className="px-6 pt-5">
          <p className="text-xs text-gray-400">{STAT_DATA.sentAt} · {STAT_DATA.formatType}</p>
          <p className="mt-1.5 text-sm font-bold text-gray-900 leading-snug">{STAT_DATA.title}</p>
        </div>

        {/* 핵심 지표 */}
        <div className="mt-5 grid grid-cols-3 gap-px bg-gray-100 mx-6 rounded-xl overflow-hidden">
          {[
            { label: '오픈율', value: `${STAT_DATA.openRate}%` },
            { label: '클릭 수', value: STAT_DATA.clickCount.toLocaleString() },
            { label: '발송 성공률', value: `${((STAT_DATA.sentCount / STAT_DATA.targetCount) * 100).toFixed(1)}%` },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 bg-white py-4">
              <span className="text-[10px] font-medium text-gray-400">{item.label}</span>
              <span className="text-xl font-black tabular-nums text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>

        {/* 상세 수치 */}
        <div className="mt-4 space-y-3 px-6">
          {[
            { label: '발송 대상', value: `${STAT_DATA.targetCount.toLocaleString()}명` },
            { label: '실제 발송', value: `${STAT_DATA.sentCount.toLocaleString()}명` },
            { label: '미발송', value: `${(STAT_DATA.targetCount - STAT_DATA.sentCount).toLocaleString()}명` },
            { label: '차감 포인트', value: `${STAT_DATA.points.toLocaleString()}P` },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{row.label}</span>
              <span className="font-semibold text-gray-800">{row.value}</span>
            </div>
          ))}
        </div>

        {/* 푸터 */}
        <div className="px-6 py-5 mt-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-gray-100 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
}
