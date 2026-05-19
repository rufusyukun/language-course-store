import { useState } from 'react';
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

  const recoveryEmail = order.recoveryEmail || '未填写 / Not provided';
  const learningUsername = order.learningUsername || order.username || '';
  const learningPassword = order.learningPassword || order.password || '';
  const courseAccessUrl = courseAccessUrlFor(order);

  return (
    <>
      <TopBar title="订单资料 / Order Details" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex gap-3">
            <img src={order.course.cover} alt="" className="h-20 w-20 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <div className="font-black text-slate-950">{order.course.title}</div>
              <div className="mt-1 text-sm text-slate-500">{order.paidAt || order.createdAt}</div>
              <div className="mt-2 text-sm font-bold text-emerald-600">已支付 / Paid · 已数字交付 / Digitally Delivered</div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-black">订单凭证 / Order Proof</h2>
          {[
            ['订单号 / Order No.', order.orderNo],
            ['取货码 / Pickup Code', order.pickupCode],
            ['课程信息 / Course Information', order.course.title],
            ['支付金额 / Amount', formatPrice(order.amount)],
            ['支付时间 / Paid At', order.paidAt || '-'],
            ['交付状态 / Delivery Status', order.deliveryStatus || 'delivered'],
            ['订单找回邮箱 / Recovery Email', recoveryEmail],
            ['客服邮箱 / Support Email', supportEmail],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-t py-3 first:border-t-0">
              <div className="min-w-0 pr-3">
                <div className="text-xs text-slate-400">{label}</div>
                <div className="mt-1 break-all text-sm font-bold text-slate-900">{value}</div>
              </div>
              <button onClick={() => copy(value, label)} className="shrink-0 rounded-full bg-slate-100 px-3 py-2 text-xs font-bold">复制 / Copy</button>
            </div>
          ))}
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-black">学习账号 / Learning Account</h2>
          {[
            ['账号 / Account', learningUsername],
            ['密码 / Password', learningPassword],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-t py-3 first:border-t-0">
              <div>
                <div className="text-xs text-slate-400">{label}</div>
                <div className="mt-1 font-mono text-sm font-bold text-slate-900">{value}</div>
              </div>
              <button onClick={() => copy(value, label)} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold">复制 / Copy</button>
            </div>
          ))}
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-black">课程领取中心 / Course Access Center</h2>
          <div className="rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">课程领取中心 / Course Access Center</div>
            <a href={courseAccessUrl} className="mt-1 block break-all font-mono text-sm font-bold text-rose-500">
              课程领取中心
            </a>
          </div>
          <a href={courseAccessUrl} className="mt-3 block rounded-2xl bg-gradient-to-r from-orange-400 to-rose-500 px-4 py-3 text-center text-sm font-black text-white shadow-lg shadow-rose-100">
            进入课程领取中心 / Enter Course Access Center
          </a>
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 p-3">
            <div>
              <div className="text-xs text-slate-400">取货码 / Pickup Code</div>
              <div className="mt-1 font-mono font-black text-rose-500">{order.extractCode}</div>
            </div>
            <Button variant="outline" onClick={() => copy(`${courseAccessUrl} 取货码 / Pickup Code: ${order.extractCode}`, '课程领取中心 / Course Access Center')} className="h-10 rounded-full">全部复制 / Copy All</Button>
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          <h2 className="font-black text-emerald-900">交易留痕说明 / Transaction Record Notice</h2>
          <p className="mt-2">
            本页面用于保存课程名称、订单号、支付金额、支付时间、交付状态、取货码、学习账号记录和客服邮箱。用户可凭订单号和取货码联系客服查询订单、补发资料、退款核查或处理支付争议。
          </p>
          <p className="mt-2">
            请截图或保存本页面。用户可凭订单号和取货码查询订单、补发资料、申请退款核查或处理支付争议。
          </p>
          <p className="mt-2">
            Please save or screenshot this page. You can use the order number and pickup code for order lookup, re-delivery, refund review, or dispute handling.
          </p>
          <p className="mt-2">客服邮箱 / Support Email: {supportEmail}</p>
        </section>

        <section className="mt-4 rounded-3xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          <h2 className="font-black text-amber-900">订单查询 / Order Lookup</h2>
          <p className="mt-2">如关闭页面或更换设备，可在“我的 / Mine”页面凭订单号 + 取货码找回课程资料。</p>
          <p className="mt-2">If this page is closed or the device is changed, use Order No. + Pickup Code in the Mine page to recover course materials.</p>
        </section>

        <div className="mt-4 rounded-3xl bg-rose-50 p-4 text-sm leading-6 text-rose-700">
          数字课程资料一经成功交付，原则上不支持无理由退款。如出现重复扣款、系统错误、无法交付或交付内容与订单不一致，请联系客服核查。审核通过后，可进行重新交付或退款处理。
        </div>
        {copied && <div className="fixed bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-slate-950 px-4 py-2 text-sm text-white shadow-lg">已复制 / Copied {copied}</div>}
      </main>
    </>
  );
}
