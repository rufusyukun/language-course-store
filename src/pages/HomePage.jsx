import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import TopBar from '../components/TopBar';
import { courses } from '../data/courses';
import { companyInfo } from '../data/legalPages';

export default function HomePage({ openCourse }) {
  return (
    <>
      <TopBar title="LinguaPass 小语种课程商城" />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-500 p-5 text-white shadow-lg">
          <div className="text-sm text-white/70">小语种学习 · 非通用语种课程 · 订单凭证领取</div>
          <h1 className="mt-4 text-3xl font-black leading-tight">小语种在线课程<br />支付后订单内领取</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">
            LinguaPass 是小语种在线课程与数字学习资料平台。用户付款成功后，系统会自动生成订单资料、学习账号、学习密码、取货码和课程领取入口。
            LinguaPass provides online language courses and digital learning materials with automatic digital delivery after payment.
          </p>
          <button onClick={() => openCourse(courses[0])} className="mt-5 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950">查看入门课程</button>
        </section>

        <section className="mt-5 rounded-3xl bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">网站与商户信息 / Website and Merchant</h2>
          <p className="mt-2">本网站由 {companyInfo.companyName} 运营，提供小语种在线课程与数字学习资料。</p>
          <p>Official website: {companyInfo.websiteUrl}</p>
          <p>Company: {companyInfo.companyName}</p>
          <p>UEN: {companyInfo.uen}</p>
        </section>

        <div className="mt-5 flex items-center justify-between">
          <h2 className="text-lg font-black">推荐课程</h2>
          <span className="text-sm text-slate-400">原创/授权课程 · 自动交付</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {courses.map((course) => <CourseCard key={course.id} course={course} onOpen={openCourse} />)}
        </div>

        <section className="mt-5 rounded-3xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
          <div className="font-black text-amber-900">订单查询 / Order Lookup</div>
          <p className="mt-2">用户可在“我的 / Mine”页面进入订单查询，凭订单号 + 取货码找回课程资料。</p>
          <p className="mt-2">Users can use Order No. + Pickup Code in the Mine page to recover purchased course materials.</p>
        </section>

        <section className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          <div className="font-black text-emerald-900">合规商品说明</div>
          <p className="mt-2">本站仅销售原创或授权语言学习课程，定位为在线语言课程与数字学习资料。</p>
          <p className="mt-2">不销售礼品卡、充值卡、游戏点卡、虚拟币、金融产品或侵权资料。</p>
          <p className="mt-2">不提供代考、代写、包过承诺、伪造证书、签证/移民承诺或任何规避平台规则的服务。</p>
        </section>
        <Footer />
      </main>
    </>
  );
}
