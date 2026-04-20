'use client';

import { useState } from 'react';
import Link from 'next/link';

type TabType = '발송 예정' | '발송 완료';
type Category = '신상품' | '이벤트' | '가격할인';
type FormatType = '와이드 이미지' | '와이드 리스트' | '캐러셀 피드';

interface ScheduledMessage {
  id: string;
  category: Category;
  scheduledAt: string;
  title: string;
  targetCount: number;
  targetLabel: string;
  formatType: FormatType;
  points: number;
}

interface CompletedMessage {
  id: string;
  category: Category;
  sentAt: string;
  title: string;
  targetCount: number;
  sentCount: number;
  formatType: FormatType;
  openRate: number;
  clickCount: number;
  points: number;
}

interface DraftMessage {
  id: string;
  category: Category;
  savedAt: string;
  title: string;
  targetLabel: string;
  formatType: FormatType | null;
  completionPct: number;
}

// ── 데모 데이터 ──────────────────────────────────────────────

const SCHEDULED: ScheduledMessage[] = [
  {
    id: 's1',
    category: '신상품',
    scheduledAt: '2025.04.18 오전 10:00',
    title: '봄 시즌 신상품 안내 - 유아동 의류 15종 입고',
    targetCount: 284,
    targetLabel: '전체 셀러 284명',
    formatType: '와이드 이미지',
    points: 4260,
  },
  {
    id: 's2',
    category: '이벤트',
    scheduledAt: '2025.04.20 오후 2:00',
    title: '5월 황금연휴 특별 기획전 참여 셀러 모집',
    targetCount: 96,
    targetLabel: '뷰티·패션 셀러 96명',
    formatType: '와이드 리스트',
    points: 1440,
  },
  {
    id: 's3',
    category: '가격할인',
    scheduledAt: '2025.04.22 오전 9:00',
    title: '주방용품 전품목 15% 할인 프로모션 안내',
    targetCount: 284,
    targetLabel: '전체 셀러 284명',
    formatType: '캐러셀 피드',
    points: 4260,
  },
];

const COMPLETED: CompletedMessage[] = [
  {
    id: 'c1',
    category: '신상품',
    sentAt: '2025.03.28 오전 10:00',
    title: '3월 봄 맞이 유아동 의류 신규 입고 안내',
    targetCount: 284,
    sentCount: 278,
    formatType: '와이드 이미지',
    openRate: 38.2,
    clickCount: 156,
    points: 4260,
  },
  {
    id: 'c2',
    category: '이벤트',
    sentAt: '2025.03.20 오후 3:00',
    title: '어버이날 특별 기획전 셀러 모집 안내',
    targetCount: 156,
    sentCount: 152,
    formatType: '와이드 리스트',
    openRate: 42.5,
    clickCount: 203,
    points: 2340,
  },
  {
    id: 'c3',
    category: '가격할인',
    sentAt: '2025.03.15 오전 11:00',
    title: '가정의 달 5월 전품목 프로모션 사전 안내',
    targetCount: 284,
    sentCount: 284,
    formatType: '캐러셀 피드',
    openRate: 31.7,
    clickCount: 98,
    points: 4260,
  },
  {
    id: 'c4',
    category: '신상품',
    sentAt: '2025.03.05 오전 9:00',
    title: '봄·여름 신규 입고 상품 전체 공개',
    targetCount: 320,
    sentCount: 316,
    formatType: '와이드 이미지',
    openRate: 44.1,
    clickCount: 241,
    points: 4800,
  },
  {
    id: 'c5',
    category: '이벤트',
    sentAt: '2025.02.25 오후 1:00',
    title: '2월 마지막 주 셀러 대상 특가 이벤트',
    targetCount: 96,
    sentCount: 95,
    formatType: '와이드 리스트',
    openRate: 51.3,
    clickCount: 178,
    points: 1440,
  },
];

const DRAFTS: DraftMessage[] = [
  {
    id: 'd1',
    category: '신상품',
    savedAt: '2025.04.10 오후 3:22',
    title: '여름 신상품 입고 안내',
    targetLabel: '뷰티·패션 셀러',
    formatType: '와이드 이미지',
    completionPct: 60,
  },
  {
    id: 'd2',
    category: '이벤트',
    savedAt: '2025.04.05 오전 11:08',
    title: '6월 이벤트 셀러 초대장',
    targetLabel: '미선택',
    formatType: null,
    completionPct: 25,
  },
];

// ── 헬퍼 ─────────────────────────────────────────────────────

const CATEGORY_STYLE: Record<Category, string> = {
  신상품: 'bg-[#E6F1FB] text-[#0C447C]',
  이벤트: 'bg-[#EEEDFE] text-[#3C3489]',
  가격할인: 'bg-[#FAECE7] text-[#712B13]',
};

const FORMAT_ICON: Record<FormatType, string> = {
  '와이드 이미지': '🖼',
  '와이드 리스트': '📋',
  '캐러셀 피드': '🎠',
};

// ── 컴포넌트 ─────────────────────────────────────────────────

