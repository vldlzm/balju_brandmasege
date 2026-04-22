export default function ScreenIndex() {
  const screens = [
    {
      category: '브랜드 메시지',
      items: [
        { name: '브랜드 메시지 목록', href: '/marketing/brand-message' },
        { name: '새 메시지 만들기', href: '/marketing/brand-message/create' },
        { name: '통계 팝업', href: '/marketing/brand-message/stats' },
        { name: '기본설정', href: '/promotion/settings' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <h1 className="mb-8 text-2xl font-black text-gray-900">화면 목록</h1>
        <div className="space-y-6">
          {screens.map((group) => (
            <div key={group.category} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#4DB87A]">
                {group.category}
              </p>
              <ul className="space-y-2">
                {group.items.map((screen) => (
                  <li key={screen.name}>
                    <a
                      href={screen.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 text-sm font-semibold text-gray-800 transition-all hover:border-[#4DB87A]/30 hover:bg-[#f0faf5] hover:text-[#2a7a4f]"
                    >
                      {screen.name}
                      <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 text-gray-400">
                        <path d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z" />
                        <path d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
