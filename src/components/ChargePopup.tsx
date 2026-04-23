'use client';

import { useState } from 'react';

const CHARGE_OPTIONS = [
  { won: 10000,   points: 10000,   bonus: null },
  { won: 50000,   points: 50000,   bonus: null },
  { won: 100000,  points: 100000,  bonus: null },
  { won: 300000,  points: 330000,  bonus: '10% 추가지급' },
  { won: 500000,  points: 550000,  bonus: '10% 추가지급' },
  { won: 700000,  points: 840000,  bonus: '20% 추가지급' },
  { won: 1000000, points: 1300000, bonus: '30% 추가지급' },
];

interface Props {
  selectedWon?: number | null;
  onClose: () => void;
}

export default function ChargePopup({ selectedWon = null, onClose }: Props) {
  const [popupAmount, setPopupAmount] = useState(selectedWon ? String(selectedWon) : '');
  const [terms, setTerms] = useState({ sms: false, alimtalk: false, tax: false });
  const toggle = (key: keyof typeof terms) => setTerms((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl">

        {/* 헤더 - 초록 배경 */}
        <div className="relative bg-[#3a9e52] px-7 pb-12 pt-7">
          <div className="absolute right-5 top-5 flex flex-col items-center rounded-xl bg-white px-3 py-2 shadow">
            <span className="text-[11px] font-black text-[#3a9e52] leading-tight">발주</span>
            <span className="text-[11px] font-black text-[#3a9e52] leading-tight">모아</span>
          </div>
          <p className="text-sm font-medium text-white">발주모아를 이용한다는 것은</p>
          <p className="mt-0.5 text-2xl font-black text-yellow-300">정말 탁월한 선택!</p>
        </div>

        {/* 콘텐츠 */}
        <div className="-mt-6 rounded-t-3xl bg-white px-6 pb-6 pt-6 space-y-4">

          {/* 충전금액 선택 */}
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 px-5 py-4">
            <span className="text-sm font-semibold text-gray-700">· 충전금액 선택</span>
            <select
              value={popupAmount}
              onChange={(e) => setPopupAmount(e.target.value)}
              className="rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none"
            >
              <option value="">선택</option>
              {CHARGE_OPTIONS.map((opt) => (
                <option key={opt.won} value={String(opt.won)}>
                  {(opt.won / 10000).toLocaleString()}만원 ({opt.points.toLocaleString()}P){opt.bonus ? ` - ${opt.bonus}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* 이용약관 */}
          <div className="rounded-2xl border border-gray-200 px-5 py-4">
            <span className="text-sm font-semibold text-gray-700">· 이용약관</span>
            <div className="mt-3 space-y-2.5">
              {([
                { key: 'sms' as const,      label: 'SMS 이용약관동의' },
                { key: 'alimtalk' as const, label: '알림톡 이용약관동의' },
                { key: 'tax' as const,      label: '전자세금계산서 이용약관동의' },
              ]).map(({ key, label }) => (
                <label key={key} className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={terms[key]}
                    onChange={() => toggle(key)}
                    className="h-4 w-4 rounded accent-[#4DB87A]"
                  />
                  <span className="text-sm text-gray-600">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-[1] rounded-2xl bg-[#2d6e3e] py-3.5 text-sm font-bold text-white hover:bg-[#245a33] transition-colors"
            >
              취소
            </button>
            <button
              disabled={!popupAmount}
              className="flex-[3] rounded-2xl bg-yellow-400 py-3.5 text-sm font-black text-yellow-900 hover:bg-yellow-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              포인트 충전하기
            </button>
          </div>

          {/* 하단 프로모션 배너 */}
          <div className="rounded-2xl bg-[#1a2b21] p-4">
            <div className="flex items-stretch gap-3">
              <div className="flex flex-1 flex-col justify-center gap-2">
                <div className="rounded-xl bg-white/15 px-3 py-1.5 text-xs font-bold text-white leading-snug">
                  번거롭던<br />발주와 정산
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-1.5 text-xs text-white/90 leading-snug">
                  이제 <span className="font-black text-red-400">잠깐</span>이면 끝납니다!
                </div>
              </div>
              <div className="flex flex-col items-end justify-between gap-1.5">
                <div className="flex gap-1 text-base">
                  <span>📋</span><span>📦</span><span>✉️</span><span>🕐</span>
                </div>
                <div className="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-black text-white whitespace-nowrap">
                  😱 !!!!?!
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-400 text-lg">
                  💻
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
