export default function Button({ children, onClick, variant = 'primary', className = '' }) {
  const base = 'h-12 rounded-2xl px-4 text-sm font-bold transition active:scale-95';
  const style = variant === 'primary'
    ? 'bg-gradient-to-r from-orange-400 to-rose-500 text-white shadow-lg shadow-rose-200'
    : 'border border-slate-200 bg-white text-slate-700';

  return (
    <button onClick={onClick} className={`${base} ${style} ${className}`}>
      {children}
    </button>
  );
}
