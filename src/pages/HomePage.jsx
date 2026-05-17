import CourseCard from '../components/CourseCard';
import TopBar from '../components/TopBar';
import { courses } from '../data/courses';

export default function HomePage({ openCourse }) {
  return (
    <>
      <TopBar title="LinguaPass" />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-500 p-5 text-white shadow-lg">
          <div className="text-sm text-white/70">小语种学习 · 非通用语种课程 · 订单凭证领取</div>
          <h1 className="mt-4 text-3xl font-black leading-tight">小语种在线课程<br />支付后订单内领取</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">免注册购买。支付完成后，订单页自动显示课程访问权限、学习账号、课程链接、取货码和交付证明，便于售后核验和交易留痕。</p>
          <button onClick={() => openCourse(courses[0])} className="mt-5 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950">查看入门课程</button>
        </section>

        <div className="mt-5 flex items-center justify-between">
          <h2 className="text-lg font-black">推荐课程</h2>
          <span className="text-sm text-slate-400">原创/授权课程 · 自动交付</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {courses.map((course) => <CourseCard key={course.id} course={course} onOpen={openCourse} />)}
        </div>
        <section className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          <div className="font-black text-emerald-900">合规商品说明</div>
          <p className="mt-2">本站仅销售原创/授权语言学习课程，定位为在线语言课程与数字学习资料。</p>
          <p className="mt-2">不销售礼品卡、充值卡、游戏点卡、虚拟币、金融产品或侵权资料。</p>
          <p className="mt-2">不提供代考、代写、包过承诺、伪造证书、签证/移民承诺或任何规避平台规则的服务。</p>
        </section>
      </main>
    </>
  );
}
