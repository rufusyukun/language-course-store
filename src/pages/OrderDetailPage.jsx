import { useState } from 'react';
import Button from '../components/Button';
import TopBar from '../components/TopBar';
import { formatPrice } from '../data/courses';

const supportEmail = 'monsterbaxy@gmail.com';

export default function OrderDetailPage({ order, back }) {
  const [copied, setCopied] = useState('');
  if (!order) return null;

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(String(text || ''));
    } catch {
      // Clipboard may be unavailable in non-secure preview contexts.
    }
    setCopied(label);
    setTimeout(() => setCopied(''), 1200);
  };

  const recoveryEmail = order.recoveryEmail || 'Not provided';
  const learningUsername = order.learningUsername || order.username || '';
  const learningPassword = order.learningPassword || order.password || '';

  return (
    <>
      <TopBar title="Order Detail" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex gap-3">
            <img src={order.course.cover} alt="" className="h-20 w-20 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <div className="font-black text-slate-950">{order.course.title}</div>
              <div className="mt-1 text-sm text-slate-500">{order.paidAt || order.createdAt}</div>
              <div className="mt-2 text-sm font-bold text-emerald-600">Paid · Digitally Delivered</div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-black">Order Proof</h2>
          {[
            ['Order No.', order.orderNo],
            ['Pickup Code', order.pickupCode],
            ['Course', order.course.title],
            ['Amount', formatPrice(order.amount)],
            ['Paid At', order.paidAt || '-'],
            ['Delivery Status', order.deliveryStatus || 'delivered'],
            ['Recovery Email', recoveryEmail],
            ['Support Email', supportEmail],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-t py-3 first:border-t-0">
              <div className="min-w-0 pr-3">
                <div className="text-xs text-slate-400">{label}</div>
                <div className="mt-1 break-all text-sm font-bold text-slate-900">{value}</div>
              </div>
              <button onClick={() => copy(value, label)} className="shrink-0 rounded-full bg-slate-100 px-3 py-2 text-xs font-bold">Copy</button>
            </div>
          ))}
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-black">Learning Account</h2>
          {[
            ['Account', learningUsername],
            ['Password', learningPassword],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-t py-3 first:border-t-0">
              <div>
                <div className="text-xs text-slate-400">{label}</div>
                <div className="mt-1 font-mono text-sm font-bold text-slate-900">{value}</div>
              </div>
              <button onClick={() => copy(value, label)} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold">Copy</button>
            </div>
          ))}
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-black">Course Link</h2>
          <div className="rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">Course Access / Download Link</div>
            <div className="mt-1 break-all font-mono text-sm text-slate-900">{order.downloadUrl}</div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 p-3">
            <div>
              <div className="text-xs text-slate-400">Extract Code</div>
              <div className="mt-1 font-mono font-black text-rose-500">{order.extractCode}</div>
            </div>
            <Button variant="outline" onClick={() => copy(`${order.downloadUrl} Extract Code: ${order.extractCode}`, 'Course Link')} className="h-10 rounded-full">Copy All</Button>
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          <h2 className="font-black text-emerald-900">Transaction Record Notice</h2>
          <p className="mt-2">
            This page keeps course name, order number, payment amount, payment time, delivery status, pickup code, learning account record, and support email for order lookup, re-delivery, refund review, and dispute handling.
          </p>
          <p className="mt-2">
            Support Email: {supportEmail}. Please save this page. You can later query course materials with order number + pickup code.
          </p>
        </section>

        <div className="mt-4 rounded-3xl bg-rose-50 p-4 text-sm leading-6 text-rose-700">
          Digital course materials are generally not eligible for no-reason refunds after successful delivery. If links, extract codes, or account information are abnormal, contact support for re-delivery.
        </div>
        {copied && <div className="fixed bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-slate-950 px-4 py-2 text-sm text-white shadow-lg">Copied {copied}</div>}
      </main>
    </>
  );
}
