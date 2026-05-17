import { useState } from 'react';
import Button from '../components/Button';
import TopBar from '../components/TopBar';
import { formatPrice } from '../data/courses';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutPage({ course, back, pay }) {
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  if (!course) return null;

  const requiresEmail = course.price >= 1500;
  const trimmedEmail = recoveryEmail.trim();

  const submit = () => {
    if (requiresEmail && !trimmedEmail) {
      setEmailError('该课程需填写订单找回邮箱，用于订单找回、售后通知和交付异常处理。');
      return;
    }
    if (trimmedEmail && !emailPattern.test(trimmedEmail)) {
      setEmailError('请输入有效的订单找回邮箱。');
      return;
    }
    pay(trimmedEmail);
  };

  return (
    <>
      <TopBar title="确认订单" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-32 pt-4">
        <section className="rounded-3xl bg-white p-4 shadow-sm"><div className="flex gap-3"><img src={course.cover} alt="" className="h-24 w-24 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="line-clamp-2 font-black text-slate-950">{course.title}</div><div className="mt-2 text-sm text-slate-500">{course.subtitle}</div><div className="mt-3 text-xl font-black text-rose-500">{formatPrice(course.price)}</div></div></div></section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-black">订单找回邮箱</h2>
            <span className={`text-xs font-bold ${requiresEmail ? 'text-rose-500' : 'text-slate-400'}`}>{requiresEmail ? '必填' : '选填'}</span>
          </div>
          <input
            value={recoveryEmail}
            onChange={(event) => { setRecoveryEmail(event.target.value); setEmailError(''); }}
            placeholder="请输入订单找回邮箱"
            className={`mt-3 h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm outline-none ring-1 ${emailError ? 'ring-rose-200' : 'ring-transparent'}`}
          />
          <p className="mt-2 text-xs leading-5 text-slate-400">邮箱仅用于订单找回、售后通知和交付异常处理；不要求设置密码，不要求注册账号。</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">{requiresEmail ? '该课程金额较高，为保障交付和售后核验，需要填写订单找回邮箱。' : '未填写邮箱时，后续只能通过订单号 + 取货码查询订单。'}</p>
          {emailError && <div className="mt-2 rounded-2xl bg-rose-50 px-3 py-2 text-xs leading-5 text-rose-600">{emailError}</div>}
        </section>

        <section className="mt-4 space-y-4 rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between"><span className="text-slate-500">购买方式</span><span className="font-bold">免注册购买</span></div>
          <div className="flex items-center justify-between"><span className="text-slate-500">领取方式</span><span className="font-bold">订单凭证领取</span></div>
          <div className="flex items-center justify-between"><span className="text-slate-500">交付方式</span><span className="font-bold">订单详情页自动交付</span></div>
          <div className="flex items-center justify-between"><span className="text-slate-500">课程权限</span><span className="font-bold">课程访问权限</span></div>
          <div className="flex items-center justify-between"><span className="text-slate-500">售后邮箱</span><span className="font-bold">support@linguapass.example</span></div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="font-black">支付前确认</h2>
          <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-3">✓ 我确认购买的是小语种学习类在线语言课程与数字学习资料，不是非课程类商品或违法违规服务。</div>
            <div className="rounded-2xl bg-slate-50 p-3">✓ 我理解支付成功后会生成订单号、取货码、学习账号和下载链接，订单交付状态会用于售后核验。</div>
            <div className="rounded-2xl bg-slate-50 p-3">✓ 我已阅读课程内容、交付方式、服务条款、隐私政策、售后邮箱和退款规则。</div>
            <div className="rounded-2xl bg-slate-50 p-3">✓ 免注册购买不代表匿名交易。平台会保留订单号、支付状态、交付记录和必要的风控日志，用于售后核验、争议处理和支付通道合规审核。</div>
          </div>
        </section>
        <section className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          <h2 className="font-black text-emerald-900">交易留痕说明</h2>
          <p className="mt-2">本订单会保留课程名称、订单号、支付金额、支付时间、交付状态、取货码、订单找回邮箱和售后处理记录，用于支付服务商核验、订单查询、退款核验和争议处理。</p>
        </section>
        <div className="mt-4 rounded-3xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">完成支付后，系统会自动生成订单交付凭证、课程访问权限、学习账号、下载链接和取货码。请在订单详情页截图保存交付证明。</div>
        <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t bg-white/95 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur"><div className="flex items-center justify-between gap-3"><div className="min-w-0"><div className="text-xs font-medium text-slate-400">应付金额</div><div className="text-3xl font-black leading-none text-rose-500">{formatPrice(course.price)}</div></div><Button onClick={submit} className="h-12 w-36 shrink-0 rounded-full text-base">立即支付</Button></div></div>
      </main>
    </>
  );
}
