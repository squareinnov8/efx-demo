import { forwardRef, useState, useRef, useEffect, type HTMLAttributes, type ReactNode } from 'react'

// Navigation data types
export interface NavMenuItem {
  label: string
  href?: string
  description?: string
  icon?: ReactNode
  badge?: string
  children?: NavMenuItem[]
  featured?: boolean
}

export interface NavMenuSection {
  title?: string
  items: NavMenuItem[]
}

export interface NavItem {
  label: string
  href?: string
  sections?: NavMenuSection[]
  featured?: {
    title: string
    description: string
    image?: string
    href: string
    cta?: string
  }
}

interface HeaderNavigationProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode
  items: NavItem[]
  actions?: ReactNode
  topBar?: ReactNode
  sticky?: boolean
  onNavigate?: (href: string) => void
}

interface MegaMenuProps {
  item: NavItem
  isOpen: boolean
  onClose: () => void
  onNavigate?: (href: string) => void
}

// Mega Menu Dropdown Component
const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(
  ({ item, isOpen, onClose, onNavigate }, ref) => {
    if (!isOpen || !item.sections) return null

    const handleClick = (href?: string) => {
      if (href) {
        onNavigate?.(href)
        onClose()
      }
    }

    return (
      <div
        ref={ref}
        className="absolute left-0 right-0 top-full bg-white border-b border-neutral-200 shadow-xl z-[100]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Menu Sections */}
            <div className={`${item.featured ? 'col-span-9' : 'col-span-12'}`}>
              <div className="grid grid-cols-3 gap-8">
                {item.sections.map((section, sectionIdx) => (
                  <div key={sectionIdx}>
                    {section.title && (
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
                        {section.title}
                      </h3>
                    )}
                    <ul className="space-y-1">
                      {section.items.map((menuItem, itemIdx) => (
                        <li key={itemIdx}>
                          <button
                            onClick={() => handleClick(menuItem.href)}
                            className="group flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-neutral-50 transition-colors w-full text-left"
                          >
                            {menuItem.icon && (
                              <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary-50 text-primary-500 group-hover:bg-primary-100 transition-colors">
                                {menuItem.icon}
                              </span>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-neutral-900 group-hover:text-primary-500 transition-colors">
                                  {menuItem.label}
                                </span>
                                {menuItem.badge && (
                                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gold/20 text-gold-dark rounded-full">
                                    {menuItem.badge}
                                  </span>
                                )}
                              </div>
                              {menuItem.description && (
                                <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
                                  {menuItem.description}
                                </p>
                              )}
                            </div>
                            <svg
                              className="shrink-0 w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Section */}
            {item.featured && (
              <div className="col-span-3 border-l border-neutral-200 pl-8">
                <div className="rounded-lg bg-neutral-50 overflow-hidden">
                  {item.featured.image && (
                    <img
                      src={item.featured.image}
                      alt={item.featured.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-neutral-900">
                      {item.featured.title}
                    </h4>
                    <p className="mt-1 text-sm text-neutral-600">
                      {item.featured.description}
                    </p>
                    <button
                      onClick={() => handleClick(item.featured?.href)}
                      className="mt-3 inline-flex items-center text-sm font-medium text-primary-500 hover:text-primary-600"
                    >
                      {item.featured.cta || 'Learn more'}
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

MegaMenu.displayName = 'MegaMenu'

// Main Header Navigation Component
export const HeaderNavigation = forwardRef<HTMLElement, HeaderNavigationProps>(
  ({ logo, items, actions, topBar, sticky = true, onNavigate, className = '', ...props }, ref) => {
    const [openMenu, setOpenMenu] = useState<string | null>(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Close menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (navRef.current && !navRef.current.contains(event.target as Node)) {
          setOpenMenu(null)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleMouseEnter = (label: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setOpenMenu(label)
    }

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setOpenMenu(null)
      }, 150)
    }

    const handleNavigate = (href: string) => {
      onNavigate?.(href)
      setOpenMenu(null)
      setMobileMenuOpen(false)
    }

    // Find the currently open item for the mega menu
    const openItem = items.find(item => item.label === openMenu && item.sections)

    return (
      <header
        ref={ref}
        className={`
          bg-white relative
          ${sticky ? 'sticky top-0 z-[999]' : ''}
          ${className}
        `}
        {...props}
      >
        {/* Top Bar (optional) */}
        {topBar && (
          <div className="bg-neutral-900 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {topBar}
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <div ref={navRef} className="relative border-b border-neutral-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              {logo && (
                <div className="flex shrink-0 items-center">
                  {logo}
                </div>
              )}

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex lg:items-center lg:gap-1">
                {items.map((item) => (
                  <div
                    key={item.label}
                    onMouseEnter={() => item.sections && handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => item.href ? handleNavigate(item.href) : setOpenMenu(openMenu === item.label ? null : item.label)}
                      className={`
                        inline-flex items-center gap-1 px-4 py-2
                        text-sm font-medium rounded-md
                        transition-colors duration-150
                        ${openMenu === item.label
                          ? 'text-primary-500 bg-primary-50'
                          : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50'
                        }
                      `}
                    >
                      {item.label}
                      {item.sections && (
                        <svg
                          className={`w-4 h-4 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {actions}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                >
                  <span className="sr-only">Open menu</span>
                  {mobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mega Menu - positioned relative to nav container */}
          {openItem && (
            <div
              onMouseEnter={() => handleMouseEnter(openItem.label)}
              onMouseLeave={handleMouseLeave}
            >
              <MegaMenu
                item={openItem}
                isOpen={true}
                onClose={() => setOpenMenu(null)}
                onNavigate={handleNavigate}
              />
            </div>
          )}

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <MobileNavigation
              items={items}
              onNavigate={handleNavigate}
              onClose={() => setMobileMenuOpen(false)}
            />
          )}
        </div>
      </header>
    )
  }
)

HeaderNavigation.displayName = 'HeaderNavigation'

// Mobile Navigation Component
interface MobileNavigationProps {
  items: NavItem[]
  onNavigate: (href: string) => void
  onClose: () => void
}

const MobileNavigation = ({ items, onNavigate }: MobileNavigationProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    )
  }

  return (
    <div className="lg:hidden border-t border-neutral-200 bg-white">
      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="px-4 py-4 space-y-1">
          {items.map((item) => (
            <div key={item.label} className="border-b border-neutral-100 last:border-0">
              <button
                onClick={() => item.sections ? toggleExpanded(item.label) : onNavigate(item.href || '/')}
                className="flex items-center justify-between w-full py-3 text-left"
              >
                <span className="font-medium text-neutral-900">{item.label}</span>
                {item.sections && (
                  <svg
                    className={`w-5 h-5 text-neutral-500 transition-transform ${expandedItems.includes(item.label) ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {/* Expanded Submenu */}
              {item.sections && expandedItems.includes(item.label) && (
                <div className="pb-4 pl-4 space-y-4">
                  {item.sections.map((section, sectionIdx) => (
                    <div key={sectionIdx}>
                      {section.title && (
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                          {section.title}
                        </h4>
                      )}
                      <ul className="space-y-1">
                        {section.items.map((menuItem, itemIdx) => (
                          <li key={itemIdx}>
                            <button
                              onClick={() => menuItem.href && onNavigate(menuItem.href)}
                              className="flex items-center gap-3 py-2 w-full text-left"
                            >
                              {menuItem.icon && (
                                <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-primary-50 text-primary-500">
                                  {menuItem.icon}
                                </span>
                              )}
                              <div>
                                <span className="text-sm font-medium text-neutral-700">
                                  {menuItem.label}
                                </span>
                                {menuItem.badge && (
                                  <span className="ml-2 inline-flex items-center px-1.5 py-0.5 text-xs font-medium bg-gold/20 text-gold-dark rounded">
                                    {menuItem.badge}
                                  </span>
                                )}
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Top Bar Component for utility navigation
interface TopBarProps {
  leftItems?: { label: string; href: string; active?: boolean }[]
  rightItems?: { label: string; href: string; icon?: ReactNode }[]
  onNavigate?: (href: string) => void
}

export const TopBar = ({ leftItems, rightItems, onNavigate }: TopBarProps) => {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      {/* Left items (Personal / Business toggle) */}
      {leftItems && (
        <div className="flex items-center gap-4">
          {leftItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate?.(item.href)}
              className={`
                font-medium transition-colors
                ${item.active ? 'text-white' : 'text-neutral-400 hover:text-white'}
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Right items (utilities) */}
      {rightItems && (
        <div className="flex items-center gap-4">
          {rightItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate?.(item.href)}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

TopBar.displayName = 'TopBar'
