import { type ReactNode } from 'react'
import { Button } from '../primitives/Button'

interface HeroProps {
  badge?: string
  title: string | ReactNode
  description?: string
  primaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  image?: string
  video?: string
  variant?: 'centered' | 'split' | 'split-reverse'
  background?: 'light' | 'dark' | 'gradient' | 'image'
  backgroundImage?: string
  children?: ReactNode
  className?: string
}

export function Hero({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  video,
  variant = 'centered',
  background = 'light',
  backgroundImage,
  children,
  className = '',
}: HeroProps) {
  const bgStyles = {
    light: 'bg-white',
    dark: 'bg-neutral-900',
    gradient: 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700',
    image: '',
  }

  const textStyles = {
    light: { title: 'text-neutral-900', desc: 'text-neutral-600', badge: 'bg-primary-50 text-primary-600' },
    dark: { title: 'text-white', desc: 'text-neutral-300', badge: 'bg-white/10 text-white' },
    gradient: { title: 'text-white', desc: 'text-primary-100', badge: 'bg-white/20 text-white' },
    image: { title: 'text-white', desc: 'text-white/80', badge: 'bg-white/20 text-white' },
  }

  const colors = textStyles[background]

  const renderActions = () => (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      {primaryAction && (
        primaryAction.href ? (
          <a href={primaryAction.href}>
            <Button
              size="lg"
              variant={background === 'light' ? 'primary' : 'outline'}
              className={background !== 'light' ? '!bg-white !text-primary-600 hover:!bg-neutral-100' : ''}
            >
              {primaryAction.label}
            </Button>
          </a>
        ) : (
          <Button
            size="lg"
            variant={background === 'light' ? 'primary' : 'outline'}
            onClick={primaryAction.onClick}
            className={background !== 'light' ? '!bg-white !text-primary-600 hover:!bg-neutral-100' : ''}
          >
            {primaryAction.label}
          </Button>
        )
      )}
      {secondaryAction && (
        secondaryAction.href ? (
          <a href={secondaryAction.href}>
            <Button
              size="lg"
              variant="outline"
              className={background !== 'light' ? '!border-white !text-white hover:!bg-white/10' : ''}
            >
              {secondaryAction.label}
            </Button>
          </a>
        ) : (
          <Button
            size="lg"
            variant="outline"
            onClick={secondaryAction.onClick}
            className={background !== 'light' ? '!border-white !text-white hover:!bg-white/10' : ''}
          >
            {secondaryAction.label}
          </Button>
        )
      )}
    </div>
  )

  if (variant === 'split' || variant === 'split-reverse') {
    return (
      <section
        className={`
          relative overflow-hidden
          ${bgStyles[background]}
          ${className}
        `}
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        {background === 'image' && backgroundImage && (
          <div className="absolute inset-0 bg-neutral-900/60" />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${variant === 'split-reverse' ? 'lg:flex-row-reverse' : ''}`}>
            <div className={variant === 'split-reverse' ? 'lg:order-2' : ''}>
              {badge && (
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${colors.badge} mb-4`}>
                  {badge}
                </span>
              )}
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colors.title} leading-tight`}>
                {title}
              </h1>
              {description && (
                <p className={`mt-6 text-lg md:text-xl ${colors.desc} max-w-xl`}>
                  {description}
                </p>
              )}
              {renderActions()}
              {children}
            </div>
            <div className={variant === 'split-reverse' ? 'lg:order-1' : ''}>
              {video ? (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-2xl shadow-2xl"
                />
              ) : image ? (
                <img
                  src={image}
                  alt=""
                  className="w-full rounded-2xl shadow-2xl"
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Centered variant
  return (
    <section
      className={`
        relative overflow-hidden
        ${bgStyles[background]}
        ${className}
      `}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {background === 'image' && backgroundImage && (
        <div className="absolute inset-0 bg-neutral-900/60" />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          {badge && (
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${colors.badge} mb-4`}>
              {badge}
            </span>
          )}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colors.title} leading-tight`}>
            {title}
          </h1>
          {description && (
            <p className={`mt-6 text-lg md:text-xl ${colors.desc}`}>
              {description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            {primaryAction && (
              primaryAction.href ? (
                <a href={primaryAction.href}>
                  <Button
                    size="lg"
                    variant={background === 'light' ? 'primary' : 'outline'}
                    className={background !== 'light' ? '!bg-white !text-primary-600 hover:!bg-neutral-100' : ''}
                  >
                    {primaryAction.label}
                  </Button>
                </a>
              ) : (
                <Button
                  size="lg"
                  variant={background === 'light' ? 'primary' : 'outline'}
                  onClick={primaryAction.onClick}
                  className={background !== 'light' ? '!bg-white !text-primary-600 hover:!bg-neutral-100' : ''}
                >
                  {primaryAction.label}
                </Button>
              )
            )}
            {secondaryAction && (
              secondaryAction.href ? (
                <a href={secondaryAction.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className={background !== 'light' ? '!border-white !text-white hover:!bg-white/10' : ''}
                  >
                    {secondaryAction.label}
                  </Button>
                </a>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={secondaryAction.onClick}
                  className={background !== 'light' ? '!border-white !text-white hover:!bg-white/10' : ''}
                >
                  {secondaryAction.label}
                </Button>
              )
            )}
          </div>
          {children}
        </div>
        {(image || video) && (
          <div className="mt-16">
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl"
              />
            ) : image ? (
              <img
                src={image}
                alt=""
                className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl"
              />
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}

Hero.displayName = 'Hero'
