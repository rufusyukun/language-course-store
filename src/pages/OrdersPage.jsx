import TopBar from '../components/TopBar';
import { formatPrice } from '../data/courses';

export default function OrdersPage({ order, openOrder }) {
  return (
    <>
      <TopBar title="我的订单" />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        {!order ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl text-slate-300">▣</div>
            <div className="mt-4 font-black text-slate-700">暂无订单</div>
            <p className="mt-2 text-sm text-slate-400">购买课程后，这里会显示自动分配的课程资料。</p>
          </div>
        ) : (
          <button onClick={openOrder} className="w-full rounded-3xl bg-white p-4 text-left shadow-sm">
            <div className="flex gap-3"><img src={order.course.cover} alt="" className="h-20 w-20 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="truncate font-black">{order.course.title}</div><div className="mt-1 text-sm text-slate-500">订单号：{order.orderNo}</div><div className="mt-2 flex items-center justify-between"><span className="text-sm text-emerald-600">已发货</span><span className="font-black text-rose-500">{formatPrice(order.amount)}</span></div></div></div>
          </button>
        )}
      </main>
    </>
  );
}
