import { useState } from 'react';
import TopBar from '../components/TopBar';

const supportEmail = 'monsterbaxy@gmail.com';

const modules = [
  {
    id: 'lesson-1',
    title: '第 1 课：发音与基础问候 / Lesson 1: Pronunciation and Basic Greetings',
    content: '内容：字母/发音入门、日常问候、自我介绍',
    materials: 'Materials: pronunciation guide, greetings, self-introduction',
    handout: '讲义包含发音表、问候句型和自我介绍模板。The handout includes pronunciation tables, greeting patterns, and self-introduction templates.',
  },
  {
    id: 'lesson-2',
    title: '第 2 课：旅行常用表达 / Lesson 2: Travel Expressions',
    content: '内容：机场、问路、交通、换乘表达',
    materials: 'Materials: airport, directions, transport, transfer phrases',
    handout: '讲义包含旅行场景短句、问路表达和交通词汇。The handout includes travel phrases, directions, and transport vocabulary.',
  },
  {
    id: 'lesson-3',
    title: '第 3 课：餐厅点餐与购物 / Lesson 3: Ordering Food and Shopping',
    content: '内容：点餐、价格、支付、常见购物沟通',
    materials: 'Materials: ordering food, prices, payment, shopping phrases',
    handout: '讲义包含菜单词汇、价格表达、支付短句和购物问答。The handout includes menu vocabulary, price expressions, payment phrases, and shopping Q&A.',
  },
  {
    id: 'lesson-4',
    title: '第 4 课：酒店入住与紧急沟通 / Lesson 4: Hotel Check-in and Emergency Communication',
    content: '内容：入住、退房、求助、紧急情况表达',
    materials: 'Materials: check-in, check-out, help requests, emergency phrases',
    handout: '讲义包含酒店入住、退房、求助和紧急沟通模板。The handout includes hotel check-in, check-out, help requests, and emergency communication templates.',
  },
  {
    id: 'review',
    title: '复习资料：词汇表与练习题 / Review: Vocabulary and Practice',
    content: '内容：核心词汇表、短句练习、场景模拟',
    materials: 'Materials: vocabulary list, sentence practice, scenario exercises',
    handout: '讲义包含核心词汇、短句练习和场景模拟题。The handout includes key vocabulary, sentence practice, and scenario exercises.',
  },
];

export default function CourseMaterialsPage() {
  const params = new URLSearchParams(window.location.search);
  const orderNo = params.get('orderNo') || '';
  const [activeId, setActiveId] = useState(modules[0].id);
  const activeModule = modules.find((item) => item.id === activeId) || modules[0];

  return (
    <>
      <TopBar title="课程资料 / Course Materials" canBack onBack={() => { window.location.href = orderNo ? `/course-access?orderNo=${encodeURIComponent(orderNo)}` : '/course-access'; }} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-10 pt-4">
        <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-rose-500 p-5 text-white shadow-lg shadow-rose-100">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90">数字课程资料 / Digital Materials</span>
          <h1 className="mt-4 text-2xl font-black leading-tight">课程资料 / Course Materials</h1>
          <p className="mt-3 text-sm leading-6 text-white/75">
            这里展示用户购买后可访问的数字课程资料。正式课程资料会根据订单中的课程类型提供。
            This page shows digital course materials available after purchase. Final course materials are provided according to the purchased course.
          </p>
        </section>

        {orderNo && (
          <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="text-xs text-slate-400">订单号 / Order No.</div>
            <div className="mt-1 break-all font-mono text-sm font-black text-slate-950">{orderNo}</div>
          </section>
        )}

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">课程模块 / Course Modules</h2>
          <div className="mt-3 space-y-3">
            {modules.map((item) => (
              <article id={item.id} key={item.id} className="rounded-2xl bg-slate-50 p-3">
                <h3 className="text-sm font-black leading-6 text-slate-900">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{item.content}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{item.materials}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button onClick={() => setActiveId(item.id)} className="rounded-xl bg-white px-3 py-2 text-center text-xs font-bold text-rose-500 shadow-sm">
                    查看资料 / View Material
                  </button>
                  <button onClick={() => setActiveId(item.id)} className="rounded-xl bg-white px-3 py-2 text-center text-xs font-bold text-slate-600 shadow-sm">
                    下载讲义 / Download Handout
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-rose-100 bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
          <h2 className="font-black text-slate-950">资料预览 / Material Preview</h2>
          <div className="mt-3 rounded-2xl bg-rose-50 p-3">
            <div className="text-xs font-bold text-rose-500">当前模块 / Current Module</div>
            <div className="mt-1 font-black text-slate-900">{activeModule.title}</div>
            <p className="mt-2">{activeModule.content}</p>
            <p className="mt-1">{activeModule.materials}</p>
          </div>
          <div className="mt-3 rounded-2xl bg-slate-50 p-3">
            <div className="text-xs font-bold text-slate-400">站内讲义说明 / In-site Handout Notice</div>
            <p className="mt-1">{activeModule.handout}</p>
            <p className="mt-2 text-xs text-slate-400">当前为站内模拟课程资料内容，用于展示数字课程交付流程。This in-site sample shows the digital course delivery flow.</p>
          </div>
        </section>

        <section className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          <h2 className="font-black text-emerald-900">交付说明 / Delivery Notice</h2>
          <p className="mt-2">
            本服务为数字课程资料交付，不涉及实体物流。用户付款成功后，可通过订单详情页查看学习账号、学习密码、取货码和课程资料入口。
          </p>
          <p className="mt-2">
            This service delivers digital course materials only and does not involve physical shipping. After payment, users can view the learning account, password, pickup code, and course materials entry from the order details page.
          </p>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm ring-1 ring-slate-100">
          <h2 className="font-black text-slate-950">售后支持 / After-sales Support</h2>
          <p className="mt-2">
            如需补发或售后，可凭订单号和取货码联系 {supportEmail}。
            For re-delivery or after-sales support, contact {supportEmail} with your order number and pickup code.
          </p>
        </section>
      </main>
    </>
  );
}
