'use client';

import { useState } from 'react';
import Link from 'next/link';
import ChargePopup from './ChargePopup';
import TestSendPopup from './TestSendPopup';

type MessageType = 'wide-image' | 'wide-list' | 'carousel';
type ContentCategory = '신상품' | '이벤트' | '가격할인';

const CONTENT_TEMPLATES: Record<ContentCategory, string> = {
  '신상품': '신상품 입고 안내드립니다. 새로운 상품을 지금 바로 확인하고 빠르게 판매를 시작하세요!',
  '이벤트': '특별 이벤트가 시작되었습니다. 기간 한정 혜택을 확인하고 지금 바로 참여해보세요!',
  '가격할인': '가격 할인 행사 안내입니다. 한정 수량으로 진행되니 지금 바로 확인해보세요!',
};

const CATEGORY_STYLES: Record<ContentCategory, { default: string; active: string }> = {
  '신상품':  { default: 'border-[#cce0f5] text-[#0C447C] bg-[#E6F1FB]', active: 'border-[#0C447C] bg-[#0C447C] text-white' },
  '이벤트':  { default: 'border-[#d5d3fc] text-[#3C3489] bg-[#EEEDFE]', active: 'border-[#3C3489] bg-[#3C3489] text-white' },
  '가격할인': { default: 'border-[#f5cfc4] text-[#712B13] bg-[#FAECE7]', active: 'border-[#712B13] bg-[#712B13] text-white' },
};

interface Product {
  name: string;
  price: string;
}

interface CarouselItem {
  id: number;
  product: Product | null;
  header: string;
  content: string;
  btn1: string;
  btn1Link: string;
  btn2: string;
  btn2Link: string;
  showBtn2: boolean;
}

const DEMO_SELLERS = [
  '나이키 공식스토어',
  '아디다스 코리아',
  '유니클로',
  '자라 코리아',
  '무신사 스토어',
];

const DEMO_PRODUCT: Product = {
  name: '나이키 에어맥스 270 React',
  price: '139,000원',
};

const CURRENT_POINTS = 5250;

const PRODUCT_LIST = [
  { id: 1,  name: '나이키 에어맥스 270 React',   price: '139,000원' },
  { id: 2,  name: '아디다스 울트라부스트 22',     price: '189,000원' },
  { id: 3,  name: '뉴발란스 574 클래식',          price: '109,000원' },
  { id: 4,  name: '컨버스 척테일러 올스타',        price: '79,000원'  },
  { id: 5,  name: '반스 올드스쿨 스니커즈',        price: '89,000원'  },
  { id: 6,  name: '살로몬 XT-6 트레일',           price: '219,000원' },
  { id: 7,  name: '호카 클리프턴 9',              price: '169,000원' },
  { id: 8,  name: '아식스 젤-카야노 30',           price: '179,000원' },
  { id: 9,  name: '뉴발란스 990v6 메이드 인 USA', price: '289,000원' },
  { id: 10, name: '나이키 에어포스 1 로우',         price: '119,000원' },
];

const SELLER_LIST = [
  { id: 1,  name: '나이키 공식스토어' },
  { id: 2,  name: '아디다스 코리아'   },
  { id: 3,  name: '유니클로'         },
  { id: 4,  name: '자라 코리아'      },
  { id: 5,  name: '무신사 스토어'    },
  { id: 6,  name: '올리브영'         },
  { id: 7,  name: '이니스프리'       },
  { id: 8,  name: '다이소 공식'      },
  { id: 9,  name: '이케아 코리아'    },
  { id: 10, name: '쿠팡 파트너스'    },
];

const MESSAGE_TYPE_OPTIONS = [
  {
    id: 'wide-image' as MessageType,
    label: '와이드 이미지',
    desc: '이미지와 텍스트를 함께',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 15l4-4 4 4 3-3 4 4" />
        <circle cx="8" cy="9" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'wide-list' as MessageType,
    label: '와이드 리스트',
    desc: '여러 상품을 리스트로',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'carousel' as MessageType,
    label: '캐러셀 피드',
    desc: '슬라이드 형태로 여러 콘텐츠',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.5}>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M1 8h2M21 8h2M1 16h2M21 16h2" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Bubble({ n }: { n: number }) {
  return (
    <div className="absolute -top-3 -right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[11px] font-black text-white shadow-md">
      {n}
    </div>
  );
}

