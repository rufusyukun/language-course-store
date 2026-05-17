import { formatPrice } from '../data/courses';

export default function CourseCard({ course, onOpen }) {
  return (
    <button onClick={() => onOpen(course)} className="overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-slate-100 transition active:scale-[0.98]">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={course.cover} alt="" className="h-full w-full object-cover" />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-rose-500 shadow-sm">{course.tag}</span>
      </div>
      <div className="p-3">
        <div className="truncate text-base font-bold text-slate-900">{course.title}</div>
        <div className="mt-1 truncate text-sm text-slate-500">{course.subtitle}</div>
        <div className="mt-3 flex items-end justify-between">
          <div className="text-xl font-black text-rose-500">{formatPrice(course.price)}</div>
          <div className="text-xs text-slate-400">自动发货</div>
        </div>
      </div>
    </button>
  );
}
