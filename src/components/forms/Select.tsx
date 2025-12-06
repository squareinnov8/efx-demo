import { forwardRef, type SelectHTMLAttributes } from 'react'

type SelectSize = 'sm' | 'md' | 'lg'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: SelectSize
  label?: string
  helperText?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  fullWidth?: boolean
}

const sizeStyles: Record<SelectSize, string> = {
  sm: 'h-8 text-sm pl-3 pr-8',
  md: 'h-10 text-sm pl-3 pr-10',
  lg: 'h-12 text-base pl-4 pr-12',
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = 'md',
      label,
      helperText,
      error,
      options,
      placeholder,
      fullWidth = false,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-neutral-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={`
              w-full
              appearance-none
              rounded-md
              border
              bg-white
              text-neutral-900
              transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-offset-0
              disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed
              ${hasError
                ? 'border-error-500 focus:border-error-500 focus:ring-error-500/30'
                : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500/30'
              }
              ${sizeStyles[size]}
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {(helperText || error) && (
          <p
            className={`mt-1.5 text-sm ${
              hasError ? 'text-error-600' : 'text-neutral-500'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
