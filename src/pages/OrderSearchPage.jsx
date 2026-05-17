import { useState } from 'react';
import TopBar from '../components/TopBar';

export default function OrderSearchPage({ back }) {
  const [method, setMethod] = useState('code');

  return (
    <>
      <TopBar title="订单查询" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-black text-slate-950">订单查询</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">使用订单凭证找回已购买课程与交付记录。未填写订单找回邮箱的订单，只能通过订单号 + 取货码查询。</p>

          <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-1">
            <button onClick={() => setMethod('code')} className={`h-10 rounded-xl text-sm font-bold ${method === 'code' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400'}`}>订单号 + 取货码</button>
            <button onClick={() => setMethod('email')} className={`h-10 rounded-xl text-sm font-bold ${method === 'email' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400'}`}>邮箱 + 订单号</button>
          </div>

          {method === 'code' ? (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-400">请输入订单号</div>
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-400">请输入取货码</div>
              <button className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-rose-500 text-base font-black text-white shadow-lg shadow-rose-100 active:scale-[0.98]">查询课程资料</button>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-400">请输入订单找回邮箱</div>
              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-400">请输入订单号</div>
              <button className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-rose-500 text-base font-black text-white shadow-lg shadow-rose-100 active:scale-[0.98]">查询课程资料</button>
              <p className="text-xs leading-5 text-slate-400">仅填写过订单找回邮箱的订单可使用此方式。邮箱仅用于订单找回、售后通知和交付异常处理。</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
