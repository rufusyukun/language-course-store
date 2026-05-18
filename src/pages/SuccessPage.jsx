import Button from '../components/Button';
import TopBar from '../components/TopBar';

export default function SuccessPage({ order, viewOrder, goHome }) {
  if (!order) return null;

  const courseAccessUrl = `/course-access?orderNo=${encodeURIComponent(order.orderNo)}`;

  return (
    <>
      <TopBar title="支付结果 / Payment Result" />
      <main className="mx-auto min-h-screen max-w-md bg-white px-6 pt-24 text-center">
        <div className="mx-auto flex h-28 w-28 animate-pulse items-center justify-center rounded-full bg-rose-500 text-5xl font-black text-white shadow-xl shadow-rose-200">✓</div>
        <h1 className="mt-7 text-3xl font-black">支付成功 / Payment Successful</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          课程资料已自动生成。请保存订单凭证、学习账号、学习密码、取货码和课程领取入口。
          Course materials have been generated. Please save your order proof, learning account, password, pickup code, and course access information.
        </p>
        <div className="mt-7 rounded-3xl bg-slate-50 p-4 text-left">
          <div className="flex justify-between gap-4 text-sm"><span className="text-slate-500">订单号 / Order No.</span><span className="break-all text-right font-bold">{order.orderNo}</span></div>
          <div className="mt-3 flex justify-between gap-4 text-sm"><span className="text-slate-500">取货码 / Pickup Code</span><span className="font-bold text-rose-500">{order.pickupCode}</span></div>
          <div className="mt-3 flex justify-between gap-4 text-sm"><span className="text-slate-500">交付状态 / Delivery Status</span><span className="font-bold text-emerald-600">已交付 / Delivered</span></div>
          <div className="mt-3 flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">课程领取中心 / Course Access Center</span>
            <a href={courseAccessUrl} className="text-right font-bold text-rose-500">课程领取中心</a>
          </div>
        </div>
        <div className="mt-4 rounded-3xl bg-amber-50 p-4 text-left text-sm leading-6 text-amber-800">
          订单资料页会保存课程名称、支付金额、支付时间、交付状态和客服信息，用于订单查询、售后补发、退款核查和争议处理。
          The order detail page keeps course name, amount, payment time, delivery status, and support information for order lookup, re-delivery, refund review, and dispute handling.
        </div>
        <Button onClick={viewOrder} className="mt-8 w-full text-base">查看订单资料 / View Order Details</Button>
        <Button variant="outline" onClick={goHome} className="mt-3 w-full text-base">返回首页 / Back Home</Button>
      </main>
    </>
  );
}
