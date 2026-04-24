'use client';

import { useState } from 'react';
import Link from 'next/link';

type MessageType = 'wide-image' | 'wide-list' | 'carousel';

const MESSAGE_TYPE_OPTIONS = [
  {
    id: 'wide-image' as MessageType,
    label: '와이드 이미지',
    desc: '이미지와 텍스트를 함께',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 15l4-4 4 4 3-3 4 4" />
        <circle cx="8" cy="9" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'wide-list' as MessageType,
    label: '와이드 리스트',
    desc: '여러 상품을 리스트로',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'carousel' as MessageType,
    label: '캐러셀 피드',
    desc: '슬라이드 형태로 여러 콘텐츠',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="6" height="12" rx="1.5" strokeOpacity={0.45} />
        <rect x="8" y="4" width="8" height="16" rx="2" />
        <line x1="10" y1="9" x2="14" y2="9" />
        <line x1="10" y1="12" x2="14" y2="12" />
        <line x1="10" y1="15" x2="14" y2="15" />
        <rect x="17" y="6" width="6" height="12" rx="1.5" strokeOpacity={0.45} />
      </svg>
    ),
  },
];

const DEMO_SELLERS = [
  { id: 1, name: '나이키 공식스토어' },
  { id: 2, name: '아디다스 코리아' },
  { id: 3, name: '유니클로' },
  { id: 4, name: '자라 코리아' },
  { id: 5, name: '무신사 스토어' },
];

const CURRENT_POINTS = 5250;

function WarningBanner({ title, message }: { title: string; message: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
      <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 shrink-0 text-amber-500">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
      <div>
        <p className="text-sm font-semibold text-amber-800">{title}</p>
        <p className="mt-0.5 text-xs text-amber-700">{message}</p>
      </div>
    </div>
  );
}

