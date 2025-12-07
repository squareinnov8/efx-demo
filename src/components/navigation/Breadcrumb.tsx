import { type ReactNode } from 'react'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: 'slash' | 'chevron' | 'arrow'
  showHome?: boolean
  className?: string
}

const HomeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
)

const ChevronIcon = () => (
  <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

const ArrowIcon = () => (
  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
)

const SlashIcon = () => (
  <span className="text-neutral-300 mx-2">/</span>
)

export function Breadcrumb({
  items,
  separator = 'chevron',
  showHome = true,
  className = '',
}: BreadcrumbProps) {
  const separators = {
    slash: <SlashIcon />,
    chevron: <ChevronIcon />,
    arrow: <ArrowIcon />,
  }

  const allItems = showHome
    ? [{ label: 'Home', href: '/', icon: <HomeIcon /> }, ...items]
    : items

  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1

          return (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">{separators[separator]}</span>}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ) : (
                <span
                  className={`flex items-center gap-1.5 text-sm ${
                    isLast ? 'font-medium text-neutral-900' : 'text-neutral-500'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Breadcrumb with container styling
interface BreadcrumbContainerProps {
  children: ReactNode
  variant?: 'default' | 'contained' | 'bordered'
  className?: string
}

export function BreadcrumbContainer({
  children,
  variant = 'default',
  className = '',
}: BreadcrumbContainerProps) {
  if (variant === 'contained') {
    return (
      <div className={`bg-neutral-50 py-3 px-4 rounded-lg ${className}`}>
        {children}
      </div>
    )
  }

  if (variant === 'bordered') {
    return (
      <div className={`border-b border-neutral-200 pb-4 ${className}`}>
        {children}
      </div>
    )
  }

  return <div className={className}>{children}</div>
}

Breadcrumb.displayName = 'Breadcrumb'
BreadcrumbContainer.displayName = 'BreadcrumbContainer'
