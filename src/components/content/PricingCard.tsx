import { type ReactNode } from 'react'
import { Button } from '../primitives/Button'

type PricingTier = 'basic' | 'complete' | 'premier'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps {
  tier: PricingTier
  title: string
  description: string
  price: number
  period?: 'month' | 'year'
  features: PricingFeature[]
  icon?: ReactNode
  ctaText?: string
  onCtaClick?: () => void
  popular?: boolean
  className?: string
}

const tierColors: Record<PricingTier, { border: string; badge: string; icon: string }> = {
  basic: {
    border: 'border-t-accent-blue',
    badge: 'bg-accent-blue/10 text-accent-blue',
    icon: 'text-accent-blue',
  },
  complete: {
    border: 'border-t-gold',
    badge: 'bg-gold/10 text-gold-dark',
    icon: 'text-gold',
  },
  premier: {
    border: 'border-t-primary-500',
    badge: 'bg-primary-50 text-primary-600',
    icon: 'text-primary-500',
  },
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-success-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5 text-neutral-300 shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
)

const ClipboardIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const defaultIcons: Record<PricingTier, ReactNode> = {
  basic: <ClipboardIcon />,
  complete: <ShieldIcon />,
  premier: <StarIcon />,
}

export function PricingCard({
  tier,
  title,
  description,
  price,
  period = 'month',
  features,
  icon,
  ctaText = 'Get Started',
  onCtaClick,
  popular = false,
  className = '',
}: PricingCardProps) {
  const colors = tierColors[tier]
  const displayIcon = icon || defaultIcons[tier]

  return (
    <div
      className={`
        relative flex flex-col bg-white rounded-xl border border-neutral-200
        border-t-4 ${colors.border}
        shadow-sm hover:shadow-lg transition-shadow duration-200
        ${popular ? 'ring-2 ring-primary-500' : ''}
        ${className}
      `}
    >
      <div className="p-6 pb-4">
        {/* Most Popular Badge */}
        {popular && (
          <div className="mb-4">
            <span className="inline-flex px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-primary-500 text-white">
              Most Popular
            </span>
          </div>
        )}

        {/* Icon */}
        <div className={`inline-flex p-3 rounded-lg bg-neutral-50 ${colors.icon} mb-4`}>
          {displayIcon}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
        <p className="text-sm text-neutral-500 mb-4">{description}</p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-bold text-neutral-900">${price.toFixed(2)}</span>
          <span className="text-neutral-500">/ {period}</span>
        </div>

        {/* CTA Button */}
        <Button
          variant={tier === 'premier' ? 'primary' : 'outline'}
          fullWidth
          onClick={onCtaClick}
        >
          {ctaText}
        </Button>
      </div>

      {/* Features Divider */}
      <div className="border-t border-neutral-200 mx-6" />

      {/* Features List */}
      <div className="p-6 pt-4 flex-1">
        <p className="text-sm font-semibold text-neutral-700 uppercase tracking-wide mb-4">
          What's included
        </p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              {feature.included ? <CheckIcon /> : <XIcon />}
              <span className={`text-sm ${feature.included ? 'text-neutral-700' : 'text-neutral-400'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Pricing Toggle Component
interface PricingToggleProps {
  isAnnual: boolean
  onChange: (isAnnual: boolean) => void
  className?: string
}

export function PricingToggle({ isAnnual, onChange, className = '' }: PricingToggleProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={`text-sm font-medium ${!isAnnual ? 'text-neutral-900' : 'text-neutral-500'}`}>
        Monthly
      </span>
      <button
        type="button"
        onClick={() => onChange(!isAnnual)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200
          ${isAnnual ? 'bg-primary-500' : 'bg-neutral-200'}
        `}
        role="switch"
        aria-checked={isAnnual}
      >
        <span
          className={`
            inline-block h-4 w-4 rounded-full bg-white shadow-sm
            transition-transform duration-200
            ${isAnnual ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      <span className={`text-sm font-medium ${isAnnual ? 'text-neutral-900' : 'text-neutral-500'}`}>
        Annually
      </span>
      {isAnnual && (
        <span className="ml-2 inline-flex px-2 py-0.5 text-xs font-semibold text-success-600 bg-success-50 rounded-full">
          Save 20%
        </span>
      )}
    </div>
  )
}

// Pricing Section Component
interface PricingSectionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function PricingSection({
  title = 'Choose Your Protection Level',
  subtitle = 'Get the credit monitoring and identity protection that fits your needs',
  children,
  className = '',
}: PricingSectionProps) {
  return (
    <section className={`py-16 bg-neutral-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {children}
        </div>
      </div>
    </section>
  )
}

PricingCard.displayName = 'PricingCard'
PricingToggle.displayName = 'PricingToggle'
PricingSection.displayName = 'PricingSection'