export default function KakaoBrandMessageCreateNoSettings() {
  const [campaignName, setCampaignName] = useState('');
  const [messageType, setMessageType] = useState<MessageType | null>(null);
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [sendType, setSendType] = useState<'즉시' | '예약'>('즉시');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const estimatedPoints = selectedSellers.length * 15;

  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  })();

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* 헤더 */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-6 py-4">
          <Link href="/marketing/brand-message" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            목록으로
          </Link>
          <div className="h-4 w-px bg-gray-300" />
          <h1 className="text-lg font-bold text-gray-900">새 메시지 만들기</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] p-6">
        <div className="grid grid-cols-[1fr_300px] gap-6 items-start">

          {/* ───── 좌측 폼 영역 ───── */}
          <div className="space-y-5">

            {/* 인라인 경고 ①: 카카오톡 채널 미등록 */}
            <WarningBanner
              title="카카오톡 채널이 등록되지 않았습니다"
              message={
                <>
                  브랜드 메시지를 발송하려면 카카오톡 채널 등록이 필요합니다.{' '}
                  <Link href="/promotion/settings" className="font-semibold underline hover:text-amber-900 transition-colors">
                    기본설정에서 등록하기 →
                  </Link>
                </>
              }
            />

            {/* 섹션 1: 캠페인명 */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">
                캠페인명 <span className="text-red-500">*</span>
              </h2>
              <div className="relative">
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value.slice(0, 50))}
                  placeholder="캠페인명을 입력하세요"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-20 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                />
                <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs tabular-nums ${campaignName.length >= 45 ? 'text-amber-500' : 'text-gray-400'}`}>
                  {campaignName.length}/50
                </span>
              </div>
            </section>

            {/* 섹션 2: 메시지 종류 */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">
                메시지 종류 <span className="text-red-500">*</span>
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {MESSAGE_TYPE_OPTIONS.map((option) => {
                  const isSelected = messageType === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setMessageType(option.id)}
                      className={`group relative rounded-xl border-2 p-5 text-left transition-all ${
                        isSelected
                          ? 'border-[#4DB87A] bg-[#f0f9f4] shadow-sm'
                          : 'border-gray-200 bg-white hover:border-[#4DB87A]/40 hover:bg-gray-50'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#4DB87A]">
                          <svg viewBox="0 0 12 12" fill="white" className="h-2.5 w-2.5">
                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                          </svg>
                        </span>
                      )}
                      <span className={`mb-3 flex ${isSelected ? 'text-[#4DB87A]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                        {option.icon}
                      </span>
                      <div className={`text-sm font-semibold ${isSelected ? 'text-[#2a7a4f]' : 'text-gray-800'}`}>
                        {option.label}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500 leading-snug">{option.desc}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 섹션 3: 수신 파트너 */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">
                  수신 파트너 <span className="text-red-500">*</span>
                </h2>
                <button
                  onClick={() => setShowSellerModal(true)}
                  className="rounded-xl bg-[#4DB87A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3da869] active:scale-95 transition-all"
                >
                  + 파트너 불러오기
                </button>
              </div>
              <div className="min-h-[64px] rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3 transition-all">
                {selectedSellers.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSellers.map((seller) => (
                      <span
                        key={seller}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5ee] pl-3 pr-1.5 py-1 text-xs font-medium text-[#2a7a4f]"
                      >
                        {seller}
                        <button
                          onClick={() => setSelectedSellers((prev) => prev.filter((s) => s !== seller))}
                          className="flex h-4 w-4 items-center justify-center rounded-full text-[#2a7a4f]/60 hover:bg-[#2a7a4f] hover:text-white transition-colors"
                        >
                          <svg viewBox="0 0 12 12" fill="currentColor" className="h-2.5 w-2.5">
                            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="py-3 text-center text-xs text-gray-400">
                    &quot;파트너 불러오기&quot; 버튼을 눌러 수신 파트너를 추가하세요
                  </p>
                )}
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-gray-400">
                  <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm5 5a5 5 0 00-10 0h10z" />
                </svg>
                선택된 수신자{' '}
                <span className="font-bold text-gray-900">{selectedSellers.length}</span>명
              </div>
            </section>

            {/* 섹션 4: 발송 설정 */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">
                발송 설정 <span className="text-red-500">*</span>
              </h2>
              <div className="flex gap-6">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="sendType"
                    checked={sendType === '즉시'}
                    onChange={() => setSendType('즉시')}
                    className="h-4 w-4 accent-[#4DB87A]"
                  />
                  <span className="text-sm text-gray-700">즉시 발송</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    name="sendType"
                    checked={sendType === '예약'}
                    onChange={() => setSendType('예약')}
                    className="h-4 w-4 accent-[#4DB87A]"
                  />
                  <span className="text-sm text-gray-700">예약 발송</span>
                </label>
              </div>
              {sendType === '예약' && (
                <div className="mt-4 flex items-center gap-3">
                  <input
                    type="date"
                    value={scheduledDate}
                    min={tomorrow}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                  />
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                  />
                </div>
              )}
            </section>

            {/* 섹션 5: LMS 자동 발송 (비활성 — 무료 수신거부번호 미등록) */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <label className="flex cursor-not-allowed items-center gap-3 opacity-50">
                <input
                  type="checkbox"
                  disabled
                  className="h-4 w-4 cursor-not-allowed accent-[#4DB87A]"
                />
                <span className="text-sm font-semibold text-gray-700">
                  브랜드 메시지 수신차단 시 LMS 자동 발송
                </span>
              </label>
              <div className="mt-4">
                <WarningBanner
                  title="무료 수신거부번호가 등록되지 않았습니다"
                  message={
                    <>
                      LMS 자동 발송 기능을 사용하려면 무료 수신거부번호 등록이 필요합니다.{' '}
                      <Link href="/promotion/settings" className="font-semibold underline hover:text-amber-900 transition-colors">
                        기본설정에서 등록하기 →
                      </Link>
                    </>
                  }
                />
              </div>
            </section>

            {/* 섹션 6: 예상 지출 포인트 */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-4 flex items-stretch gap-3">
                    <div className="flex-1 rounded-xl bg-gray-50 px-4 py-3">
                      <div className="text-xs font-medium text-gray-400">보유 포인트</div>
                      <div className="mt-1 flex items-end gap-0.5">
                        <span className="text-2xl font-black tabular-nums text-gray-800">
                          {CURRENT_POINTS.toLocaleString()}
                        </span>
                        <span className="mb-0.5 text-sm font-bold text-gray-500">P</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 rounded-xl bg-[#f0f9f4] px-4 py-3">
                      <div className="text-xs font-medium text-[#4DB87A]">예상 지출 포인트</div>
                      <div className="mt-1 flex items-end gap-0.5">
                        <span className="text-2xl font-black tabular-nums text-[#4DB87A]">
                          {estimatedPoints.toLocaleString()}
                        </span>
                        <span className="mb-0.5 text-sm font-bold text-[#4DB87A]">P</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    수신자 {selectedSellers.length}명 × 15P (VAT 별도)
                    {CURRENT_POINTS < estimatedPoints && (
                      <span className="ml-2 font-semibold text-red-500">포인트가 부족합니다.</span>
                    )}
                  </p>
                </div>
                <button className="shrink-0 rounded-xl border-2 border-[#4DB87A] px-6 py-2.5 text-sm font-semibold text-[#4DB87A] hover:bg-[#f0f9f4] active:scale-95 transition-all">
                  충전하기
                </button>
              </div>
            </section>

            {/* 하단 버튼 */}
            <div className="flex items-center justify-between pb-10">
              <Link href="/marketing/brand-message" className="rounded-xl border-2 border-gray-200 px-8 py-3.5 text-base font-bold text-gray-500 hover:bg-gray-50 active:scale-95 transition-all">
                취소
              </Link>
              <div className="flex items-center gap-3">
                <button className="rounded-xl border-2 border-[#4DB87A] px-8 py-3.5 text-base font-bold text-[#4DB87A] hover:bg-[#f0f9f4] active:scale-95 transition-all">
                  테스트 발송
                </button>
                <button className="rounded-xl bg-[#4DB87A] px-12 py-3.5 text-base font-bold text-white shadow-md shadow-[#4DB87A]/30 hover:bg-[#3da869] active:scale-95 transition-all">
                  발송하기
                </button>
              </div>
            </div>
          </div>

          {/* ───── 우측 미리보기 ───── */}
          <div className="sticky top-[73px] h-fit">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="mb-4 flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#4DB87A]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">미리보기</h3>
                <div className="h-1.5 w-1.5 rounded-full bg-[#4DB87A]" />
              </div>
              <div className="mx-auto w-[220px]">
                <div className="relative rounded-[40px] border-[7px] border-gray-800 bg-gray-900 shadow-2xl">
                  <div className="absolute -right-[9px] top-20 h-12 w-[5px] rounded-r bg-gray-700" />
                  <div className="absolute -left-[9px] top-16 h-8 w-[5px] rounded-l bg-gray-700" />
                  <div className="absolute -left-[9px] top-28 h-8 w-[5px] rounded-l bg-gray-700" />
                  <div className="overflow-hidden rounded-[33px] bg-[#b2c7d9]">
                    <div className="flex justify-center pt-3 pb-1">
                      <div className="h-5 w-[72px] rounded-full bg-gray-900" />
                    </div>
                    <div className="flex items-center justify-between px-4 pb-2 text-[10px] font-semibold text-gray-700">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mx-3 mb-3 rounded-2xl bg-white p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-7 w-7 rounded-full bg-[#FEE500]" />
                        <span className="text-[10px] font-bold text-gray-900">카카오 브랜드 메시지</span>
                      </div>
                      {messageType ? (
                        <div className="rounded-lg bg-gray-100 p-3 text-center text-[9px] text-gray-500">
                          {messageType === 'wide-image' && '와이드 이미지 미리보기'}
                          {messageType === 'wide-list' && '와이드 리스트 미리보기'}
                          {messageType === 'carousel' && '캐러셀 피드 미리보기'}
                        </div>
                      ) : (
                        <div className="h-24 rounded-lg bg-gray-100 flex items-center justify-center">
                          <span className="text-[9px] text-gray-400">메시지 종류를 선택하세요</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 파트너 선택 모달 */}
      {showSellerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[480px] max-h-[70vh] flex flex-col rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-base font-bold text-gray-900">파트너 선택</h2>
              <button
                onClick={() => setShowSellerModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {DEMO_SELLERS.map((seller) => (
                <label key={seller.id} className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedSellers.includes(seller.name)}
                    onChange={() =>
                      setSelectedSellers((prev) =>
                        prev.includes(seller.name)
                          ? prev.filter((s) => s !== seller.name)
                          : [...prev, seller.name]
                      )
                    }
                    className="h-4 w-4 accent-[#4DB87A]"
                  />
                  <span className="text-sm text-gray-700">{seller.name}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-6 py-4">
              <button
                onClick={() => setShowSellerModal(false)}
                className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => setShowSellerModal(false)}
                className="rounded-xl bg-[#4DB87A] px-5 py-2 text-sm font-bold text-white hover:bg-[#3da869] transition-colors"
              >
                선택 완료
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
