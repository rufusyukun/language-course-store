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
        <TopBar title="Delivery Proof" canBack onBack={back} />
        <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
          <section className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-100">
            <h1 className="text-xl font-black text-slate-800">No Delivery Proof Yet</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              After purchase, this page shows order proof, course access, delivery record, and after-sales verification information.
            </p>
          </section>
        </main>
      </>
    );
  }

  const recoveryEmail = order.recoveryEmail || 'Not provided';
  const courseAccessUrl = courseAccessUrlFor(order);
  const rows = [
    ['Proof Status', 'Generated'],
    ['Order No.', order.orderNo],
    ['Pickup Code', order.pickupCode],
    ['Course', order.course.title],
    ['Amount', formatPrice(order.amount)],
    ['Paid At', order.paidAt || '-'],
    ['Delivery Status', order.deliveryStatus || 'delivered'],
    ['Recovery Email', recoveryEmail],
    ['Support Email', supportEmail],
  ];

  return (
    <>
      <TopBar title="Delivery Proof" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-500 p-5 text-white shadow-lg shadow-rose-100">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90">Digital Delivery</span>
          <h1 className="mt-4 text-2xl font-black leading-tight">Course Materials Delivered</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Save this page for order lookup, after-sales verification, and dispute handling.
          </p>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">Proof Information</h2>
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
          <h2 className="font-black text-slate-950">Course Access Center / 课程领取中心</h2>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">Learning Account</div>
            <div className="mt-1 font-mono text-sm font-bold text-slate-900">{order.learningUsername || order.username}</div>
          </div>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">Course Access Center</div>
            <a href={courseAccessUrl} className="mt-1 block break-all font-mono text-sm font-bold text-rose-500">课程领取中心</a>
          </div>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">Extract Code</div>
            <div className="mt-1 font-mono text-sm font-black text-rose-500">{order.extractCode}</div>
          </div>
        </section>

        <Button variant="outline" onClick={back} className="mt-4 w-full rounded-full">Back</Button>
      </main>
    </>
  );
}
