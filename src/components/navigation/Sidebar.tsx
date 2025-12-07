import { useState, type ReactNode } from 'react'

interface SidebarItem {
  label: string
  href?: string
  icon?: ReactNode
  badge?: string | number
  children?: SidebarItem[]
  onClick?: () => void
}

interface SidebarProps {
  items: SidebarItem[]
  logo?: ReactNode
  footer?: ReactNode
  activeItem?: string
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  className?: string
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

function SidebarItemComponent({
  item,
  activeItem,
  collapsed,
  depth = 0,
}: {
  item: SidebarItem
  activeItem?: string
  collapsed?: boolean
  depth?: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0
  const isActive = activeItem === item.label

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen)
    } else if (item.onClick) {
      item.onClick()
    }
  }

  const content = (
    <>
      {item.icon && (
        <span className={`shrink-0 ${isActive ? 'text-primary-500' : 'text-neutral-400'}`}>
          {item.icon}
        </span>
      )}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge && (
            <span className="px-2 py-0.5 text-xs font-medium bg-primary-50 text-primary-600 rounded-full">
              {item.badge}
            </span>
          )}
          {hasChildren && <ChevronIcon isOpen={isOpen} />}
        </>
      )}
    </>
  )

  const itemClasses = `
    flex items-center gap-3 px-3 py-2.5 rounded-lg
    text-sm font-medium transition-colors
    ${isActive
      ? 'bg-primary-50 text-primary-600'
      : 'text-neutral-700 hover:bg-neutral-100'}
    ${depth > 0 ? 'ml-6' : ''}
    ${collapsed ? 'justify-center' : ''}
  `

  return (
    <li>
      {item.href ? (
        <a href={item.href} className={itemClasses}>
          {content}
        </a>
      ) : (
        <button type="button" onClick={handleClick} className={`w-full ${itemClasses}`}>
          {content}
        </button>
      )}
      {hasChildren && isOpen && !collapsed && (
        <ul className="mt-1 space-y-1">
          {item.children!.map((child, index) => (
            <SidebarItemComponent
              key={index}
              item={child}
              activeItem={activeItem}
              collapsed={collapsed}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function Sidebar({
  items,
  logo,
  footer,
  activeItem,
  collapsed = false,
  onCollapse,
  className = '',
}: SidebarProps) {
  return (
    <aside
      className={`
        flex flex-col h-full
        bg-white border-r border-neutral-200
        transition-all duration-200
        ${collapsed ? 'w-16' : 'w-64'}
        ${className}
      `}
    >
      {/* Header */}
      <div className={`flex items-center h-16 px-4 border-b border-neutral-200 ${collapsed ? 'justify-center' : ''}`}>
        {logo}
        {onCollapse && !collapsed && (
          <button
            type="button"
            onClick={() => onCollapse(true)}
            className="ml-auto p-1 text-neutral-400 hover:text-neutral-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}
        {onCollapse && collapsed && (
          <button
            type="button"
            onClick={() => onCollapse(false)}
            className="p-1 text-neutral-400 hover:text-neutral-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {items.map((item, index) => (
            <SidebarItemComponent
              key={index}
              item={item}
              activeItem={activeItem}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {footer && (
        <div className={`p-4 border-t border-neutral-200 ${collapsed ? 'flex justify-center' : ''}`}>
          {footer}
        </div>
      )}
    </aside>
  )
}

// Sidebar Section for grouping items
interface SidebarSectionProps {
  title?: string
  children: ReactNode
  collapsed?: boolean
}

export function SidebarSection({ title, children, collapsed }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      {title && !collapsed && (
        <h3 className="px-3 mb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

Sidebar.displayName = 'Sidebar'
SidebarSection.displayName = 'SidebarSection'
