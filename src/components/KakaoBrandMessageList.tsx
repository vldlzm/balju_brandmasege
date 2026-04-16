'use client';

import { useState } from 'react';

export default function KakaoBrandMessageList() {
  const [activeTab, setActiveTab] = useState<'발송 예정' | '발송 완료' | '임시저장'>('발송 예정');

  const tabItems = [
    { label: '발송 예정', count: 3 },
    { label: '발송 완료', count: 18 },
    { label: '임시저장', count: 2 },
  ];

  const scheduledMessages = [
    {
      id: '1',
      typeLabel: '신상품',
      typeBg: 'bg-[#E6F1FB]',
      typeText: 'text-[#0C447C]',
      datetime: '2025.04.18 오전 10:00',
      title: '봄 시즌 신상품 안내 - 유아동 의류 15종 입고',
      target: '전체 셀러 284명',
      messageType: '와이드 이미지형',
    },
    {
      id: '2',
      typeLabel: '이벤트',
      typeBg: 'bg-[#EEEDFE]',
      typeText: 'text-[#3C3489]',
      datetime: '2025.04.20 오후 2:00',
      title: '5월 황금연휴 특별 기획전 참여 셀러 모집',
      target: '뷰티·패션 셀러 96명',
      messageType: '텍스트형',
    },
    {
      id: '3',
      typeLabel: '가격할인',
      typeBg: 'bg-[#FAECE7]',
      typeText: 'text-[#712B13]',
      datetime: '2025.04.22 오전 9:00',
      title: '주방용품 전품목 15% 할인 프로모션 안내',
      target: '전체 셀러 284명',
      messageType: '와이드 리스트형',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-10">
      <div className="mx-auto w-[1440px]">
        <div className="rounded-t-[18px] bg-[#2d2d2d]">
          <div className="flex h-[36px] items-center justify-between px-4 text-sm text-white">
            <span className="font-bold text-[#4DB87A]">발주모아 파트너스</span>
            <div className="flex items-center gap-3">
              <span>Baljumoa Partners</span>
              <button className="rounded-md bg-[#444] px-3 py-1 text-white">로그아웃</button>
            </div>
          </div>
        </div>

        <div className="flex h-[52px] items-center justify-between bg-[#1a1a1a] px-6 text-sm text-[#aaa]">
          <div>
            <div className="text-[#4DB87A] text-[11px]">UQOO</div>
            <div className="text-white text-[15px] font-bold">Partners</div>
          </div>
          <div className="flex items-center gap-6">
            {['HOME', '환경설정', '상품관리', '파트너', '주문관리', '매출관리', '정산', '마케팅'].map((item) => {
              const isActive = item === '마케팅';
              return (
                <button
                  key={item}
                  className={`transition text-sm ${isActive ? 'text-[#4DB87A]' : 'text-[#aaa] hover:text-white'}`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-[160px_minmax(0,1fr)] gap-6 bg-[#f8f8f8] pt-6">
          <aside className="rounded-[18px] bg-[#1a1a1a] p-4">
            <button className="mb-3 flex w-full items-center rounded-[14px] border-l-4 border-[#4DB87A] bg-[#252525] px-4 py-3 text-left text-[#4DB87A] font-medium">
              카카오 브랜드메시지
            </button>
            <button className="flex w-full items-center rounded-[14px] px-4 py-3 text-left text-[#555]">
              광고관리
            </button>
          </aside>

          <main className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-[17px] font-bold text-[#141414]">카카오 브랜드메시지</h1>
              <button className="rounded-[6px] bg-[#4DB87A] px-4 py-2 text-sm font-medium text-white">
                + 새 메시지 만들기
              </button>
            </div>

            <section className="flex flex-wrap gap-3 rounded-[18px] bg-white p-4 shadow-sm">
              <select className="min-w-[220px] rounded border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#4DB87A]">
                <option>전체 유형(신상품/이벤트/가격할인)</option>
                <option>신상품</option>
                <option>이벤트</option>
                <option>가격할인</option>
              </select>
              <select className="min-w-[220px] rounded border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#4DB87A]">
                <option>최근 1개월(3개월/6개월)</option>
                <option>최근 1개월</option>
                <option>3개월</option>
                <option>6개월</option>
              </select>
              <select className="min-w-[220px] rounded border border-[#e8e8e8] bg-[#fafafa] px-3 py-2 text-sm text-[#333] outline-none focus:border-[#4DB87A]">
                <option>발송채널 전체(발주모아 공식채널)</option>
                <option>발주모아 공식채널</option>
              </select>
            </section>

            <section className="rounded-[18px] bg-white p-4 shadow-sm">
              <div className="flex flex-wrap gap-4 border-b border-[#f0f0f0] pb-3">
                {tabItems.map((tab) => {
                  const isActive = activeTab === tab.label;
                  return (
                    <button
                      key={tab.label}
                      onClick={() => setActiveTab(tab.label as '발송 예정' | '발송 완료' | '임시저장')}
                      className={`flex items-center gap-2 border-b-4 pb-2 text-sm font-semibold transition ${
                        isActive ? 'border-[#4DB87A] text-[#4DB87A]' : 'border-transparent text-[#aaa] hover:text-white'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${isActive ? 'bg-[#E9F7EE] text-[#27764B]' : 'bg-[#272727] text-[#aaa]'}`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 space-y-4">
                {activeTab === '발송 예정' ? (
                  scheduledMessages.map((message) => (
                    <article key={message.id} className="rounded-[10px] border border-[#e8e8e8] bg-white p-[18px] shadow-sm">
                      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${message.typeBg} ${message.typeText}`}>
                            {message.typeLabel}
                          </span>
                          <span className="text-sm text-[#747474]">{message.datetime}</span>
                        </div>
                        <span className="rounded-full bg-[#e8f5ee] px-3 py-1 text-sm font-medium text-[#2a7a4f]">
                          예약 완료
                        </span>
                      </div>
                      <h2 className="mt-4 text-[14px] font-bold text-[#141414]">{message.title}</h2>
                      <div className="mt-3 flex flex-col gap-2 text-sm text-[#666] sm:flex-row sm:items-center sm:gap-8">
                        <span>수신대상 {message.target}</span>
                        <span>메시지 유형 {message.messageType}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#f0f0f0] pt-4">
                        <span className="text-sm font-medium text-[#4e4e4e]">발송 예정 인원수 {message.target}</span>
                        <button className="rounded-md border border-[#d9d9d9] px-3 py-2 text-sm font-medium text-[#333] hover:bg-[#f5f5f5]">
                          수정
                        </button>
                        <button className="rounded-md border border-[#df4b3d] bg-[#fff1ef] px-3 py-2 text-sm font-medium text-[#c42a1d] hover:bg-[#fde7e2]">
                          취소
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[10px] border border-[#e8e8e8] bg-white p-8 text-center text-sm text-[#888]">
                    {activeTab === '발송 완료' ? '발송 완료 메시지 목록이 없습니다.' : '임시저장 메시지 목록이 없습니다.'}
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f3f3f3] p-2">
                  <button className="rounded-md px-4 py-2 text-sm font-medium text-[#555] hover:bg-[#e9e9e9]">‹</button>
                  <button className="rounded-md bg-[#4DB87A] px-4 py-2 text-sm font-medium text-white">1</button>
                  <button className="rounded-md px-4 py-2 text-sm font-medium text-[#555] hover:bg-[#e9e9e9]">2</button>
                  <button className="rounded-md px-4 py-2 text-sm font-medium text-[#555] hover:bg-[#e9e9e9]">3</button>
                  <button className="rounded-md px-4 py-2 text-sm font-medium text-[#555] hover:bg-[#e9e9e9]">›</button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
