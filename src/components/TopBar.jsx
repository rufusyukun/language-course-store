export default function TopBar({ title, canBack, onBack }) {
  return (
    <div className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-md items-center justify-center px-4">
        {canBack && (
          <button onClick={onBack} className="absolute left-4 text-3xl leading-none" aria-label="返回 / Back">
            ‹
          </button>
        )}
        <div className="text-lg font-black tracking-tight">{title}</div>
      </div>
    </div>
  );
}
