import Button from '../components/Button';
import TopBar from '../components/TopBar';

export default function SuccessPage({ order, viewOrder, goHome }) {
  if (!order) return null;

  const courseAccessUrl = `/course-access?orderNo=${encodeURIComponent(order.orderNo)}`;

  return (
    <>
      <TopBar title="Payment Result" />
      <main className="mx-auto min-h-screen max-w-md bg-white px-6 pt-24 text-center">
        <div className="mx-auto flex h-28 w-28 animate-pulse items-center justify-center rounded-full bg-rose-500 text-5xl font-black text-white shadow-xl shadow-rose-200">✓</div>
        <h1 className="mt-7 text-3xl font-black">Payment Successful</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Course materials have been generated. Please save your order proof, learning account, password, pickup code, and course access information.
        </p>
        <div className="mt-7 rounded-3xl bg-slate-50 p-4 text-left">
          <div className="flex justify-between text-sm"><span className="text-slate-500">Order No.</span><span className="font-bold">{order.orderNo}</span></div>
          <div className="mt-3 flex justify-between text-sm"><span className="text-slate-500">Pickup Code</span><span className="font-bold text-rose-500">{order.pickupCode}</span></div>
          <div className="mt-3 flex justify-between text-sm"><span className="text-slate-500">Delivery Status</span><span className="font-bold text-emerald-600">Delivered</span></div>
          <div className="mt-3 flex items-center justify-between gap-4 text-sm">
            <span className="text-slate-500">课程入口</span>
            <a href={courseAccessUrl} className="font-bold text-rose-500">课程领取中心</a>
          </div>
        </div>
        <div className="mt-4 rounded-3xl bg-amber-50 p-4 text-left text-sm leading-6 text-amber-800">
          The order detail page keeps course name, amount, payment time, delivery status, and support information for order lookup, re-delivery, refund review, and dispute handling.
        </div>
        <Button onClick={viewOrder} className="mt-8 w-full text-base">View Order Details</Button>
        <Button variant="outline" onClick={goHome} className="mt-3 w-full text-base">Back Home</Button>
      </main>
    </>
  );
}
