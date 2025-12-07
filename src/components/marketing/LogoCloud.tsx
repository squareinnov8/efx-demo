import { type ReactNode } from 'react'

interface Logo {
  name: string
  src?: string
  svg?: ReactNode
  href?: string
}

interface LogoCloudProps {
  logos: Logo[]
  title?: string
  variant?: 'default' | 'grid' | 'marquee'
  grayscale?: boolean
  className?: string
}

export function LogoCloud({
  logos,
  title,
  variant = 'default',
  grayscale = true,
  className = '',
}: LogoCloudProps) {
  const logoClasses = `
    h-8 md:h-10 w-auto
    ${grayscale ? 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100' : ''}
    transition-all duration-200
  `

  const renderLogo = (logo: Logo, index: number) => {
    const content = logo.svg ? (
      <div className={logoClasses}>{logo.svg}</div>
    ) : (
      <img
        src={logo.src}
        alt={logo.name}
        className={logoClasses}
      />
    )

    if (logo.href) {
      return (
        <a
          key={index}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center"
        >
          {content}
        </a>
      )
    }

    return (
      <div key={index} className="flex items-center justify-center">
        {content}
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={className}>
        {title && (
          <p className="text-center text-sm font-medium text-neutral-500 mb-8 uppercase tracking-wide">
            {title}
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {logos.map(renderLogo)}
        </div>
      </div>
    )
  }

  if (variant === 'marquee') {
    return (
      <div className={`overflow-hidden ${className}`}>
        {title && (
          <p className="text-center text-sm font-medium text-neutral-500 mb-8 uppercase tracking-wide">
            {title}
          </p>
        )}
        <div className="flex animate-marquee">
          <div className="flex items-center gap-16 min-w-full">
            {logos.map(renderLogo)}
          </div>
          <div className="flex items-center gap-16 min-w-full">
            {logos.map(renderLogo)}
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={className}>
      {title && (
        <p className="text-center text-sm font-medium text-neutral-500 mb-8 uppercase tracking-wide">
          {title}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {logos.map(renderLogo)}
      </div>
    </div>
  )
}

// Logo Cloud Section
interface LogoCloudSectionProps {
  title?: string
  subtitle?: string
  logos: Logo[]
  variant?: 'light' | 'dark'
  className?: string
}

export function LogoCloudSection({
  title = 'Trusted by industry leaders',
  subtitle,
  logos,
  variant = 'light',
  className = '',
}: LogoCloudSectionProps) {
  return (
    <section
      className={`
        py-12 md:py-16
        ${variant === 'dark' ? 'bg-neutral-900' : 'bg-white'}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p
            className={`text-sm font-medium uppercase tracking-wide ${
              variant === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
            }`}
          >
            {title}
          </p>
          {subtitle && (
            <p
              className={`mt-2 text-lg ${
                variant === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
        <LogoCloud logos={logos} grayscale={variant === 'light'} />
      </div>
    </section>
  )
}

// Social Proof with stats
interface SocialProofProps {
  stats: { value: string; label: string }[]
  logos?: Logo[]
  variant?: 'default' | 'centered'
  className?: string
}

export function SocialProof({
  stats,
  logos = [],
  variant = 'default',
  className = '',
}: SocialProofProps) {
  if (variant === 'centered') {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-8">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-3xl md:text-4xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
        {logos.length > 0 && <LogoCloud logos={logos} />}
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
      {logos.length > 0 && (
        <LogoCloud logos={logos} title="Trusted by leading companies" />
      )}
    </div>
  )
}

LogoCloud.displayName = 'LogoCloud'
LogoCloudSection.displayName = 'LogoCloudSection'
SocialProof.displayName = 'SocialProof'
