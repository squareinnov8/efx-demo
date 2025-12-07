import { type ReactNode } from 'react'
import { Button } from '../primitives/Button'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick?: () => void
    href?: string
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  variant?: 'default' | 'simple' | 'card'
  className?: string
}

const defaultIcons = {
  empty: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  ),
  search: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  error: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  folder: (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
  ),
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  variant = 'default',
  className = '',
}: EmptyStateProps) {
  const displayIcon = icon ?? defaultIcons.empty

  const content = (
    <div className="flex flex-col items-center text-center">
      <div className="text-neutral-300 mb-4">{displayIcon}</div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-500 max-w-sm mb-6">{description}</p>
      )}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action && (
            action.href ? (
              <a href={action.href}>
                <Button variant="primary">{action.label}</Button>
              </a>
            ) : (
              <Button variant="primary" onClick={action.onClick}>
                {action.label}
              </Button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <a href={secondaryAction.href}>
                <Button variant="outline">{secondaryAction.label}</Button>
              </a>
            ) : (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  )

  if (variant === 'simple') {
    return <div className={`py-12 ${className}`}>{content}</div>
  }

  if (variant === 'card') {
    return (
      <div
        className={`
          p-8 bg-white border border-neutral-200 rounded-xl
          ${className}
        `}
      >
        {content}
      </div>
    )
  }

  return (
    <div
      className={`
        py-12 px-4 border-2 border-dashed border-neutral-200 rounded-xl
        ${className}
      `}
    >
      {content}
    </div>
  )
}

// No Results Empty State
interface NoResultsProps {
  searchQuery?: string
  onClear?: () => void
  className?: string
}

export function NoResults({
  searchQuery,
  onClear,
  className = '',
}: NoResultsProps) {
  return (
    <EmptyState
      icon={defaultIcons.search}
      title={searchQuery ? `No results for "${searchQuery}"` : 'No results found'}
      description="Try adjusting your search or filter to find what you're looking for."
      action={onClear ? { label: 'Clear search', onClick: onClear } : undefined}
      variant="default"
      className={className}
    />
  )
}

// Error Empty State
interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load this content. Please try again.",
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <EmptyState
      icon={defaultIcons.error}
      title={title}
      description={description}
      action={onRetry ? { label: 'Try again', onClick: onRetry } : undefined}
      variant="card"
      className={className}
    />
  )
}

EmptyState.displayName = 'EmptyState'
NoResults.displayName = 'NoResults'
ErrorState.displayName = 'ErrorState'
