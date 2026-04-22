'use client';

import { useState } from 'react';

interface Screen {
  id: string;
  name: string;
  href: string;
  description: string;
  notes: string[];
}

interface ScreenGroup {
  category: string;
  screens: Screen[];
}

const SCREEN_GROUPS: ScreenGroup[] = [
  {
    category: '브랜드 메시지',
    screens: [
      {
        id: 'bm-list',
        name: '브랜드 메시지 목록',
        href: '/marketing/brand-message',
        description: '등록된 브랜드 메시지 캠페인의 전체 목록을 확인하는 화면입니다. 발송 예정·발송 완료 탭으로 구분되며, 각 캠페인의 상태와 주요 지표를 한눈에 파악할 수 있습니다.',
        notes: [
          '발송 예정 탭: 예약된 캠페인 목록 및 발송 취소 기능',
          '발송 완료 탭: 오픈율·클릭 수·발송 성공률 등 성과 지표 제공',
          '상단 요약 카드: 이번 달 발송 건수, 예정 건수, 수신 인원, 잔여 포인트',
          '기간·메시지 종류 필터 및 캠페인명 검색 기능 제공',
          '새 메시지 만들기 버튼으로 등록 화면 진입',
        ],
      },
      {
        id: 'bm-empty',
        name: '브랜드 메시지 목록\n(캠페인 미등록)',
        href: '/marketing/brand-message/empty',
        description: '캠페인이 1건도 없는 첫 진입 상태의 화면입니다. 데이터가 없을 때 사용자에게 빈 상태를 안내하며, 첫 캠페인 생성을 유도합니다.',
        notes: [
          '통계 카드는 모두 0값으로 표시',
          '리스트 영역에 빈 상태 안내 문구 노출',
          '새 메시지 만들기 버튼은 동일하게 제공',
        ],
      },
      {
        id: 'bm-create',
        name: '새 메시지 만들기',
        href: '/marketing/brand-message/create',
        description: '브랜드 메시지 캠페인을 새로 등록하는 화면입니다. 메시지 유형에 따라 입력 폼이 동적으로 구성되며, 우측 미리보기와 항목 설명 패널을 함께 제공합니다.',
        notes: [
          '캠페인명: 내부 관리용, 수신자 미노출, 중복 불가',
          '메시지 종류: 와이드 이미지 / 와이드 리스트 / 캐러셀 피드',
          '수신 파트너: 복수 선택, 1인당 *P 차감',
          '발송 설정: 예약 일시 설정 (당일 발송 가능 여부 확인 필요)',
          '우측 미리보기: 실시간 메시지 렌더링 확인',
        ],
      },
      {
        id: 'bm-create-no-settings',
        name: '새 메시지 만들기\n(기본 설정 미완료)',
        href: '/marketing/brand-message/create-no-settings',
        description: '기본 설정(수신거부번호·카카오톡 채널)이 완료되지 않은 상태에서 메시지 만들기 진입 시 표시되는 화면입니다.',
        notes: [
          '폼 전체 블러 처리로 접근 불가 상태 표현',
          '중앙 경고 모달: 기본 설정 필요 안내',
          '기본 설정 바로가기 버튼 제공',
          '목록으로 돌아가기 버튼 제공',
        ],
      },
      {
        id: 'bm-stats',
        name: '통계 팝업',
        href: '/marketing/brand-message/stats',
        description: '발송 완료된 캠페인의 상세 통계를 확인하는 팝업 화면입니다. 목록 화면의 "통계" 버튼 클릭 시 표시됩니다.',
        notes: [
          '핵심 지표: 오픈율·버튼 클릭 수·발송 성공률',
          '상세 수치: 발송 수·발송 성공 수·발송 실패 수·메시지 오픈 수·오픈율(%)·버튼 클릭 수·버튼 클릭률(%)·메시지 클릭 셀러 수(유니크)·상품 상세 페이지 방문 수·상품 상세 방문 셀러 수·이미지 내려받기 클릭 수·차감 포인트',
          '목록 화면 위에 오버레이 형태로 노출',
        ],
      },
    ],
  },
  {
    category: '기본설정',
    screens: [
      {
        id: 'settings',
        name: '기본설정',
        href: '/promotion/settings',
        description: '브랜드 메시지 발송을 위한 기초 환경을 설정하는 화면입니다. 발신번호 관리, 기본 설정(수신거부번호·카카오톡 채널), 캠페인 대상 제외 설정의 3개 섹션으로 구성됩니다.',
        notes: [
          '발신번호 관리: 신청·승인 상태 관리, 요청 내역 조회',
          '기본 설정: 무료 수신거부번호(신규/직접입력), 카카오톡 채널 등록',
          '수신거부 신규 선택 시 신청 버튼 노출',
          '직접 입력 시 시스템 자동 연동 불가 안내 표시',
          '대상자·상품 제외 설정: 캠페인에서 제외할 대상자/상품 지정',
        ],
      },
      {
        id: 'settings-complete',
        name: '기본설정\n(등록 완료)',
        href: '/promotion/settings-complete',
        description: '발신번호 등록 및 카카오톡 채널 연동이 완료된 상태의 기본설정 화면입니다.',
        notes: [
          '(참조) 플렉스지 내 해당 기능 존재합니다. (/Sms/sms_set_happyTalk)',
          '발신번호 테이블: 등록된 번호와 승인 상태 표시',
          '카카오톡 채널: "등록 완료" 배지로 상태 표현',
          '변경 링크로 채널 수정 가능',
        ],
      },
      {
        id: 'points',
        name: '포인트 충전/사용',
        href: '/promotion/points',
        description: '브랜드 메시지 발송에 사용되는 포인트를 충전하고 사용 내역을 확인하는 화면입니다.',
        notes: [
          '잔여 포인트·이번 달 충전·이번 달 사용 요약 카드',
          '포인트 충전: 금액 선택 또는 직접 입력, 결제 수단 선택',
          '결제 수단: 신용카드·계좌이체·가상계좌',
          '충전/사용 내역 탭으로 구분 조회',
        ],
      },
    ],
  },
];

