import { forwardRef, type HTMLAttributes } from 'react'

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gold'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary-100 text-primary-700 ring-primary-500/20',
  secondary: 'bg-neutral-100 text-neutral-700 ring-neutral-500/20',
  success: 'bg-success-100 text-success-700 ring-success-500/20',
  warning: 'bg-warning-100 text-warning-700 ring-warning-500/20',
  error: 'bg-error-100 text-error-700 ring-error-500/20',
  info: 'bg-info-100 text-info-700 ring-info-500/20',
  gold: 'bg-gold-light text-gold-dark ring-gold/20',
}

const dotStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-neutral-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
  info: 'bg-info-500',
  gold: 'bg-gold',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-sm px-3 py-1',
}

const dotSizeStyles: Record<BadgeSize, string> = {
  sm: 'w-1 h-1',
  md: 'w-1.5 h-1.5',
  lg: 'w-2 h-2',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'secondary',
      size = 'md',
      dot = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center gap-1.5
          font-medium
          rounded-full
          ring-1 ring-inset
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {dot && (
          <span
            className={`
              rounded-full
              ${dotStyles[variant]}
              ${dotSizeStyles[size]}
            `}
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
