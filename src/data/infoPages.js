const supportEmail = 'monsterbaxy@gmail.com';

export const infoPages = {
  purchase: {
    title: '购买须知 / Purchase Notice',
    badge: '在线语言课程 / Online Language Courses',
    summary: 'LinguaPass 销售小语种在线课程与数字学习资料。付款成功后，订单详情页会生成课程领取信息。LinguaPass sells niche language online courses and digital learning materials. After payment, course access information is generated on the order detail page.',
    sections: [
      {
        title: '购买流程 / Purchase Flow',
        items: [
          '选择课程后，请确认课程名称、价格、交付方式和售后规则。Choose a course, then review the course name, price, delivery method, and after-sales rules.',
          '确认订单页会展示课程金额、数字交付方式和退款提示。The checkout page shows amount, digital delivery method, and refund notice.',
          '支付成功后，系统会生成可核验的订单记录和交付记录。After payment succeeds, the system creates a verifiable order record and delivery record.',
          '低于 ¥1500 的课程邮箱选填；¥1500 及以上课程需要填写订单找回邮箱。Courses below ¥1500 may use an optional order recovery email. Courses at or above ¥1500 require an order recovery email.',
        ],
      },
      {
        title: '交付内容 / Delivery Content',
        items: [
          '订单凭证包含订单号、支付时间、课程名称、金额和交付状态。Order proof includes order number, payment time, course name, amount, and delivery status.',
          '课程领取信息包含学习账号、学习密码、课程领取入口、取货码和订单查询凭证。Course access includes learning account, password, course access information, pickup code, and order proof.',
          '订单号 + 取货码可用于订单查询或课程资料补发。Order number + pickup code can be used for order lookup or course material re-delivery.',
        ],
      },
      {
        title: '合规说明 / Notice',
        items: [
          'LinguaPass 仅销售原创或授权语言学习课程与数字学习资料。LinguaPass only sells original or authorized language learning courses and digital learning materials.',
          '本网站不销售礼品卡、充值卡、游戏点卡、虚拟币、金融产品、违禁商品、签证/移民服务或证件代办服务。LinguaPass does not sell gift cards, recharge cards, game point cards, virtual currency, financial products, prohibited goods, visa/immigration services, or document agency services.',
          `客服邮箱 / Support Email: ${supportEmail}.`,
        ],
      },
    ],
  },
  refund: {
    title: '退款规则 / Refund Rules',
    badge: '数字课程售后 / Digital Course After-sales',
    summary: '数字课程退款审核以订单支付记录和交付记录为依据。Digital course refund review is based on order payment records and delivery records.',
    sections: [
      {
        title: '可核查情况 / Eligible Review Cases',
        items: [
          '因系统错误导致重复扣款。Duplicate payment caused by system error.',
          '支付成功但课程资料无法交付。Payment succeeds but course materials cannot be delivered.',
          '交付内容与已支付订单不一致。Delivered course content does not match the paid order.',
        ],
      },
      {
        title: '原则上不退款 / Generally Not Refundable',
        items: [
          '学习账号、密码、课程入口、取货码或订单凭证已经展示。Learning account, password, course access information, pickup code, or order proof has already been displayed.',
          '用户已经复制、下载、领取或使用数字课程资料。The user has copied, downloaded, claimed, or used the digital course materials.',
          '数字交付成功后的主观原因退款原则上不支持。Change-of-mind requests after successful digital delivery are generally not supported.',
        ],
      },
      {
        title: '售后处理 / Support Handling',
        items: [
          '如课程入口、取货码或账号信息异常，用户可申请补发。For invalid links, abnormal account information, or missing materials, users may request re-delivery.',
          '如金额、课程名称或支付状态异常，用户可提供订单号和截图申请核查。For amount, course name, or payment status issues, users may provide order number and screenshots for review.',
          `客服邮箱 / Support Email: ${supportEmail}.`,
        ],
      },
    ],
  },
  merchant: {
    title: '商户信息 / Merchant Info',
    badge: '商户主体 / Merchant Entity',
    summary: 'LinguaPass 由 SHINRA TECHNOLOGY PTE. LTD. 运营，提供小语种在线课程与数字学习资料。LinguaPass is operated by SHINRA TECHNOLOGY PTE. LTD. and provides online language learning courses and digital learning materials.',
    sections: [
      {
        title: '公司信息 / Company Information',
        items: [
          '公司 / Company: SHINRA TECHNOLOGY PTE. LTD.',
          'UEN: 202422354D.',
          '注册地址 / Registered Address: 7500A Beach Road #04-307, The Plaza, Singapore 199591.',
          '服务类型 / Service type: 小语种在线课程与数字学习资料。Niche language online courses and digital learning materials.',
        ],
      },
      {
        title: '联系方式 / Contact',
        items: [
          `客服邮箱 / Support Email: ${supportEmail}.`,
          '联系售后时，请提供订单号、取货码和问题说明。Users should provide order number, pickup code, and issue description when contacting support.',
        ],
      },
    ],
  },
  privacy: {
    title: '隐私政策 / Privacy Policy',
    badge: '数据使用 / Data Use',
    summary: 'LinguaPass 仅收集订单处理、数字交付、客服支持、风控和合规所需信息。LinguaPass collects only information needed for order processing, digital delivery, customer support, fraud prevention, and legal compliance.',
    sections: [
      {
        title: '处理的信息 / Information We Process',
        items: [
          '订单信息：课程名称、订单号、金额、支付状态、交付状态和时间。Order information: course name, order number, amount, payment status, delivery status, and timestamps.',
          '交付信息：学习账号、学习密码、课程领取入口、取货码和订单凭证。Delivery information: learning account, password, course access information, pickup code, and order proof.',
          '订单找回邮箱为选填信息，仅用于订单找回、售后通知和交付异常处理。Optional recovery email is used only for order recovery, after-sales notice, and delivery exception handling.',
        ],
      },
      {
        title: '使用与保护 / Use and Protection',
        items: [
          '信息用于订单处理、数字交付、售后支持、风控和合规。Information is used for order processing, digital delivery, support, fraud prevention, and compliance.',
          'LinguaPass 不会出售用户数据。LinguaPass does not sell user data.',
          `隐私问题请联系 / For privacy questions, contact ${supportEmail}.`,
        ],
      },
    ],
  },
  terms: {
    title: '服务条款 / Terms',
    badge: '服务条款 / Service Terms',
    summary: '用户购买的是数字语言学习内容，订单在付款成功后以数字方式交付。Users purchase digital language learning content. Orders are fulfilled digitally after payment.',
    sections: [
      {
        title: '服务范围 / Service Scope',
        items: [
          'LinguaPass 提供小语种在线课程与数字学习资料。LinguaPass provides online language learning courses and digital learning materials.',
          '本服务不包含实体物流配送。The service does not include physical delivery.',
          '用户应保存订单号和取货码。Users should save their order number and pickup code.',
        ],
      },
      {
        title: '受限服务 / Restricted Services',
        items: [
          '本网站不提供金融产品、虚拟货币、违禁商品、储值卡、游戏点数、签证/移民服务或证件代办服务。The website does not provide financial products, virtual currency, prohibited goods, stored-value cards, game credits, visa/immigration services, or document agency services.',
          '用户不得转售、共享、公开发布或滥用课程账号、学习资料、课程入口或取货码。Users may not resell, share, publish, or misuse course accounts, learning materials, course access links, or pickup codes.',
        ],
      },
    ],
  },
  contact: {
    title: '联系客服 / Contact Support',
    badge: '售后支持 / After-sales Support',
    summary: '如需订单查询、交付异常、重复扣款核查、退款审核或课程资料补发，请联系 LinguaPass。Contact LinguaPass for order lookup, delivery issues, duplicate payment checks, refund review, or course material re-delivery.',
    sections: [
      {
        title: '联系信息 / Contact Information',
        items: [
          `客服邮箱 / Support Email: ${supportEmail}.`,
          '建议邮件主题：LinguaPass Support + 订单号。Suggested subject: LinguaPass Support + Order Number.',
          '请提供订单号、取货码、课程名称、问题说明和必要截图。Please include order number, pickup code, course name, issue description, and necessary screenshots.',
        ],
      },
      {
        title: '支持范围 / Support Scope',
        items: [
          '课程入口异常、取货码错误、资料缺失或账号异常。Course access invalid, pickup code incorrect, materials missing, or account abnormal.',
          '重复扣款、金额异常、课程名称不一致，或支付成功后未显示交付信息。Duplicate payment, amount abnormal, course name mismatch, or payment succeeds but delivery information is not displayed.',
          '退款资格核查、订单交付凭证和争议处理。Refund eligibility review, order delivery proof, and dispute handling.',
        ],
      },
    ],
  },
};
