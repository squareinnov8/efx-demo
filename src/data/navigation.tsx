import type { NavItem } from '../components/navigation/HeaderNavigation'

// Icon components for navigation
const CreditScoreIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const CreditReportIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const DebtIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CreditCardIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
)

const FinanceIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const LoanIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const LifeStagesIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const CybersecurityIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const VideoIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const FamilyIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const AlertIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

const DisputeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const FreeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
)

const QuestionIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)

// Main Navigation Structure matching Equifax.com
export const navigationItems: NavItem[] = [
  {
    label: 'Products & Services',
    sections: [
      {
        title: 'Credit Monitoring',
        items: [
          {
            label: 'Equifax Complete™ Family Plan',
            description: 'Credit and ID theft protection for the whole family',
            href: '/products/family-plan',
            icon: <FamilyIcon />,
          },
          {
            label: 'Equifax Complete™ Premier',
            description: '3-bureau credit features & ID theft protection',
            href: '/products/premier',
            icon: <StarIcon />,
          },
          {
            label: 'Equifax Complete™',
            description: 'Credit monitoring & ID theft protection for one adult',
            href: '/products/complete',
            icon: <ShieldIcon />,
          },
          {
            label: 'Equifax Core Credit™',
            description: 'Free monthly credit score and report',
            href: '/products/core-credit',
            icon: <FreeIcon />,
            badge: 'Free',
          },
        ],
      },
      {
        title: 'Compare',
        items: [
          {
            label: 'Compare All Products',
            description: 'Find the right plan for your needs',
            href: '/products/compare',
            icon: <CreditScoreIcon />,
          },
        ],
      },
    ],
    featured: {
      title: 'Protect Your Family',
      description: 'Get comprehensive credit monitoring and identity theft protection for your entire family.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop&q=60',
      href: '/products/family-plan',
      cta: 'Learn More',
    },
  },
  {
    label: 'Credit Report Help',
    sections: [
      {
        title: 'Free Services',
        items: [
          {
            label: 'Get Your Free Credit Report',
            description: 'Request your free Equifax credit report',
            href: '/services/free-credit-report',
            icon: <CreditReportIcon />,
          },
          {
            label: 'Place a Security Freeze',
            description: 'Freeze your Equifax credit report',
            href: '/services/credit-freeze',
            icon: <LockIcon />,
          },
          {
            label: 'Request a Fraud Alert',
            description: 'Add a fraud or active duty alert',
            href: '/services/fraud-alert',
            icon: <AlertIcon />,
          },
          {
            label: 'Dispute Information',
            description: 'Dispute info on your credit report',
            href: '/services/dispute',
            icon: <DisputeIcon />,
          },
        ],
      },
      {
        title: 'Additional Services',
        items: [
          {
            label: 'Active Duty Credit Monitoring',
            description: 'For military personnel and families',
            href: '/services/military',
            icon: <ShieldIcon />,
          },
          {
            label: 'Get Free Credit Score',
            description: 'Check your VantageScore credit score',
            href: '/services/free-score',
            icon: <CreditScoreIcon />,
            badge: 'Free',
          },
        ],
      },
    ],
  },
  {
    label: 'Learn',
    sections: [
      {
        title: 'Credit Education',
        items: [
          {
            label: 'Credit Scores',
            description: 'Understand credit scores and how they work',
            href: '/education/credit-scores',
            icon: <CreditScoreIcon />,
          },
          {
            label: 'Credit Reports',
            description: 'What\'s in your credit report and why it matters',
            href: '/education/credit-reports',
            icon: <CreditReportIcon />,
          },
          {
            label: 'Fraud & Identity Theft',
            description: 'Protect yourself from fraud and ID theft',
            href: '/education/fraud',
            icon: <ShieldIcon />,
          },
          {
            label: 'Debt Management',
            description: 'Tips for managing and paying off debt',
            href: '/education/debt-management',
            icon: <DebtIcon />,
          },
        ],
      },
      {
        title: 'Personal Finance',
        items: [
          {
            label: 'Credit Cards',
            description: 'Getting and managing credit cards',
            href: '/education/credit-cards',
            icon: <CreditCardIcon />,
          },
          {
            label: 'Personal Finance',
            description: 'Money management tips and tricks',
            href: '/education/personal-finance',
            icon: <FinanceIcon />,
          },
          {
            label: 'Loans',
            description: 'Understanding different types of loans',
            href: '/education/loans',
            icon: <LoanIcon />,
          },
          {
            label: 'Life Stages',
            description: 'Financial guidance for life milestones',
            href: '/education/life-stages',
            icon: <LifeStagesIcon />,
          },
        ],
      },
      {
        title: 'More Resources',
        items: [
          {
            label: 'Cybersecurity',
            description: 'Online safety and password security',
            href: '/education/cybersecurity',
            icon: <CybersecurityIcon />,
          },
          {
            label: 'Videos',
            description: 'Watch educational videos',
            href: '/education/videos',
            icon: <VideoIcon />,
          },
          {
            label: 'Knowledge Center',
            description: 'Browse all educational articles',
            href: '/education',
            icon: <GlobeIcon />,
          },
        ],
      },
    ],
    featured: {
      title: 'What Is a Credit Report?',
      description: 'Learn what\'s included in your credit report and why it matters for your financial health.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop&q=60',
      href: '/article',
      cta: 'Read Article',
    },
  },
  {
    label: 'Credit Offers',
    sections: [
      {
        title: 'Explore Offers',
        items: [
          {
            label: 'Credit Card Offers',
            description: 'Find credit cards that may be right for you',
            href: '/offers/credit-cards',
            icon: <CreditCardIcon />,
          },
          {
            label: 'Personal Loan Rates',
            description: 'Shop and compare personal loan options',
            href: '/offers/personal-loans',
            icon: <FinanceIcon />,
          },
          {
            label: 'Auto Loan Rates',
            description: 'Compare auto loan offers',
            href: '/offers/auto-loans',
            icon: <LoanIcon />,
          },
          {
            label: 'Insurance Quotes',
            description: 'Compare home, life, and auto insurance',
            href: '/offers/insurance',
            icon: <ShieldIcon />,
          },
        ],
      },
    ],
  },
  {
    label: 'Support',
    sections: [
      {
        title: 'Get Help',
        items: [
          {
            label: 'Contact Us',
            description: 'Get in touch with customer support',
            href: '/support/contact',
            icon: <PhoneIcon />,
          },
          {
            label: 'FAQs',
            description: 'Find answers to common questions',
            href: '/support/faq',
            icon: <QuestionIcon />,
          },
        ],
      },
      {
        title: 'Quick Links',
        items: [
          {
            label: 'Security Freeze Help',
            description: 'Learn about credit freezes',
            href: '/support/freeze-help',
            icon: <LockIcon />,
          },
          {
            label: 'Dispute Help',
            description: 'How to dispute credit report info',
            href: '/support/dispute-help',
            icon: <DisputeIcon />,
          },
        ],
      },
    ],
  },
]

// Top bar navigation items
export const topBarLeftItems = [
  { label: 'Personal', href: '/personal', active: true },
  { label: 'Business', href: '/business', active: false },
]

export const topBarRightItems = [
  { label: 'About Us', href: '/about' },
  { label: 'Credit Report Help', href: '/help' },
]
