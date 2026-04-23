'use client';

import { useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function TestSendPopup({ onClose }: Props) {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw.length <= 11) {
      const formatted = raw
        .replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3')
        .replace(/^(\d{3})(\d{3,4})$/, '$1-$2')
        .replace(/^(\d{3})$/, '$1');
      setPhone(formatted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-bold text-gray-900">테스트 발송</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* 안내 문구 */}
          <p className="text-sm text-gray-500">
            · 테스트 발행은 통계에 포함되지 않습니다.
          </p>

          {/* 휴대폰번호 입력 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">휴대폰 번호</label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="010-0000-0000"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              disabled={phone.replace(/-/g, '').length < 10}
              className="flex-1 rounded-xl bg-[#4DB87A] py-3 text-sm font-bold text-white hover:bg-[#3da869] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              발송
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
