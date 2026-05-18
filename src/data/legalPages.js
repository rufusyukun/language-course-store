const companyName = 'SHINRA TECHNOLOGY PTE. LTD.';
const uen = '202422354D';
const companyType = 'Exempt Private Company Limited by Shares';
const companyStatus = 'Live Company';
const incorporationDate = '04 Jun 2024';
const registeredAddress = '7500A Beach Road #04-307, The Plaza, Singapore 199591';
const supportEmail = 'monsterbaxy@gmail.com';

export const companyInfo = {
  companyName,
  uen,
  companyType,
  companyStatus,
  incorporationDate,
  registeredAddress,
  supportEmail,
};

export const legalPages = {
  '/about': {
    title: 'About',
    badge: 'LinguaPass',
    summary: 'LinguaPass is operated by SHINRA TECHNOLOGY PTE. LTD. and provides online language learning courses and digital learning materials.',
    sections: [
      {
        title: 'Company Information',
        items: [
          `LinguaPass is operated by ${companyName}.`,
          `UEN: ${uen}.`,
          `Company Type: ${companyType}.`,
          `Company Status: ${companyStatus}.`,
          `Incorporated in Singapore on ${incorporationDate}.`,
          `Registered Address: ${registeredAddress}.`,
          'Business: online language learning courses and digital learning materials.',
        ],
      },
      {
        title: 'Digital Learning Business',
        items: [
          'LinguaPass sells digital learning content, not physical goods.',
          'After successful payment, the system automatically provides order details, learning account information, pickup code, and course access/download information.',
          'Products are delivered digitally after payment, including order details, learning account information, pickup code, and course access/download information.',
        ],
      },
      {
        title: 'Restricted Products and Services',
        items: [
          'LinguaPass does not provide prohibited goods or services, virtual currency, financial products, stored-value cards, game top-ups, visa/immigration services, or document agency services.',
          'LinguaPass only provides online language learning courses and digital learning materials.',
        ],
      },
    ],
  },
  '/contact': {
    title: 'Contact',
    badge: 'Customer Support',
    summary: 'Contact LinguaPass for order lookup, digital delivery issues, duplicate payment checks, or after-sales support.',
    sections: [
      {
        title: 'Merchant Contact',
        items: [
          `Company: ${companyName}.`,
          `UEN: ${uen}.`,
          `Registered Address: ${registeredAddress}.`,
          `Support Email: ${supportEmail}.`,
        ],
      },
      {
        title: 'Support Requests',
        items: [
          'Please provide your order number or pickup code when requesting order lookup or delivery assistance.',
          'For payment or delivery disputes, please include a short issue description and any necessary screenshots.',
          'Support can help verify payment status, delivery status, course access information, refund review status, and digital re-delivery requests.',
        ],
      },
    ],
  },
  '/terms': {
    title: 'Terms',
    badge: 'Service Terms',
    summary: `These Terms are provided by ${companyName}, UEN ${uen}, an ${companyType} registered in Singapore.`,
    sections: [
      {
        title: 'Service Provider',
        items: [
          `These Terms are provided by ${companyName}, UEN ${uen}, an ${companyType} registered in Singapore.`,
          'LinguaPass provides online language learning courses and digital learning materials.',
          'Users purchase digital language learning content.',
        ],
      },
      {
        title: 'Order Fulfilment',
        items: [
          'Orders are fulfilled digitally after payment.',
          'After successful payment, the order page will display learning account information, learning password, pickup code, and course access/download information.',
          'Users should save their order number and pickup code.',
          'The service does not include physical delivery.',
        ],
      },
      {
        title: 'Restricted Services',
        items: [
          'The website does not provide financial products, virtual currency, prohibited goods, stored-value cards, game credits, visa/immigration services, or document agency services.',
          'Users may not resell, share, publish, or misuse course accounts, learning materials, download links, or pickup codes.',
        ],
      },
    ],
  },
  '/privacy': {
    title: 'Privacy Policy',
    badge: 'Data Use',
    summary: `The operator and data controller of this website is ${companyName}, UEN ${uen}.`,
    sections: [
      {
        title: 'Operator and Data Controller',
        items: [
          `The operator and data controller of this website is ${companyName}, UEN ${uen}.`,
          `Registered Address: ${registeredAddress}.`,
          `Support Email: ${supportEmail}.`,
        ],
      },
      {
        title: 'Information We May Collect',
        items: [
          'We may collect order information, payment status, delivery status, and customer support messages.',
          'Order information may include order number, course name, amount, timestamps, pickup code, and optional order recovery email.',
          'Delivery information may include learning account information, learning password, course access/download information, and delivery status.',
          'We do not ask users to provide unnecessary personal identity documents unless required for support, fraud prevention, dispute handling, or legal compliance.',
        ],
      },
      {
        title: 'How We Use Information',
        items: [
          'We use this information only for order processing, digital delivery, customer support, fraud prevention, and legal compliance.',
          'LinguaPass does not sell user data.',
          'Payment and delivery records may be retained for after-sales verification, refund review, dispute handling, fraud prevention, and payment compliance review.',
        ],
      },
    ],
  },
  '/refund-policy': {
    title: 'Refund Policy',
    badge: 'Digital Content',
    summary: 'LinguaPass sells digital courses and learning materials. Refund review is based on payment records and delivery records.',
    sections: [
      {
        title: 'Digital Delivery and Refund Rule',
        items: [
          'Digital courses and learning materials are delivered immediately or shortly after successful payment.',
          'Once digital content, learning account information, pickup code, or course access has been successfully delivered, refunds are generally not available for change-of-mind reasons.',
          'Successful delivery means the order page has displayed course access information such as learning account information, learning password, download link or learning entrance, and pickup code.',
        ],
      },
      {
        title: 'Refund Review Cases',
        items: [
          'Refund review may be available if there is duplicate payment, failed delivery, incorrect delivery, or a technical issue caused by the system.',
          'If a system error causes duplicate charging, the user may contact support for verification.',
          'If the system cannot deliver course materials after payment, or the delivered content does not match the paid order, the user may request review.',
        ],
      },
      {
        title: 'Resolution',
        items: [
          'Approved cases may be resolved by refund or re-delivery.',
          `Users should contact ${supportEmail} with the order number, pickup code, and issue description.`,
          `Merchant: ${companyName}, UEN ${uen}.`,
        ],
      },
    ],
  },
  '/delivery-policy': {
    title: 'Delivery Policy',
    badge: 'Digital Delivery',
    summary: 'LinguaPass products are digital courses and digital learning materials. No physical shipping is provided.',
    sections: [
      {
        title: 'Digital Delivery',
        items: [
          'No physical shipping is provided.',
          'Delivery is digital and usually completed immediately after payment confirmation.',
          'After successful payment, the order page will display learning account information, learning password, pickup code, and course access/download information.',
        ],
      },
      {
        title: 'Order Information',
        items: [
          'Users should save or screenshot the order information.',
          'Users should keep the order number, pickup code, and learning account information secure.',
          'The system stores delivery records for order lookup, after-sales verification, refund review, and dispute handling.',
        ],
      },
      {
        title: 'Lost Order Page',
        items: [
          'If the user loses the order page, they can contact support with the order number or pickup code.',
          `Support Email: ${supportEmail}.`,
          `Merchant: ${companyName}, UEN ${uen}.`,
        ],
      },
    ],
  },
};

export const footerLinks = [
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Terms', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Refund Policy', path: '/refund-policy' },
  { label: 'Delivery Policy', path: '/delivery-policy' },
];
