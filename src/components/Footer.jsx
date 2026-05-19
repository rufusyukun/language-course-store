import { companyInfo, footerLinks } from '../data/legalPages';

export default function Footer() {
  return (
    <footer className="mt-6 rounded-3xl bg-white p-4 text-sm shadow-sm ring-1 ring-slate-100">
      <div className="font-black text-slate-950">LinguaPass</div>
      <p className="mt-2 text-xs leading-5 text-slate-500">
        小语种在线课程与数字学习资料平台，付款成功后数字交付。Niche language online courses and digital learning materials with digital delivery after payment.
      </p>
      <div className="mt-3 text-xs leading-5 text-slate-500">
        官网 / Website: {companyInfo.websiteUrl}
      </div>
      <div className="mt-3 rounded-2xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
        <div className="font-black text-amber-900">订单查询 / Order Lookup</div>
        <p className="mt-1">用户可在“我的 / Mine”页面凭订单号 + 取货码找回课程资料。</p>
        <p className="mt-1">Use Order No. + Pickup Code in the Mine page to recover course materials.</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {footerLinks.map((link) => (
          <a key={link.path} href={link.path} className="rounded-2xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600">
            {link.label}
          </a>
        ))}
      </div>
      <div className="mt-4 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-400">
        {companyInfo.companyName} · UEN {companyInfo.uen} · {companyInfo.registeredAddress} · {companyInfo.supportEmail}
      </div>
    </footer>
  );
}
