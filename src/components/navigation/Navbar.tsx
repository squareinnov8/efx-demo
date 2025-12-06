import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

interface NavbarProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode
  children?: ReactNode
  actions?: ReactNode
  sticky?: boolean
}

interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
  active?: boolean
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ logo, children, actions, sticky = false, className = '', ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={`
          bg-white border-b border-neutral-200
          ${sticky ? 'sticky top-0 z-40' : ''}
          ${className}
        `}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            {logo && (
              <div className="flex shrink-0 items-center">
                {logo}
              </div>
            )}

            {/* Navigation Links */}
            {children && (
              <div className="hidden md:flex md:items-center md:space-x-1">
                {children}
              </div>
            )}

            {/* Actions */}
            {actions && (
              <div className="flex items-center gap-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </nav>
    )
  }
)

Navbar.displayName = 'Navbar'

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, active = false, className = '', children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={`
          px-3 py-2
          text-sm font-medium
          rounded-md
          transition-colors duration-150
          ${active
            ? 'text-primary-500 bg-primary-50'
            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
          }
          ${className}
        `}
        {...props}
      >
        {children}
      </a>
    )
  }
)

NavLink.displayName = 'NavLink'

export const NavbarBrand = forwardRef<HTMLAnchorElement, { href?: string; children: ReactNode }>(
  ({ href = '/', children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className="flex items-center gap-2 text-xl font-bold text-primary-500"
        {...props}
      >
        {children}
      </a>
    )
  }
)

NavbarBrand.displayName = 'NavbarBrand'
