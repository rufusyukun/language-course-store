import TopBar from '../components/TopBar';
import { legalPages } from '../data/legalPages';

export default function LegalPage({ path }) {
  const page = legalPages[path] || legalPages['/about'];

  return (
    <>
      <TopBar title={page.title} canBack onBack={() => { window.location.href = '/'; }} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-10 pt-4">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-500 p-5 text-white shadow-lg shadow-rose-100">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90">{page.badge}</span>
          <h1 className="mt-4 text-2xl font-black leading-tight">{page.title}</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">{page.summary}</p>
        </section>

        <div className="mt-4 space-y-4">
          {page.sections.map((section) => (
            <section key={section.title} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <h2 className="font-black text-slate-950">{section.title}</h2>
              <div className="mt-3 space-y-3">
                {section.items.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
