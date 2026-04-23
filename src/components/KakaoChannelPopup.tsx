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
  const [category1] = useState('소매(쇼핑몰)');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* 헤더 */}
        <div className="flex items-center gap-3 bg-[#2d3748] px-6 py-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 text-white">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" strokeLinecap="round" />
          </svg>
          <h2 className="text-base font-bold text-white">
            {step === 1 ? '카카오톡 채널 등록' : '톡채널(플러스친구) 등록 요청'}
          </h2>
        </div>

        {/* ── STEP 1: 개인정보 제3자 제공 동의 ── */}
        {step === 1 && (
          <div className="px-6 py-5 space-y-4">
            <p className="text-sm text-[#4DB87A]">
              · 아래의 개인정보 제3자 제공에 동의하셔야만 서비스 이용이 가능합니다.
            </p>

            {/* 동의 내용 박스 */}
            <div className="rounded-xl bg-gray-50 px-5 py-4 space-y-2.5">
              <p className="text-sm font-bold text-gray-800">개인정보 제3자 제공 동의</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="text-gray-500">· 제공 받은 자 : </span>롯데이노베이트
                </p>
                <p>
                  <span className="text-gray-500">· 제공 받는 자의 이용 목적 : </span>
                  <span>제공 받는 자의 이용 목적 : 문자메시지 발송, </span>
                  <span className="font-semibold text-gray-800">카카오톡 알림톡(정보성 메시지) 및 브랜드메시지(친구톡) 발송 업무</span>
                </p>
                <p>
                  <span className="text-gray-500">· 제공하는 항목 : </span>
                  <span className="font-semibold text-gray-800">회사명, 아이디, 이름, 연락처</span>
                </p>
                <p>
                  <span className="text-gray-500">· 제공받는 자의 보유 및 이용기간 : </span>
                  <span className="font-semibold text-gray-800">회원탈퇴 및 이용계약 종료시까지</span>
                </p>
              </div>
            </div>

            {/* 동의 체크박스 */}
            <label className="flex cursor-pointer items-center justify-center gap-2 py-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 accent-[#4DB87A]"
              />
              <span className="text-sm text-gray-600">개인정보 제3자 제공에 동의합니다.</span>
            </label>

            {/* 버튼 */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl bg-[#4b5563] py-3 text-sm font-bold text-white hover:bg-[#374151] transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!agreed}
                className="flex-1 rounded-xl bg-[#374151] py-3 text-sm font-bold text-white hover:bg-[#1f2937] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: 톡채널 등록 요청 ── */}
        {step === 2 && (
          <div className="px-6 py-5 space-y-4">
            {/* 폼 */}
            <div className="rounded-xl border border-gray-200 divide-y divide-gray-100">

              {/* 검색용 아이디 */}
              <div className="flex items-center px-4 py-3 gap-4">
                <span className="w-48 shrink-0 text-sm text-gray-600">톡채널 (플러스친구) 검색용 아이디</span>
                <input
                  type="text"
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  placeholder="검색용 아이디 입력 (예: @weedsoft)"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none"
                />
              </div>

              {/* 채널명 */}
              <div className="flex items-center px-4 py-3 gap-4">
                <span className="w-48 shrink-0 text-sm text-gray-600">채널명</span>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="채널명 입력 (예: 위드소프트)"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none"
                />
              </div>

              {/* 핸드폰 번호 */}
              <div className="flex items-center px-4 py-3 gap-4">
                <span className="w-48 shrink-0 text-sm text-gray-600">핸드폰 번호</span>
                <div className="flex flex-1 gap-2">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="핸드폰 번호 입력"
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none"
                  />
                  <button className="shrink-0 rounded-lg bg-[#4b5563] px-3 py-2 text-xs font-bold text-white hover:bg-[#374151] transition-colors whitespace-nowrap">
                    인증번호 전송
                  </button>
                </div>
              </div>

              {/* 인증번호 */}
              <div className="flex items-center px-4 py-3 gap-4">
                <span className="w-48 shrink-0 text-sm text-gray-600">인증번호</span>
                <input
                  type="text"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  placeholder="인증번호 입력"
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:border-[#4DB87A] focus:outline-none"
                />
              </div>

              {/* 카테고리 */}
              <div className="flex items-center px-4 py-3 gap-4">
                <span className="w-48 shrink-0 text-sm text-gray-600">카테고리</span>
                <div className="flex flex-1 gap-2">
                  <select className="flex-1 rounded-lg border border-gray-200 px-2 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none">
                    <option>{category1}</option>
                    <option>도소매</option>
                    <option>서비스</option>
                  </select>
                  <select className="flex-1 rounded-lg border border-gray-200 px-2 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none">
                    <option>중분류</option>
                    <option>패션/의류</option>
                    <option>생활/건강</option>
                  </select>
                  <select className="flex-1 rounded-lg border border-gray-200 px-2 py-2 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none">
                    <option>소분류</option>
                    <option>여성의류</option>
                    <option>남성의류</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 등록하기 버튼 */}
            <div className="flex justify-center">
              <button className="rounded-xl bg-[#4b5563] px-10 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors">
                등록하기
              </button>
            </div>

            {/* 안내 문구 */}
            <div className="space-y-1.5 text-xs text-[#4DB87A]">
              {[
                '사전에 톡채널(플러스친구)가 생성되어 있어야 하며, 톡채널(플러스친구) 관리자센터에서 "비즈니스 인증"을 받아야 합니다.',
                '톡채널(플러스친구) 관리자센터에서 톡채널(플러스친구) 홍공개 상태가 ON인지 확인해 주세요.',
                '톡채널(플러스친구)는 프로필 activated 상태이고 운영자에 의해 차단되지 않은 정상 상태여야 등록 가능합니다.',
                '톡채널(플러스친구) 관리자센터에 등록된 관리자 휴대폰 번호로만 인증이 가능합니다.',
              ].map((text, i) => (
                <p key={i}>· {text}</p>
              ))}
            </div>

            {/* 닫기 버튼 */}
            <div className="flex justify-center pt-1">
              <button
                onClick={onClose}
                className="rounded-xl bg-[#4b5563] px-16 py-2.5 text-sm font-bold text-white hover:bg-[#374151] transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
