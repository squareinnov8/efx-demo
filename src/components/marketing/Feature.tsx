import { type ReactNode } from 'react'

interface FeatureItemProps {
  icon?: ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureItem({
  icon,
  title,
  description,
  className = '',
}: FeatureItemProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {icon && (
        <div className="inline-flex p-3 rounded-lg bg-primary-50 text-primary-500 w-fit mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  )
}

// Feature Grid Component
interface FeatureGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export function FeatureGrid({
  children,
  columns = 3,
  className = '',
}: FeatureGridProps) {
  const colsClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid ${colsClass[columns]} gap-8 ${className}`}>
      {children}
    </div>
  )
}

// Feature Card Component
interface FeatureCardProps {
  icon?: ReactNode
  title: string
  description: string
  variant?: 'default' | 'centered' | 'horizontal'
  className?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  variant = 'default',
  className = '',
}: FeatureCardProps) {
  if (variant === 'horizontal') {
    return (
      <div className={`flex gap-4 p-6 bg-white rounded-xl border border-neutral-200 ${className}`}>
        {icon && (
          <div className="shrink-0 inline-flex p-3 rounded-lg bg-primary-50 text-primary-500 h-fit">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
          <p className="text-neutral-600">{description}</p>
        </div>
      </div>
    )
  }

  if (variant === 'centered') {
    return (
      <div className={`flex flex-col items-center text-center p-6 bg-white rounded-xl border border-neutral-200 ${className}`}>
        {icon && (
          <div className="inline-flex p-3 rounded-lg bg-primary-50 text-primary-500 mb-4">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col p-6 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {icon && (
        <div className="inline-flex p-3 rounded-lg bg-primary-50 text-primary-500 w-fit mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  )
}

// Feature Section Component
interface FeatureSectionProps {
  title?: string
  subtitle?: string
  badge?: string
  children: ReactNode
  layout?: 'grid' | 'split-left' | 'split-right'
  image?: string
  className?: string
}

export function FeatureSection({
  title,
  subtitle,
  badge,
  children,
  layout = 'grid',
  image,
  className = '',
}: FeatureSectionProps) {
  if (layout === 'split-left' || layout === 'split-right') {
    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${layout === 'split-right' ? 'lg:flex-row-reverse' : ''}`}>
            <div className={layout === 'split-right' ? 'lg:order-2' : ''}>
              {badge && (
                <span className="inline-flex px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-primary-50 text-primary-600 mb-4">
                  {badge}
                </span>
              )}
              {title && (
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h2>
              )}
              {subtitle && (
                <p className="text-lg text-neutral-600 mb-8">{subtitle}</p>
              )}
              <div className="space-y-6">{children}</div>
            </div>
            {image && (
              <div className={layout === 'split-right' ? 'lg:order-1' : ''}>
                <img
                  src={image}
                  alt=""
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle || badge) && (
          <div className="text-center mb-12">
            {badge && (
              <span className="inline-flex px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-primary-50 text-primary-600 mb-4">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

FeatureItem.displayName = 'FeatureItem'
FeatureGrid.displayName = 'FeatureGrid'
FeatureCard.displayName = 'FeatureCard'
FeatureSection.displayName = 'FeatureSection'
