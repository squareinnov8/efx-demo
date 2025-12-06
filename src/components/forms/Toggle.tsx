import { forwardRef, type InputHTMLAttributes } from 'react'

type ToggleSize = 'sm' | 'md' | 'lg'

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  size?: ToggleSize
}

const sizeStyles: Record<ToggleSize, { track: string; thumb: string; translate: string }> = {
  sm: {
    track: 'h-5 w-9',
    thumb: 'h-4 w-4',
    translate: 'translate-x-4',
  },
  md: {
    track: 'h-6 w-11',
    thumb: 'h-5 w-5',
    translate: 'translate-x-5',
  },
  lg: {
    track: 'h-7 w-14',
    thumb: 'h-6 w-6',
    translate: 'translate-x-7',
  },
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      description,
      size = 'md',
      disabled,
      checked,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`
    const styles = sizeStyles[size]

    return (
      <div className={`flex items-start ${className}`}>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? `${inputId}-label` : undefined}
          disabled={disabled}
          onClick={() => {
            const input = document.getElementById(inputId) as HTMLInputElement
            if (input) {
              input.click()
            }
          }}
          className={`
            relative inline-flex shrink-0
            rounded-full
            border-2 border-transparent
            transition-colors duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/50
            disabled:cursor-not-allowed disabled:opacity-50
            ${styles.track}
            ${checked ? 'bg-primary-500' : 'bg-neutral-200'}
          `}
        >
          <span
            className={`
              pointer-events-none inline-block
              rounded-full bg-white shadow-sm
              ring-0
              transition duration-200 ease-in-out
              ${styles.thumb}
              ${checked ? styles.translate : 'translate-x-0'}
            `}
          />
        </button>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                id={`${inputId}-label`}
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
          </div>
        )}
      </div>
    )
  }
)

Toggle.displayName = 'Toggle'
