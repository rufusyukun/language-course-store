import TopBar from '../components/TopBar';

const supportEmail = 'monsterbaxy@gmail.com';

export default function CourseAccessPage() {
  const params = new URLSearchParams(window.location.search);
  const orderNo = params.get('orderNo') || '';

  return (
    <>
      <TopBar title="Course Access Center" canBack onBack={() => { window.location.href = '/'; }} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-10 pt-4">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-500 p-5 text-white shadow-lg shadow-rose-100">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90">Digital Course Access</span>
          <h1 className="mt-4 text-2xl font-black leading-tight">Course Access Center / 课程领取中心</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">
            This page is used for digital course access instructions.
          </p>
        </section>

        {orderNo && (
          <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="text-xs text-slate-400">Order No</div>
            <div className="mt-1 break-all font-mono text-sm font-black text-slate-950">{orderNo}</div>
          </section>
        )}

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">Access Instructions</h2>
          <div className="mt-3 space-y-3">
            {[
              'LinguaPass provides digital language learning courses and learning materials.',
              'After successful payment, the order details page will display the learning account, learning password, pickup code, and course access information.',
              'Please save or screenshot your order details after payment.',
              `If you lose your order page or need assistance, contact ${supportEmail} with your order number or pickup code.`,
              'No physical shipping is provided.',
              'This page is used for digital course access instructions.',
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
