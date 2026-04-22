'use client';

import { useState } from 'react';

interface Screen {
  id: string;
  name: string;
  href: string;
}

interface ScreenGroup {
  category: string;
  screens: Screen[];
}

const SCREEN_GROUPS: ScreenGroup[] = [
  {
    category: '브랜드 메시지',
    screens: [
      { id: 'bm-list',             name: '브랜드 메시지 목록',                href: '/marketing/brand-message' },
      { id: 'bm-empty',            name: '브랜드 메시지 목록\n(캠페인 미등록)', href: '/marketing/brand-message/empty' },
      { id: 'bm-create',           name: '새 메시지 만들기',                  href: '/marketing/brand-message/create' },
      { id: 'bm-create-no-settings', name: '새 메시지 만들기\n(기본 설정 미완료)', href: '/marketing/brand-message/create-no-settings' },
      { id: 'bm-stats',            name: '통계 팝업',                        href: '/marketing/brand-message/stats' },
    ],
  },
  {
    category: '기본설정',
    screens: [
      { id: 'settings',          name: '기본설정',            href: '/promotion/settings' },
      { id: 'settings-complete', name: '기본설정\n(등록 완료)', href: '/promotion/settings-complete' },
    ],
  },
];

const ALL_SCREENS = SCREEN_GROUPS.flatMap((g) => g.screens);

export default function ScreenIndex() {
  const [selectedId, setSelectedId] = useState<string>(ALL_SCREENS[0].id);

  const selected = ALL_SCREENS.find((s) => s.id === selectedId)!;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8f8]">

      {/* ── 좌측 인덱스 ── */}
      <aside className="w-64 shrink-0 border-r border-gray-200 bg-white flex flex-col">
        <div className="border-b border-gray-100 px-5 py-5">
          <h1 className="text-xs font-black uppercase tracking-widest text-gray-800">화면 목록</h1>
          <p className="mt-0.5 text-[11px] text-gray-400">화면을 선택하면 우측에서 확인합니다.</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-3">
          {SCREEN_GROUPS.map((group) => (
            <div key={group.category} className="mb-2">
              <p className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-[#4DB87A]">
                {group.category}
              </p>
              <ul>
                {group.screens.map((screen) => {
                  const isActive = screen.id === selectedId;
                  return (
                    <li key={screen.id}>
                      <button
                        onClick={() => setSelectedId(screen.id)}
                        className={`relative w-full px-5 py-2.5 text-left text-sm transition-all ${
                          isActive
                            ? 'bg-[#f0faf5] font-semibold text-[#2a7a4f]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-[#4DB87A]" />
                        )}
                        <span className="whitespace-pre-line leading-snug text-sm">{screen.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* ── 우측 화면 미리보기 ── */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* 상단 바 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4DB87A]">
              {SCREEN_GROUPS.find((g) => g.screens.some((s) => s.id === selectedId))?.category}
            </span>
            <h2 className="text-sm font-bold text-gray-900 whitespace-pre-line leading-snug">
              {selected.name}
            </h2>
          </div>
          <a
            href={selected.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-[#4DB87A] px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#3da869] active:scale-95 transition-all"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
              <path d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z" />
              <path d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z" />
            </svg>
            새 탭에서 열기
          </a>
        </div>

        {/* iframe */}
        <iframe
          key={selected.href}
          src={selected.href}
          className="flex-1 w-full border-none"
          title={selected.name}
        />
      </main>

    </div>
  );
}
