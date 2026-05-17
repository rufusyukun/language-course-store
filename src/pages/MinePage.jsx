import TopBar from '../components/TopBar';

export default function MinePage({ openInfo, openOrderSearch, openDeliveryProof }) {
  const quickActions = [
    { title: '订单查询', desc: '凭订单号 + 取货码找回课程', icon: '⌕', onClick: openOrderSearch },
    { title: '交付凭证', desc: '查看权限、链接与交付记录', icon: '▣', onClick: openDeliveryProof },
    { title: '售后补发', desc: '链接失效/账号异常可处理', icon: '↻', page: 'contact' },
    { title: '退款规则', desc: '按数字课程交付状态处理', icon: '↗', page: 'refund' },
  ];
  const supportItems = [
    { title: '购买须知', value: '课程内容、支付流程与自动交付说明', page: 'purchase' },
    { title: '退款规则', value: '未交付可申请，已交付按规则处理', page: 'refund' },
    { title: '服务条款', value: '服务范围、用户义务与争议处理', page: 'terms' },
    { title: '商户信息', value: '小语种在线课程与数字学习资料商户', page: 'merchant' },
    { title: '隐私政策', value: '订单、交付与售后信息最小化留存', page: 'privacy' },
    { title: '联系客服', value: 'support@linguapass.example', page: 'contact' },
  ];

  return (
    <>
      <TopBar title="我的" />
      <main className="mx-auto min-h-screen max-w-md bg-slate-50 px-4 pb-24 pt-4">
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-rose-500 p-5 text-white shadow-xl shadow-rose-100">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 left-8 h-28 w-28 rounded-full bg-orange-300/20 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 text-3xl ring-1 ring-white/20">学</div>
            <div className="min-w-0 flex-1">
              <div className="text-2xl font-black">LinguaPass 用户</div>
              <div className="mt-1 text-sm text-white/70">订单凭证领取小语种课程资料</div>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/90">教育商户</span>
          </div>
          <div className="relative mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/12 p-3 text-center ring-1 ring-white/10"><div className="text-xl font-black">0</div><div className="mt-1 text-xs text-white/60">待支付</div></div>
            <div className="rounded-2xl bg-white/12 p-3 text-center ring-1 ring-white/10"><div className="text-xl font-black">1</div><div className="mt-1 text-xs text-white/60">已交付</div></div>
            <div className="rounded-2xl bg-white/12 p-3 text-center ring-1 ring-white/10"><div className="text-xl font-black">24h</div><div className="mt-1 text-xs text-white/60">售后响应</div></div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-slate-950">我的服务</h2>
            <span className="text-xs font-bold text-rose-500">订单留痕 · 交付可查</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {quickActions.map((item) => (
              <button key={item.title} onClick={() => item.onClick ? item.onClick() : item.page && openInfo(item.page)} className="rounded-3xl bg-slate-50 p-4 text-left transition active:scale-[0.98]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">{item.icon}</div>
                <div className="mt-3 font-black text-slate-900">{item.title}</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">{item.desc}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-4 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
          <div className="border-b px-4 py-3 font-black text-slate-950">帮助与合规</div>
          {supportItems.map((item) => (
            <button key={item.title} onClick={() => openInfo(item.page)} className="flex w-full items-center justify-between gap-4 border-b px-4 py-4 text-left last:border-b-0 active:bg-slate-50">
              <div>
                <div className="font-bold text-slate-800">{item.title}</div>
                <div className="mt-1 text-xs leading-5 text-slate-400">{item.value}</div>
              </div>
              <span className="text-xl text-slate-300">›</span>
            </button>
          ))}
        </section>

        <section className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          <div className="font-black text-emerald-900">商户合规信息</div>
          <p className="mt-2">商户名称：LinguaPass Online Education</p>
          <p>服务类型：小语种在线课程与数字学习资料</p>
          <p>售后邮箱：support@linguapass.example</p>
          <p>交易说明：仅销售原创/授权语言学习课程，不销售礼品卡、充值卡、游戏点卡、虚拟币、金融产品或侵权资料，不提供代考、代写、包过承诺、伪造证书、签证/移民承诺或任何规避平台规则的服务。</p>
        </section>
      </main>
    </>
  );
}
