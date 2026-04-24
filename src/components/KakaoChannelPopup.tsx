'use client';

import { useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function KakaoChannelPopup({ onClose }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [agreed, setAgreed] = useState(false);
  const [channelId, setChannelId] = useState('');
  const [channelName, setChannelName] = useState('');
  const [phone, setPhone] = useState('');
  const [authCode, setAuthCode] = useState('');

  const CloseBtn = () => (
    <button
      onClick={onClose}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
    >
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L8 6.586l2.293-2.293a1 1 0 111.414 1.414L9.414 8l2.293 2.293a1 1 0 01-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 01-1.414-1.414L6.586 8 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <>
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-base font-bold text-gray-900">카카오톡 채널 등록</h2>
              <CloseBtn />
            </div>

            <div className="px-6 py-5 space-y-5">
              <p className="text-sm text-gray-500">
                · 아래의 개인정보 제3자 제공에 동의하셔야만 서비스 이용이 가능합니다.
              </p>

              {/* 동의 내용 박스 */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 space-y-3">
                <p className="text-sm font-bold text-gray-800">개인정보 제3자 제공 동의</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="text-gray-400">· 제공 받은 자 : </span>롯데이노베이트</p>
                  <p>
                    <span className="text-gray-400">· 제공 받는 자의 이용 목적 : </span>
                    문자메시지 발송,{' '}
                    <span className="font-semibold text-gray-800">브랜드메시지 발송 업무</span>
                  </p>
                  <p>
                    <span className="text-gray-400">· 제공하는 항목 : </span>
                    <span className="font-semibold text-gray-800">회사명, 아이디, 이름, 연락처</span>
                  </p>
                  <p>
                    <span className="text-gray-400">· 제공받는 자의 보유 및 이용기간 : </span>
                    <span className="font-semibold text-gray-800">회원탈퇴 및 이용계약 종료시까지</span>
                  </p>
                </div>
              </div>

              {/* 동의 체크박스 */}
              <label className="flex cursor-pointer items-center justify-center gap-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 accent-[#4DB87A]"
                />
                <span className="text-sm text-gray-600">개인정보 제3자 제공에 동의합니다.</span>
              </label>

              {/* 버튼 */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!agreed}
                  className="flex-1 rounded-xl bg-[#4DB87A] py-3 text-sm font-bold text-white hover:bg-[#3da869] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  다음
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <>
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-base font-bold text-gray-900">톡채널(플러스친구) 등록 요청</h2>
              <CloseBtn />
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* 폼 */}
              <div className="space-y-3">

                {/* 검색용 아이디 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">톡채널 (플러스친구) 검색용 아이디</label>
                  <input
                    type="text"
                    value={channelId}
                    onChange={(e) => setChannelId(e.target.value)}
                    placeholder="검색용 아이디 입력 (예: @weedsoft)"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                  />
                </div>

                {/* 채널명 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">채널명</label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="채널명 입력 (예: 위드소프트)"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                  />
                </div>

                {/* 핸드폰 번호 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">핸드폰 번호</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="핸드폰 번호 입력"
                      className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                    />
                    <button className="shrink-0 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                      인증번호 전송
                    </button>
                  </div>
                </div>

                {/* 인증번호 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">인증번호</label>
                  <input
                    type="text"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    placeholder="인증번호 입력"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                  />
                </div>

                {/* 카테고리 */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">카테고리</label>
                  <div className="flex gap-2">
                    {[
                      { placeholder: '소매(쇼핑몰)', options: ['소매(쇼핑몰)', '도소매', '서비스'] },
                      { placeholder: '중분류', options: ['중분류', '패션/의류', '생활/건강'] },
                      { placeholder: '소분류', options: ['소분류', '여성의류', '남성의류'] },
                    ].map((sel) => (
                      <select
                        key={sel.placeholder}
                        defaultValue={sel.placeholder}
                        className="flex-1 rounded-xl border border-gray-200 px-3 py-3 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
                      >
                        {sel.options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    ))}
                  </div>
                </div>
              </div>

              {/* 등록하기 버튼 */}
              <button className="w-full rounded-xl bg-[#4DB87A] py-3 text-sm font-bold text-white hover:bg-[#3da869] transition-colors">
                등록하기
              </button>

              {/* 안내 문구 */}
              <div className="space-y-1.5 rounded-xl bg-gray-50 px-4 py-3">
                {[
                  '사전에 톡채널(플러스친구)가 생성되어 있어야 하며, 톡채널(플러스친구) 관리자센터에서 "비즈니스 인증"을 받아야 합니다.',
                  '톡채널(플러스친구) 관리자센터에서 톡채널(플러스친구) 홍공개 상태가 ON인지 확인해 주세요.',
                  '톡채널(플러스친구)는 프로필 activated 상태이고 운영자에 의해 차단되지 않은 정상 상태여야 등록 가능합니다.',
                  '톡채널(플러스친구) 관리자센터에 등록된 관리자 휴대폰 번호로만 인증이 가능합니다.',
                ].map((text, i) => (
                  <p key={i} className="text-xs text-gray-500">· {text}</p>
                ))}
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={onClose}
                className="w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
