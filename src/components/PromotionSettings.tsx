'use client';

import { useState } from 'react';
import SenderNumberPopup from './SenderNumberPopup';
import PartnerSelectPopup from './PartnerSelectPopup';
import ProductSelectPopup from './ProductSelectPopup';
import KakaoChannelPopup from './KakaoChannelPopup';

interface SenderNumber {
  id: string;
  name: string;
  number: string;
  enabled: boolean;
  isRepresentative: boolean;
}

interface SenderRequest {
  id: string;
  number: string;
  status: '승인' | '대기' | '반려';
  requestedAt: string;
  processedAt: string;
  memo: string;
}

function Bubble({ n }: { n: number }) {
  return (
    <div className="absolute -top-3 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[11px] font-black text-white shadow-md">
      {n}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-[#4DB87A]' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
    </button>
  );
}

export default function PromotionSettings() {
  const [senders, setSenders] = useState<SenderNumber[]>([]);
  const [savedSenders, setSavedSenders] = useState<SenderNumber[]>([]);
  const [requests] = useState<SenderRequest[]>([]);
  const [rejectType, setRejectType] = useState<'신규' | '직접입력'>('직접입력');
  const [rejectNumber, setRejectNumber] = useState('010-3327-1103');
  const [excludedPersons] = useState(0);
  const [excludedProducts] = useState(0);
  const [showSenderPopup, setShowSenderPopup] = useState(false);
  const [showPartnerPopup, setShowPartnerPopup] = useState(false);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [showKakaoPopup, setShowKakaoPopup] = useState(false);

  const toggleEnabled = (id: string) =>
    setSenders((prev) => prev.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s));

  const setRepresentative = (id: string) =>
    setSenders((prev) => prev.map((s) => ({ ...s, isRepresentative: s.id === id })));

  const deleteSender = (id: string) =>
    setSenders((prev) => prev.filter((s) => s.id !== id));

  const resetSenders = () => setSenders(savedSenders);
  const applySenders = () => setSavedSenders(senders);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {showSenderPopup && <SenderNumberPopup onClose={() => setShowSenderPopup(false)} />}
      {showPartnerPopup && <PartnerSelectPopup onClose={() => setShowPartnerPopup(false)} />}
      {showProductPopup && <ProductSelectPopup onClose={() => setShowProductPopup(false)} />}
      {showKakaoPopup && <KakaoChannelPopup onClose={() => setShowKakaoPopup(false)} />}

      {/* 페이지 헤더 */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">기본설정</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-6 p-6">

        {/* ── 1. 발신번호 관리 ── */}
        <section className="relative overflow-visible rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <Bubble n={1} />

          {/* 섹션 헤더 */}
          <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-base font-bold text-gray-900">발신번호 관리</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-400">
                승인된 발신번호만 SMS 발송이 가능합니다. 등록까지 영업일 기준 약 1일 소요되며, 반려 시 삭제 후 재신청해 주세요.
              </p>
            </div>
            <button className="shrink-0 text-xs font-medium text-[#4DB87A] hover:underline transition-colors">
              신청서 가이드 →
            </button>
          </div>

          <div className="px-6 py-5 space-y-5">

            {/* 등록된 발신번호 */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">등록된 발신번호</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">
                    {senders.length}개
                  </span>
                </div>
                <button
                  onClick={() => setShowSenderPopup(true)}
                  className="flex items-center gap-1 rounded-xl bg-[#4DB87A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3da869] transition-colors"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path d="M8 3a.75.75 0 01.75.75v3.5h3.5a.75.75 0 010 1.5h-3.5v3.5a.75.75 0 01-1.5 0v-3.5H3.75a.75.75 0 010-1.5h3.5V3.75A.75.75 0 018 3z" />
                  </svg>
                  발신번호 신청
                </button>
              </div>

              {senders.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-10 text-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mb-3 h-8 w-8 text-gray-300" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-500">등록된 발신번호가 없습니다</p>
                  <p className="mt-1 text-xs text-gray-400">발신번호를 신청하면 승인 후 SMS 발송에 사용할 수 있습니다</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {senders.map((s) => (
                    <div key={s.id} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800">{s.name}</div>
                        <div className="mt-0.5 text-xs tabular-nums text-gray-500">{s.number}</div>
                      </div>
                      <div className="flex items-center gap-5 shrink-0">
                        {s.isRepresentative ? (
                          <span className="rounded-full bg-[#e8f5ee] px-2.5 py-0.5 text-[11px] font-bold text-[#2a7a4f]">대표</span>
                        ) : (
                          <button
                            onClick={() => setRepresentative(s.id)}
                            className="text-[11px] font-medium text-gray-400 hover:text-[#4DB87A] transition-colors"
                          >
                            대표로 설정
                          </button>
                        )}
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-400">사용</span>
                          <Toggle checked={s.enabled} onChange={() => toggleEnabled(s.id)} />
                        </div>
                        <button
                          onClick={() => deleteSender(s.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={resetSenders}
                      className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      초기화
                    </button>
                    <button
                      onClick={applySenders}
                      className="rounded-xl bg-[#4DB87A] px-5 py-2 text-sm font-semibold text-white hover:bg-[#3da869] transition-colors"
                    >
                      적용
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 신청 내역 */}
            <div className="border-t border-gray-100 pt-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">신청 내역</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">
                  {requests.length}개
                </span>
              </div>

              {requests.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center">
                  <p className="text-sm text-gray-400">등록한 신청 내역이 없습니다</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {requests.map((r) => (
                    <div key={r.id} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3.5">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold tabular-nums text-gray-800">{r.number}</div>
                        {r.memo && <div className="mt-0.5 text-xs text-gray-500">{r.memo}</div>}
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        r.status === '승인' ? 'bg-[#e8f5ee] text-[#2a7a4f]'
                        : r.status === '반려' ? 'bg-red-50 text-red-500'
                        : 'bg-gray-100 text-gray-500'
                      }`}>
                        {r.status}
                      </span>
                      <div className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400">
                        <span>{r.requestedAt}</span>
                        {r.processedAt && (
                          <>
                            <span className="text-gray-300">→</span>
                            <span>{r.processedAt}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ── 2. 기본 설정 ── */}
        <section className="relative overflow-visible rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <Bubble n={2} />
          <div className="border-b border-gray-100 px-6 py-5">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-gray-900">기본 설정</h2>
              <span className="text-xs text-gray-400">✓ 표시 필수항목</span>
            </div>
            <p className="mt-1.5 text-xs text-gray-400">
              수신거부를 신청한 고객의 휴대폰 번호는 신청 일의 다음 날부터 수신거부 처리가 적용됩니다.
            </p>
          </div>

          <div className="divide-y divide-gray-100 px-6">
            {/* 무료 수신거부번호 */}
            <div className="py-5">
              <div className="flex items-start gap-6">
                <span className="mt-0.5 flex w-44 shrink-0 items-center gap-1 text-sm font-medium text-gray-700">
                  <span className="text-[#4DB87A]">✓</span> 무료 수신거부번호
                </span>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-5">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                      <input
                        type="radio"
                        name="rejectType"
                        checked={rejectType === '신규'}
                        onChange={() => setRejectType('신규')}
                        className="h-4 w-4 accent-[#4DB87A]"
                      />
                      신규
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                      <input
                        type="radio"
                        name="rejectType"
                        checked={rejectType === '직접입력'}
                        onChange={() => setRejectType('직접입력')}
                        className="h-4 w-4 accent-[#4DB87A]"
                      />
                      직접 입력
                    </label>
                  </div>
                  {rejectType === '신규' && (
                    <div className="relative overflow-visible w-fit">
                      <Bubble n={3} />
                      <button className="rounded-xl bg-[#4DB87A] px-5 py-2 text-sm font-semibold text-white hover:bg-[#3da869] transition-colors">
                        신청
                      </button>
                    </div>
                  )}
                  {rejectType === '직접입력' && (
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="text"
                        value={rejectNumber}
                        onChange={(e) => setRejectNumber(e.target.value)}
                        className="rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                      />
                      <div className="relative overflow-visible">
                        <Bubble n={4} />
                        <p className="text-xs text-red-500 leading-relaxed max-w-md">
                          ⓘ 직접 입력은 고객의 수신 거부 요청이 발주모아 파트너스 시스템과 자동으로 연동되지 않습니다. 수신 거부 파트너는 &apos;파트너 제외 설정&apos;을 통해 수동으로 등록해 주세요.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 카카오톡 채널 */}
            <div className="py-5">
              <div className="flex items-start gap-6">
                <span className="mt-0.5 flex w-44 shrink-0 items-center gap-1 text-sm font-medium text-gray-700">
                  <span className="text-[#4DB87A]">✓</span> 카카오톡 채널
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <button onClick={() => setShowKakaoPopup(true)} className="flex items-center gap-1 rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                    등록
                    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-gray-400">
                      <path fillRule="evenodd" d="M5.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L8.586 8 5.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                    ⓘ 카카오톡 채널 승인은 영업일 기준 최대 2일이 소요될 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center border-t border-gray-100 px-6 py-6">
            <button className="rounded-xl bg-[#4DB87A] px-10 py-3 text-sm font-bold text-white hover:bg-[#3da869] transition-colors">
              변경사항 적용
            </button>
          </div>
        </section>

        {/* ── 3. 파트너·상품 제외 설정 ── */}
        <section className="relative overflow-visible rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <Bubble n={5} />
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-base font-bold text-gray-900">파트너·상품 제외 설정</h2>
            <p className="mt-1.5 text-xs text-gray-400">반영되기까지 하루 정도 소요될 수 있습니다.</p>
          </div>

          <div className="divide-y divide-gray-100 px-6">
            <div className="flex items-center gap-6 py-5">
              <span className="w-44 shrink-0 text-sm font-medium text-gray-700">파트너 제외 설정</span>
              <button onClick={() => setShowPartnerPopup(true)} className="flex items-center gap-1 rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                파트너 제외 선택
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-gray-400">
                  <path fillRule="evenodd" d="M5.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L8.586 8 5.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm text-gray-500">
                제외된 인원 <span className="font-bold text-gray-800">{excludedPersons}명</span>
              </span>
            </div>
            <div className="flex items-center gap-6 py-5">
              <span className="w-44 shrink-0 text-sm font-medium text-gray-700">상품 제외 설정</span>
              <button onClick={() => setShowProductPopup(true)} className="flex items-center gap-1 rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                상품 제외 선택
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-gray-400">
                  <path fillRule="evenodd" d="M5.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L8.586 8 5.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm text-gray-500">
                제외된 상품 <span className="font-bold text-gray-800">{excludedProducts}개</span>
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
