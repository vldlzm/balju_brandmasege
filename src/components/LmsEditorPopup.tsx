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
  { key: '#{수신거부번호}', desc: '수신거부번호' },
];

const DEFAULT_CONTENT = '[#{상점명}] 안녕하세요, #{회원명}님!\n#{상점명}을 이용해 주셔서 감사합니다.\n#{회원명}님께 감사하는 마음으로 APP에서 사용 가능한 비밀 할인코드를 지급해 드렸습니다.\n\n[무료수신거부]\n#{수신거부번호}';

export default function LmsEditorPopup({
  senderNumber = '0269532203',
  rejectNumber = '010-1234-1234',
  defaultTitle = '[#{상점명}] #{회원명}님♡',
  defaultContent = DEFAULT_CONTENT,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);

  const TITLE_MAX = 40;
  const CONTENT_MAX = 2000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[90vh]">

        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 shrink-0">
          <h2 className="text-base font-bold text-gray-900">LMS 메시지 수정</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div className="flex flex-1 overflow-hidden">

          {/* 좌측: 폰 미리보기 */}
          <div className="w-60 shrink-0 border-r border-gray-100 bg-gray-50 flex flex-col items-center justify-start p-5">
            <div className="w-full overflow-hidden rounded-[24px] border-4 border-gray-700 bg-gray-100 shadow-xl">
              <div className="bg-gray-700 py-1.5 text-center">
                <div className="mx-auto h-1 w-10 rounded-full bg-gray-500" />
              </div>
              <div className="bg-[#b2c7d9] p-3 min-h-[340px]">
                <div className="flex items-end gap-1.5">
                  <div className="max-w-[170px] rounded-2xl rounded-tl-none bg-white p-2.5 shadow-sm">
                    <p className="mb-1 text-[9px] font-semibold text-gray-400">(광고) [#{'{상점명}'}] #{'{회원명}'}님♡</p>
                    <p className="whitespace-pre-wrap text-[10px] text-gray-700 leading-relaxed break-all">
                      {content.slice(0, 140)}{content.length > 140 ? '...' : ''}
                    </p>
                    <div className="mt-2 border-t border-gray-100 pt-1.5">
                      <p className="text-[9px] text-gray-400">[무료수신거부]</p>
                      <p className="text-[9px] text-gray-400">{rejectNumber}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-right text-[9px] text-gray-500">LMS 오후 1:56</div>
              </div>
            </div>
            <p className="mt-3 text-[10px] text-center text-gray-400 leading-relaxed">
              ① 모바일 해상도에 따라<br />다소 차이가 있을 수 있습니다.
            </p>
          </div>

          {/* 우측: 폼 */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

            {/* 발신번호 */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                <span className="text-[#4DB87A]">✓</span> 발신번호
              </label>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                {senderNumber}
              </div>
            </div>

            {/* 제목 */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                <span className="text-[#4DB87A]">✓</span> 제목
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value.slice(0, TITLE_MAX))}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-16 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#4DB87A]">
                  {title.length}/{TITLE_MAX}
                </span>
              </div>
            </div>

            {/* 메시지 내용 */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                <span className="text-[#4DB87A]">✓</span> 메시지 내용
              </label>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value.slice(0, CONTENT_MAX))}
                  rows={8}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                />
                <span className="absolute bottom-3 right-3 text-xs text-[#4DB87A]">
                  {content.length}/{CONTENT_MAX}
                </span>
              </div>
            </div>

            {/* 무료수신거부 번호 */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                <span className="text-[#4DB87A]">✓</span> 무료수신거부 번호
              </label>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                {rejectNumber}
              </div>
            </div>

            {/* 치환 변수 */}
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-gray-700">치환</p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 space-y-1.5">
                {VARIABLES.map((v) => (
                  <p key={v.key} className="text-xs text-gray-500">
                    <span className="font-medium text-gray-700">{v.key}</span> {v.desc}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-2 border-t border-gray-100 px-6 py-4 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => { onSave({ title, content }); onClose(); }}
            className="flex-1 rounded-xl bg-[#4DB87A] py-3 text-sm font-bold text-white hover:bg-[#3da869] transition-colors"
          >
            수정
          </button>
        </div>

      </div>
    </div>
  );
}
