import Button from '../components/Button';
import TopBar from '../components/TopBar';
import { formatPrice } from '../data/courses';

export default function DeliveryProofPage({ order, back }) {
  if (!order) {
    return (
      <>
        <TopBar title="交付凭证" canBack onBack={back} />
        <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
          <section className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-100">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-2xl text-slate-400">▣</div>
            <h1 className="mt-5 text-xl font-black text-slate-800">暂无交付凭证</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">完成课程购买后，这里会展示订单凭证、课程访问权限、交付记录和售后核验信息。</p>
          </section>
        </main>
      </>
    );
  }

  const recoveryEmail = order.recoveryEmail || '未填写，仅支持订单号 + 取货码查询';
  const proofRows = [
    ['凭证状态', '已生成'],
    ['订单号', order.orderNo],
    ['取货码', order.pickupCode],
    ['课程名称', order.course.title],
    ['支付金额', formatPrice(order.amount)],
    ['支付时间', order.paidAt],
    ['交付状态', '已交付课程访问权限'],
    ['订单找回邮箱', recoveryEmail],
    ['售后邮箱', 'support@linguapass.example'],
  ];
  const timeline = [
    ['订单创建', '系统记录课程名称、金额与订单号'],
    ['支付确认', '订单支付状态更新为已支付'],
    ['权限生成', '生成学习账号、课程链接、提取码和取货码'],
    ['凭证留存', '保留交付记录，用于订单查询、售后核验和争议处理'],
  ];

  return (
    <>
      <TopBar title="交付凭证" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-500 p-5 text-white shadow-lg shadow-rose-100">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90">订单凭证领取</span>
          <h1 className="mt-4 text-2xl font-black leading-tight">课程已完成数字交付</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">本页用于展示课程访问权限、交付记录和售后核验字段。请截图保存，后续可凭订单号 + 取货码查询。</p>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">凭证信息</h2>
          <div className="mt-3 divide-y divide-slate-100">
            {proofRows.map(([label, value]) => (
              <div key={label} className="flex items-start justify-between gap-4 py-3">
                <div className="shrink-0 text-xs text-slate-400">{label}</div>
                <div className="break-all text-right text-sm font-bold text-slate-900">{value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">课程访问权限</h2>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">学习账号</div>
            <div className="mt-1 font-mono text-sm font-bold text-slate-900">{order.username}</div>
          </div>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">课程链接</div>
            <div className="mt-1 break-all font-mono text-sm text-slate-900">{order.downloadUrl}</div>
          </div>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
            <div className="text-xs text-slate-400">提取码</div>
            <div className="mt-1 font-mono text-sm font-black text-rose-500">{order.extractCode}</div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">交付记录</h2>
          <div className="mt-4 space-y-3">
            {timeline.map(([title, desc], index) => (
              <div key={title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500 text-xs font-black text-white">{index + 1}</div>
                  {index < timeline.length - 1 && <div className="h-full w-px bg-rose-100" />}
                </div>
                <div className="pb-3">
                  <div className="font-bold text-slate-900">{title}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-400">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          <div className="font-black text-emerald-900">售后核验说明</div>
          <p className="mt-2">如需补发课程资料或处理交付异常，请提供订单号、取货码、课程名称和必要截图。若已填写订单找回邮箱，也可使用订单找回邮箱 + 订单号辅助核验。</p>
        </section>

        <Button variant="outline" onClick={back} className="mt-4 w-full rounded-full">返回</Button>
      </main>
    </>
  );
}
