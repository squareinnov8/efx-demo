import { forwardRef, type HTMLAttributes, type ReactNode, useEffect, useState } from 'react'

type ToastVariant = 'info' | 'success' | 'warning' | 'error'
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  duration?: number
  onClose?: () => void
  isVisible?: boolean
}

interface ToastContainerProps {
  position?: ToastPosition
  children: ReactNode
}

const variantStyles: Record<ToastVariant, { container: string; icon: string }> = {
  info: {
    container: 'bg-white border-l-4 border-l-info-500',
    icon: 'text-info-500',
  },
  success: {
    container: 'bg-white border-l-4 border-l-success-500',
    icon: 'text-success-500',
  },
  warning: {
    container: 'bg-white border-l-4 border-l-warning-500',
    icon: 'text-warning-500',
  },
  error: {
    container: 'bg-white border-l-4 border-l-error-500',
    icon: 'text-error-500',
  },
}

const positionStyles: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
}

const defaultIcons: Record<ToastVariant, ReactNode> = {
  info: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = 'info',
      title,
      description,
      icon,
      action,
      duration = 5000,
      onClose,
      isVisible = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(isVisible)
    const styles = variantStyles[variant]

    useEffect(() => {
      setVisible(isVisible)
    }, [isVisible])

    useEffect(() => {
      if (duration && visible) {
        const timer = setTimeout(() => {
          setVisible(false)
          onClose?.()
        }, duration)
        return () => clearTimeout(timer)
      }
    }, [duration, visible, onClose])

    if (!visible) return null

    return (
      <div
        ref={ref}
        role="alert"
        className={`
          w-80
          rounded-md shadow-lg
          border border-neutral-200
          p-4
          ${styles.container}
          ${className}
        `}
        {...props}
      >
        <div className="flex">
          <div className={`shrink-0 ${styles.icon}`}>
            {icon ?? defaultIcons[variant]}
          </div>
          <div className="ml-3 flex-1">
            {title && (
              <p className="text-sm font-medium text-neutral-900">{title}</p>
            )}
            {description && (
              <p className={`text-sm text-neutral-500 ${title ? 'mt-1' : ''}`}>
                {description}
              </p>
            )}
            {action && <div className="mt-3">{action}</div>}
          </div>
          {onClose && (
            <div className="ml-4 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setVisible(false)
                  onClose()
                }}
                className="
                  inline-flex rounded-md
                  text-neutral-400 hover:text-neutral-500
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                "
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Toast.displayName = 'Toast'

export const ToastContainer = ({ position = 'top-right', children }: ToastContainerProps) => {
  return (
    <div
      className={`
        fixed z-50
        flex flex-col gap-3
        ${positionStyles[position]}
      `}
    >
      {children}
    </div>
  )
}
