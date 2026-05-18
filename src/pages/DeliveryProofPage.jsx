import Button from '../components/Button';
import TopBar from '../components/TopBar';
import { formatPrice } from '../data/courses';

const supportEmail = 'monsterbaxy@gmail.com';
const legacyCourseHost = ['course', 'example', 'com'].join('.');

function courseAccessUrlFor(order) {
  const fallback = `/course-access?orderNo=${encodeURIComponent(order.orderNo)}`;
  if (!order.downloadUrl || String(order.downloadUrl).includes(legacyCourseHost)) return fallback;
  if (!String(order.downloadUrl).startsWith('/course-access')) return fallback;
  return order.downloadUrl;
}

export default function DeliveryProofPage({ order, back }) {
  if (!order) {
    return (
      <>
        <TopBar title="交付凭证 / Delivery Proof" canBack onBack={back} />
        <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
          <section className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-100">
            <h1 className="text-xl font-black text-slate-800">暂无交付凭证 / No Delivery Proof Yet</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              购买后，此页面会显示订单凭证、课程领取入口、交付记录和售后核验信息。After purchase, this page shows order proof, course access, delivery record, and after-sales verification information.
            </p>
          </section>
        </main>
      </>
    );
  }

  const recoveryEmail = order.recoveryEmail || '未填写 / Not provided';
  const courseAccessUrl = courseAccessUrlFor(order);
  const rows = [
    ['凭证状态 / Proof Status', '已生成 / Generated'],
    ['订单号 / Order No.', order.orderNo],
    ['取货码 / Pickup Code', order.pickupCode],
    ['课程信息 / Course', order.course.title],
    ['支付金额 / Amount', formatPrice(order.amount)],
    ['支付时间 / Paid At', order.paidAt || '-'],
    ['交付状态 / Delivery Status', order.deliveryStatus || 'delivered'],
    ['订单找回邮箱 / Recovery Email', recoveryEmail],
    ['客服邮箱 / Support Email', supportEmail],
  ];

  return (
    <>
      <TopBar title="交付凭证 / Delivery Proof" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-500 p-5 text-white shadow-lg shadow-rose-100">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90">数字交付 / Digital Delivery</span>
          <h1 className="mt-4 text-2xl font-black leading-tight">课程资料已交付 / Course Materials Delivered</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">
            请保存本页面，用于订单查询、售后核验和争议处理。Save this page for order lookup, after-sales verification, and dispute handling.
          </p>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">凭证信息 / Proof Information</h2>
          <div className="mt-3 divide-y divide-slate-100">
            {rows.map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-4 py-3">
                <div className="shrink-0 text-xs text-slate-400">{label}</div>
                <div className="break-all text-right text-sm font-bold text-slate-900">{value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">课程领取中心 / Course Access Center</h2>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">学习账号 / Learning Account</div>
            <div className="mt-1 font-mono text-sm font-bold text-slate-900">{order.learningUsername || order.username}</div>
          </div>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">课程领取中心 / Course Access Center</div>
            <a href={courseAccessUrl} className="mt-1 block break-all font-mono text-sm font-bold text-rose-500">课程领取中心</a>
          </div>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">取货码 / Pickup Code</div>
            <div className="mt-1 font-mono text-sm font-black text-rose-500">{order.extractCode}</div>
          </div>
        </section>

        <Button variant="outline" onClick={back} className="mt-4 w-full rounded-full">返回 / Back</Button>
      </main>
    </>
  );
}
