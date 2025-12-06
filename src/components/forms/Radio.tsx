import { forwardRef, type InputHTMLAttributes } from 'react'

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
}

interface RadioGroupProps {
  name: string
  label?: string
  error?: string
  options: Array<{
    value: string
    label: string
    description?: string
    disabled?: boolean
  }>
  value?: string
  onChange?: (value: string) => void
  orientation?: 'vertical' | 'horizontal'
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, disabled, className = '', id, ...props }, ref) => {
    const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className={`relative flex items-start ${className}`}>
        <div className="flex h-6 items-center">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            disabled={disabled}
            className={`
              h-4 w-4
              border border-neutral-300
              text-primary-500
              transition-colors duration-150
              focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/30
              disabled:cursor-not-allowed disabled:opacity-50
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
          </div>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

export const RadioGroup = ({
  name,
  label,
  error,
  options,
  value,
  onChange,
  orientation = 'vertical',
}: RadioGroupProps) => {
  return (
    <fieldset>
      {label && (
        <legend className="text-sm font-medium text-neutral-900 mb-3">
          {label}
        </legend>
      )}
      <div
        className={`
          ${orientation === 'horizontal' ? 'flex flex-wrap gap-6' : 'space-y-3'}
        `}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-error-600">{error}</p>
      )}
    </fieldset>
  )
}
