'use client';

import Link from 'next/link';

export default function KakaoBrandMessageCreateNoSettings() {
  return (
    <div className="relative min-h-screen bg-[#f8f8f8]">

      {/* 헤더 */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-6 py-4">
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

      {/* 본문 (흐리게) */}
      <div className="pointer-events-none select-none opacity-30 blur-[2px]">
        <div className="mx-auto max-w-[1440px] p-6">
          <div className="grid grid-cols-[1fr_340px] gap-6">
            <div className="space-y-5">
              {/* 캠페인명 */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">캠페인명 <span className="text-red-500">*</span></h2>
                <div className="h-11 rounded-xl bg-gray-100" />
              </section>
              {/* 메시지 종류 */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">메시지 종류 <span className="text-red-500">*</span></h2>
                <div className="grid grid-cols-3 gap-3">
                  {['와이드 이미지', '와이드 리스트', '캐러셀 피드'].map((t) => (
                    <div key={t} className="rounded-xl border-2 border-gray-200 bg-white p-5">
                      <div className="mb-2 h-6 w-6 rounded bg-gray-200" />
                      <div className="h-4 w-20 rounded bg-gray-200" />
                      <div className="mt-1 h-3 w-28 rounded bg-gray-100" />
                    </div>
                  ))}
                </div>
              </section>
              {/* 발송 대상 */}
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">발송 대상 <span className="text-red-500">*</span></h2>
                <div className="h-11 rounded-xl bg-gray-100" />
              </section>
            </div>
            {/* 우측 미리보기 */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="h-6 w-24 rounded bg-gray-200 mb-4" />
              <div className="h-64 rounded-xl bg-gray-100" />
            </div>
          </div>
        </div>
      </div>

      {/* 기본 설정 미완료 안내 모달 */}
      <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-8 w-8 text-amber-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-gray-900">기본 설정을 먼저 완료해 주세요</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            메시지를 발송하려면 무료 수신거부번호와<br />카카오톡 채널 등록이 필요합니다.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link href="/promotion/settings">
              <button className="w-full rounded-xl bg-[#4DB87A] py-3 text-sm font-bold text-white hover:bg-[#3da869] transition-colors">
                기본 설정 바로가기
              </button>
            </Link>
            <Link href="/marketing/brand-message">
              <button className="w-full rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors">
                목록으로 돌아가기
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
