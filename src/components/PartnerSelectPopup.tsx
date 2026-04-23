'use client';

import { useState } from 'react';

type PartnerStatus = '일반' | '제외';

interface Partner {
  id: string;
  processedAt: string;
  name: string;
  userId: string;
  phone: string;
  memo: string;
  status: PartnerStatus;
}

const DEMO_PARTNERS: Partner[] = [
  { id: 'p1',  processedAt: '-',          name: '김민준', userId: 'minjun_kim',   phone: '010-1234-5678', memo: '', status: '일반' },
  { id: 'p2',  processedAt: '2025.03.10', name: '이서연', userId: 'seoyeon_lee',  phone: '010-2345-6789', memo: '', status: '제외' },
  { id: 'p3',  processedAt: '-',          name: '박지호', userId: 'jiho_park',    phone: '010-3456-7890', memo: '', status: '일반' },
  { id: 'p4',  processedAt: '2025.02.20', name: '최수아', userId: 'sua_choi',     phone: '010-4567-8901', memo: '', status: '제외' },
  { id: 'p5',  processedAt: '-',          name: '정하준', userId: 'hajun_jung',   phone: '010-5678-9012', memo: '', status: '일반' },
  { id: 'p6',  processedAt: '-',          name: '강나은', userId: 'naeun_kang',   phone: '010-6789-0123', memo: '', status: '일반' },
  { id: 'p7',  processedAt: '2025.04.01', name: '윤도현', userId: 'dohyun_yoon',  phone: '010-7890-1234', memo: '', status: '제외' },
  { id: 'p8',  processedAt: '-',          name: '임소희', userId: 'sohee_lim',    phone: '010-8901-2345', memo: '', status: '일반' },
  { id: 'p9',  processedAt: '-',          name: '한지우', userId: 'jiwoo_han',    phone: '010-9012-3456', memo: '', status: '일반' },
  { id: 'p10', processedAt: '2025.01.15', name: '오채원', userId: 'chaewon_oh',   phone: '010-0123-4567', memo: '', status: '제외' },
];

interface Props {
  onClose: () => void;
}

export default function PartnerSelectPopup({ onClose }: Props) {
  const [filterType, setFilterType] = useState<'전체' | '일반' | '제외'>('전체');
  const [searchField, setSearchField] = useState('이름');
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<Partner[]>(DEMO_PARTNERS);
  const [memoInputs, setMemoInputs] = useState<Record<string, string>>(
    Object.fromEntries(DEMO_PARTNERS.map((p) => [p.id, p.memo]))
  );

  const filtered = data.filter((p) => {
    if (filterType !== '전체' && p.status !== filterType) return false;
    if (searchText) {
      const val = searchField === '이름' ? p.name : searchField === '아이디' ? p.userId : p.phone;
      if (!val.includes(searchText)) return false;
    }
    return true;
  });

  const allChecked = filtered.length > 0 && filtered.every((p) => selected.includes(p.id));
  const toggleAll = () => setSelected(allChecked ? [] : filtered.map((p) => p.id));
  const toggleOne = (id: string) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleExclude = () =>
    setData((prev) => prev.map((p): Partner => selected.includes(p.id) ? { ...p, status: '제외' } : p));
  const handleRestore = () =>
    setData((prev) => prev.map((p): Partner => selected.includes(p.id) ? { ...p, status: '일반' } : p));

  const handleToggleStatus = (id: string) =>
    setData((prev) => prev.map((p): Partner => p.id === id ? { ...p, status: p.status === '제외' ? '일반' : '제외' } : p));

  const handleSaveMemo = (id: string) =>
    setData((prev) => prev.map((p): Partner => p.id === id ? { ...p, memo: memoInputs[id] ?? '' } : p));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-5xl flex-col rounded-2xl bg-white shadow-2xl max-h-[85vh] overflow-hidden">

        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 shrink-0">
          <h2 className="text-base font-bold text-gray-900">파트너 선택</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {/* 검색 필터 */}
          <div className="flex flex-wrap items-center gap-4 rounded-xl bg-gray-50 px-5 py-4">
            <span className="text-sm font-semibold text-gray-600">구분</span>
            <div className="flex items-center gap-3">
              {(['전체', '일반', '제외'] as const).map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-600">
                  <input type="radio" name="partnerFilter" checked={filterType === t} onChange={() => setFilterType(t)} className="h-4 w-4 accent-[#4DB87A]" />
                  {t}
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none"
              >
                {['이름', '아이디', '휴대폰'].map((f) => <option key={f}>{f}</option>)}
              </select>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="검색 내용 입력"
                className="w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none"
              />
              <button className="rounded-lg bg-[#4b5563] px-4 py-2 text-sm font-semibold text-white hover:bg-[#374151] transition-colors">검색</button>
              <button onClick={() => { setSearchText(''); setFilterType('전체'); }} className="rounded-lg bg-[#6b7280] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4b5563] transition-colors">초기화</button>
            </div>
          </div>

          {/* 리스트 헤더 */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gray-900">
              파트너 리스트
              <span className="ml-2 text-xs font-normal text-gray-400">전체 {filtered.length}명</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">선택한 파트너</span>
              <button onClick={handleExclude} className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600 transition-colors">제외</button>
              <button onClick={handleRestore} className="rounded-md bg-[#6b7280] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#4b5563] transition-colors">복원</button>
              <select className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs text-gray-600 focus:outline-none">
                <option>100개씩 보기</option>
                <option>50개씩 보기</option>
              </select>
            </div>
          </div>

          {/* 테이블 */}
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 px-4 py-3 text-center">
                    <input type="checkbox" checked={allChecked} onChange={toggleAll} className="h-4 w-4 accent-[#4DB87A]" />
                  </th>
                  {['처리일', '이름', '아이디', '휴대폰', '관리자 메모', '관리'].map((col) => (
                    <th key={col} className="border-b border-gray-200 px-4 py-3 text-center text-xs font-semibold text-gray-500">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sm text-gray-400">데이터가 없습니다.</td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleOne(p.id)} className="h-4 w-4 accent-[#4DB87A]" />
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500 whitespace-nowrap">{p.processedAt}</td>
                      <td className="px-4 py-3 text-center text-gray-700 whitespace-nowrap">{p.name}</td>
                      <td className="px-4 py-3 text-center text-gray-500">{p.userId}</td>
                      <td className="px-4 py-3 text-center text-gray-500 whitespace-nowrap">{p.phone}</td>

                      {/* 관리자 메모: 인풋 + 저장 버튼 */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={memoInputs[p.id] ?? ''}
                            onChange={(e) => setMemoInputs((prev) => ({ ...prev, [p.id]: e.target.value }))}
                            placeholder="메모 입력"
                            className="w-28 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none"
                          />
                          <button
                            onClick={() => handleSaveMemo(p.id)}
                            className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-600 hover:bg-gray-200 transition-colors whitespace-nowrap"
                          >
                            저장
                          </button>
                        </div>
                      </td>

                      {/* 관리: 상태에 따라 제외/복원 */}
                      <td className="px-4 py-3 text-center">
                        {p.status === '제외' ? (
                          <button
                            onClick={() => handleToggleStatus(p.id)}
                            className="rounded-md bg-[#6b7280] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#4b5563] transition-colors"
                          >
                            복원
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(p.id)}
                            className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600 transition-colors"
                          >
                            제외
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 푸터 */}
        <div className="border-t border-gray-100 px-6 py-4 shrink-0">
          <button onClick={onClose} className="w-full rounded-xl bg-gray-100 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors">닫기</button>
        </div>
      </div>
    </div>
  );
}
