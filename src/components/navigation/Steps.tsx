import { type ReactNode } from 'react'

type StepStatus = 'complete' | 'current' | 'upcoming'

interface Step {
  label: string
  description?: string
  icon?: ReactNode
}

interface StepsProps {
  steps: Step[]
  currentStep: number
  variant?: 'simple' | 'circles' | 'bullets' | 'panels'
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

function getStepStatus(stepIndex: number, currentStep: number): StepStatus {
  if (stepIndex < currentStep) return 'complete'
  if (stepIndex === currentStep) return 'current'
  return 'upcoming'
}

export function Steps({
  steps,
  currentStep,
  variant = 'circles',
  orientation = 'horizontal',
  className = '',
}: StepsProps) {
  if (variant === 'simple') {
    return (
      <nav className={`${className}`}>
        <ol className={`flex ${orientation === 'vertical' ? 'flex-col space-y-4' : 'items-center space-x-4'}`}>
          {steps.map((step, index) => {
            const status = getStepStatus(index, currentStep)
            return (
              <li key={index} className="flex items-center">
                <span
                  className={`text-sm font-medium ${
                    status === 'complete' ? 'text-primary-600' :
                    status === 'current' ? 'text-primary-600' :
                    'text-neutral-500'
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && orientation === 'horizontal' && (
                  <svg className="w-5 h-5 text-neutral-300 mx-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  if (variant === 'bullets') {
    return (
      <nav className={`${className}`}>
        <ol className={`flex ${orientation === 'vertical' ? 'flex-col space-y-4' : 'items-center justify-center space-x-3'}`}>
          {steps.map((step, index) => {
            const status = getStepStatus(index, currentStep)
            return (
              <li key={index}>
                <div
                  className={`w-3 h-3 rounded-full ${
                    status === 'complete' ? 'bg-primary-500' :
                    status === 'current' ? 'bg-primary-500 ring-4 ring-primary-100' :
                    'bg-neutral-200'
                  }`}
                  aria-label={step.label}
                />
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  if (variant === 'panels') {
    return (
      <nav className={`${className}`}>
        <ol className={`flex ${orientation === 'vertical' ? 'flex-col' : ''}`}>
          {steps.map((step, index) => {
            const status = getStepStatus(index, currentStep)
            return (
              <li
                key={index}
                className={`
                  flex-1 relative
                  ${orientation === 'vertical' ? 'pb-8' : ''}
                `}
              >
                <div
                  className={`
                    p-4 border-l-4
                    ${status === 'complete' ? 'border-l-primary-500 bg-primary-50' :
                      status === 'current' ? 'border-l-primary-500 bg-white' :
                      'border-l-neutral-200 bg-neutral-50'}
                  `}
                >
                  <div className="flex items-center">
                    <span
                      className={`text-sm font-medium ${
                        status === 'complete' ? 'text-primary-600' :
                        status === 'current' ? 'text-primary-600' :
                        'text-neutral-500'
                      }`}
                    >
                      Step {index + 1}
                    </span>
                    {status === 'complete' && (
                      <span className="ml-2 text-primary-500">
                        <CheckIcon />
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-neutral-900">{step.label}</p>
                  {step.description && (
                    <p className="mt-1 text-sm text-neutral-500">{step.description}</p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  // Default: circles variant
  if (orientation === 'vertical') {
    return (
      <nav className={`${className}`}>
        <ol className="relative">
          {steps.map((step, index) => {
            const status = getStepStatus(index, currentStep)
            const isLast = index === steps.length - 1

            return (
              <li key={index} className={`relative ${!isLast ? 'pb-10' : ''}`}>
                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={`absolute left-4 top-8 -ml-px w-0.5 h-full ${
                      status === 'complete' ? 'bg-primary-500' : 'bg-neutral-200'
                    }`}
                  />
                )}

                <div className="relative flex items-start">
                  {/* Circle */}
                  <span
                    className={`
                      relative z-10 flex items-center justify-center w-8 h-8 rounded-full
                      ${status === 'complete' ? 'bg-primary-500 text-white' :
                        status === 'current' ? 'bg-white border-2 border-primary-500 text-primary-500' :
                        'bg-white border-2 border-neutral-300 text-neutral-500'}
                    `}
                  >
                    {status === 'complete' ? (
                      <CheckIcon />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </span>

                  {/* Content */}
                  <div className="ml-4">
                    <p
                      className={`text-sm font-medium ${
                        status === 'upcoming' ? 'text-neutral-500' : 'text-neutral-900'
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className="mt-1 text-sm text-neutral-500">{step.description}</p>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  // Horizontal circles
  return (
    <nav className={`${className}`}>
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const status = getStepStatus(index, currentStep)
          const isLast = index === steps.length - 1

          return (
            <li key={index} className={`relative ${!isLast ? 'flex-1' : ''}`}>
              <div className="flex items-center">
                {/* Circle */}
                <span
                  className={`
                    relative z-10 flex items-center justify-center w-10 h-10 rounded-full
                    ${status === 'complete' ? 'bg-primary-500 text-white' :
                      status === 'current' ? 'bg-white border-2 border-primary-500 text-primary-500' :
                      'bg-white border-2 border-neutral-300 text-neutral-500'}
                  `}
                >
                  {status === 'complete' ? (
                    <CheckIcon />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </span>

                {/* Connector Line */}
                {!isLast && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      status === 'complete' ? 'bg-primary-500' : 'bg-neutral-200'
                    }`}
                  />
                )}
              </div>

              {/* Label */}
              <div className="mt-2">
                <p
                  className={`text-sm font-medium ${
                    status === 'upcoming' ? 'text-neutral-500' : 'text-neutral-900'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Progress Bar Component
interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  variant = 'default',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const colorStyles = {
    default: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  }

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex justify-between mb-2">
          {label && <span className="text-sm font-medium text-neutral-700">{label}</span>}
          {showValue && <span className="text-sm text-neutral-500">{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className={`w-full bg-neutral-200 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className={`${sizeStyles[size]} ${colorStyles[variant]} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

Steps.displayName = 'Steps'
ProgressBar.displayName = 'ProgressBar'
