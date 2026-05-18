import TopBar from '../components/TopBar';

const supportEmail = 'monsterbaxy@gmail.com';

export default function MinePage({ openInfo, openOrderSearch, openDeliveryProof }) {
  const services = [
    { title: '订单查询 / Order Search', desc: '使用订单号 + 取货码查询课程资料', icon: '⌕', onClick: openOrderSearch },
    { title: '交付凭证 / Delivery Proof', desc: '查看订单凭证和交付记录', icon: '▣', onClick: openDeliveryProof },
    { title: '购买须知 / Purchase Notice', desc: '课程购买与数字交付说明', icon: 'i', onClick: () => openInfo('purchase') },
    { title: '退款规则 / Refund Rules', desc: '数字课程退款核查规则', icon: '↺', onClick: () => openInfo('refund') },
    { title: '商户信息 / Merchant Info', desc: '商户主体与服务范围', icon: '◇', onClick: () => openInfo('merchant') },
    { title: '隐私政策 / Privacy Policy', desc: '订单与交付数据使用说明', icon: '◌', onClick: () => openInfo('privacy') },
    { title: '联系客服 / Contact Support', desc: supportEmail, icon: '@', onClick: () => openInfo('contact') },
  ];

  return (
    <>
      <TopBar title="我的 / Mine" />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-28 pt-4">
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="text-sm text-slate-400">LinguaPass</div>
          <h1 className="mt-2 text-2xl font-black text-slate-950">我的服务 / My Services</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            支持免注册购买、订单凭证领取、订单号和取货码查询、数字交付记录与售后核验。
            Registration-free purchase with order proof, pickup code lookup, digital delivery records, and after-sales verification.
          </p>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">我的服务 / My Services</h2>
          <div className="mt-3 space-y-3">
            {services.map((item) => (
              <button key={item.title} onClick={item.onClick} className="flex w-full items-center gap-3 rounded-2xl bg-slate-50 p-3 text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-lg font-black text-rose-500 shadow-sm">{item.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-slate-900">{item.title}</span>
                  <span className="mt-1 block truncate text-xs text-slate-400">{item.desc}</span>
                </span>
                <span className="text-slate-300">›</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          <div className="font-black text-emerald-900">客服支持 / Support</div>
          <p className="mt-2">客服邮箱 / Support Email: {supportEmail}</p>
          <p className="mt-2">订单查询、资料补发或退款核查时，请提供订单号和取货码。Please provide your order number and pickup code for order lookup, re-delivery, or refund review.</p>
        </section>
      </main>
    </>
  );
}
