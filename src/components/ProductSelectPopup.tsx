'use client';

import { useState } from 'react';

type ProductStatus = '일반' | '제외';

interface Product {
  id: string;
  processedAt: string;
  name: string;
  code: string;
  status: ProductStatus;
}

const DEMO_PRODUCTS: Product[] = [
  { id: 'p1',  processedAt: '-',          name: '나이키 에어맥스 270 React',   code: 'NK27001',    status: '일반' },
  { id: 'p2',  processedAt: '2025.03.10', name: '아디다스 울트라부스트 22',     code: 'AD22002',    status: '제외' },
  { id: 'p3',  processedAt: '-',          name: '뉴발란스 574 클래식',          code: 'NB57403',    status: '일반' },
  { id: 'p4',  processedAt: '2025.02.20', name: '컨버스 척테일러 올스타',        code: 'CV01004',    status: '제외' },
  { id: 'p5',  processedAt: '-',          name: '반스 올드스쿨 스니커즈',        code: 'VN00005',    status: '일반' },
  { id: 'p6',  processedAt: '-',          name: '살로몬 XT-6 트레일',           code: 'SL00006',    status: '일반' },
  { id: 'p7',  processedAt: '2025.04.01', name: '호카 클리프턴 9',              code: 'HK00907',    status: '제외' },
  { id: 'p8',  processedAt: '-',          name: '아식스 젤-카야노 30',           code: 'AS30008',    status: '일반' },
];

interface Props {
  onClose: () => void;
}

export default function ProductSelectPopup({ onClose }: Props) {
  const [filterType, setFilterType] = useState<'전체' | '일반' | '제외'>('전체');
  const [searchField, setSearchField] = useState('상품명');
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<Product[]>(DEMO_PRODUCTS);

  const filtered = data.filter((p) => {
    if (filterType !== '전체' && p.status !== filterType) return false;
    if (searchText) {
      const val = searchField === '상품명' ? p.name : p.code;
      if (!val.includes(searchText)) return false;
    }
    return true;
  });

  const allChecked = filtered.length > 0 && filtered.every((p) => selected.includes(p.id));
  const toggleAll = () => setSelected(allChecked ? [] : filtered.map((p) => p.id));
  const toggleOne = (id: string) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const handleExclude = () =>
    setData((prev) => prev.map((p): Product => selected.includes(p.id) ? { ...p, status: '제외' } : p));
  const handleRestore = () =>
    setData((prev) => prev.map((p): Product => selected.includes(p.id) ? { ...p, status: '일반' } : p));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl max-h-[85vh] overflow-hidden">

        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 shrink-0">
          <h2 className="text-base font-bold text-gray-900">상품 선택</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {/* 검색 필터 */}
          <div className="flex flex-wrap items-center gap-4 rounded-xl bg-gray-50 px-5 py-4">
            <span className="text-sm font-semibold text-gray-600">대상 상품</span>
            <div className="flex items-center gap-3">
              {(['전체', '일반', '제외'] as const).map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-600">
                  <input type="radio" name="productFilter" checked={filterType === t} onChange={() => setFilterType(t)} className="h-4 w-4 accent-[#4DB87A]" />
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
                {['상품명', '상품코드'].map((f) => <option key={f}>{f}</option>)}
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
              상품 리스트
              <span className="ml-2 text-xs font-normal text-gray-400">전체 {filtered.length}개</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">선택한 상품</span>
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
                  {['처리일', '상품명', '상품코드', '관리'].map((col) => (
                    <th key={col} className="border-b border-gray-200 px-4 py-3 text-center text-xs font-semibold text-gray-500">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm text-gray-400">데이터가 없습니다.</td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleOne(p.id)} className="h-4 w-4 accent-[#4DB87A]" />
                      </td>
                      <td className="px-4 py-3 text-center text-gray-400">{p.processedAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* 이미지 플레이스홀더 */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 border border-gray-200">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-300" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 18h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v10.5a1.5 1.5 0 001.5 1.5z" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-500">{p.code}</td>
                      <td className="px-4 py-3 text-center">
                        {p.status === '일반' ? (
                          <button
                            onClick={() => setData((prev) => prev.map((x): Product => x.id === p.id ? { ...x, status: '제외' } : x))}
                            className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-600 transition-colors"
                          >
                            제외
                          </button>
                        ) : (
                          <button
                            onClick={() => setData((prev) => prev.map((x): Product => x.id === p.id ? { ...x, status: '일반' } : x))}
                            className="rounded-md bg-[#6b7280] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#4b5563] transition-colors"
                          >
                            복원
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
