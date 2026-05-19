import Button from '../components/Button';
import TopBar from '../components/TopBar';
import { formatPrice } from '../data/courses';

const supportEmail = 'monsterbaxy@gmail.com';

export default function DetailPage({ course, back, buyNow }) {
  if (!course) return null;

  return (
    <>
      <TopBar title="课程详情 / Course Details" canBack onBack={back} />
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
          <h2 className="font-black">课程名称 / Course Name</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{course.title}</p>
          <h2 className="mt-4 font-black">课程简介 / Course Overview</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{course.desc}</p>
          <h2 className="mt-4 font-black">适合人群 / Suitable For</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            适合希望学习小语种基础表达、旅行沟通、商务基础或文化入门的用户。Suitable for learners who need niche language basics, travel communication, business basics, or cultural introduction.
          </p>
        </section>

        <section className="border-t bg-slate-50 p-5">
          <h2 className="font-black">课程包含内容 / What’s Included</h2>
          <div className="mt-3 space-y-3">{course.outline.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100"><span className="text-rose-500">✓</span><span className="text-sm text-slate-700">{item}</span></div>)}</div>
        </section>

        <section className="p-5">
          <h2 className="font-black">交付方式 / Delivery Method</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            本课程为数字课程资料，付款成功后系统会自动生成订单资料、学习账号、学习密码、取货码和课程领取入口。
            This is a digital learning product. After successful payment, the system will generate order details, learning account, password, pickup code, and course access information.
          </p>
          <h2 className="mt-4 font-black">退款规则入口 / Refund Policy</h2>
          <a href="/refund-policy" className="mt-2 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
            查看退款政策 / View Refund Policy
          </a>
          <h2 className="mt-4 font-black">客服邮箱 / Support Email</h2>
          <p className="mt-2 break-all text-sm leading-6 text-slate-500">{supportEmail}</p>
        </section>

        <section className="mx-5 mb-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-4">
          <h2 className="font-black text-emerald-900">商户合规说明 / Compliance Notice</h2>
          <div className="mt-2 space-y-2 text-sm leading-6 text-emerald-800">
            <p>本站仅销售原创或授权语言学习课程，服务类型为在线语言课程与数字学习资料交付。</p>
            <p>小语种课程仅用于语言学习、旅行沟通、商务基础和文化入门。</p>
            <p>不销售礼品卡、充值卡、游戏点卡、虚拟币、金融产品或侵权资料。</p>
            <p>不提供代考、代写、包过承诺、伪造证书、签证/移民承诺或任何规避平台规则的服务。</p>
            <p>课程不涉及政治组织动员、违法规避、黑客破解、平台风控规避或任何非法用途。</p>
            <p>数字课程资料交付后，原则上不支持无理由退款；如课程入口或账号异常，可凭订单号和取货码申请售后补发。</p>
          </div>
        </section>
        <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t bg-white/95 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur"><div className="flex items-center gap-3"><Button variant="outline" onClick={back} className="flex-1">返回 / Back</Button><Button onClick={() => buyNow(course)} className="flex-[2] text-base">立即购买 / Buy Now</Button></div></div>
      </main>
    </>
  );
}
