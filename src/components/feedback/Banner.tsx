import { useState, type ReactNode } from 'react'

type BannerVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral'

interface BannerProps {
  title?: string
  children: ReactNode
  variant?: BannerVariant
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

const variantStyles: Record<BannerVariant, { bg: string; border: string; icon: string; text: string }> = {
  info: {
    bg: 'bg-accent-blue/10',
    border: 'border-accent-blue/20',
    icon: 'text-accent-blue',
    text: 'text-accent-blue',
  },
  success: {
    bg: 'bg-success-50',
    border: 'border-success-200',
    icon: 'text-success-500',
    text: 'text-success-700',
  },
  warning: {
    bg: 'bg-warning-50',
    border: 'border-warning-200',
    icon: 'text-warning-500',
    text: 'text-warning-700',
  },
  error: {
    bg: 'bg-error-50',
    border: 'border-error-200',
    icon: 'text-error-500',
    text: 'text-error-700',
  },
  neutral: {
    bg: 'bg-neutral-50',
    border: 'border-neutral-200',
    icon: 'text-neutral-500',
    text: 'text-neutral-700',
  },
}

const defaultIcons: Record<BannerVariant, ReactNode> = {
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  ),
  neutral: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export function Banner({
  title,
  children,
  variant = 'info',
  icon,
  action,
  dismissible = false,
  onDismiss,
  className = '',
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const styles = variantStyles[variant]
  const displayIcon = icon ?? defaultIcons[variant]

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <div
      className={`
        ${styles.bg} ${styles.border}
        border rounded-lg p-4
        ${className}
      `}
      role="alert"
    >
      <div className="flex">
        <div className={`shrink-0 ${styles.icon}`}>{displayIcon}</div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-semibold ${styles.text}`}>{title}</h3>
          )}
          <div className={`${title ? 'mt-1' : ''} text-sm ${styles.text}`}>{children}</div>
          {action && (
            <div className="mt-3">
              <button
                type="button"
                onClick={action.onClick}
                className={`text-sm font-medium ${styles.text} hover:underline`}
              >
                {action.label} →
              </button>
            </div>
          )}
        </div>
        {dismissible && (
          <div className="ml-4 shrink-0">
            <button
              type="button"
              onClick={handleDismiss}
              className={`${styles.icon} hover:opacity-75 transition-opacity`}
              aria-label="Dismiss"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Top Banner / Announcement Bar
interface TopBannerProps {
  children: ReactNode
  variant?: 'primary' | 'dark' | 'gradient'
  action?: {
    label: string
    href: string
  }
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

export function TopBanner({
  children,
  variant = 'primary',
  action,
  dismissible = false,
  onDismiss,
  className = '',
}: TopBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  const variantClasses = {
    primary: 'bg-primary-500 text-white',
    dark: 'bg-neutral-900 text-white',
    gradient: 'bg-gradient-to-r from-primary-500 to-primary-700 text-white',
  }

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-4 text-sm">
          <span>{children}</span>
          {action && (
            <a
              href={action.href}
              className="font-semibold underline underline-offset-2 hover:no-underline"
            >
              {action.label}
            </a>
          )}
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className="absolute right-4 hover:opacity-75 transition-opacity"
              aria-label="Dismiss"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

Banner.displayName = 'Banner'
TopBanner.displayName = 'TopBanner'
