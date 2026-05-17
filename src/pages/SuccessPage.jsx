import Button from '../components/Button';
import TopBar from '../components/TopBar';

export default function SuccessPage({ order, viewOrder, goHome }) {
  if (!order) return null;

  return (
    <>
      <TopBar title="支付结果" />
      <main className="mx-auto min-h-screen max-w-md bg-white px-6 pt-24 text-center">
        <div className="mx-auto flex h-28 w-28 animate-pulse items-center justify-center rounded-full bg-rose-500 text-6xl text-white shadow-xl shadow-rose-200">✓</div>
        <h1 className="mt-7 text-3xl font-black">支付成功</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">课程资料已自动生成。请进入订单详情页，截图保存订单交付证明、账号、密码、下载链接和取货码。</p>
        <div className="mt-7 rounded-3xl bg-slate-50 p-4 text-left">
          <div className="flex justify-between text-sm"><span className="text-slate-500">订单号</span><span className="font-bold">{order.orderNo}</span></div>
          <div className="mt-3 flex justify-between text-sm"><span className="text-slate-500">取货码</span><span className="font-bold text-rose-500">{order.pickupCode}</span></div>
          <div className="mt-3 flex justify-between text-sm"><span className="text-slate-500">交付状态</span><span className="font-bold text-emerald-600">已自动交付</span></div>
        </div>
        <div className="mt-4 rounded-3xl bg-amber-50 p-4 text-left text-sm leading-6 text-amber-800">订单详情页会保留课程名称、订单金额、支付时间、交付状态和售后邮箱，用于订单查询、补发、退款核验和支付服务商争议处理。</div>
        <Button onClick={viewOrder} className="mt-8 w-full text-base">查看订单资料</Button>
        <Button variant="outline" onClick={goHome} className="mt-3 w-full text-base">返回首页</Button>
      </main>
    </>
  );
}
