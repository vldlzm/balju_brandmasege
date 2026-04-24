'use client';

import { useState } from 'react';

type Division = '법인/대표자명의' | '재직자' | '타사 명의' | '대표자의 가족' | '재직자의 가족';

const DIVISION_OPTIONS: Division[] = ['법인/대표자명의', '재직자', '타사 명의', '대표자의 가족', '재직자의 가족'];

interface FileItem {
  label: string;
  fileNum: number;
}

const FILES_BY_DIVISION: Record<Division, FileItem[]> = {
  '법인/대표자명의': [
    { label: '가입확인서', fileNum: 1 },
    { label: '사업자등록증, 사업자정보', fileNum: 3 },
  ],
  '재직자': [
    { label: '가입확인서', fileNum: 1 },
    { label: '재직증명서', fileNum: 2 },
    { label: '사업자등록증, 사업자정보', fileNum: 3 },
  ],
  '타사 명의': [
    { label: '가입확인서', fileNum: 1 },
    { label: '사업자등록증, 사업자정보', fileNum: 3 },
  ],
  '대표자의 가족': [
    { label: '가입확인서', fileNum: 1 },
    { label: '사업자등록증, 사업자정보', fileNum: 3 },
  ],
  '재직자의 가족': [
    { label: '가입확인서', fileNum: 1 },
    { label: '재직증명서', fileNum: 2 },
    { label: '사업자등록증, 사업자정보', fileNum: 3 },
  ],
};

interface Props {
  onClose: () => void;
}

export default function SenderNumberPopup({ onClose }: Props) {
  const [division, setDivision] = useState<Division>('법인/대표자명의');
  const [senderName, setSenderName] = useState('');
  const [senderNumber, setSenderNumber] = useState('');

  const files = FILES_BY_DIVISION[division];

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
            <div className="flex flex-wrap items-center gap-5">
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
                  <td className="w-[26%] px-4 py-5 align-middle">
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="ex) FLEXG"
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                    />
                  </td>

                  {/* 발신번호 */}
                  <td className="w-[26%] px-4 py-5 align-middle">
                    <input
                      type="text"
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="ex) 070-0000-0000"
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                    />
                  </td>

                  {/* 첨부파일업로드 — 구분에 따라 동적 */}
                  <td className="px-4 py-5 align-middle">
                    <div className="flex flex-col gap-2">
                      {files.map((f) => (
                        <div key={f.fileNum} className="flex items-center justify-between gap-3">
                          <span className="text-xs text-gray-500 shrink-0">{f.label}</span>
                          <button className="shrink-0 rounded-lg bg-gray-600 px-3 py-1 text-xs font-semibold text-white hover:bg-gray-700 transition-colors">
                            파일{f.fileNum}
                          </button>
                        </div>
                      ))}
                      <p className="mt-1 text-[11px] text-red-500 leading-relaxed">
                        ① 신청서 첨부서류는 신청서 가이드 확인 후 진행해주세요
                      </p>
                    </div>
                  </td>

                  {/* 관리 */}
                  <td className="w-[18%] px-4 py-5 text-center align-middle">
                    <button className="rounded-xl bg-gray-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-gray-800 transition-colors whitespace-nowrap">
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
