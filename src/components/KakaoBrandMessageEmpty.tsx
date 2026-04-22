'use client';

import { useState } from 'react';
import Link from 'next/link';

type TabType = '발송 예정' | '발송 완료';

export default function KakaoBrandMessageEmpty() {
  const [activeTab, setActiveTab] = useState<TabType>('발송 예정');
  const [periodFilter, setPeriodFilter] = useState('최근 1개월');
  const [formatFilter, setFormatFilter] = useState('전체');
  const [search, setSearch] = useState('');

  const tabItems: { label: TabType; count: number }[] = [
    { label: '발송 완료', count: 0 },
    { label: '발송 예정', count: 0 },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* ── 상단 헤더 ── */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">브랜드 메시지</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-5 p-6">

        {/* ── 요약 통계 ── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '이번달 발송 완료', value: '0건', sub: '전월 대비 0건', color: 'text-[#4DB87A]' },
            { label: '발송 예정', value: '0건', sub: '발송 예정 없음', color: 'text-blue-500' },
            { label: '이번달 총 수신 인원', value: '0명', sub: '발송 완료 기준', color: 'text-purple-500' },
            { label: '잔여 포인트', value: '0P', sub: '포인트를 충전해 주세요', color: 'text-amber-500' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <p className="text-xs font-medium text-gray-400">{stat.label}</p>
              <p className={`mt-1.5 text-2xl font-black tabular-nums ${stat.color}`}>{stat.value}</p>
              <p className="mt-1 text-xs text-gray-400">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* ── 필터 ── */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
            >
              <option>최근 1개월</option>
              <option>최근 3개월</option>
              <option>최근 6개월</option>
              <option>전체 기간</option>
            </select>
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
            >
              <option value="전체">메시지 종류 전체</option>
              <option>와이드 이미지</option>
              <option>와이드 리스트</option>
              <option>캐러셀 피드</option>
            </select>
            <div className="relative ml-auto min-w-[260px]">
              <svg viewBox="0 0 20 20" fill="currentColor" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="캠페인명 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-[#4DB87A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
              />
            </div>
          </div>
        </section>

        {/* ── 탭 + 목록 ── */}
        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">

          {/* 탭 헤더 */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 pt-5">
            <div className="flex items-end gap-1">
              {tabItems.map((tab) => {
                const isActive = activeTab === tab.label;
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`flex items-center gap-2 rounded-t-lg px-4 pb-3 pt-1 text-sm font-semibold transition-all ${
                      isActive
                        ? 'border-b-2 border-[#4DB87A] text-[#4DB87A]'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab.label}
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums ${
                      isActive ? 'bg-[#e8f5ee] text-[#2a7a4f]' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
            <Link href="/marketing/brand-message/create">
              <button className="mb-3 flex items-center gap-1.5 rounded-xl bg-[#4DB87A] px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-[#4DB87A]/30 hover:bg-[#3da869] active:scale-95 transition-all">
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path d="M8 3a.75.75 0 01.75.75v3.5h3.5a.75.75 0 010 1.5h-3.5v3.5a.75.75 0 01-1.5 0v-3.5H3.75a.75.75 0 010-1.5h3.5V3.75A.75.75 0 018 3z" />
                </svg>
                새 메시지 만들기
              </button>
            </Link>
          </div>

          {/* 빈 상태 */}
          <div className="flex flex-col items-center justify-center py-20 px-6">
            {/* 일러스트 */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
              <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10" stroke="currentColor" strokeWidth={1.5}>
                <rect x="6" y="10" width="36" height="28" rx="4" className="stroke-gray-300" />
                <path d="M6 18h36" className="stroke-gray-300" />
                <circle cx="24" cy="30" r="6" className="stroke-[#4DB87A]" strokeWidth={1.5} />
                <path d="M24 27v3l2 2" className="stroke-[#4DB87A]" strokeLinecap="round" />
              </svg>
            </div>

            <p className="text-base font-bold text-gray-700">아직 등록된 캠페인이 없습니다.</p>
          </div>

          {/* 페이지네이션 자리 */}
          <div className="border-t border-gray-100 px-6 py-4" />

        </section>
      </div>
    </div>
  );
}
