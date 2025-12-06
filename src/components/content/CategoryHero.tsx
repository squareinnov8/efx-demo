import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

interface CategoryHeroProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  expandedDescription?: string
  breadcrumbs?: Array<{ label: string; href: string }>
  actions?: ReactNode
}

export const CategoryHero = forwardRef<HTMLDivElement, CategoryHeroProps>(
  (
    {
      title,
      description,
      expandedDescription,
      breadcrumbs,
      actions,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`bg-primary-500 text-white ${className}`}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-primary-200">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {index > 0 && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <a
                      href={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {title}
          </h1>

          {/* Description */}
          <div className="mt-6 max-w-4xl">
            <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
              {description}
            </p>
            {expandedDescription && (
              <p className="mt-4 text-primary-200 leading-relaxed">
                {expandedDescription}
              </p>
            )}
          </div>

          {/* Actions */}
          {actions && (
            <div className="mt-8">
              {actions}
            </div>
          )}
        </div>
      </div>
    )
  }
)

CategoryHero.displayName = 'CategoryHero'
