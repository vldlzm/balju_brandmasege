'use client';

import { useState } from 'react';
import ChargePopup from './ChargePopup';

const CHARGE_OPTIONS = [
  { won: 10000,   points: 10000,   bonus: null },
  { won: 50000,   points: 50000,   bonus: null },
  { won: 100000,  points: 100000,  bonus: null },
  { won: 300000,  points: 330000,  bonus: '10% 추가지급' },
  { won: 500000,  points: 550000,  bonus: '10% 추가지급' },
  { won: 700000,  points: 840000,  bonus: '20% 추가지급' },
  { won: 1000000, points: 1300000, bonus: '30% 추가지급' },
];
const COMBINED_HISTORY = [
  { id: 'u2',  date: '2025.04.20 14:00', type: '사용' as const, description: '5월 황금연휴 특별 기획전 참여 파트너 모집', points: -1440 },
  { id: 'u1',  date: '2025.04.18 10:00', type: '사용' as const, description: '봄 시즌 신상품 안내 - 유아동 의류 15종 입고', points: -4260 },
  { id: 'c1',  date: '2025.04.15 14:32', type: '충전' as const, description: '신용카드', points: 50000 },
  { id: 'u3',  date: '2025.03.28 10:00', type: '사용' as const, description: '3월 봄 맞이 유아동 의류 신규 입고 안내', points: -4260 },
  { id: 'c2',  date: '2025.03.28 10:11', type: '충전' as const, description: '신용카드', points: 100000 },
  { id: 'u4',  date: '2025.03.20 15:00', type: '사용' as const, description: '어버이날 특별 기획전 파트너 모집 안내', points: -2340 },
  { id: 'u5',  date: '2025.03.15 11:00', type: '사용' as const, description: '가정의 달 5월 전품목 프로모션 사전 안내', points: -4260 },
  { id: 'c3',  date: '2025.03.10 09:45', type: '충전' as const, description: '계좌이체', points: 30000 },
  { id: 'c4',  date: '2025.02.20 16:00', type: '충전' as const, description: '신용카드', points: 50000 },
  { id: 'u6',  date: '2025.02.15 09:00', type: '사용' as const, description: '2월 발렌타인 특집 기획전 파트너 모집', points: -1440 },
  { id: 'c5',  date: '2025.02.10 11:30', type: '충전' as const, description: '신용카드', points: 300000 },
  { id: 'u7',  date: '2025.01.25 13:00', type: '사용' as const, description: '1월 신학기 준비 유아동 의류 안내', points: -4260 },
  { id: 'c6',  date: '2025.01.20 10:00', type: '충전' as const, description: '계좌이체', points: 100000 },
  { id: 'u8',  date: '2025.01.10 15:00', type: '사용' as const, description: '설날 선물세트 기획전 파트너 모집 안내', points: -2340 },
  { id: 'c7',  date: '2024.12.30 09:00', type: '충전' as const, description: '신용카드', points: 50000 },
];

const PAGE_SIZE = 5;

function Bubble({ n }: { n: number }) {
  return (
    <div className="absolute -top-3 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[11px] font-black text-white shadow-md">
      {n}
    </div>
  );
}


