import { useState } from 'react';
import TopBar from '../components/TopBar';
import { queryOrderByEmail, queryOrderByPickupCode } from '../api/orders';

export default function OrderSearchPage({ back, onOrderFound }) {
  const [method, setMethod] = useState('code');
  const [orderNo, setOrderNo] = useState('');
  const [pickupCode, setPickupCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    setError('');
    if (!orderNo.trim()) {
      setError('请输入订单号。Please enter the order number.');
      return;
    }
    if (method === 'code' && !pickupCode.trim()) {
      setError('请输入取货码。Please enter the pickup code.');
      return;
    }
    if (method === 'email' && !email.trim()) {
      setError('请输入订单找回邮箱。Please enter the order recovery email.');
      return;
    }

    try {
      setIsLoading(true);
      const order = method === 'code'
        ? await queryOrderByPickupCode({ orderNo: orderNo.trim(), pickupCode: pickupCode.trim() })
        : await queryOrderByEmail({ orderNo: orderNo.trim(), email: email.trim() });
      onOrderFound(order);
    } catch (event) {
      setError('未查询到匹配订单，请核对订单凭证。No matching order was found. Please check your order proof.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TopBar title="订单查询 / Order Lookup" canBack onBack={back} />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-xl font-black text-slate-950">订单查询 / Order Lookup</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            订单查询必须通过订单号 + 取货码，或订单找回邮箱 + 订单号完成。不要只凭订单号返回订单详情。
            Order lookup requires Order No. + Pickup Code, or recovery email + Order No. Order details are not returned by order number alone.
          </p>

          <div className="mt-4 rounded-2xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            免注册购买不代表匿名交易。平台会保留订单号、支付状态、交付记录、取货码和必要风控日志，用于售后核查、争议处理和支付合规审核。
            Registration-free purchase does not mean anonymous trading. The platform keeps order number, payment status, delivery record, pickup code, and necessary risk-control logs for after-sales verification, dispute handling, and payment compliance review.
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-50 p-1">
            <button onClick={() => { setMethod('code'); setError(''); }} className={`h-10 rounded-xl text-sm font-bold ${method === 'code' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400'}`}>订单号 + 取货码</button>
            <button onClick={() => { setMethod('email'); setError(''); }} className={`h-10 rounded-xl text-sm font-bold ${method === 'email' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-400'}`}>邮箱 + 订单号</button>
          </div>

          <div className="mt-5 space-y-4">
            {method === 'email' && (
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm outline-none" placeholder="请输入订单找回邮箱 / Order recovery email" />
            )}
            <input value={orderNo} onChange={(event) => setOrderNo(event.target.value)} className="h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm outline-none" placeholder="请输入订单号 / Order No." />
            {method === 'code' && (
              <input value={pickupCode} onChange={(event) => setPickupCode(event.target.value)} className="h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm outline-none" placeholder="请输入取货码 / Pickup Code" />
            )}
            {error && <div className="rounded-2xl bg-rose-50 px-3 py-2 text-xs leading-5 text-rose-600">{error}</div>}
            <button onClick={submit} className="h-14 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-rose-500 text-base font-black text-white shadow-lg shadow-rose-100 active:scale-[0.98]">{isLoading ? '查询中 / Searching' : '查询课程资料 / Query Course Materials'}</button>
            {method === 'email' && <p className="text-xs leading-5 text-slate-400">仅填写过订单找回邮箱的订单可使用此方式。邮箱仅用于订单找回、售后通知和交付异常处理。Only orders with a recovery email can use this method.</p>}
          </div>
        </section>
      </main>
    </>
  );
}
