'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  {
    label: 'HOME',
    href: '/home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 12L12 3l9 9" />
        <path d="M9 21V12h6v9" />
        <path d="M3 12v9h18v-9" />
      </svg>
    ),
  },
  {
    label: '환경설정',
    href: '/settings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    label: '상품관리',
    href: '/products',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    label: '파트너',
    href: '/partners',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: '주문관리',
    href: '/orders',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: '매출관리',
    href: '/sales',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    label: '정산',
    href: '/settlement',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    label: '프로모션',
    href: '/marketing/brand-message',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 010 14.14" />
        <path d="M15.54 8.46a5 5 0 010 7.07" />
      </svg>
    ),
  },
];

export default function GNB() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hidden, setHidden] = useState(searchParams.get('embed') === '1');

  useEffect(() => {
    // URL 파라미터 또는 iframe 내부 여부로 숨김 결정
    setHidden(searchParams.get('embed') === '1' || window.self !== window.top);
  }, [searchParams]);

  if (hidden) return null;

  const isPromotionActive =
    pathname.startsWith('/marketing') || pathname.startsWith('/promotion');

  return (
    <header className="w-full bg-[#252d3a] shadow-lg">
      <div className="border-b border-white/5 px-6 py-1.5 flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wider text-[#4DB87A]">발주모아 파트너스</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-3.5 w-3.5">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Baljumoa Partners</span>
          </div>
          <button className="rounded border border-gray-500 px-2.5 py-0.5 text-[11px] text-gray-300 hover:border-gray-300 hover:text-white transition-colors">
            로그아웃
          </button>
        </div>
      </div>

      <div className="flex items-stretch px-4">
        <div className="flex items-center gap-3 pr-8 py-3 border-r border-white/10 mr-4">
          <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-[#1a2130]">
            <span className="text-[9px] font-black text-[#4DB87A] leading-none tracking-tight">BX</span>
            <span className="text-[9px] font-black text-white leading-none tracking-tight">DO</span>
          </div>
          <span className="text-base font-bold text-white tracking-wide">Partners</span>
        </div>

        <nav className="flex items-stretch flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === '프로모션' ? isPromotionActive : false;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex flex-col items-center justify-center gap-1 px-5 py-3 text-[11px] font-medium transition-colors min-w-[64px]
                  ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <span className={isActive ? 'text-[#4DB87A]' : ''}>{item.icon}</span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-[#4DB87A]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
