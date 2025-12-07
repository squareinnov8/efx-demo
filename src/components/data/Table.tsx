import { type ReactNode } from 'react'

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (value: any, row: T, index: number) => ReactNode
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T, index: number) => void
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (column: string) => void
  variant?: 'default' | 'striped' | 'bordered'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SortIcon = ({ direction }: { direction?: 'asc' | 'desc' }) => {
  if (!direction) {
    return (
      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    )
  }
  return (
    <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
      />
    </svg>
  )
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  sortColumn,
  sortDirection,
  onSort,
  variant = 'default',
  size = 'md',
  className = '',
}: TableProps<T>) {
  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  const cellPadding = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  }

  const getValue = (row: T, key: string): any => {
    return key.split('.').reduce((obj, k) => obj?.[k], row)
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={`w-full ${sizeStyles[size]}`}>
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`
                  ${cellPadding[size]}
                  font-semibold text-neutral-700
                  text-${column.align || 'left'}
                  ${column.sortable ? 'cursor-pointer hover:bg-neutral-100' : ''}
                `}
                style={{ width: column.width }}
                onClick={() => column.sortable && onSort?.(String(column.key))}
              >
                <div className={`flex items-center gap-2 ${column.align === 'right' ? 'justify-end' : column.align === 'center' ? 'justify-center' : ''}`}>
                  {column.header}
                  {column.sortable && (
                    <SortIcon direction={sortColumn === column.key ? sortDirection : undefined} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row, rowIndex)}
              className={`
                border-b border-neutral-200
                ${onRowClick ? 'cursor-pointer hover:bg-neutral-50' : ''}
                ${variant === 'striped' && rowIndex % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}
              `}
            >
              {columns.map((column) => {
                const value = getValue(row, String(column.key))
                return (
                  <td
                    key={String(column.key)}
                    className={`
                      ${cellPadding[size]}
                      text-neutral-600
                      text-${column.align || 'left'}
                    `}
                  >
                    {column.render ? column.render(value, row, rowIndex) : value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="py-12 text-center text-neutral-500">
          No data available
        </div>
      )}
    </div>
  )
}

// Table Container with header and actions
interface TableContainerProps {
  title?: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export function TableContainer({
  title,
  description,
  actions,
  children,
  className = '',
}: TableContainerProps) {
  return (
    <div className={`bg-white border border-neutral-200 rounded-xl overflow-hidden ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div>
            {title && <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>}
            {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
          </div>
          {actions && <div className="flex gap-3">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

// Simple Badge component for table cells
interface TableBadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

export function TableBadge({ children, variant = 'default' }: TableBadgeProps) {
  const variantStyles = {
    default: 'bg-neutral-100 text-neutral-700',
    success: 'bg-success-50 text-success-700',
    warning: 'bg-warning-50 text-warning-700',
    error: 'bg-error-50 text-error-700',
    info: 'bg-accent-blue/10 text-accent-blue',
  }

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${variantStyles[variant]}`}>
      {children}
    </span>
  )
}

Table.displayName = 'Table'
TableContainer.displayName = 'TableContainer'
TableBadge.displayName = 'TableBadge'
