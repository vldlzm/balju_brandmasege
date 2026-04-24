'use client';

import { useState } from 'react';

interface Props {
  senderNumber?: string;
  rejectNumber?: string;
  defaultTitle?: string;
  defaultContent?: string;
  onClose: () => void;
  onSave: (data: { title: string; content: string }) => void;
}

const VARIABLES = [
  { key: '#{상점명}',      desc: '쇼핑몰명' },
  { key: '#{채널명}',      desc: '쇼핑몰 채널명' },
  { key: '#{회원명}',      desc: '주문자명' },
  { key: '#{쿠폰명}',      desc: '쿠폰 이름' },
  { key: '#{할인코드}',    desc: '할인 코드' },
  { key: '#{할인금액}',    desc: '쿠폰/할인코드 할인금액' },
  { key: '#{만료일}',      desc: '쿠폰/할인코드 만료일' },
  { key: '#{MAIN}',        desc: '메인 페이지 URL' },
  { key: '#{RUNAPP}',      desc: '앱 실행 URL' },
  { key: '#{BEST}',        desc: 'BEST 상품 리스트 페이지 URL' },
  { key: '#{DETAIL}',      desc: '상품 상세 페이지 URL' },
  { key: '#{COUPON}',      desc: '쿠폰 목록 페이지 URL' },
  { key: '#{수신거부번호}', desc: '수신거부번호' },
];

export default function LmsEditorPopup({
  senderNumber = '0269532203',
  rejectNumber = '010-6305-8019',
  defaultTitle = '[#{상점명}] #{회원명}님♡',
  defaultContent = '[#{상점명}] 안녕하세요, #{회원명}님!\n#{상점명}을 이용해 주셔서 감사합니다.\n#{회원명}님께 감사하는 마음으로 APP에서 사용 가능한 비밀 할인코드를 지급해 드렸습니다.\n\n▶ 할인코드: #{할인코드}\n▶ 할인내용: #{할인금액} 할인\n▶ 만료일: #{만료일}\n\n▶ 할인코드 사용하기\n[무료수신거부]\n#{수신거부번호}',
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);

  const TITLE_MAX = 40;
  const CONTENT_MAX = 2000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[90vh]">

        {/* 헤더 */}
        <div className="flex items-center gap-3 bg-[#2d3748] px-6 py-4 shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-white">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" strokeLinecap="round" />
          </svg>
          <h2 className="text-base font-bold text-white">LMS 메시지 수정</h2>
        </div>

        {/* 본문 */}
        <div className="flex flex-1 overflow-hidden">

          {/* 좌측: 폰 미리보기 */}
          <div className="w-64 shrink-0 border-r border-gray-100 bg-gray-50 flex flex-col items-center justify-start p-5">
            <div className="w-full overflow-hidden rounded-[24px] border-4 border-gray-700 bg-gray-100 shadow-xl">
              <div className="bg-gray-700 py-1.5 text-center">
                <div className="mx-auto h-1 w-10 rounded-full bg-gray-500" />
              </div>
              {/* 메시지 말풍선 */}
              <div className="bg-[#b2c7d9] p-3 min-h-[380px]">
                <div className="flex items-end gap-1.5">
                  <div className="max-w-[180px] rounded-2xl rounded-tl-none bg-white p-2.5 shadow-sm text-[10px] text-gray-800 leading-relaxed">
                    <p className="mb-1 font-semibold text-gray-500">(광고) [{'{'}#&#123;상점명&#125;{'}'}] #{'{'}회원명&#125;님♡</p>
                    <p className="whitespace-pre-wrap text-gray-700 break-all">{content.slice(0, 120)}{content.length > 120 ? '...' : ''}</p>
                    <div className="mt-2 border-t border-gray-100 pt-1.5">
                      <p className="text-[#4DB87A]">▶ 할인코드 사용하기</p>
                      <p className="mt-1 text-gray-400">[무료수신거부]</p>
                      <p className="text-gray-400">{rejectNumber}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-right text-[9px] text-gray-500">LMS 오후 1:56</div>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-center text-gray-400 leading-relaxed">
              ① 모바일 해상도에 따라 다소 차이가 있을 수 있습니다.
            </p>
          </div>

          {/* 우측: 폼 */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm border-collapse">
              <tbody>

                {/* 발신번호 */}
                <tr className="border-b border-gray-100">
                  <td className="w-40 shrink-0 bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700">
                    <span className="text-[#4DB87A] mr-1">✓</span>발신번호
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{senderNumber}</td>
                </tr>

                {/* 제목 */}
                <tr className="border-b border-gray-100">
                  <td className="bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700 align-top">
                    <span className="text-[#4DB87A] mr-1">✓</span>제목
                  </td>
                  <td className="px-5 py-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, TITLE_MAX))}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-16 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#4DB87A]">
                        {title.length}/{TITLE_MAX}
                      </span>
                    </div>
                  </td>
                </tr>

                {/* 메시지 내용 */}
                <tr className="border-b border-gray-100">
                  <td className="bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700 align-top">
                    <span className="text-[#4DB87A] mr-1">✓</span>메시지 내용
                  </td>
                  <td className="px-5 py-4">
                    <div className="relative">
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value.slice(0, CONTENT_MAX))}
                        rows={8}
                        className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none"
                      />
                      <span className="absolute bottom-3 right-3 text-xs text-[#4DB87A]">
                        {content.length}/{CONTENT_MAX}
                      </span>
                    </div>
                  </td>
                </tr>

                {/* 무료수신거부 번호 */}
                <tr className="border-b border-gray-100">
                  <td className="bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700">
                    <span className="text-[#4DB87A] mr-1">✓</span>무료수신거부 번호
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{rejectNumber}</td>
                </tr>

                {/* 치환 */}
                <tr>
                  <td className="bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700 align-top">
                    치환
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-1">
                      {VARIABLES.map((v) => (
                        <p key={v.key} className="text-xs text-gray-500">
                          <span className="font-medium text-gray-700">{v.key}</span> {v.desc}
                        </p>
                      ))}
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex items-center justify-center gap-3 border-t border-gray-100 px-6 py-4 shrink-0">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => { onSave({ title, content }); onClose(); }}
            className="rounded-xl bg-[#374151] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#1f2937] transition-colors"
          >
            수정
          </button>
        </div>

      </div>
    </div>
  );
}
