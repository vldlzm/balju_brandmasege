'use client';

import { useState } from 'react';
import CancelSendConfirm from './CancelSendConfirm';

interface ScheduledMessage {
  id: string;
  category: string;
  scheduledAt: string;
  title: string;
  targetCount: number;
  targetLabel: string;
  formatType: string;
  points: number;
}

interface Props {
  campaign: ScheduledMessage;
  onClose: () => void;
  onCancel: (id: string) => void;
}

const CATEGORY_STYLE: Record<string, string> = {
  신상품:  'bg-[#E6F1FB] text-[#0C447C]',
  이벤트:  'bg-[#EEEDFE] text-[#3C3489]',
  가격할인: 'bg-[#FAECE7] text-[#712B13]',
};

const FORMAT_ICON: Record<string, string> = {
  '와이드 이미지': '🖼',
  '와이드 리스트': '📋',
  '캐러셀 피드':  '🎠',
};

/* 읽기전용 필드 공통 스타일 */
function ReadField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
}

export default function KakaoBrandMessageDetail({ campaign, onClose, onCancel }: Props) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancel = () => {
    onCancel(campaign.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f8f8f8] overflow-hidden">
      {showCancelConfirm && (
        <CancelSendConfirm
          points={campaign.points}
          onClose={() => setShowCancelConfirm(false)}
          onConfirm={handleCancel}
        />
      )}

      {/* 헤더 */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white shrink-0">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              목록으로
            </button>
            <div className="h-4 w-px bg-gray-300" />
            <h1 className="text-lg font-bold text-gray-900">캠페인 상세</h1>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${CATEGORY_STYLE[campaign.category] ?? 'bg-gray-100 text-gray-500'}`}>
              {campaign.category}
            </span>
          </div>
          {/* 수정 불가 배지 */}
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-amber-400">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold text-amber-700">수정 불가 · 발송 취소만 가능</span>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1440px] p-6">
          <div className="grid grid-cols-[1fr_340px] gap-6">

            {/* ── 좌측: 폼 (읽기 전용) ── */}
            <div className="space-y-5">

              {/* 캠페인명 */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <ReadField label="캠페인명">
                  <span className="font-medium">{campaign.title}</span>
                </ReadField>
              </section>

              {/* 메시지 종류 */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">메시지 종류</p>
                <div className="grid grid-cols-3 gap-3">
                  {['와이드 이미지', '와이드 리스트', '캐러셀 피드'].map((type) => {
                    const isSelected = campaign.formatType === type;
                    return (
                      <div
                        key={type}
                        className={`rounded-xl border-2 p-4 transition-colors ${
                          isSelected
                            ? 'border-[#4DB87A] bg-[#f0faf5]'
                            : 'border-gray-200 bg-gray-50 opacity-40'
                        }`}
                      >
                        <p className="text-lg mb-1">{FORMAT_ICON[type]}</p>
                        <p className={`text-sm font-bold ${isSelected ? 'text-[#2a7a4f]' : 'text-gray-500'}`}>{type}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 수신 파트너 */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <ReadField label="수신 파트너">
                  <div className="flex items-center justify-between">
                    <span>{campaign.targetLabel}</span>
                    <span className="font-bold text-gray-900">{campaign.targetCount.toLocaleString()}명</span>
                  </div>
                </ReadField>
              </section>

              {/* 발송 설정 */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <ReadField label="발송 일시">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-gray-400">
                      <path fillRule="evenodd" d="M4 1a1 1 0 00-1 1v1H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1h-1V2a1 1 0 10-2 0v1H5V2a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H4z" clipRule="evenodd" />
                    </svg>
                    {campaign.scheduledAt}
                  </div>
                </ReadField>
              </section>

              {/* 포인트 */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">예상 차감 포인트</p>
                    <p className="text-2xl font-black text-[#4DB87A] tabular-nums">{campaign.points.toLocaleString()}P</p>
                    <p className="mt-1 text-xs text-gray-400">수신자 {campaign.targetCount}명 × 15P (VAT 별도)</p>
                  </div>
                </div>
              </section>

              {/* 하단 버튼 */}
              <div className="flex items-center justify-between pb-10">
                <button
                  onClick={onClose}
                  className="rounded-xl border-2 border-gray-200 px-8 py-3.5 text-base font-bold text-gray-500 hover:bg-gray-50 transition-all"
                >
                  닫기
                </button>

                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="rounded-xl border-2 border-red-400 bg-red-50 px-10 py-3.5 text-base font-bold text-red-500 hover:bg-red-100 transition-all"
                >
                  발송 취소
                </button>
              </div>
            </div>

            {/* ── 우측: 미리보기 ── */}
            <div className="sticky top-[73px] h-fit">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                <p className="mb-4 text-xs font-bold uppercase tracking-wide text-gray-400">미리보기</p>
                {/* 폰 목업 */}
                <div className="mx-auto w-[220px] overflow-hidden rounded-[28px] border-4 border-gray-800 bg-gray-100 shadow-xl">
                  <div className="bg-gray-800 py-2 text-center">
                    <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-600" />
                  </div>
                  {/* 카카오톡 스타일 메시지 */}
                  <div className="bg-[#b2c7d9] p-3 min-h-[380px]">
                    <div className="flex items-end gap-2">
                      <div className="h-8 w-8 shrink-0 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold">K</div>
                      <div className="rounded-2xl rounded-tl-none bg-white p-3 shadow-sm max-w-[160px]">
                        {campaign.formatType === '와이드 이미지' && (
                          <>
                            <div className="mb-2 h-20 w-full rounded-lg bg-gray-200 flex items-center justify-center text-2xl">🖼</div>
                            <p className="text-[10px] font-bold text-gray-800 leading-tight">{campaign.title}</p>
                            <div className="mt-2 rounded-lg border border-gray-200 py-1.5 text-center text-[10px] font-semibold text-[#4DB87A]">자세히 보기</div>
                          </>
                        )}
                        {campaign.formatType === '와이드 리스트' && (
                          <>
                            <p className="mb-2 text-[10px] font-bold text-gray-800 leading-tight">{campaign.title}</p>
                            {[1, 2].map((i) => (
                              <div key={i} className="mb-1.5 flex items-center gap-1.5 rounded-lg border border-gray-100 p-1.5">
                                <div className="h-8 w-8 shrink-0 rounded bg-gray-200" />
                                <div className="flex-1">
                                  <div className="h-2 w-16 rounded bg-gray-200" />
                                  <div className="mt-1 h-2 w-10 rounded bg-gray-100" />
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                        {campaign.formatType === '캐러셀 피드' && (
                          <>
                            <p className="mb-2 text-[10px] font-bold text-gray-800 leading-tight">{campaign.title}</p>
                            <div className="flex gap-1.5 overflow-hidden">
                              {[1, 2].map((i) => (
                                <div key={i} className="w-20 shrink-0 rounded-lg border border-gray-100 p-1.5">
                                  <div className="mb-1 h-12 w-full rounded bg-gray-200" />
                                  <div className="h-2 w-full rounded bg-gray-200" />
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 발송 정보 요약 */}
                <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">수신 대상</span>
                    <span className="font-semibold text-gray-700">{campaign.targetCount.toLocaleString()}명</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">발송 일시</span>
                    <span className="font-semibold text-gray-700">{campaign.scheduledAt}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">예상 포인트</span>
                    <span className="font-bold text-[#4DB87A]">{campaign.points.toLocaleString()}P</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
