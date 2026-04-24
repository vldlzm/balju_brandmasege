'use client';

import { useState } from 'react';

const DIVISION_OPTIONS = ['법인/대표자명의', '재직자', '타사 명의', '대표자의 가족', '재직자의 가족'];

interface Props {
  onClose: () => void;
}

export default function SenderNumberPopup({ onClose }: Props) {
  const [division, setDivision] = useState('법인/대표자명의');
  const [senderName, setSenderName] = useState('');
  const [senderNumber, setSenderNumber] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-bold text-gray-900">발신번호 신청</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">

          {/* 구분 */}
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 px-5 py-4">
            <span className="w-12 shrink-0 text-sm font-semibold text-gray-700">구분</span>
            <div className="flex flex-wrap items-center gap-4">
              {DIVISION_OPTIONS.map((opt) => (
                <label key={opt} className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="division"
                    checked={division === opt}
                    onChange={() => setDivision(opt)}
                    className="h-4 w-4 accent-[#4DB87A]"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          {/* 신청 테이블 */}
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {['발신자명', '발신번호', '첨부파일업로드', '관리'].map((col) => (
                    <th key={col} className="border-b border-gray-200 px-4 py-3 text-center text-xs font-semibold text-gray-500">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* 발신자명 */}
                  <td className="px-4 py-4 text-center">
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="ex) FLEXG"
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                    />
                  </td>

                  {/* 발신번호 */}
                  <td className="px-4 py-4 text-center">
                    <input
                      type="text"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="ex) 070-0000-0000"
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                    />
                  </td>

                  {/* 첨부파일업로드 */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-500">가입확인서</span>
                        <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                          파일1
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-500">사업자등록증, 사업자정보</span>
                        <button className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                          파일3
                        </button>
                      </div>
                      <p className="text-[11px] text-red-500 leading-relaxed">
                        ① 신청서 첨부서류는 신청서 가이드 확인 후 진행해주세요
                      </p>
                    </div>
                  </td>

                  {/* 관리 */}
                  <td className="px-4 py-4 text-center">
                    <button className="rounded-xl bg-[#4DB87A] px-4 py-2 text-xs font-bold text-white hover:bg-[#3da869] transition-colors whitespace-nowrap">
                      발신번호 신청 요청
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
