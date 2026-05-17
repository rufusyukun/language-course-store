import Button from '../components/Button';
import TopBar from '../components/TopBar';
import { formatPrice } from '../data/courses';

export default function DetailPage({ course, back, buyNow }) {
  if (!course) return null;

  return (
    <>
      <TopBar title="课程详情" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-white pb-32">
        <div className="aspect-[4/3] overflow-hidden bg-slate-100"><img src={course.cover} alt="" className="h-full w-full object-cover" /></div>
        <section className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-500">{course.category}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{course.language}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">在线语言课程</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">付款后自动交付</span>
          </div>
          <h1 className="mt-4 text-2xl font-black text-slate-950">{course.title}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">{course.desc}</p>
          <div className="mt-4 flex items-end gap-2"><div className="text-3xl font-black text-rose-500">{formatPrice(course.price)}</div><div className="pb-1 text-sm text-slate-400 line-through">{formatPrice(course.originalPrice)}</div></div>
        </section>
        <section className="border-t bg-slate-50 p-5">
          <h2 className="font-black">课程包含</h2>
          <div className="mt-3 space-y-3">{course.outline.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100"><span className="text-rose-500">✓</span><span className="text-sm text-slate-700">{item}</span></div>)}</div>
        </section>
        <section className="p-5">
          <h2 className="font-black">购买须知</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">支持免注册购买。支付成功后，系统会自动生成订单号、取货码、学习账号、课程访问链接和交付状态记录。请在订单详情页截图保存，售后处理需提供订单号和取货码。</p>
        </section>
        <section className="mx-5 mb-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-4">
          <h2 className="font-black text-emerald-900">商户合规说明</h2>
          <div className="mt-2 space-y-2 text-sm leading-6 text-emerald-800">
            <p>本站仅销售原创/授权语言学习课程，服务类型为在线语言课程与数字学习资料交付。</p>
            <p>小语种课程仅用于语言学习、旅行沟通、商务基础和文化入门。</p>
            <p>不销售礼品卡、充值卡、游戏点卡、虚拟币、金融产品或侵权资料。</p>
            <p>不提供代考、代写、包过承诺、伪造证书、签证/移民承诺或任何规避平台规则的服务。</p>
            <p>课程不涉及政治组织动员、违法规避、黑客破解、平台风控规避或任何非法用途。</p>
            <p>数字课程资料交付后，原则上不支持无理由退款；如链接或账号异常，可凭订单号和取货码申请售后补发。</p>
          </div>
        </section>
        <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t bg-white/95 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur"><div className="flex items-center gap-3"><Button variant="outline" onClick={back} className="flex-1">返回</Button><Button onClick={() => buyNow(course)} className="flex-[2] text-base">立即购买</Button></div></div>
      </main>
    </>
  );
}
