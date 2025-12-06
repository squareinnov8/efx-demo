import { forwardRef, type InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, disabled, className = '', id, ...props }, ref) => {
    const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    return (
      <div className={`relative flex items-start ${className}`}>
        <div className="flex h-6 items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            className={`
              h-4 w-4
              rounded
              border
              text-primary-500
              transition-colors duration-150
              focus:ring-2 focus:ring-offset-2
              disabled:cursor-not-allowed disabled:opacity-50
              ${hasError
                ? 'border-error-500 focus:ring-error-500/30'
                : 'border-neutral-300 focus:ring-primary-500/30'
              }
            `}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={inputId}
                className={`
                  text-sm font-medium
                  ${disabled ? 'text-neutral-400' : 'text-neutral-900'}
                  ${disabled ? '' : 'cursor-pointer'}
                `}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-neutral-500">{description}</p>
            )}
            {error && (
              <p className="mt-1 text-sm text-error-600">{error}</p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
