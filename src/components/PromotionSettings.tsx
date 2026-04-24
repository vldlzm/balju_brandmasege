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

const DEMO_SENDERS: SenderNumber[] = [];
const DEMO_REQUESTS: SenderRequest[] = [];

function Bubble({ n }: { n: number }) {
  return (
    <div className="absolute -top-3 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[11px] font-black text-white shadow-md">
      {n}
    </div>
  );
}

export default function PromotionSettings() {
  const [senders] = useState<SenderNumber[]>(DEMO_SENDERS);
  const [requests] = useState<SenderRequest[]>(DEMO_REQUESTS);
  const [rejectType, setRejectType] = useState<'신규' | '직접입력'>('직접입력');
  const [rejectNumber, setRejectNumber] = useState('010-3327-1103');
  const [excludedPersons] = useState(0);
  const [excludedProducts] = useState(0);
  const [showSenderPopup, setShowSenderPopup] = useState(false);
  const [showPartnerPopup, setShowPartnerPopup] = useState(false);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [showKakaoPopup, setShowKakaoPopup] = useState(false);

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
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-base font-bold text-gray-900">발신번호 관리</h2>
            <ul className="mt-3 space-y-1.5">
              {[
                '승인된 발신번호만 SMS 사용이 가능하며 발신번호 등록은 영업일 기준 약 1일 정도 소요됩니다.',
                '등록하려는 발신번호의 소유주에 따라 추가 서류가 필요할 수 있으니 신청서 가이드 확인 후 진행해 주세요.',
                '발신번호 신청 반려 시, 삭제 후 다시 신청으로 진행해 주세요.',
              ].map((text, i) => (
                <li key={i} className="flex gap-1.5 text-xs text-gray-500">
                  <span className="shrink-0">·</span>
                  <span>{i === 1
                    ? <>등록하려는 발신번호의 소유주에 따라 추가 서류가 필요할 수 있으니 <span className="cursor-pointer text-[#4DB87A] underline">신청서 가이드</span> 확인 후 진행해 주세요.</>
                    : text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-6 py-5">
            <div className="flex justify-end gap-2">
              <button className="rounded-lg bg-[#f97316] px-4 py-2 text-sm font-semibold text-white hover:bg-[#ea6c0c] transition-colors">
                신청서 가이드
              </button>
              <button
                onClick={() => setShowSenderPopup(true)}
                className="rounded-xl bg-[#4b5563] px-4 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors"
              >
                발신번호신청 +
              </button>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    {['발신자명', '발신번호', '사용', '대표', '관리'].map((col) => (
                      <th key={col} className="border-b border-gray-200 px-4 py-3 text-center text-xs font-semibold text-gray-500">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {senders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-sm text-gray-400">
                        등록된 발신번호가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    senders.map((s) => (
                      <tr key={s.id} className="border-t border-gray-100">
                        <td className="px-4 py-3 text-center text-gray-700">{s.name}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{s.number}</td>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" checked={s.enabled} readOnly className="h-4 w-4 accent-[#4DB87A]" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <input type="radio" checked={s.isRepresentative} readOnly className="h-4 w-4 accent-[#4DB87A]" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="text-xs text-red-400 hover:text-red-600">삭제</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              <button className="rounded-xl bg-[#6b7280] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#4b5563] transition-colors">
                초기화
              </button>
              <button className="rounded-xl bg-[#374151] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1f2937] transition-colors">
                적용
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 px-6 py-5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-800">발신번호 요청내역</h3>
              <span className="text-xs text-gray-400">전체 {requests.length}개</span>
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    {['발신번호', '상태', '신청일', '처리일', '관리자 메모'].map((col) => (
                      <th key={col} className="border-b border-gray-200 px-4 py-3 text-center text-xs font-semibold text-gray-500">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-sm text-[#4DB87A]">
                        등록한 요청건이 없습니다.
                      </td>
                    </tr>
                  ) : (
                    requests.map((r) => (
                      <tr key={r.id} className="border-t border-gray-100">
                        <td className="px-4 py-3 text-center text-gray-700">{r.number}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                            r.status === '승인' ? 'bg-[#e8f5ee] text-[#2a7a4f]'
                            : r.status === '반려' ? 'bg-red-50 text-red-500'
                            : 'bg-gray-100 text-gray-500'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500">{r.requestedAt}</td>
                        <td className="px-4 py-3 text-center text-gray-500">{r.processedAt}</td>
                        <td className="px-4 py-3 text-center text-gray-500">{r.memo}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
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
            <ul className="mt-3 space-y-1.5">
              <li className="flex gap-1.5 text-xs text-gray-500">
                <span className="shrink-0">·</span>
                <span>수신거부를 신청한 고객의 휴대폰 번호는 신청 일의 다음 날부터 수신거부 처리가 적용됩니다.</span>
              </li>
            </ul>
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

                  {/* 신규 선택 시 신청 버튼 */}
                  {rejectType === '신규' && (
                    <div className="relative overflow-visible w-fit">
                      <Bubble n={3} />
                      <button className="rounded-xl bg-[#4DB87A] px-5 py-2 text-sm font-semibold text-white hover:bg-[#3da869] transition-colors">
                        신청
                      </button>
                    </div>
                  )}

                  {/* 직접 입력 선택 시 입력창 + 안내 */}
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
            <button className="rounded-xl bg-[#374151] px-10 py-3 text-sm font-bold text-white hover:bg-[#1f2937] transition-colors">
              변경사항 적용
            </button>
          </div>
        </section>

        {/* ── 3. 파트너·상품 제외 설정 ── */}
        <section className="relative overflow-visible rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <Bubble n={5} />
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-base font-bold text-gray-900">파트너·상품 제외 설정</h2>
            <ul className="mt-3 space-y-1.5">
              <li className="flex gap-1.5 text-xs text-gray-500">
                <span className="shrink-0">·</span>
                <span>반영되기까지 하루정도 소요될 수 있습니다.</span>
              </li>
            </ul>
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
