import { forwardRef, type HTMLAttributes } from 'react'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
  centered?: boolean
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'xl', centered = true, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          w-full
          px-4 sm:px-6 lg:px-8
          ${sizeStyles[size]}
          ${centered ? 'mx-auto' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'