export default function PointManagement() {
  const [selectedWon, setSelectedWon] = useState<number | null>(null);
  const [showChargePopup, setShowChargePopup] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filteredHistory, setFilteredHistory] = useState(COMBINED_HISTORY);
  const [currentPage, setCurrentPage] = useState(1);

  const currentPoints = 45600;
  const totalPages = Math.ceil(filteredHistory.length / PAGE_SIZE);
  const pagedHistory = filteredHistory.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = () => {
    const result = COMBINED_HISTORY.filter((row) => {
      const d = row.date.slice(0, 10).replace(/\./g, '-');
      if (dateFrom && d < dateFrom) return false;
      if (dateTo && d > dateTo) return false;
      return true;
    });
    setFilteredHistory(result);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setDateFrom('');
    setDateTo('');
    setFilteredHistory(COMBINED_HISTORY);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {showChargePopup && (
        <ChargePopup selectedWon={selectedWon} onClose={() => setShowChargePopup(false)} />
      )}

      {/* 헤더 */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">포인트 관리</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-6 p-6">

        {/* ── 1. 잔여 포인트 요약 ── */}
        <div className="relative overflow-visible grid grid-cols-3 gap-4">
          <Bubble n={1} />
          <div className="col-span-1 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <p className="text-xs font-medium text-gray-400">잔여 포인트</p>
            <p className="mt-2 text-3xl font-black tabular-nums text-amber-500">{currentPoints.toLocaleString()}P</p>
            <p className="mt-1 text-xs text-gray-400">약 {Math.floor(currentPoints / 15).toLocaleString()}명 발송 가능</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <p className="text-xs font-medium text-gray-400">이번 달 충전</p>
            <p className="mt-2 text-3xl font-black tabular-nums text-[#4DB87A]">50,000P</p>
            <p className="mt-1 text-xs text-gray-400">2025.04.15 마지막 충전</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <p className="text-xs font-medium text-gray-400">이번 달 사용</p>
            <p className="mt-2 text-3xl font-black tabular-nums text-purple-500">5,700P</p>
            <p className="mt-1 text-xs text-gray-400">캠페인 2건 발송</p>
          </div>
        </div>

        {/* ── 2. 포인트 충전 ── */}
        <section className="relative overflow-visible rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <Bubble n={2} />
          <div className="border-b border-gray-100 px-6 py-5">
            <h2 className="text-base font-bold text-gray-900">포인트 충전</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* 금액 선택 */}
            <div>
              <p className="mb-3 text-sm font-semibold text-gray-700">충전 금액 선택</p>
              <div className="grid grid-cols-3 gap-3">
                {CHARGE_OPTIONS.map((opt) => (
                  <button
                    key={opt.won}
                    onClick={() => setSelectedWon(opt.won)}
                    className={`relative overflow-hidden rounded-xl border-2 pt-3 pb-3 px-2 text-sm font-bold transition-all flex flex-col items-center gap-0.5 ${
                      selectedWon === opt.won
                        ? 'border-[#4DB87A] bg-[#f0faf5] text-[#2a7a4f]'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {opt.bonus && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-bl-lg leading-tight">
                        {opt.bonus}
                      </span>
                    )}
                    <span className="mt-1">{(opt.won / 10000).toLocaleString()}만원</span>
                    <span className="text-[11px] font-medium text-gray-400">({opt.points.toLocaleString()}P)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 충전하기 버튼 */}
            <div className="flex justify-end">
              <button
                disabled={!selectedWon}
                onClick={() => setShowChargePopup(true)}
                className="rounded-xl bg-[#4DB87A] px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#3da869] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                충전하기
              </button>
            </div>
          </div>
        </section>

        {/* ── 3. 포인트 내역 ── */}
        <section className="relative overflow-visible rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <Bubble n={3} />

          {/* 헤더 + 기간 검색 */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 className="text-base font-bold text-gray-900">포인트 내역</h2>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 focus:border-[#4DB87A] focus:outline-none"
              />
              <span className="text-gray-400 text-xs">~</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 focus:border-[#4DB87A] focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="rounded-lg bg-[#4DB87A] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#3da869] transition-colors"
              >
                조회
              </button>
              <button
                onClick={handleReset}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                초기화
              </button>
            </div>
          </div>

          {/* 테이블 */}
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {['일시', '구분', '내용', '포인트'].map((col) => (
                    <th key={col} className="border-b border-gray-100 px-5 py-3 text-left text-xs font-semibold text-gray-500">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pagedHistory.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-sm text-gray-400">
                      해당 기간의 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  pagedHistory.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{row.date}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          row.type === '충전'
                            ? 'bg-[#e8f5ee] text-[#2a7a4f]'
                            : 'bg-red-50 text-red-500'
                        }`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-700">{row.description}</td>
                      <td className={`px-5 py-4 font-bold tabular-nums ${
                        row.type === '충전' ? 'text-[#4DB87A]' : 'text-red-500'
                      }`}>
                        {row.type === '충전' ? '+' : ''}{row.points.toLocaleString()}P
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 페이징 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 border-t border-gray-100 py-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-[#4DB87A] text-white'
                      : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