const ALL_SCREENS = SCREEN_GROUPS.flatMap((g) => g.screens);

export default function ScreenIndex() {
  const [selectedId, setSelectedId] = useState<string>(ALL_SCREENS[0].id);

  const selected = ALL_SCREENS.find((s) => s.id === selectedId)!;
  const selectedCategory = SCREEN_GROUPS.find((g) =>
    g.screens.some((s) => s.id === selectedId)
  )?.category;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8f8]">

      {/* ── 좌측: 화면 목록 ── */}
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col">
        <div className="border-b border-gray-100 px-4 py-4">
          <h1 className="text-xs font-black uppercase tracking-widest text-gray-800">화면 목록</h1>
          <p className="mt-0.5 text-[10px] text-gray-400">화면을 선택하면 우측에서 확인합니다.</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {SCREEN_GROUPS.map((group) => (
            <div key={group.category} className="mb-2">
              <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#4DB87A]">
                {group.category}
              </p>
              <ul>
                {group.screens.map((screen) => {
                  const isActive = screen.id === selectedId;
                  return (
                    <li key={screen.id}>
                      <button
                        onClick={() => setSelectedId(screen.id)}
                        className={`relative w-full px-4 py-2.5 text-left text-sm transition-all ${
                          isActive
                            ? 'bg-[#f0faf5] font-semibold text-[#2a7a4f]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-[#4DB87A]" />
                        )}
                        <span className="whitespace-pre-line leading-snug text-[13px]">{screen.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* ── 중앙: 실제 화면 (iframe) ── */}
      <div className="flex flex-1 flex-col overflow-hidden border-r border-gray-200">
        {/* 상단 타이틀 바 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4DB87A]">
              {selectedCategory}
            </span>
            <span className="text-gray-300">·</span>
            <h2 className="text-sm font-bold text-gray-900 whitespace-pre-line leading-snug">
              {selected.name}
            </h2>
          </div>
          <a
            href={selected.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-[#4DB87A] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#3da869] active:scale-95 transition-all"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
              <path d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z" />
              <path d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z" />
            </svg>
            새 탭에서 열기
          </a>
        </div>
        <iframe
          key={selected.href}
          src={`${selected.href}?embed=1`}
          className="flex-1 w-full border-none"
          title={selected.name}
        />
      </div>

      {/* ── 우측: 화면 설명 ── */}
      <aside className="w-72 shrink-0 bg-white flex flex-col overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-800">화면 설명</h3>
          <p className="mt-0.5 text-[10px] text-gray-400">선택한 화면의 기능 및 정책 안내</p>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* 주요 기능 및 정책 */}
          {selected.notes.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">주요 기능 및 정책</p>
              <ul className="space-y-2.5">
                {selected.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#4DB87A]/10 text-[9px] font-black text-[#4DB87A]">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </aside>

    </div>
  );
}
