const supportEmail = 'monsterbaxy@gmail.com';

export const infoPages = {
  purchase: {
    title: 'Purchase Notice',
    badge: 'Online Language Courses',
    summary: 'LinguaPass sells niche language online courses and digital learning materials. After payment, course access information is generated on the order detail page.',
    sections: [
      {
        title: 'Purchase Flow',
        items: [
          'Choose a course, review course details, price, delivery method, and after-sales rules.',
          'On the checkout page, confirm the course name, amount, digital delivery method, and refund policy.',
          'After payment succeeds, the system creates a verifiable order record and delivery record.',
          'Courses below 1500 may use an optional order recovery email. Courses at or above 1500 require an order recovery email.',
        ],
      },
      {
        title: 'Delivery Content',
        items: [
          'Order proof includes order number, payment time, course name, amount, and delivery status.',
          'Course access includes learning account, learning password, download link or learning entrance, extract code, and pickup code.',
          'Order number + pickup code can be used for order lookup or course material re-delivery.',
        ],
      },
      {
        title: 'Notice',
        items: [
          'LinguaPass only sells original or authorized language learning courses and digital learning materials.',
          'LinguaPass does not sell gift cards, recharge cards, game point cards, virtual currency, financial products, prohibited goods, visa/immigration services, or document agency services.',
          `Support email: ${supportEmail}.`,
        ],
      },
    ],
  },
  refund: {
    title: 'Refund Rules',
    badge: 'Digital Course After-sales',
    summary: 'Digital course refund review is based on order payment records and delivery records.',
    sections: [
      {
        title: 'Eligible Review Cases',
        items: [
          'Duplicate payment caused by system error.',
          'Payment succeeds but course materials cannot be delivered.',
          'Delivered course content does not match the paid order.',
        ],
      },
      {
        title: 'Generally Not Refundable',
        items: [
          'Learning account, password, course link, extract code, or pickup code has already been displayed.',
          'The user has copied, downloaded, claimed, or used the digital course materials.',
          'Change-of-mind requests after successful digital delivery are generally not supported.',
        ],
      },
      {
        title: 'Support Handling',
        items: [
          'For invalid links, abnormal account information, or missing materials, users may request re-delivery.',
          'For amount, course name, or payment status issues, users may provide order number and screenshots for review.',
          `Support email: ${supportEmail}.`,
        ],
      },
    ],
  },
  merchant: {
    title: 'Merchant Info',
    badge: 'Merchant Entity',
    summary: 'LinguaPass is operated by SHINRA TECHNOLOGY PTE. LTD. and provides online language learning courses and digital learning materials.',
    sections: [
      {
        title: 'Company Information',
        items: [
          'Company: SHINRA TECHNOLOGY PTE. LTD.',
          'UEN: 202422354D.',
          'Registered Address: 7500A Beach Road #04-307, The Plaza, Singapore 199591.',
          'Service type: niche language online courses and digital learning materials.',
        ],
      },
      {
        title: 'Contact',
        items: [
          `Support email: ${supportEmail}.`,
          'Users should provide order number, pickup code, and issue description when contacting support.',
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    badge: 'Data Use',
    summary: 'LinguaPass collects only information needed for order processing, digital delivery, customer support, fraud prevention, and legal compliance.',
    sections: [
      {
        title: 'Information We Process',
        items: [
          'Order information: course name, order number, amount, payment status, delivery status, and timestamps.',
          'Delivery information: learning account, learning password, download link or learning entrance, extract code, and pickup code.',
          'Optional recovery email is used only for order recovery, after-sales notice, and delivery exception handling.',
        ],
      },
      {
        title: 'Use and Protection',
        items: [
          'Information is used for order processing, digital delivery, support, fraud prevention, and compliance.',
          'LinguaPass does not sell user data.',
          `For privacy questions, contact ${supportEmail}.`,
        ],
      },
    ],
  },
  terms: {
    title: 'Terms',
    badge: 'Service Terms',
    summary: 'Users purchase digital language learning content. Orders are fulfilled digitally after payment.',
    sections: [
      {
        title: 'Service Scope',
        items: [
          'LinguaPass provides online language learning courses and digital learning materials.',
          'The service does not include physical delivery.',
          'Users should save their order number and pickup code.',
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
  contact: {
    title: 'Contact Support',
    badge: 'After-sales Support',
    summary: 'Contact LinguaPass for order lookup, delivery issues, duplicate payment checks, refund review, or course material re-delivery.',
    sections: [
      {
        title: 'Contact Information',
        items: [
          `Support email: ${supportEmail}.`,
          'Suggested subject: LinguaPass Support + Order Number.',
          'Please include order number, pickup code, course name, issue description, and necessary screenshots.',
        ],
      },
      {
        title: 'Support Scope',
        items: [
          'Course link invalid, extract code incorrect, download materials missing, or account abnormal.',
          'Duplicate payment, amount abnormal, course name mismatch, or payment succeeds but delivery information is not displayed.',
          'Refund eligibility review, order delivery proof, and dispute handling.',
        ],
      },
    ],
  },
};
