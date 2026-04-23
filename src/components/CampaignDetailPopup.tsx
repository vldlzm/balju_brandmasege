'use client';

import { useState } from 'react';

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

const FORMAT_ICON: Record<string, string> = {
  '와이드 이미지': '🖼',
  '와이드 리스트': '📋',
  '캐러셀 피드': '🎠',
};

const CATEGORY_STYLE: Record<string, string> = {
  신상품: 'bg-[#E6F1FB] text-[#0C447C]',
  이벤트: 'bg-[#EEEDFE] text-[#3C3489]',
  가격할인: 'bg-[#FAECE7] text-[#712B13]',
};

export default function CampaignDetailPopup({ campaign, onClose, onCancel }: Props) {
  const [confirmCancel, setConfirmCancel] = useState(false);

  const handleCancel = () => {
    onCancel(campaign.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden">

        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900">캠페인 상세</h2>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-500">발송 예정</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* 수정 불가 안내 */}
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-amber-400">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-medium text-amber-700">발송 예정 캠페인은 내용을 수정할 수 없습니다.</p>
          </div>

          {/* 캠페인 정보 */}
          <div className="space-y-4">

            {/* 캠페인명 */}
            <div>
              <p className="mb-1.5 text-xs font-semibold text-gray-400">캠페인명</p>
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${CATEGORY_STYLE[campaign.category] ?? 'bg-gray-100 text-gray-500'}`}>
                  {campaign.category}
                </span>
                <p className="text-sm font-medium text-gray-700">{campaign.title}</p>
              </div>
            </div>

            {/* 발송 일시 */}
            <div>
              <p className="mb-1.5 text-xs font-semibold text-gray-400">발송 일시</p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm text-gray-700">{campaign.scheduledAt}</p>
              </div>
            </div>

            {/* 메시지 종류 */}
            <div>
              <p className="mb-1.5 text-xs font-semibold text-gray-400">메시지 종류</p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-center gap-2">
                <span>{FORMAT_ICON[campaign.formatType]}</span>
                <p className="text-sm text-gray-700">{campaign.formatType}</p>
              </div>
            </div>

            {/* 수신 대상 */}
            <div>
              <p className="mb-1.5 text-xs font-semibold text-gray-400">수신 대상</p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-center justify-between">
                <p className="text-sm text-gray-700">{campaign.targetLabel}</p>
                <span className="text-sm font-bold text-gray-900">{campaign.targetCount.toLocaleString()}명</span>
              </div>
            </div>

            {/* 예상 포인트 */}
            <div>
              <p className="mb-1.5 text-xs font-semibold text-gray-400">예상 차감 포인트</p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-sm font-bold text-[#4DB87A]">{campaign.points.toLocaleString()}P</p>
              </div>
            </div>
          </div>

          {/* 발송 취소 확인 */}
          {confirmCancel && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 space-y-3">
              <p className="text-sm font-semibold text-red-600">정말 발송을 취소하시겠습니까?</p>
              <p className="text-xs text-red-400">취소 후에는 되돌릴 수 없습니다.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmCancel(false)}
                  className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  아니요
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 rounded-lg bg-red-500 py-2 text-xs font-bold text-white hover:bg-red-600 transition-colors"
                >
                  네, 취소합니다
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="flex gap-2 border-t border-gray-100 px-6 py-4 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            닫기
          </button>
          <button
            onClick={() => setConfirmCancel(true)}
            className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600 transition-colors"
          >
            발송 취소
          </button>
        </div>

      </div>
    </div>
  );
}
