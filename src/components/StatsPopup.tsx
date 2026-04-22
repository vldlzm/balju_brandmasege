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
  failCount: 6,
  openCount: 106,
  openRate: 38.2,
  btnClickCount: 156,
  btnClickRate: 14.6,
  uniqueClickCount: 98,
  productPageVisit: 74,
  productPageSeller: 61,
  imageDownload: 23,
  points: 4260,
};

export default function StatsPopup({ onClose }: StatsPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 shrink-0">
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

        {/* 스크롤 영역 */}
        <div className="overflow-y-auto flex-1">

          {/* 메시지 정보 */}
          <div className="px-6 pt-5">
            <p className="text-xs text-gray-400">{STAT_DATA.sentAt} · {STAT_DATA.formatType}</p>
            <p className="mt-1.5 text-sm font-bold text-gray-900 leading-snug">{STAT_DATA.title}</p>
          </div>

          {/* 핵심 지표 */}
          <div className="mt-5 mx-6 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-gray-100">
              {[
                { label: '오픈율', value: `${STAT_DATA.openRate}%` },
                { label: '버튼 클릭 수', value: STAT_DATA.btnClickCount.toLocaleString() },
                { label: '발송 성공률', value: `${((STAT_DATA.sentCount / STAT_DATA.targetCount) * 100).toFixed(1)}%` },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1 bg-white py-4">
                  <span className="text-[10px] font-medium text-gray-400">{item.label}</span>
                  <span className="text-xl font-black tabular-nums text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 상세 수치 */}
          <div className="mt-4 px-6 pb-2">
            <div className="divide-y divide-gray-50">
              {[
                { label: '발송 수',                    value: `${STAT_DATA.targetCount.toLocaleString()}명` },
                { label: '발송 성공 수',               value: `${STAT_DATA.sentCount.toLocaleString()}명` },
                { label: '발송 실패 수',               value: `${STAT_DATA.failCount.toLocaleString()}명` },
                { label: '메시지 오픈 수',             value: `${STAT_DATA.openCount.toLocaleString()}명` },
                { label: '오픈율 (%)',                  value: `${STAT_DATA.openRate}%` },
                { label: '버튼 클릭 수',               value: `${STAT_DATA.btnClickCount.toLocaleString()}회` },
                { label: '버튼 클릭률 (%)',            value: `${STAT_DATA.btnClickRate}%` },
                { label: '메시지 클릭 셀러 수 (유니크)', value: `${STAT_DATA.uniqueClickCount.toLocaleString()}명` },
                { label: '상품 상세 페이지 방문 수',   value: `${STAT_DATA.productPageVisit.toLocaleString()}회` },
                { label: '상품 상세 방문 셀러 수',     value: `${STAT_DATA.productPageSeller.toLocaleString()}명` },
                { label: '이미지 내려받기 클릭 수',    value: `${STAT_DATA.imageDownload.toLocaleString()}회` },
                { label: '차감 포인트',                value: `${STAT_DATA.points.toLocaleString()}P` },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-gray-400">{row.label}</span>
                  <span className="font-semibold text-gray-800">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 푸터 */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0">
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