export default function KakaoBrandMessageCreate() {
  const [campaignName, setCampaignName] = useState('');
  const [messageType, setMessageType] = useState<MessageType | null>(null);
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [contentCategory, setContentCategory] = useState<ContentCategory | null>(null);
  const [content, setContent] = useState('');
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [sellerSearch, setSellerSearch] = useState('');
  const [checkedSellers, setCheckedSellers] = useState<number[]>([]);
  const [sellerEmptyDemo, setSellerEmptyDemo] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showChargePopup, setShowChargePopup] = useState(false);
  const [showTestSendPopup, setShowTestSendPopup] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [checkedProduct, setCheckedProduct] = useState<number | null>(null);
  const [productModalTarget, setProductModalTarget] = useState<string | number>('wide-image');
  const [button1, setButton1] = useState('');
  const [button2, setButton2] = useState('');
  const [showButton2, setShowButton2] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const tomorrow = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  })();

  // 캐러셀 전용 state
  const newCarouselItem = (): CarouselItem => ({ id: Date.now(), product: null, header: '', content: '', btn1: '', btn1Link: '', btn2: '', btn2Link: '', showBtn2: false });
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([
    { id: 1, product: null, header: '', content: '', btn1: '', btn1Link: '', btn2: '', btn2Link: '', showBtn2: false },
    { id: 2, product: null, header: '', content: '', btn1: '', btn1Link: '', btn2: '', btn2Link: '', showBtn2: false },
  ]);
  const [carouselActiveIdx, setCarouselActiveIdx] = useState(0);

  const addCarouselItem = () => {
    if (carouselItems.length < 6)
      setCarouselItems(prev => [...prev, newCarouselItem()]);
  };
  const removeCarouselItem = (id: number) => {
    if (carouselItems.length > 2) {
      setCarouselItems(prev => prev.filter(i => i.id !== id));
      setCarouselActiveIdx(prev => Math.max(0, prev - 1));
    }
  };
  const updateCarousel = (id: number, patch: Partial<CarouselItem>) =>
    setCarouselItems(prev => prev.map(i => i.id === id ? { ...i, ...patch } : i));
  const updateCarouselContent = (id: number, text: string) => {
    const parts = text.split('\n');
    const limited = parts.length > 11 ? parts.slice(0, 11).join('\n') : text;
    updateCarousel(id, { content: limited.slice(0, 180) });
  };

  // 와이드 리스트 전용 state
  const [wlHeader, setWlHeader] = useState('');
  const [wlList1Text, setWlList1Text] = useState('');
  const [wlList1Product, setWlList1Product] = useState<Product | null>(null);
  const [wlExtraItems, setWlExtraItems] = useState<{ id: number; text: string; product: Product | null }[]>([
    { id: 1, text: '', product: null },
    { id: 2, text: '', product: null },
  ]);
  const [wlBtn1, setWlBtn1] = useState('');
  const [wlBtn1Link, setWlBtn1Link] = useState('');
  const [wlBtn2, setWlBtn2] = useState('');
  const [wlBtn2Link, setWlBtn2Link] = useState('');
  const [wlShowBtn2, setWlShowBtn2] = useState(false);
  // 와이드 이미지 버튼 링크
  const [button1Link, setButton1Link] = useState('');
  const [button2Link, setButton2Link] = useState('');

  const filteredSellers = sellerEmptyDemo
    ? []
    : SELLER_LIST.filter((s) => s.name.includes(sellerSearch));

  const toggleSeller = (id: number) => {
    setCheckedSellers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    const allIds = filteredSellers.map((s) => s.id);
    const allChecked = allIds.every((id) => checkedSellers.includes(id));
    setCheckedSellers(allChecked
      ? checkedSellers.filter((id) => !allIds.includes(id))
      : Array.from(new Set([...checkedSellers, ...allIds]))
    );
  };

  const confirmSellers = () => {
    const names = SELLER_LIST.filter((s) => checkedSellers.includes(s.id)).map((s) => s.name);
    setSelectedSellers(names);
    setShowSellerModal(false);
  };

  const handleSellerRemove = (seller: string) => {
    setSelectedSellers((prev) => prev.filter((s) => s !== seller));
    const found = SELLER_LIST.find((s) => s.name === seller);
    if (found) setCheckedSellers((prev) => prev.filter((id) => id !== found.id));
  };

  const handleProductRemove = () => setSelectedProduct(null);

  const openProductModal = (target: string | number) => {
    setProductModalTarget(target);
    setProductSearch('');
    if (target === 'wide-image') {
      setCheckedProduct(selectedProduct ? (PRODUCT_LIST.find(p => p.name === selectedProduct.name)?.id ?? null) : null);
    } else if (target === 'wl-list1') {
      setCheckedProduct(wlList1Product ? (PRODUCT_LIST.find(p => p.name === wlList1Product.name)?.id ?? null) : null);
    } else if (typeof target === 'string' && target.startsWith('carousel-')) {
      const cid = parseInt(target.split('-')[1]);
      const ci = carouselItems.find(i => i.id === cid);
      setCheckedProduct(ci?.product ? (PRODUCT_LIST.find(p => p.name === ci.product!.name)?.id ?? null) : null);
    } else {
      const item = wlExtraItems.find(i => i.id === target);
      setCheckedProduct(item?.product ? (PRODUCT_LIST.find(p => p.name === item.product!.name)?.id ?? null) : null);
    }
    setShowProductModal(true);
  };

  const confirmProduct = () => {
    const found = PRODUCT_LIST.find(p => p.id === checkedProduct);
    if (!found) return;
    const product: Product = { name: found.name, price: found.price };
    if (productModalTarget === 'wide-image') {
      setSelectedProduct(product);
    } else if (productModalTarget === 'wl-list1') {
      setWlList1Product(product);
      if (!wlList1Text) setWlList1Text(product.name);
    } else if (typeof productModalTarget === 'string' && productModalTarget.startsWith('carousel-')) {
      const cid = parseInt(productModalTarget.split('-')[1]);
      updateCarousel(cid, { product });
    } else {
      updateWlItemProduct(productModalTarget as number, product);
    }
    setShowProductModal(false);
  };

  // 와이드 리스트 핸들러
  const addWlItem = () => {
    if (wlExtraItems.length < 4)
      setWlExtraItems(prev => [...prev, { id: Date.now(), text: '', product: null }]);
  };
  const removeWlItem = (id: number) => {
    if (wlExtraItems.length > 2)
      setWlExtraItems(prev => prev.filter(item => item.id !== id));
  };
  const updateWlItemText = (id: number, text: string) => {
    const parts = text.split('\n');
    const limited = parts.length > 2 ? parts.slice(0, 2).join('\n') : text;
    setWlExtraItems(prev => prev.map(item => item.id === id ? { ...item, text: limited.slice(0, 30) } : item));
  };
  const updateWlItemProduct = (id: number, product: Product | null) =>
    setWlExtraItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, product, text: product ? `${product.name}\n${product.price}`.slice(0, 30) : item.text }
        : item
    ));

  const estimatedPoints = selectedSellers.length * 15;

  return (
    <>
    {showChargePopup && <ChargePopup onClose={() => setShowChargePopup(false)} />}
    {showTestSendPopup && <TestSendPopup onClose={() => setShowTestSendPopup(false)} />}

    {/* 파트너 선택 모달 */}
    {showSellerModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="relative flex w-[680px] max-h-[80vh] flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
          {/* 모달 헤더 */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">파트너 선택</h2>
              <p className="mt-0.5 text-xs text-gray-400">발송할 수신 파트너를 선택하세요</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setSellerEmptyDemo((v) => !v); setSellerSearch(''); }}
                className={`rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                  sellerEmptyDemo
                    ? 'border-[#4DB87A] bg-[#f0faf5] text-[#2a7a4f]'
                    : 'border-gray-200 text-gray-400 hover:bg-gray-50'
                }`}
              >
                {sellerEmptyDemo ? '데이터 있음 보기' : '빈 상태 미리보기'}
              </button>
            <button
              onClick={() => setShowSellerModal(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            </div>
          </div>

          {/* 검색 */}
          <div className="border-b border-gray-100 px-6 py-3">
            <div className="relative">
              <svg viewBox="0 0 20 20" fill="currentColor" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                value={sellerSearch}
                onChange={(e) => setSellerSearch(e.target.value)}
                placeholder="파트너명 검색"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm focus:border-[#4DB87A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all"
              />
            </div>
          </div>

          {/* 테이블 */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50">
                <tr className="border-b border-gray-100">
                  <th className="w-10 px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={filteredSellers.length > 0 && filteredSellers.every((s) => checkedSellers.includes(s.id))}
                      onChange={toggleAll}
                      className="h-4 w-4 rounded accent-[#4DB87A]"
                    />
                  </th>
                  <th className="w-10 px-3 py-3 text-center text-xs font-semibold text-gray-400">NO</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400">파트너명</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredSellers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-14 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                          {sellerSearch ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-gray-300">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-gray-300">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-gray-500">
                            {sellerSearch ? '검색 결과가 없습니다.' : '등록된 파트너가 없습니다.'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {sellerSearch
                              ? `'${sellerSearch}'에 해당하는 파트너를 찾을 수 없습니다.`
                              : '등록된 파트너가 아직 없습니다.'}
                          </p>
                        </div>
                        {sellerSearch && (
                          <button
                            onClick={() => setSellerSearch('')}
                            className="mt-1 rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
                          >
                            검색 초기화
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSellers.map((seller) => {
                    const isChecked = checkedSellers.includes(seller.id);
                    return (
                      <tr
                        key={seller.id}
                        onClick={() => toggleSeller(seller.id)}
                        className={`cursor-pointer transition-colors ${isChecked ? 'bg-[#f0f9f4]' : 'hover:bg-gray-50'}`}
                      >
                        <td className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSeller(seller.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 rounded accent-[#4DB87A]"
                          />
                        </td>
                        <td className="px-3 py-3 text-center text-xs tabular-nums text-gray-400">{seller.id}</td>
                        <td className="px-3 py-3 font-medium text-gray-900">{seller.name}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* 모달 하단 */}
          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <span className="text-sm text-gray-500">
              <span className="font-bold text-[#4DB87A]">{checkedSellers.length}</span>명 선택됨
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSellerModal(false)}
                className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 active:scale-95 transition-all"
              >
                취소
              </button>
              <button
                onClick={confirmSellers}
                className="rounded-xl bg-[#4DB87A] px-5 py-2 text-sm font-bold text-white hover:bg-[#3da869] active:scale-95 transition-all"
              >
                선택 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* 상품 선택 모달 */}
    {showProductModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="relative flex w-[560px] max-h-[80vh] flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">상품 선택</h2>
            </div>
            <button onClick={() => setShowProductModal(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
          </div>
          <div className="border-b border-gray-100 px-6 py-3">
            <div className="relative">
              <svg viewBox="0 0 20 20" fill="currentColor" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input type="text" value={productSearch} onChange={(e) => setProductSearch(e.target.value)}
                placeholder="상품명으로 검색"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm focus:border-[#4DB87A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50">
                <tr className="border-b border-gray-100">
                  <th className="w-10 px-4 py-3 text-center text-xs font-semibold text-gray-400">선택</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-400">상품명</th>
                  <th className="w-28 px-3 py-3 text-right text-xs font-semibold text-gray-400">가격</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {PRODUCT_LIST.filter(p => p.name.includes(productSearch)).length === 0 ? (
                  <tr><td colSpan={3} className="py-10 text-center text-sm text-gray-400">검색 결과가 없습니다.</td></tr>
                ) : (
                  PRODUCT_LIST.filter(p => p.name.includes(productSearch)).map((product) => {
                    const isChecked = checkedProduct === product.id;
                    return (
                      <tr key={product.id} onClick={() => setCheckedProduct(isChecked ? null : product.id)}
                        className={`cursor-pointer transition-colors ${isChecked ? 'bg-[#f0f9f4]' : 'hover:bg-gray-50'}`}>
                        <td className="px-4 py-3 text-center">
                          <input type="checkbox" checked={isChecked} onChange={() => setCheckedProduct(isChecked ? null : product.id)}
                            onClick={(e) => e.stopPropagation()} className="h-4 w-4 rounded accent-[#4DB87A]" />
                        </td>
                        <td className="px-3 py-3 font-medium text-gray-900">{product.name}</td>
                        <td className="px-3 py-3 text-right tabular-nums text-gray-500">{product.price}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-6 py-4">
            <button onClick={() => setShowProductModal(false)} className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 active:scale-95 transition-all">취소</button>
            <button onClick={confirmProduct} disabled={checkedProduct === null}
              className="rounded-xl bg-[#4DB87A] px-5 py-2 text-sm font-bold text-white hover:bg-[#3da869] active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              선택 완료
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="min-h-screen bg-[#f8f8f8]">
      {/* 페이지 헤더 */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            목록으로
          </Link>
          <div className="h-4 w-px bg-gray-300" />
          <h1 className="text-lg font-bold text-gray-900">브랜드 메시지 등록</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] p-6">
        <div className="grid grid-cols-[1fr_300px] gap-6 items-start">

          {/* ───── 좌측 폼 영역 ───── */}
          <div className="space-y-5">

            {/* 섹션 1: 캠페인명 */}
            <section className="relative overflow-visible rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <Bubble n={1} />
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">
                캠페인명 <span className="text-red-500">*</span>
              </h2>
              <div className="relative">
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value.slice(0, 50))}
                  placeholder="캠페인명을 입력하세요"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-20 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                />
                <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs tabular-nums ${campaignName.length >= 45 ? 'text-amber-500' : 'text-gray-400'}`}>
                  {campaignName.length}/50
                </span>
              </div>
            </section>

            {/* 섹션 2: 메시지 종류 */}
            <section className="relative overflow-visible rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <Bubble n={2} />
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">
                메시지 종류 <span className="text-red-500">*</span>
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {MESSAGE_TYPE_OPTIONS.map((option) => {
                  const isSelected = messageType === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setMessageType(option.id)}
                      className={`group relative rounded-xl border-2 p-5 text-left transition-all ${
                        isSelected
                          ? 'border-[#4DB87A] bg-[#f0f9f4] shadow-sm'
                          : 'border-gray-200 bg-white hover:border-[#4DB87A]/40 hover:bg-gray-50'
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#4DB87A]">
                          <svg viewBox="0 0 12 12" fill="white" className="h-2.5 w-2.5">
                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                          </svg>
                        </span>
                      )}
                      <span className={`mb-3 flex ${isSelected ? 'text-[#4DB87A]' : 'text-gray-400 group-hover:text-gray-600'}`}>
                        {option.icon}
                      </span>
                      <div className={`text-sm font-semibold ${isSelected ? 'text-[#2a7a4f]' : 'text-gray-800'}`}>
                        {option.label}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500 leading-snug">{option.desc}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 섹션 3: 수신 파트너 */}
            <section className="relative overflow-visible rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <Bubble n={3} />
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">
                  수신 파트너 <span className="text-red-500">*</span>
                </h2>
                <button
                  onClick={() => setShowSellerModal(true)}
                  className="rounded-lg bg-[#4DB87A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3da869] active:scale-95 transition-all"
                >
                  + 파트너 불러오기
                </button>
              </div>
              <div className="min-h-[64px] rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3 transition-all">
                {selectedSellers.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSellers.map((seller) => (
                      <span
                        key={seller}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f5ee] pl-3 pr-1.5 py-1 text-xs font-medium text-[#2a7a4f]"
                      >
                        {seller}
                        <button
                          onClick={() => handleSellerRemove(seller)}
                          className="flex h-4 w-4 items-center justify-center rounded-full text-[#2a7a4f]/60 hover:bg-[#2a7a4f] hover:text-white transition-colors"
                          aria-label={`${seller} 삭제`}
                        >
                          <svg viewBox="0 0 12 12" fill="currentColor" className="h-2.5 w-2.5">
                            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="py-3 text-center text-xs text-gray-400">
                    &quot;파트너 불러오기&quot; 버튼을 눌러 수신 파트너를 추가하세요
                  </p>
                )}
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-gray-400">
                  <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm5 5a5 5 0 00-10 0h10z" />
                </svg>
                선택된 수신자{' '}
                <span className="font-bold text-gray-900">{selectedSellers.length}</span>명
              </div>
            </section>

            {/* ── 와이드 이미지 전용 섹션 ── */}
            {messageType === 'wide-image' && (
              <>
                {/* 섹션 4: 상품 불러오기 */}
                <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-400">
                      상품 불러오기 <span className="text-red-500">*</span>
                    </h2>
                    <button
                      onClick={() => openProductModal('wide-image')}
                      className="rounded-lg border border-[#4DB87A] px-4 py-2 text-xs font-semibold text-[#4DB87A] hover:bg-[#f0f9f4] active:scale-95 transition-all"
                    >
                      상품 선택
                    </button>
                  </div>
                  {selectedProduct ? (
                    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-200 text-gray-400">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="M3 15l4-4 4 4 3-3 4 4" />
                          <circle cx="8.5" cy="9.5" r="1.5" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate text-sm font-semibold text-gray-900">{selectedProduct.name}</div>
                        <div className="mt-0.5 text-sm font-bold text-[#4DB87A]">{selectedProduct.price}</div>
                      </div>
                      <button onClick={handleProductRemove} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl border-2 border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">선택된 상품이 없습니다.</div>
                  )}
                </section>

                {/* 섹션 5: 내용 */}
                <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-400">
                    내용 <span className="text-red-500">*</span>
                  </h2>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs text-gray-400 shrink-0">메시지 유형</span>
                    <div className="flex gap-2">
                      {(['신상품', '이벤트', '가격할인'] as ContentCategory[]).map((cat) => {
                        const isActive = contentCategory === cat;
                        const styles = CATEGORY_STYLES[cat];
                        return (
                          <button key={cat} onClick={() => { setContentCategory(cat); setContent(CONTENT_TEMPLATES[cat]); }}
                            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all active:scale-95 ${isActive ? styles.active : styles.default + ' hover:opacity-80'}`}>
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="relative">
                    <textarea value={content} onChange={(e) => setContent(e.target.value.slice(0, 76))}
                      placeholder="메시지 유형을 선택하거나 직접 입력하세요" rows={4}
                      className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 pb-9 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${content.length > 70 ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#4DB87A] focus:ring-[#4DB87A]/20'}`} />
                    <span className={`absolute bottom-3 right-4 text-xs tabular-nums font-medium transition-colors ${content.length > 70 ? 'text-red-500' : 'text-gray-400'}`}>{content.length}/76</span>
                  </div>
                  {content.length > 70 && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-red-500">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg>
                      70자를 초과하였습니다. 메시지가 잘릴 수 있습니다.
                    </p>
                  )}
                </section>

                {/* 섹션 6: 버튼 */}
                <section className="relative overflow-visible rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">버튼</h2>
                  <div className="space-y-4">
                    {/* 버튼 1 */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
                      <p className="text-xs font-semibold text-gray-500">버튼 1</p>
                      <div className="relative">
                        <input type="text" value={button1} onChange={(e) => setButton1(e.target.value.slice(0, 8))} placeholder="버튼 텍스트 입력"
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-14 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums text-gray-400">{button1.length}/8</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/></svg>
                        </span>
                        <input type="url" value={button1Link} onChange={(e) => setButton1Link(e.target.value)} placeholder="https://example.com"
                          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                      </div>
                    </div>

                    {/* 버튼 2 */}
                    {showButton2 ? (
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gray-500">버튼 2</p>
                          <button onClick={() => { setShowButton2(false); setButton2(''); setButton2Link(''); }} className="text-xs text-gray-400 hover:text-red-500 transition-colors">삭제</button>
                        </div>
                        <div className="relative">
                          <input type="text" value={button2} onChange={(e) => setButton2(e.target.value.slice(0, 8))} placeholder="버튼 텍스트 입력"
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-14 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums text-gray-400">{button2.length}/8</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/></svg>
                          </span>
                          <input type="url" value={button2Link} onChange={(e) => setButton2Link(e.target.value)} placeholder="https://example.com"
                            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setShowButton2(true)} className="flex items-center gap-1 text-sm font-medium text-[#4DB87A] hover:underline transition-colors">
                        <span className="text-base font-bold">+</span> 버튼 추가
                      </button>
                    )}
                  </div>
                </section>
              </>
            )}

            {/* ── 와이드 리스트 전용 섹션 ── */}
            {messageType === 'wide-list' && (
              <>
                {/* WL-A: 헤더 */}
                <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <h2 className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-400">
                    헤더 <span className="text-red-500">*</span>
                  </h2>
                  <p className="mb-3 text-xs text-gray-400">띄어쓰기 포함 20자 제한 · 줄바꿈 불가</p>
                  <div className="relative">
                    <input type="text" value={wlHeader} onChange={(e) => setWlHeader(e.target.value.replace(/\n/g, '').slice(0, 20))}
                      placeholder="헤더 문구를 입력하세요"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-16 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs tabular-nums text-gray-400">{wlHeader.length}/20</span>
                  </div>
                </section>

                {/* WL-B: 리스트 구성 */}
                <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-400">
                        리스트 구성 <span className="text-red-500">*</span>
                      </h2>
                      <p className="mt-0.5 text-xs text-gray-400">최소 3개 · 최대 5개 (리스트1 포함)</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                      총 <span className="text-[#4DB87A]">{1 + wlExtraItems.length}</span> / 5개
                    </span>
                  </div>

                  <div className="space-y-5">
                    {/* 리스트 1 - 고정 */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4DB87A] text-[10px] font-bold text-white">1</span>
                        <span className="text-xs font-semibold text-gray-600">리스트 1 (필수)</span>
                        <button
                          onClick={() => openProductModal('wl-list1')}
                          className="ml-auto rounded-lg border border-[#4DB87A] px-3 py-1 text-[10px] font-semibold text-[#4DB87A] hover:bg-[#f0f9f4] active:scale-95 transition-all"
                        >
                          상품 선택
                        </button>
                      </div>
                      {wlList1Product ? (
                        <div className="mb-3 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-400">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l4-4 4 4 3-3 4 4"/><circle cx="8.5" cy="9.5" r="1.5"/></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="truncate text-xs font-semibold text-gray-900">{wlList1Product.name}</div>
                            <div className="text-xs font-bold text-[#4DB87A]">{wlList1Product.price}</div>
                          </div>
                          <button onClick={() => setWlList1Product(null)} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                          </button>
                        </div>
                      ) : (
                        <div className="mb-3 rounded-lg border-2 border-dashed border-gray-200 py-5 text-center text-xs text-gray-400">
                          상품 선택 버튼을 눌러 상품을 추가하세요
                        </div>
                      )}
                      {/* 텍스트 - 25자 */}
                      <div className="relative">
                        <input type="text" value={wlList1Text} onChange={(e) => setWlList1Text(e.target.value.slice(0, 25))}
                          placeholder={wlList1Product ? wlList1Product.name : '리스트1 문구 입력 (최대 25자)'}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 pr-14 text-sm focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums text-gray-400">{wlList1Text.length}/25</span>
                      </div>
                    </div>

                    {/* 리스트 2~5 */}
                    {wlExtraItems.map((item, idx) => (
                      <div key={item.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-[10px] font-bold text-white">{idx + 2}</span>
                          <span className="text-xs font-semibold text-gray-600">리스트 {idx + 2}{idx < 3 && <span className="text-red-500"> *</span>}</span>
                          <button
                            onClick={() => openProductModal(item.id)}
                            className="ml-auto rounded-lg border border-[#4DB87A] px-3 py-1 text-[10px] font-semibold text-[#4DB87A] hover:bg-[#f0f9f4] active:scale-95 transition-all"
                          >
                            상품 선택
                          </button>
                          {wlExtraItems.length > 2 && (
                            <button onClick={() => removeWlItem(item.id)}
                              className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                              <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                            </button>
                          )}
                        </div>
                        {item.product ? (
                          <div className="mb-3 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-400">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l4-4 4 4 3-3 4 4"/><circle cx="8.5" cy="9.5" r="1.5"/></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="truncate text-xs font-semibold text-gray-900">{item.product.name}</div>
                              <div className="text-xs font-bold text-[#4DB87A]">{item.product.price}</div>
                            </div>
                            <button onClick={() => updateWlItemProduct(item.id, null)} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                              <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                            </button>
                          </div>
                        ) : (
                          <div className="mb-3 rounded-lg border-2 border-dashed border-gray-200 py-5 text-center text-xs text-gray-400">
                            상품 선택 버튼을 눌러 상품을 추가하세요
                          </div>
                        )}
                        {/* 텍스트 - 30자, 줄바꿈 1회 허용 */}
                        <div className="relative">
                          <textarea value={item.text} onChange={(e) => updateWlItemText(item.id, e.target.value)}
                            placeholder={item.product ? item.product.name : `리스트${idx+2} 문구 입력 (최대 30자, 줄바꿈 1회 가능)`}
                            rows={2}
                            className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 pb-5 text-sm focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                          <span className="absolute bottom-2 right-3 text-xs tabular-nums text-gray-400">{item.text.length}/30</span>
                        </div>
                      </div>
                    ))}

                    {/* 리스트 추가 버튼 */}
                    {wlExtraItems.length < 4 && (
                      <button onClick={addWlItem}
                        className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-medium text-gray-400 hover:border-[#4DB87A] hover:text-[#4DB87A] transition-all">
                        <span className="text-base font-bold">+</span> 리스트 추가
                      </button>
                    )}
                  </div>
                </section>

                {/* WL-C: 버튼 (최대 2개) */}
                <section className="relative overflow-visible rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">버튼</h2>
                  <div className="space-y-4">
                    {/* 버튼 1 */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
                      <p className="text-xs font-semibold text-gray-500">버튼 1</p>
                      <div className="relative">
                        <input type="text" value={wlBtn1} onChange={(e) => setWlBtn1(e.target.value.slice(0, 8))} placeholder="버튼 텍스트 입력"
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-14 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums text-gray-400">{wlBtn1.length}/8</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/></svg>
                        </span>
                        <input type="url" value={wlBtn1Link} onChange={(e) => setWlBtn1Link(e.target.value)} placeholder="https://example.com"
                          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                      </div>
                    </div>

                    {/* 버튼 2 */}
                    {wlShowBtn2 ? (
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-gray-500">버튼 2</p>
                          <button onClick={() => { setWlShowBtn2(false); setWlBtn2(''); setWlBtn2Link(''); }} className="text-xs text-gray-400 hover:text-red-500 transition-colors">삭제</button>
                        </div>
                        <div className="relative">
                          <input type="text" value={wlBtn2} onChange={(e) => setWlBtn2(e.target.value.slice(0, 8))} placeholder="버튼 텍스트 입력"
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-14 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums text-gray-400">{wlBtn2.length}/8</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/></svg>
                          </span>
                          <input type="url" value={wlBtn2Link} onChange={(e) => setWlBtn2Link(e.target.value)} placeholder="https://example.com"
                            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setWlShowBtn2(true)} className="flex items-center gap-1 text-sm font-medium text-[#4DB87A] hover:underline transition-colors">
                        <span className="text-base font-bold">+</span> 버튼 추가
                      </button>
                    )}
                  </div>
                </section>

              </>
            )}

            {/* ── 캐러셀 피드 전용 섹션 ── */}
            {messageType === 'carousel' && (
              <>
                {/* 슬라이드 탭 */}
                <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400">
                        캐러셀 슬라이드 <span className="text-red-500">*</span>
                      </h2>
                      <p className="mt-0.5 text-xs text-gray-400">최소 2장 · 최대 6장</p>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                      총 <span className="text-[#4DB87A]">{carouselItems.length}</span> / 6장
                    </span>
                  </div>

                  {/* 슬라이드 탭 네비게이션 */}
                  <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
                    {carouselItems.map((item, idx) => (
                      <button key={item.id} onClick={() => setCarouselActiveIdx(idx)}
                        className={`shrink-0 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${carouselActiveIdx === idx ? 'bg-[#4DB87A] text-white' : 'border border-gray-200 bg-gray-50 text-gray-500 hover:border-[#4DB87A] hover:text-[#4DB87A]'}`}>
                        슬라이드 {idx + 1}
                      </button>
                    ))}
                    {carouselItems.length < 6 && (
                      <button onClick={addCarouselItem}
                        className="shrink-0 rounded-lg border-2 border-dashed border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-400 hover:border-[#4DB87A] hover:text-[#4DB87A] transition-all">
                        + 추가
                      </button>
                    )}
                  </div>

                  {/* 활성 슬라이드 편집 */}
                  {carouselItems.map((item, idx) => idx !== carouselActiveIdx ? null : (
                    <div key={item.id} className="space-y-5">
                      {/* 슬라이드 헤더 */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">슬라이드 {idx + 1}</span>
                        {carouselItems.length > 2 && (
                          <button onClick={() => removeCarouselItem(item.id)}
                            className="text-xs text-gray-400 hover:text-red-500 transition-colors">슬라이드 삭제</button>
                        )}
                      </div>

                      {/* 상품 선택 */}
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <p className="text-xs font-medium text-gray-500">상품 <span className="text-red-500">*</span></p>
                          <button
                            onClick={() => openProductModal(`carousel-${item.id}`)}
                            className="ml-auto rounded-lg border border-[#4DB87A] px-3 py-1 text-[10px] font-semibold text-[#4DB87A] hover:bg-[#f0f9f4] active:scale-95 transition-all"
                          >
                            상품 선택
                          </button>
                        </div>
                        {item.product ? (
                          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-400">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l4-4 4 4 3-3 4 4"/><circle cx="8.5" cy="9.5" r="1.5"/></svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="truncate text-xs font-semibold text-gray-900">{item.product.name}</div>
                              <div className="text-xs font-bold text-[#4DB87A]">{item.product.price}</div>
                            </div>
                            <button onClick={() => updateCarousel(item.id, { product: null })} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors">
                              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-3.5 w-3.5"><path d="M3 3l10 10M13 3L3 13"/></svg>
                            </button>
                          </div>
                        ) : (
                          <div className="rounded-lg border-2 border-dashed border-gray-200 py-5 text-center text-xs text-gray-400">
                            상품 선택 버튼을 눌러 상품을 추가하세요
                          </div>
                        )}
                      </div>

                      {/* 헤더 */}
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-gray-500">헤더 <span className="text-red-500">*</span></p>
                        <p className="mb-2 text-[10px] text-gray-400">띄어쓰기 포함 20자 제한 · 줄바꿈 불가</p>
                        <div className="relative">
                          <input type="text" value={item.header}
                            onChange={(e) => updateCarousel(item.id, { header: e.target.value.replace(/\n/g, '').slice(0, 20) })}
                            placeholder="헤더 문구를 입력하세요"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-16 text-sm text-gray-900 placeholder-gray-400 focus:border-[#4DB87A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs tabular-nums text-gray-400">{item.header.length}/20</span>
                        </div>
                      </div>

                      {/* 내용 */}
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-gray-500">내용 <span className="text-red-500">*</span></p>
                        <p className="mb-2 text-[10px] text-gray-400">띄어쓰기 포함 180자 제한 · 줄바꿈 최대 10회</p>
                        <div className="relative">
                          <textarea value={item.content} onChange={(e) => updateCarouselContent(item.id, e.target.value)}
                            placeholder="내용을 입력하세요" rows={5}
                            className={`w-full resize-none rounded-xl border bg-gray-50 px-4 py-3 pb-8 text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 transition-all ${item.content.length > 160 ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-[#4DB87A] focus:ring-[#4DB87A]/20'}`} />
                          <span className={`absolute bottom-3 right-4 text-xs tabular-nums ${item.content.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>{item.content.length}/180</span>
                        </div>
                      </div>

                      {/* 버튼 */}
                      <div>
                        <p className="mb-3 text-xs font-medium text-gray-500">버튼 <span className="text-[10px] text-gray-400">(최소 1개 · 최대 2개 · 가로 배열)</span></p>
                        <div className="space-y-3">
                          {/* 버튼 1 */}
                          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
                            <p className="text-xs font-semibold text-gray-500">버튼 1 <span className="text-red-500">*</span></p>
                            <div className="relative">
                              <input type="text" value={item.btn1} onChange={(e) => updateCarousel(item.id, { btn1: e.target.value.slice(0, 8) })} placeholder="버튼 텍스트 입력"
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-14 text-sm placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums text-gray-400">{item.btn1.length}/8</span>
                            </div>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/></svg>
                              </span>
                              <input type="url" value={item.btn1Link} onChange={(e) => updateCarousel(item.id, { btn1Link: e.target.value })} placeholder="https://example.com"
                                className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-8 pr-3 text-sm placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                            </div>
                          </div>
                          {/* 버튼 2 */}
                          {item.showBtn2 ? (
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold text-gray-500">버튼 2</p>
                                <button onClick={() => updateCarousel(item.id, { showBtn2: false, btn2: '', btn2Link: '' })} className="text-xs text-gray-400 hover:text-red-500 transition-colors">삭제</button>
                              </div>
                              <div className="relative">
                                <input type="text" value={item.btn2} onChange={(e) => updateCarousel(item.id, { btn2: e.target.value.slice(0, 8) })} placeholder="버튼 텍스트 입력"
                                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-14 text-sm placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums text-gray-400">{item.btn2.length}/8</span>
                              </div>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5"><path d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"/></svg>
                                </span>
                                <input type="url" value={item.btn2Link} onChange={(e) => updateCarousel(item.id, { btn2Link: e.target.value })} placeholder="https://example.com"
                                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-8 pr-3 text-sm placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none focus:ring-1 focus:ring-[#4DB87A] transition-all" />
                              </div>
                            </div>
                          ) : (
                            <button onClick={() => updateCarousel(item.id, { showBtn2: true })} className="flex items-center gap-1 text-sm font-medium text-[#4DB87A] hover:underline transition-colors">
                              <span className="text-base font-bold">+</span> 버튼 추가
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </section>
              </>
            )}

            {/* 섹션 7: 발송 설정 */}
            <section className="relative overflow-visible rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <Bubble n={4} />
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-400">발송 설정</h2>
              <p className="mb-4 text-xs text-gray-400">오늘 이후 날짜부터 선택 가능합니다.</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500">날짜 <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    value={scheduledDate}
                    min={tomorrow}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-[#4DB87A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-500">시간 <span className="text-red-500">*</span></label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-[#4DB87A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* 섹션 8: 예상 지출 포인트 */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  {/* 보유 / 예상 지출 나란히 */}
                  <div className="mb-4 flex items-stretch gap-3">
                    <div className="flex-1 rounded-xl bg-gray-50 px-4 py-3">
                      <div className="text-xs font-medium text-gray-400">보유 포인트</div>
                      <div className="mt-1 flex items-end gap-0.5">
                        <span className="text-2xl font-black tabular-nums text-gray-800">
                          {CURRENT_POINTS.toLocaleString()}
                        </span>
                        <span className="mb-0.5 text-sm font-bold text-gray-500">P</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 rounded-xl bg-[#f0f9f4] px-4 py-3">
                      <div className="text-xs font-medium text-[#4DB87A]">예상 지출 포인트</div>
                      <div className="mt-1 flex items-end gap-0.5">
                        <span className="text-2xl font-black tabular-nums text-[#4DB87A]">
                          {estimatedPoints.toLocaleString()}
                        </span>
                        <span className="mb-0.5 text-sm font-bold text-[#4DB87A]">P</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      수신자 {selectedSellers.length}명 × 15P (VAT 별도)
                      {CURRENT_POINTS < estimatedPoints && (
                        <span className="ml-2 font-semibold text-red-500">포인트가 부족합니다.</span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChargePopup(true)}
                  className="shrink-0 rounded-xl border-2 border-[#4DB87A] px-6 py-2.5 text-sm font-semibold text-[#4DB87A] hover:bg-[#f0f9f4] active:scale-95 transition-all"
                >
                  충전하기
                </button>
              </div>
            </section>

            {/* 하단 버튼 */}
            <div className="flex items-center justify-between pb-10">
              <Link href="/" className="rounded-xl border-2 border-gray-200 px-8 py-3.5 text-base font-bold text-gray-500 hover:bg-gray-50 active:scale-95 transition-all">
                취소
              </Link>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowTestSendPopup(true)}
                  className="rounded-xl border-2 border-[#4DB87A] px-8 py-3.5 text-base font-bold text-[#4DB87A] hover:bg-[#f0f9f4] active:scale-95 transition-all"
                >
                  테스트 발송
                </button>
                <button className="rounded-xl bg-[#4DB87A] px-12 py-3.5 text-base font-bold text-white shadow-md shadow-[#4DB87A]/30 hover:bg-[#3da869] active:scale-95 transition-all">
                  발송하기
                </button>
              </div>
            </div>
          </div>

          {/* ───── 중앙 미리보기 ───── */}
          <div className="sticky top-[73px] h-fit">
            <div className="relative overflow-visible rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <Bubble n={5} />
              <div className="mb-4 flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#4DB87A]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">미리보기</h3>
                <div className="h-1.5 w-1.5 rounded-full bg-[#4DB87A]" />
              </div>

              {/* 폰 프레임 */}
              <div className="mx-auto w-[220px]">
                <div className="relative rounded-[40px] border-[7px] border-gray-800 bg-gray-900 shadow-2xl">
                  {/* 사이드 버튼 */}
                  <div className="absolute -right-[9px] top-20 h-12 w-[5px] rounded-r bg-gray-700" />
                  <div className="absolute -left-[9px] top-16 h-8 w-[5px] rounded-l bg-gray-700" />
                  <div className="absolute -left-[9px] top-28 h-8 w-[5px] rounded-l bg-gray-700" />

                  {/* 스크린 */}
                  <div className="overflow-hidden rounded-[33px] bg-[#b2c7d9]">
                    {/* 다이나믹 아일랜드 */}
                    <div className="flex justify-center pt-3 pb-1">
                      <div className="h-5 w-[72px] rounded-full bg-gray-900" />
                    </div>

                    {/* 상태바 */}
                    <div className="flex items-center justify-between px-5 pb-1 text-[9px] font-semibold text-gray-700">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <svg viewBox="0 0 16 12" fill="currentColor" className="h-2.5 w-3">
                          <rect x="0" y="3" width="3" height="9" rx="0.5" />
                          <rect x="4.5" y="2" width="3" height="10" rx="0.5" />
                          <rect x="9" y="0.5" width="3" height="11.5" rx="0.5" />
                          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.3" />
                        </svg>
                        <svg viewBox="0 0 16 12" fill="currentColor" className="h-2.5 w-3.5">
                          <path d="M8 2.5C10.5 2.5 12.7 3.6 14.2 5.3L15.5 4C13.6 2 11 1 8 1S2.4 2 0.5 4L1.8 5.3C3.3 3.6 5.5 2.5 8 2.5z" />
                          <path d="M8 5C9.7 5 11.2 5.7 12.3 6.9L13.6 5.6C12.1 4.1 10.2 3 8 3S3.9 4.1 2.4 5.6L3.7 6.9C4.8 5.7 6.3 5 8 5z" />
                          <circle cx="8" cy="10" r="1.5" />
                        </svg>
                        <div className="flex items-center gap-0.5">
                          <div className="h-2 w-4 rounded-sm border border-gray-600 p-px">
                            <div className="h-full w-3/4 rounded-[1px] bg-gray-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 채팅방 헤더 */}
                    <div className="flex items-center gap-2 bg-[#8ba9be]/80 px-3 py-2 backdrop-blur-sm">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gray-700">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#fee500] text-[7px] font-black text-gray-800">K</div>
                      <span className="flex-1 text-[10px] font-bold text-gray-800">발주모아</span>
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gray-600">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </div>

                    {/* 채팅 영역 */}
                    <div className="min-h-[380px] bg-[#bacee0] p-3 pb-4">
                      {/* 날짜 구분선 */}
                      <div className="mb-3 flex items-center gap-2">
                        <div className="h-px flex-1 bg-[#99b5ca]/50" />
                        <span className="text-[7px] text-[#607d8b]">오늘</span>
                        <div className="h-px flex-1 bg-[#99b5ca]/50" />
                      </div>

                      {/* (광고) 발주모아 */}
                      {messageType && (
                        <div className="mb-1.5 text-[7px] text-[#607d8b]">(광고) 발주모아</div>
                      )}

                      {/* ── 캐러셀 피드: 아바타 없이 전체 너비 슬라이더 ── */}
                      {messageType === 'carousel' && (() => {
                        const activeSlide = carouselItems[carouselActiveIdx];
                        const nextSlide = carouselItems[carouselActiveIdx + 1] ?? null;
                        if (!activeSlide) return null;
                        return (
                          <div>
                            {/* overflow-hidden이 peek을 클리핑 — 전체 채팅 너비 사용 */}
                            <div className="overflow-hidden rounded-2xl">
                              <div className="flex gap-2">
                                {/* 활성 카드: 전체 너비의 82% */}
                                <div className="shrink-0 overflow-hidden rounded-2xl bg-white shadow-md" style={{ width: '82%' }}>
                                  {/* 이미지 */}
                                  <div className="aspect-[2/1] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                                    {activeSlide.product ? (
                                      <div className="flex flex-col items-center gap-0.5 px-2 text-center">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.5} className="h-6 w-6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l4-4 4 4 3-3 4 4"/><circle cx="8.5" cy="9.5" r="1.5"/></svg>
                                        <span className="text-[6px] text-gray-400 leading-tight line-clamp-2 mt-0.5">{activeSlide.product.name}</span>
                                      </div>
                                    ) : (
                                      <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.5} className="h-7 w-7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l4-4 4 4 3-3 4 4"/><circle cx="8.5" cy="9.5" r="1.5"/></svg>
                                    )}
                                  </div>
                                  {/* 헤더 */}
                                  {activeSlide.header
                                    ? <div className="px-2.5 pt-2 pb-0.5"><p className="text-[8px] font-bold text-gray-900 leading-tight">{activeSlide.header}</p></div>
                                    : <div className="px-2.5 pt-2 pb-0.5"><p className="text-[8px] text-gray-300">헤더 문구</p></div>}
                                  {/* 내용 */}
                                  <div className="px-2.5 pb-1.5">
                                    <p className="text-[7px] leading-snug text-gray-700 whitespace-pre-wrap break-words line-clamp-3">
                                      {activeSlide.content || <span className="text-gray-300">내용을 입력하세요</span>}
                                    </p>
                                  </div>
                                  {/* 버튼 */}
                                  <div className={`flex border-t border-gray-100 ${activeSlide.btn1 && activeSlide.btn2 ? 'divide-x divide-gray-100' : ''}`}>
                                    {activeSlide.btn1
                                      ? <div className="flex-1 py-1.5 text-center text-[7px] font-semibold text-gray-600">{activeSlide.btn1}</div>
                                      : <div className="flex-1 py-1.5 text-center text-[7px] text-gray-300">버튼1</div>}
                                    {activeSlide.btn2 && (
                                      <div className="flex-1 py-1.5 text-center text-[7px] font-semibold text-gray-600">{activeSlide.btn2}</div>
                                    )}
                                  </div>
                                </div>
                                {/* 다음 카드 peek: 나머지 너비(약 18%)에 꽉 찬 카드 — overflow-hidden으로 클리핑 */}
                                <div className="flex-1 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm opacity-75">
                                  <div className="aspect-[2/1] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                    {nextSlide?.product
                                      ? <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth={1.5} className="h-4 w-4"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l4-4 4 4 3-3 4 4"/></svg>
                                      : <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth={1.5} className="h-4 w-4"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l4-4 4 4 3-3 4 4"/></svg>}
                                  </div>
                                  <div className="px-1.5 pt-1.5 pb-1">
                                    <div className="h-1.5 w-8 rounded bg-gray-200 mb-1" />
                                    <div className="h-1 w-10 rounded bg-gray-100" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* 슬라이드 인디케이터 도트 */}
                            <div className="flex justify-center gap-1 pt-2">
                              {carouselItems.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all ${i === carouselActiveIdx ? 'w-4 bg-gray-700' : 'w-1.5 bg-gray-400/50'}`} />
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {/* ── 와이드 이미지 / 와이드 리스트: K 아바타 + 버블 ── */}
                      {messageType !== 'carousel' && (
                      <div className="flex items-start gap-1.5">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fee500] text-[7px] font-black text-gray-800 shadow-sm">K</div>
                        <div className="flex-1 max-w-[88%]">
                          <div className="overflow-hidden rounded-2xl rounded-tl-none bg-white shadow-md">

                            {/* 와이드 리스트 헤더 (이미지 위) */}
                            {messageType === 'wide-list' && wlHeader && (
                              <div className="border-b border-gray-100 px-2.5 py-1.5">
                                <p className="text-[8px] font-bold text-gray-900">{wlHeader}</p>
                              </div>
                            )}

                            {/* 이미지 영역 (2:1 비율) */}
                            <div className="aspect-[2/1] relative overflow-hidden bg-gray-100">
                              {messageType ? (
                                <div className="flex h-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-gray-200 to-gray-300">
                                  {messageType === 'wide-image' && (
                                    <>
                                      <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.5} className="h-8 w-8">
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <path d="M3 15l4-4 4 4 3-3 4 4" />
                                        <circle cx="8.5" cy="9.5" r="1.5" />
                                      </svg>
                                      <span className="text-[8px] text-gray-400">와이드 이미지</span>
                                    </>
                                  )}
                                  {messageType === 'wide-list' && (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                      {wlList1Product ? (
                                        <div className="flex flex-col items-center gap-0.5">
                                          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.5} className="h-6 w-6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l4-4 4 4 3-3 4 4"/><circle cx="8.5" cy="9.5" r="1.5"/></svg>
                                          <span className="text-[7px] text-gray-400 text-center px-2 leading-tight">{wlList1Product.name}</span>
                                        </div>
                                      ) : (
                                        <span className="text-[8px] text-gray-400">리스트1 상품 이미지</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="flex h-full items-center justify-center bg-gray-100">
                                  <span className="text-[8px] text-gray-400">메시지 타입을 선택하세요</span>
                                </div>
                              )}
                            </div>

                            {/* ── 와이드 이미지 본문 ── */}
                            {messageType === 'wide-image' && (
                              <>
                                {selectedProduct && (
                                  <div className="border-b border-gray-100 px-2.5 py-2">
                                    <div className="text-[8px] font-semibold leading-tight text-gray-900">{selectedProduct.name}</div>
                                    <div className="mt-0.5 text-[8px] font-bold text-[#4DB87A]">{selectedProduct.price}</div>
                                  </div>
                                )}
                                <div className="px-2.5 py-2">
                                  <p className="text-[8px] leading-snug text-gray-800 whitespace-pre-wrap break-words">
                                    {content || <span className="text-gray-400">메시지 내용이 여기에 표시됩니다.</span>}
                                  </p>
                                </div>
                                {(button1 || button2) && (
                                  <div className="border-t border-gray-100">
                                    {button1 && <div className="bg-[#fee500] py-1.5 text-center text-[8px] font-bold text-gray-800">{button1}</div>}
                                    {button2 && <div className="border-t border-gray-100 bg-white py-1.5 text-center text-[8px] font-medium text-gray-600">{button2}</div>}
                                  </div>
                                )}
                              </>
                            )}

                            {/* ── 와이드 리스트 본문 ── */}
                            {messageType === 'wide-list' && (
                              <>
                                {wlList1Text && (
                                  <div className="border-b border-gray-100 px-2.5 py-1">
                                    <p className="text-[7px] text-gray-700 leading-snug">{wlList1Text}</p>
                                  </div>
                                )}
                                <div className="divide-y divide-gray-50">
                                  {wlExtraItems.map((item, idx) => (
                                    <div key={item.id} className="flex items-center gap-1.5 px-2 py-1.5">
                                      <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-200 text-gray-400">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 15l4-4 4 4 3-3 4 4"/></svg>
                                      </div>
                                      <p className="text-[7px] leading-snug text-gray-700 line-clamp-2 whitespace-pre-wrap">
                                        {item.text || (item.product ? item.product.name : <span className="text-gray-400">리스트{idx+2} 문구</span>)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                {(wlBtn1 || wlBtn2) && (
                                  <div className="flex border-t border-gray-100">
                                    {wlBtn1 && <div className={`flex-1 py-1.5 text-center text-[8px] font-bold text-gray-800 bg-[#fee500] ${wlBtn2 ? 'border-r border-gray-200' : ''}`}>{wlBtn1}</div>}
                                    {wlBtn2 && <div className="flex-1 py-1.5 text-center text-[8px] font-medium text-gray-600 bg-white">{wlBtn2}</div>}
                                  </div>
                                )}
                              </>
                            )}

                          </div>
                        </div>
                        </div>
                        )}
                      {/* 수신거부 / 채널차단 */}
                      {messageType && (
                        <div className="mt-1.5 flex flex-col gap-0.5 px-0.5">
                          <span className="text-[6px] text-[#607d8b]">수신거부 | 홈 &gt; 채널차단</span>
                          <span className="text-[6px] text-[#607d8b]">오전 9:00</span>
                        </div>
                      )}
                    </div>

                    {/* 하단 입력바 */}
                    <div className="flex items-center gap-2 bg-white px-3 py-2">
                      <div className="flex-1 rounded-full bg-gray-100 px-3 py-1">
                        <span className="text-[8px] text-gray-400">메시지 입력</span>
                      </div>
                      <div className="h-5 w-5 rounded-full bg-[#fee500] flex items-center justify-center">
                        <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="#333" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 캠페인명 표시 */}
              {campaignName && (
                <div className="mt-4 rounded-xl bg-[#f0f9f4] px-4 py-3 text-center">
                  <div className="text-[10px] font-medium text-[#4DB87A] uppercase tracking-wider">캠페인명</div>
                  <div className="mt-0.5 truncate text-sm font-semibold text-gray-800">{campaignName}</div>
                </div>
              )}

              {/* 발송 예약 정보 */}
              {scheduledDate && (
                <div className="mt-2 rounded-xl bg-amber-50 px-4 py-3 text-center ring-1 ring-amber-200">
                  <div className="text-[10px] font-medium uppercase tracking-wider text-amber-600">발송 예정</div>
                  <div className="mt-0.5 text-sm font-semibold text-gray-800">
                    {scheduledDate} {scheduledTime}
                  </div>
                </div>
              )}
            </div>
          </div>


        </div>
      </div>
    </div>
    </>
  );
}
