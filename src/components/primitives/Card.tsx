import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

type CardVariant = 'elevated' | 'outlined' | 'filled'
type CardPadding = 'none' | 'sm' | 'md' | 'lg'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
  header?: ReactNode
  footer?: ReactNode
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: ReactNode
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const variantStyles: Record<CardVariant, string> = {
  elevated: 'bg-white shadow-md border border-neutral-100',
  outlined: 'bg-white border border-neutral-200',
  filled: 'bg-neutral-50 border border-neutral-100',
}

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      padding = 'md',
      header,
      footer,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          rounded-lg
          overflow-hidden
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {header}
        <div className={paddingStyles[padding]}>{children}</div>
        {footer}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          px-6 py-4
          border-b border-neutral-200
          flex items-center justify-between
          ${className}
        `}
        {...props}
      >
        {children || (
          <>
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-neutral-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-0.5 text-sm text-neutral-500">{subtitle}</p>
              )}
            </div>
            {action && <div>{action}</div>}
          </>
        )}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          px-6 py-4
          border-t border-neutral-200
          bg-neutral-50
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'
