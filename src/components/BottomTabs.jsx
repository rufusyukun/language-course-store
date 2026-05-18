const tabs = [
  { key: 'home', label: '首页', icon: '⌂' },
  { key: 'category', label: '分类', icon: '▦' },
  { key: 'orders', label: '订单', icon: '▣' },
  { key: 'mine', label: '我的', icon: '◇' },
];

export default function BottomTabs({ page, go }) {
  return (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="grid h-16 grid-cols-4">
        {tabs.map((tab) => {
          const active = page === tab.key;
          return (
            <button key={tab.key} onClick={() => go(tab.key)} className="flex flex-col items-center justify-center gap-1">
              <span className={`text-2xl leading-none ${active ? 'text-rose-500' : 'text-slate-400'}`}>{tab.icon}</span>
              <span className={`text-xs ${active ? 'font-bold text-rose-500' : 'text-slate-400'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
