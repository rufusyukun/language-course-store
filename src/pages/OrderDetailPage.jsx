import { useState } from 'react';
import Button from '../components/Button';
import TopBar from '../components/TopBar';
import { formatPrice } from '../data/courses';

export default function OrderDetailPage({ order, back }) {
  const [copied, setCopied] = useState('');
  if (!order) return null;

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      // Clipboard may be unavailable in non-secure preview contexts.
    }
    setCopied(label);
    setTimeout(() => setCopied(''), 1200);
  };

  const recoveryEmail = order.recoveryEmail || '未填写，仅可使用订单号 + 取货码查询';

  return (
    <>
      <TopBar title="订单详情" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex gap-3">
            <img src={order.course.cover} alt="" className="h-20 w-20 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
              <div className="font-black text-slate-950">{order.course.title}</div>
              <div className="mt-1 text-sm text-slate-500">{order.paidAt}</div>
              <div className="mt-2 text-sm font-bold text-emerald-600">已支付 · 已自动交付</div>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-black">订单交付证明</h2>
          {[
            ['订单号', order.orderNo],
            ['取货码', order.pickupCode],
            ['课程名称', order.course.title],
            ['支付金额', formatPrice(order.amount)],
            ['支付时间', order.paidAt],
            ['交付状态', '已生成课程访问权限'],
            ['订单找回邮箱', recoveryEmail],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-t py-3 first:border-t-0">
              <div className="min-w-0 pr-3">
                <div className="text-xs text-slate-400">{label}</div>
                <div className="mt-1 break-all text-sm font-bold text-slate-900">{value}</div>
              </div>
              <button onClick={() => copy(value, label)} className="shrink-0 rounded-full bg-slate-100 px-3 py-2 text-xs font-bold">复制</button>
            </div>
          ))}
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-black">学习账号</h2>
          {[
            ['账号', order.username],
            ['密码', order.password],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-t py-3 first:border-t-0">
              <div>
                <div className="text-xs text-slate-400">{label}</div>
                <div className="mt-1 font-mono text-sm font-bold text-slate-900">{value}</div>
              </div>
              <button onClick={() => copy(value, label)} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold">复制</button>
            </div>
          ))}
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-black">课程链接</h2>
          <div className="rounded-2xl bg-slate-50 p-3"><div className="text-xs text-slate-400">课程访问链接</div><div className="mt-1 break-all font-mono text-sm text-slate-900">{order.downloadUrl}</div></div>
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-50 p-3"><div><div className="text-xs text-slate-400">提取码</div><div className="mt-1 font-mono font-black text-rose-500">{order.extractCode}</div></div><Button variant="outline" onClick={() => copy(`${order.downloadUrl} 提取码：${order.extractCode}`, '课程链接')} className="h-10 rounded-full">复制全部</Button></div>
        </section>

        <section className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          <h2 className="font-black text-emerald-900">交易留痕说明</h2>
          <p className="mt-2">本订单保留课程名称、订单号、支付金额、支付时间、交付状态、取货码、订单找回邮箱、课程账号生成记录和售后邮箱，用于订单查询、课程补发、退款资格核验、支付服务商核验和争议处理。</p>
          <p className="mt-2">售后邮箱：support@linguapass.example。请截图保存本页，后续可凭订单号 + 取货码查询课程资料；如已填写订单找回邮箱，也可使用订单找回邮箱 + 订单号查询。</p>
        </section>

        <div className="mt-4 rounded-3xl bg-rose-50 p-4 text-sm leading-6 text-rose-700">数字课程资料交付后，原则上不支持无理由退款；如链接失效、提取码错误或账号异常，可申请售后补发。本网站仅销售原创/授权语言学习课程与数字学习资料。</div>
        {copied && <div className="fixed bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-slate-950 px-4 py-2 text-sm text-white shadow-lg">已复制{copied}</div>}
      </main>
    </>
  );
}
