import { forwardRef, type HTMLAttributes, type ReactNode, createContext, useContext } from 'react'

type TabsVariant = 'line' | 'enclosed' | 'pills'
type TabsSize = 'sm' | 'md' | 'lg'

interface TabsContextValue {
  value: string
  onChange: (value: string) => void
  variant: TabsVariant
  size: TabsSize
}

const TabsContext = createContext<TabsContextValue | null>(null)

interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  variant?: TabsVariant
  size?: TabsSize
}

interface TabListProps extends HTMLAttributes<HTMLDivElement> {}

interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  value: string
  disabled?: boolean
  icon?: ReactNode
}

interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

const sizeStyles: Record<TabsSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      onChange,
      variant = 'line',
      size = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <TabsContext.Provider value={{ value, onChange, variant, size }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

Tabs.displayName = 'Tabs'

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className = '', children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) throw new Error('TabList must be used within Tabs')

    const { variant } = context

    const variantContainerStyles: Record<TabsVariant, string> = {
      line: 'border-b border-neutral-200',
      enclosed: 'border-b border-neutral-200',
      pills: 'bg-neutral-100 p-1 rounded-lg',
    }

    return (
      <div
        ref={ref}
        role="tablist"
        className={`
          flex
          ${variantContainerStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabList.displayName = 'TabList'

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled = false, icon, className = '', children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) throw new Error('Tab must be used within Tabs')

    const { value: selectedValue, onChange, variant, size } = context
    const isSelected = value === selectedValue

    const variantStyles: Record<TabsVariant, { base: string; selected: string; hover: string }> = {
      line: {
        base: 'border-b-2 -mb-px',
        selected: 'border-primary-500 text-primary-500',
        hover: 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300',
      },
      enclosed: {
        base: 'border border-transparent -mb-px rounded-t-md',
        selected: 'border-neutral-200 border-b-white bg-white text-neutral-900',
        hover: 'text-neutral-500 hover:text-neutral-700',
      },
      pills: {
        base: 'rounded-md',
        selected: 'bg-white text-neutral-900 shadow-sm',
        hover: 'text-neutral-500 hover:text-neutral-700',
      },
    }

    const styles = variantStyles[variant]

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        disabled={disabled}
        onClick={() => onChange(value)}
        className={`
          inline-flex items-center gap-2
          font-medium
          transition-colors duration-150
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeStyles[size]}
          ${styles.base}
          ${isSelected ? styles.selected : styles.hover}
          ${className}
        `}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    )
  }
)

Tab.displayName = 'Tab'

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, className = '', children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) throw new Error('TabPanel must be used within Tabs')

    if (context.value !== value) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={`mt-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TabPanel.displayName = 'TabPanel'
