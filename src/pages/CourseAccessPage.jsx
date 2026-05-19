import TopBar from '../components/TopBar';

const supportEmail = 'monsterbaxy@gmail.com';

export default function CourseAccessPage() {
  const params = new URLSearchParams(window.location.search);
  const orderNo = params.get('orderNo') || '';
  const materialsUrl = orderNo ? `/course-materials?orderNo=${encodeURIComponent(orderNo)}` : '/course-materials';

  return (
    <>
      <TopBar title="课程领取中心 / Course Access Center" canBack onBack={() => { window.location.href = '/'; }} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-10 pt-4">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-500 p-5 text-white shadow-lg shadow-rose-100">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90">数字课程领取 / Digital Course Access</span>
          <h1 className="mt-4 text-2xl font-black leading-tight">课程领取中心 / Course Access Center</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">
            本页面用于说明数字课程领取方式，并提供站内课程资料入口。This page explains digital course access and provides an in-site course materials entry.
          </p>
          <a href={materialsUrl} className="mt-5 block rounded-full bg-white px-5 py-3 text-center text-sm font-black text-slate-950">
            查看课程资料 / View Course Materials
          </a>
        </section>

        {orderNo && (
          <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="text-xs text-slate-400">订单号 / Order No.</div>
            <div className="mt-1 break-all font-mono text-sm font-black text-slate-950">{orderNo}</div>
          </section>
        )}

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">领取说明 / Access Instructions</h2>
          <div className="mt-3 space-y-3">
            {[
              '本服务为数字课程资料交付，不涉及实体物流。This service delivers digital course materials only and does not involve physical shipping.',
              '用户付款成功后，可通过订单详情页查看学习账号、学习密码、取货码和课程资料入口。After successful payment, users can view the learning account, password, pickup code, and course materials entry from the order details page.',
              '请截图或保存订单资料。Please save or screenshot your order details after payment.',
              `如需补发或售后，可凭订单号和取货码联系 ${supportEmail}。For re-delivery or after-sales support, contact ${supportEmail} with your order number and pickup code.`,
              '课程资料入口为站内页面，不涉及外部虚假下载链接。Course materials are provided through an in-site page without external placeholder download links.',
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
