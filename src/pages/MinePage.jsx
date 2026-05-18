import TopBar from '../components/TopBar';

const supportEmail = 'monsterbaxy@gmail.com';

export default function MinePage({ openInfo, openOrderSearch, openDeliveryProof }) {
  const services = [
    { title: 'Order Search', desc: 'Use order number + pickup code to find course materials', icon: '⌕', onClick: openOrderSearch },
    { title: 'Delivery Proof', desc: 'View order proof and delivery record', icon: '▣', onClick: openDeliveryProof },
    { title: 'Purchase Notice', desc: 'Course purchase and delivery instructions', icon: 'i', onClick: () => openInfo('purchase') },
    { title: 'Refund Rules', desc: 'Digital course refund review rules', icon: '↺', onClick: () => openInfo('refund') },
    { title: 'Merchant Info', desc: 'Merchant entity and service scope', icon: '◎', onClick: () => openInfo('merchant') },
    { title: 'Privacy Policy', desc: 'Order and delivery data use', icon: '◇', onClick: () => openInfo('privacy') },
    { title: 'Contact Support', desc: supportEmail, icon: '@', onClick: () => openInfo('contact') },
  ];

  return (
    <>
      <TopBar title="Mine" />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-28 pt-4">
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <div className="text-sm text-slate-400">LinguaPass</div>
          <h1 className="mt-2 text-2xl font-black text-slate-950">My Services</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Registration-free purchase with order proof, pickup code lookup, digital delivery records, and after-sales verification.
          </p>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">My Services</h2>
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
          <div className="font-black text-emerald-900">Support</div>
          <p className="mt-2">Support Email: {supportEmail}</p>
          <p className="mt-2">Please provide your order number and pickup code for order lookup, re-delivery, or refund review.</p>
        </section>
      </main>
    </>
  );
}
