const companyName = 'SHINRA TECHNOLOGY PTE. LTD.';
const uen = '202422354D';
const companyType = 'Exempt Private Company Limited by Shares';
const companyStatus = 'Live Company';
const incorporationDate = '04 Jun 2024';
const registeredAddress = '7500A Beach Road #04-307, The Plaza, Singapore 199591';
const supportEmail = 'monsterbaxy@gmail.com';
const websiteUrl = 'https://www.linguapasscourse.com';

export const companyInfo = {
  companyName,
  uen,
  companyType,
  companyStatus,
  incorporationDate,
  registeredAddress,
  supportEmail,
  websiteUrl,
};

const businessDescription =
  'LinguaPass 是 SHINRA TECHNOLOGY PTE. LTD. 运营的数字内容与在线学习项目，提供小语种课程资料、在线学习材料、软件化访问页面及相关数字媒体服务。LinguaPass is a digital content and online learning project operated by SHINRA TECHNOLOGY PTE. LTD. It provides language learning materials, online study resources, software-based access pages, and related digital media services.';

export const legalPages = {
  '/about': {
    title: '关于我们 / About',
    badge: 'LinguaPass',
    summary: businessDescription,
    sections: [
      {
        title: '公司信息 / Company Information',
        items: [
          `公司主体 / Company: ${companyName}.`,
          `UEN: ${uen}.`,
          `公司类型 / Company Type: ${companyType}.`,
          `公司状态 / Company Status: ${companyStatus}.`,
          `新加坡注册日期 / Incorporated in Singapore on ${incorporationDate}.`,
          `注册地址 / Registered Address: ${registeredAddress}.`,
          `官方网站 / Official Website: ${websiteUrl}.`,
        ],
      },
      {
        title: '数字学习业务 / Digital Learning Business',
        items: [
          businessDescription,
          'LinguaPass 销售数字课程与学习资料，不提供实体商品或实体物流配送。LinguaPass sells digital learning content, not physical goods.',
          '付款成功后，系统会自动生成订单资料、学习账号、学习密码、取货码和课程领取入口。After successful payment, the system provides order details, learning account, password, pickup code, and course access information.',
          '课程领取中心和课程资料页面均为站内数字交付页面。The course access center and course materials page are in-site digital delivery pages.',
        ],
      },
      {
        title: '受限商品说明 / Restricted Products and Services',
        items: [
          '本网站不销售或提供虚拟货币、金融产品、充值卡、游戏点卡、签证/移民服务、证件代办或其他受限制服务。The website does not provide virtual currency, financial products, stored-value cards, game credits, visa/immigration services, document agency services, or other restricted services.',
          'LinguaPass 仅提供原创或授权的小语种在线课程与数字学习资料。LinguaPass only provides original or authorized language learning courses and digital learning materials.',
        ],
      },
    ],
  },
  '/contact': {
    title: '联系我们 / Contact',
    badge: '客服支持 / Customer Support',
    summary: '如需订单查询、数字交付异常、重复扣款核查、退款审核或售后补发，请联系 LinguaPass 客服。Contact LinguaPass for order lookup, digital delivery issues, duplicate payment checks, refund review, or after-sales support.',
    sections: [
      {
        title: '联系方式 / Merchant Contact',
        items: [
          `公司 / Company: ${companyName}.`,
          `UEN: ${uen}.`,
          `注册地址 / Registered Address: ${registeredAddress}.`,
          `官方网站 / Official Website: ${websiteUrl}.`,
          `客服邮箱 / Support Email: ${supportEmail}.`,
        ],
      },
      {
        title: '售后请求 / Support Requests',
        items: [
          '联系订单查询或资料补发时，请提供订单号或取货码。Please provide your order number or pickup code when requesting order lookup or delivery assistance.',
          '如涉及支付或交付争议，请附上问题说明和必要截图。For payment or delivery disputes, please include a short issue description and necessary screenshots.',
          '客服可协助核查支付状态、交付状态、课程领取信息、退款审核状态和数字资料补发。Support can help verify payment status, delivery status, course access information, refund review status, and digital re-delivery requests.',
        ],
      },
    ],
  },
  '/terms': {
    title: '服务条款 / Terms of Service',
    badge: '服务条款 / Service Terms',
    summary: `本服务条款由 ${companyName}（UEN ${uen}）提供。These Terms are provided by ${companyName}, UEN ${uen}, an ${companyType} registered in Singapore.`,
    sections: [
      {
        title: '服务提供方 / Service Provider',
        items: [
          `本服务条款由 ${companyName}（UEN ${uen}）提供，该公司为新加坡注册的 ${companyType}。These Terms are provided by ${companyName}, UEN ${uen}, an ${companyType} registered in Singapore.`,
          businessDescription,
          '用户购买的是数字语言学习内容。Users purchase digital language learning content.',
        ],
      },
      {
        title: '订单交付 / Order Fulfilment',
        items: [
          '订单在付款成功后以数字方式交付。Orders are fulfilled digitally after payment.',
          '付款成功后，订单页面会显示学习账号、学习密码、取货码和课程领取入口。After successful payment, the order page will display learning account information, password, pickup code, and course access information.',
          '用户应保存订单号和取货码，并可通过订单号 + 取货码查询订单。Users should save their order number and pickup code, and may query orders with order number + pickup code.',
          '本服务不包含实体物流配送。The service does not include physical delivery.',
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
  '/privacy': {
    title: '隐私政策 / Privacy Policy',
    badge: '数据使用 / Data Use',
    summary: `本网站运营方和数据控制方为 ${companyName}（UEN ${uen}）。The operator and data controller of this website is ${companyName}, UEN ${uen}.`,
    sections: [
      {
        title: '运营方与数据控制方 / Operator and Data Controller',
        items: [
          `本网站运营方和数据控制方为 ${companyName}（UEN ${uen}）。The operator and data controller of this website is ${companyName}, UEN ${uen}.`,
          `注册地址 / Registered Address: ${registeredAddress}.`,
          `客服邮箱 / Support Email: ${supportEmail}.`,
        ],
      },
      {
        title: '可能收集的信息 / Information We May Collect',
        items: [
          '我们可能收集订单信息、支付状态、交付状态和客服沟通信息。We may collect order information, payment status, delivery status, and customer support messages.',
          '订单信息可能包括订单号、课程名称、金额、时间、取货码和可选订单找回邮箱。Order information may include order number, course name, amount, timestamps, pickup code, and optional order recovery email.',
          '交付信息可能包括学习账号、学习密码、课程领取入口和交付状态。Delivery information may include learning account information, learning password, course access information, and delivery status.',
          '除售后、风控、争议处理或法律合规需要外，我们不会要求用户提供不必要的个人身份证件。We do not ask users to provide unnecessary identity documents unless required for support, fraud prevention, dispute handling, or legal compliance.',
        ],
      },
      {
        title: '信息使用方式 / How We Use Information',
        items: [
          '我们仅将信息用于订单处理、数字交付、客服支持、欺诈预防和法律合规。We use this information only for order processing, digital delivery, customer support, fraud prevention, and legal compliance.',
          '订单找回邮箱为选填信息，仅用于订单找回、售后通知和交付异常处理。Order recovery email is optional and used only for order recovery, after-sales notices, and delivery exception handling.',
          'LinguaPass 不会出售用户数据。LinguaPass does not sell user data.',
        ],
      },
    ],
  },
  '/refund-policy': {
    title: '退款政策 / Refund Policy',
    badge: '数字内容 / Digital Content',
    summary: '数字课程资料一经成功交付，原则上不支持无理由退款；如发生系统或交付异常，可联系客服申请核查。Digital course materials are generally not refundable for change-of-mind reasons after successful delivery; users may contact support for review if a system or delivery issue occurs.',
    sections: [
      {
        title: '基本规则 / Basic Rule',
        items: [
          '数字课程资料通常在付款成功后立即或短时间内完成交付。Digital courses and learning materials are delivered immediately or shortly after successful payment.',
          '数字课程资料一经成功交付，原则上不支持无理由退款。Once digital course materials are successfully delivered, refunds are generally not available for change-of-mind reasons.',
          '成功交付是指订单页面已显示学习账号、学习密码、取货码、课程领取入口或课程资料入口。Successful delivery means the order page has displayed learning account, password, pickup code, course access center, or course materials entry.',
        ],
      },
      {
        title: '可申请核查的情况 / Review Cases',
        items: [
          '重复扣款。Duplicate payment.',
          '系统错误。System error.',
          '付款成功但未生成订单资料。Payment succeeded but order details were not generated.',
          '付款成功但无法访问课程资料。Payment succeeded but course materials cannot be accessed.',
          '交付内容与订单不一致。Delivered content does not match the order.',
          '因平台技术原因导致无法正常领取资料。The user cannot claim materials due to a platform technical issue.',
        ],
      },
      {
        title: '处理方式 / Resolution',
        items: [
          '审核通过后，平台可根据情况进行重新交付、补发资料或退款处理。After review approval, the platform may re-deliver, resend materials, or process a refund depending on the case.',
          `请用户发送订单号、取货码和问题说明至 ${supportEmail}。Users should contact ${supportEmail} with the order number, pickup code, and issue description.`,
          `商户 / Merchant: ${companyName}, UEN ${uen}.`,
        ],
      },
    ],
  },
  '/delivery-policy': {
    title: '交付政策 / Delivery Policy',
    badge: '数字交付 / Digital Delivery',
    summary: '本网站销售数字课程与学习资料，不提供实体物流。LinguaPass sells digital courses and learning materials and does not provide physical shipping.',
    sections: [
      {
        title: '数字交付 / Digital Delivery',
        items: [
          '本网站销售数字课程与学习资料，不提供实体物流。This website sells digital courses and learning materials and does not provide physical shipping.',
          '用户付款成功后，订单详情页会自动显示学习账号、学习密码、取货码和课程领取入口。After successful payment, the order details page automatically displays the learning account, password, pickup code, and course access entry.',
          '数字交付通常会在支付确认后立即完成。Digital delivery is usually completed immediately after payment confirmation.',
        ],
      },
      {
        title: '订单保存与查询 / Order Saving and Lookup',
        items: [
          '用户应截图或保存订单资料。Users should save or screenshot the order information.',
          '如关闭页面或更换设备，可通过订单号和取货码进行订单查询。If the page is closed or the device is changed, users can query the order with order number and pickup code.',
          `如仍无法找回，可联系 ${supportEmail}，并提供订单号或取货码。If the user still cannot recover the order, contact ${supportEmail} with the order number or pickup code.`,
        ],
      },
      {
        title: '交付记录 / Delivery Records',
        items: [
          '系统会保存交付记录，用于订单查询、售后核验、退款审核和争议处理。The system stores delivery records for order lookup, after-sales verification, refund review, and dispute handling.',
          `商户 / Merchant: ${companyName}, UEN ${uen}.`,
        ],
      },
    ],
  },
};

export const footerLinks = [
  { label: '关于我们 / About', path: '/about' },
  { label: '联系我们 / Contact', path: '/contact' },
  { label: '服务条款 / Terms', path: '/terms' },
  { label: '隐私政策 / Privacy', path: '/privacy' },
  { label: '退款政策 / Refund Policy', path: '/refund-policy' },
  { label: '交付政策 / Delivery Policy', path: '/delivery-policy' },
];