export default function KakaoBrandMessageList() {
  const [activeTab, setActiveTab] = useState<TabType>('발송 예정');
  const [periodFilter, setPeriodFilter] = useState('최근 1개월');
  const [formatFilter, setFormatFilter] = useState('전체');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tabItems: { label: TabType; count: number }[] = [
    { label: '발송 예정', count: SCHEDULED.length },
    { label: '발송 완료', count: 18 },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* ── 상단 헤더 ── */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">카카오 브랜드메시지</h1>
          </div>
          <Link href="/marketing/brand-message/create">
            <button className="flex items-center gap-1.5 rounded-xl bg-[#4DB87A] px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-[#4DB87A]/30 hover:bg-[#3da869] active:scale-95 transition-all">
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path d="M8 3a.75.75 0 01.75.75v3.5h3.5a.75.75 0 010 1.5h-3.5v3.5a.75.75 0 01-1.5 0v-3.5H3.75a.75.75 0 010-1.5h3.5V3.75A.75.75 0 018 3z" />
              </svg>
              새 메시지 만들기
            </button>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-5 p-6">

        {/* ── 요약 통계 ── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '이번달 발송 완료', value: '18건', sub: '전월 대비 +3건', color: 'text-[#4DB87A]' },
            { label: '발송 예정', value: '3건', sub: '가장 빠른 발송 2일 후', color: 'text-blue-500' },
            { label: '이번달 총 수신 인원', value: '1,284명', sub: '발송 완료 기준', color: 'text-purple-500' },
            { label: '잔여 포인트', value: '45,600P', sub: '약 3,040명 발송 가능', color: 'text-amber-500' },
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
          <div className="flex gap-1 border-b border-gray-100 px-6 pt-5">
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.label;
              return (
                <button
                  key={tab.label}
                  onClick={() => { setActiveTab(tab.label); setCurrentPage(1); }}
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

          {/* 목록 */}
          <div className="space-y-3 p-5">

            {/* 발송 예정 */}
            {activeTab === '발송 예정' && (
              <>
                {SCHEDULED.map((msg) => (
                  <article key={msg.id} className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-1 flex-col gap-3">
                        {/* 상단 메타 */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${CATEGORY_STYLE[msg.category]}`}>
                            {msg.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                              <path fillRule="evenodd" d="M4 1a1 1 0 00-1 1v1H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1h-1V2a1 1 0 10-2 0v1H5V2a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H4z" clipRule="evenodd" />
                            </svg>
                            {msg.scheduledAt}
                          </span>
                          <span className="ml-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600">
                            예약 완료
                          </span>
                        </div>

                        {/* 제목 */}
                        <h2 className="text-sm font-bold text-gray-900">{msg.title}</h2>

                        {/* 정보 칩 */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-gray-400">
                              <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm5 5a5 5 0 00-10 0h10z" />
                            </svg>
                            수신 대상 <span className="font-semibold text-gray-700">{msg.targetCount.toLocaleString()}명</span>
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span>{FORMAT_ICON[msg.formatType]}</span>
                            <span className="font-semibold text-gray-700">{msg.formatType}</span>
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            예상 포인트{' '}
                            <span className="font-bold text-[#4DB87A]">{msg.points.toLocaleString()}P</span>
                          </span>
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex shrink-0 items-center gap-2">
                        <button className="rounded-lg border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                          통계
                        </button>
                        <button className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-500 hover:bg-red-100 transition-colors">
                          발송취소
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </>
            )}

            {/* 발송 완료 */}
            {activeTab === '발송 완료' && (
              <>
                {COMPLETED.map((msg) => (
                  <article key={msg.id} className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-1 flex-col gap-3">
                        {/* 상단 메타 */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${CATEGORY_STYLE[msg.category]}`}>
                            {msg.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                              <path fillRule="evenodd" d="M4 1a1 1 0 00-1 1v1H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1h-1V2a1 1 0 10-2 0v1H5V2a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H4z" clipRule="evenodd" />
                            </svg>
                            {msg.sentAt}
                          </span>
                          <span className="ml-1 rounded-full bg-[#e8f5ee] px-2.5 py-0.5 text-[11px] font-semibold text-[#2a7a4f]">
                            발송 완료
                          </span>
                        </div>

                        {/* 제목 */}
                        <h2 className="text-sm font-bold text-gray-900">{msg.title}</h2>

                        {/* 정보 칩 */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span>{FORMAT_ICON[msg.formatType]}</span>
                            <span className="font-semibold text-gray-700">{msg.formatType}</span>
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            발송{' '}
                            <span className="font-semibold text-gray-700">{msg.sentCount.toLocaleString()}명</span>
                            <span className="text-gray-400">/ {msg.targetCount.toLocaleString()}명</span>
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="text-xs text-gray-500">
                            포인트 차감{' '}
                            <span className="font-bold text-gray-700">{msg.points.toLocaleString()}P</span>
                          </span>
                        </div>

                        {/* 성과 지표 */}
                        <div className="flex items-center gap-4 rounded-xl bg-gray-50 px-4 py-3">
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[10px] font-medium text-gray-400">오픈율</span>
                            <span className={`text-base font-black tabular-nums ${msg.openRate >= 40 ? 'text-[#4DB87A]' : 'text-gray-700'}`}>
                              {msg.openRate}%
                            </span>
                          </div>
                          <div className="h-8 w-px bg-gray-200" />
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[10px] font-medium text-gray-400">클릭 수</span>
                            <span className="text-base font-black tabular-nums text-gray-700">
                              {msg.clickCount.toLocaleString()}
                            </span>
                          </div>
                          <div className="h-8 w-px bg-gray-200" />
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="text-[10px] font-medium text-gray-400">발송 성공률</span>
                            <span className="text-base font-black tabular-nums text-gray-700">
                              {((msg.sentCount / msg.targetCount) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <button className="rounded-lg border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors">
                          통계
                        </button>
                        <button className="rounded-lg border border-[#4DB87A] px-3.5 py-2 text-xs font-semibold text-[#4DB87A] hover:bg-[#f0f9f4] transition-colors">
                          재발송
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </>
            )}


          </div>

          {/* ── 페이지네이션 ── */}
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <p className="text-xs text-gray-400">
              {activeTab === '발송 완료' ? '총 18건' : `총 ${SCHEDULED.length}건`}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M10.707 3.293a1 1 0 010 1.414L7.414 8l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-[#4DB87A] text-white shadow-sm'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M5.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L8.586 8 5.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
