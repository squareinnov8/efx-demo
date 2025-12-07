import { type ReactNode } from 'react'

interface StatItemProps {
  value: string | number
  label: string
  description?: string
  icon?: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatItem({
  value,
  label,
  description,
  icon,
  trend,
  className = '',
}: StatItemProps) {
  return (
    <div className={`text-center ${className}`}>
      {icon && (
        <div className="inline-flex p-3 rounded-lg bg-primary-50 text-primary-500 mb-4">
          {icon}
        </div>
      )}
      <div className="flex items-center justify-center gap-2">
        <p className="text-4xl font-bold text-neutral-900">{value}</p>
        {trend && (
          <span
            className={`
              inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
              ${trend.isPositive ? 'bg-success-50 text-success-700' : 'bg-error-50 text-error-700'}
            `}
          >
            <svg
              className={`w-3 h-3 mr-0.5 ${trend.isPositive ? '' : 'rotate-180'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {trend.value}%
          </span>
        )}
      </div>
      <p className="mt-2 text-lg font-medium text-neutral-600">{label}</p>
      {description && (
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      )}
    </div>
  )
}

// Stats Grid Component
interface StatsGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  variant?: 'simple' | 'cards' | 'bordered'
  className?: string
}

export function StatsGrid({
  children,
  columns = 4,
  variant = 'simple',
  className = '',
}: StatsGridProps) {
  const colsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }

  if (variant === 'bordered') {
    return (
      <div className={`grid ${colsClass[columns]} divide-x divide-neutral-200 ${className}`}>
        {children}
      </div>
    )
  }

  if (variant === 'cards') {
    return (
      <div className={`grid ${colsClass[columns]} gap-6 ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div className={`grid ${colsClass[columns]} gap-8 ${className}`}>
      {children}
    </div>
  )
}

// Stats Card Wrapper
interface StatsCardProps {
  children: ReactNode
  className?: string
}

export function StatsCard({ children, className = '' }: StatsCardProps) {
  return (
    <div className={`p-6 bg-white rounded-xl border border-neutral-200 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

// Stats Section Component
interface StatsSectionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  variant?: 'light' | 'dark' | 'primary'
  className?: string
}

export function StatsSection({
  title,
  subtitle,
  children,
  variant = 'light',
  className = '',
}: StatsSectionProps) {
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-neutral-900',
    primary: 'bg-primary-500',
  }

  const textClass = {
    light: 'text-neutral-900',
    dark: 'text-white',
    primary: 'text-white',
  }

  const subtitleClass = {
    light: 'text-neutral-600',
    dark: 'text-neutral-300',
    primary: 'text-primary-100',
  }

  return (
    <section className={`py-16 ${bgClass[variant]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className={`text-3xl font-bold ${textClass[variant]} mb-4`}>{title}</h2>
            )}
            {subtitle && (
              <p className={`text-lg ${subtitleClass[variant]} max-w-2xl mx-auto`}>{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

StatItem.displayName = 'StatItem'
StatsGrid.displayName = 'StatsGrid'
StatsCard.displayName = 'StatsCard'
StatsSection.displayName = 'StatsSection'
