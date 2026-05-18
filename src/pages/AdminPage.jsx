import { useEffect, useMemo, useState } from 'react';
import {
  adminLogin,
  fetchAdminOrder,
  fetchAdminOrders,
  fetchPaymentEvents,
  markOrderStatus,
  redeliverOrder,
} from '../api/admin';
import { formatPrice } from '../data/courses';

const emptyDelivery = {
  learningUsername: '',
  learningPassword: '',
  downloadUrl: '',
  extractCode: '',
  deliveredAt: '',
};

function StatusBadge({ children, tone = 'slate' }) {
  const colors = {
    slate: 'bg-slate-100 text-slate-700',
    green: 'bg-emerald-100 text-emerald-700',
    red: 'bg-rose-100 text-rose-700',
    amber: 'bg-amber-100 text-amber-700',
  };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${colors[tone]}`}>{children}</span>;
}

function toneOf(status) {
  if (['paid', 'delivered'].includes(status)) return 'green';
  if (['failed', 'refunded'].includes(status)) return 'red';
  if (status === 'pending') return 'amber';
  return 'slate';
}

export default function AdminPage() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('adminPassword') || '');
  const [inputPassword, setInputPassword] = useState('');
  const [authed, setAuthed] = useState(() => Boolean(sessionStorage.getItem('adminPassword')));
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const delivery = useMemo(() => selectedOrder || emptyDelivery, [selectedOrder]);

  const loadOrders = async (nextSearch = search) => {
    setLoading(true);
    setError('');
    try {
      const list = await fetchAdminOrders({ password, search: nextSearch });
      setOrders(list);
      if (selectedOrder) {
        const refreshed = list.find((order) => order.orderNo === selectedOrder.orderNo);
        if (refreshed) setSelectedOrder(refreshed);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadDetail = async (orderNo) => {
    setLoading(true);
    setError('');
    try {
      const [order, eventList] = await Promise.all([
        fetchAdminOrder({ password, orderNo }),
        fetchPaymentEvents({ password, orderNo }),
      ]);
      setSelectedOrder(order);
      setEvents(eventList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminLogin(inputPassword);
      sessionStorage.setItem('adminPassword', inputPassword);
      setPassword(inputPassword);
      setAuthed(true);
    } catch (err) {
      setError('管理员密码不正确');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('adminPassword');
    setAuthed(false);
    setPassword('');
    setInputPassword('');
    setOrders([]);
    setSelectedOrder(null);
    setEvents([]);
  };

  const redeliver = async () => {
    if (!selectedOrder) return;
    setLoading(true);
    setError('');
    try {
      const order = await redeliverOrder({ password, orderNo: selectedOrder.orderNo });
      setSelectedOrder(order);
      await loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markStatus = async (status) => {
    if (!selectedOrder) return;
    setLoading(true);
    setError('');
    try {
      const order = await markOrderStatus({ password, orderNo: selectedOrder.orderNo, status });
      setSelectedOrder(order);
      await loadOrders();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed && password) loadOrders('');
  }, [authed, password]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-950">
        <form onSubmit={login} className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-sm">
          <h1 className="text-xl font-black">管理后台登录</h1>
          <p className="mt-2 text-sm text-slate-500">请输入管理员密码。密码来自后端环境变量 ADMIN_PASSWORD。</p>
          <input
            type="password"
            value={inputPassword}
            onChange={(event) => setInputPassword(event.target.value)}
            className="mt-5 h-11 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-rose-400"
            placeholder="ADMIN_PASSWORD"
          />
          {error && <div className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}
          <button className="mt-5 h-11 w-full rounded-md bg-slate-950 text-sm font-bold text-white" disabled={loading}>
            {loading ? '登录中' : '登录'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-xl font-black">订单管理后台</h1>
            <p className="mt-1 text-sm text-slate-500">订单、交付和 webhook 留痕</p>
          </div>
          <button onClick={logout} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-bold">退出</button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-4 px-6 py-5 lg:grid-cols-[1fr_420px]">
        <section className="rounded-lg bg-white p-4 shadow-sm">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              loadOrders(search);
            }}
            className="flex gap-2"
          >
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 flex-1 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-rose-400"
              placeholder="按订单号、邮箱、课程名称搜索"
            />
            <button className="h-10 rounded-md bg-slate-950 px-4 text-sm font-bold text-white">搜索</button>
          </form>

          {error && <div className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}

          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500">
                <tr>
                  <th className="px-3 py-3">订单号</th>
                  <th className="px-3 py-3">课程</th>
                  <th className="px-3 py-3">金额</th>
                  <th className="px-3 py-3">状态</th>
                  <th className="px-3 py-3">交付</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr
                    key={order.orderNo}
                    onClick={() => loadDetail(order.orderNo)}
                    className={`cursor-pointer hover:bg-slate-50 ${selectedOrder?.orderNo === order.orderNo ? 'bg-rose-50' : ''}`}
                  >
                    <td className="px-3 py-3 font-mono text-xs">{order.orderNo}</td>
                    <td className="px-3 py-3">{order.course?.title || order.courseId}</td>
                    <td className="px-3 py-3 font-bold">{formatPrice(order.amount)}</td>
                    <td className="px-3 py-3"><StatusBadge tone={toneOf(order.paymentStatus)}>{order.paymentStatus}</StatusBadge></td>
                    <td className="px-3 py-3"><StatusBadge tone={toneOf(order.deliveryStatus)}>{order.deliveryStatus}</StatusBadge></td>
                  </tr>
                ))}
                {!orders.length && (
                  <tr>
                    <td colSpan="5" className="px-3 py-10 text-center text-slate-400">{loading ? '加载中' : '暂无订单'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-lg bg-white p-4 shadow-sm">
            <h2 className="font-black">订单详情</h2>
            {!selectedOrder ? (
              <p className="mt-4 text-sm text-slate-400">点击左侧订单查看详情。</p>
            ) : (
              <div className="mt-4 space-y-3 text-sm">
                {[
                  ['订单号', selectedOrder.orderNo],
                  ['课程名称', selectedOrder.course?.title || selectedOrder.courseId],
                  ['支付金额', formatPrice(selectedOrder.amount)],
                  ['订单状态', selectedOrder.status],
                  ['支付状态', selectedOrder.paymentStatus],
                  ['交付状态', selectedOrder.deliveryStatus],
                  ['订单找回邮箱', selectedOrder.recoveryEmail || '未填写'],
                  ['创建时间', selectedOrder.createdAt],
                  ['支付时间', selectedOrder.paidAt || '未支付'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                    <span className="shrink-0 text-slate-500">{label}</span>
                    <span className="break-all text-right font-bold">{value}</span>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <button onClick={redeliver} className="rounded-md bg-emerald-600 px-3 py-2 text-xs font-bold text-white">手动补发</button>
                  <button onClick={() => markStatus('refunded')} className="rounded-md bg-amber-500 px-3 py-2 text-xs font-bold text-white">标记退款</button>
                  <button onClick={() => markStatus('failed')} className="rounded-md bg-rose-600 px-3 py-2 text-xs font-bold text-white">标记失败</button>
                </div>
              </div>
            )}
          </section>

          {selectedOrder && (
            <>
              <section className="rounded-lg bg-white p-4 shadow-sm">
                <h2 className="font-black">Delivery 信息</h2>
                <div className="mt-4 space-y-3 text-sm">
                  {[
                    ['learningUsername', delivery.learningUsername],
                    ['learningPassword', delivery.learningPassword],
                    ['downloadUrl', delivery.downloadUrl],
                    ['extractCode', delivery.extractCode],
                    ['deliveredAt', delivery.deliveredAt],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-md bg-slate-50 p-3">
                      <div className="text-xs text-slate-400">{label}</div>
                      <div className="mt-1 break-all font-mono text-xs font-bold">{value || '-'}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-lg bg-white p-4 shadow-sm">
                <h2 className="font-black">Payment Events</h2>
                <div className="mt-4 space-y-3">
                  {events.map((event) => (
                    <div key={event.id} className="rounded-md border border-slate-200 p-3 text-xs">
                      <div className="flex justify-between gap-3">
                        <span className="font-bold">{event.eventType}</span>
                        <StatusBadge tone={event.verifyStatus === 'success' ? 'green' : 'red'}>{event.verifyStatus}</StatusBadge>
                      </div>
                      <div className="mt-2 text-slate-500">{event.createdAt}</div>
                      <pre className="mt-2 max-h-32 overflow-auto rounded bg-slate-950 p-2 text-[11px] leading-5 text-slate-100">{event.rawPayload}</pre>
                    </div>
                  ))}
                  {!events.length && <div className="text-sm text-slate-400">暂无 webhook 日志</div>}
                </div>
              </section>
            </>
          )}
        </aside>
      </main>
    </div>
  );
}
