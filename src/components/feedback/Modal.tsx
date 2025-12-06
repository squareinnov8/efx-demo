import { forwardRef, type HTMLAttributes, type ReactNode, useEffect } from 'react'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  size?: ModalSize
  title?: string
  description?: string
  footer?: ReactNode
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      size = 'md',
      title,
      description,
      footer,
      closeOnOverlayClick = true,
      closeOnEsc = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!closeOnEsc) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
          onClose()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose, closeOnEsc])

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }

      return () => {
        document.body.style.overflow = ''
      }
    }, [isOpen])

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-neutral-900/50 transition-opacity"
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />

        {/* Modal positioning */}
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modal panel */}
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-describedby={description ? 'modal-description' : undefined}
            className={`
              relative w-full
              bg-white rounded-lg shadow-xl
              transform transition-all
              ${sizeStyles[size]}
              ${className}
            `}
            {...props}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="
                absolute right-4 top-4
                text-neutral-400 hover:text-neutral-500
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                rounded-md
              "
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>

            {/* Header */}
            {(title || description) && (
              <div className="px-6 pt-6 pb-4">
                {title && (
                  <h2
                    id="modal-title"
                    className="text-lg font-semibold text-neutral-900"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="mt-1 text-sm text-neutral-500"
                  >
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Content */}
            <div className={`px-6 ${title || description ? '' : 'pt-6'} pb-6`}>
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 bg-neutral-50 rounded-b-lg border-t border-neutral-200">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

Modal.displayName = 'Modal'
