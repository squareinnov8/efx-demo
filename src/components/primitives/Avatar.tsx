import { type ReactNode } from 'react'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy'

interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  status?: AvatarStatus
  className?: string
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: 'w-6 h-6', text: 'text-xs', status: 'w-1.5 h-1.5 border' },
  sm: { container: 'w-8 h-8', text: 'text-sm', status: 'w-2 h-2 border' },
  md: { container: 'w-10 h-10', text: 'text-sm', status: 'w-2.5 h-2.5 border-2' },
  lg: { container: 'w-12 h-12', text: 'text-base', status: 'w-3 h-3 border-2' },
  xl: { container: 'w-14 h-14', text: 'text-lg', status: 'w-3.5 h-3.5 border-2' },
  '2xl': { container: 'w-16 h-16', text: 'text-xl', status: 'w-4 h-4 border-2' },
}

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-success-500',
  offline: 'bg-neutral-300',
  away: 'bg-warning-500',
  busy: 'bg-error-500',
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  status,
  className = '',
}: AvatarProps) {
  const styles = sizeStyles[size]

  return (
    <div className={`relative inline-flex ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={`${styles.container} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`
            ${styles.container} ${styles.text}
            rounded-full bg-primary-100 text-primary-600
            flex items-center justify-center font-medium
          `}
        >
          {name ? getInitials(name) : '?'}
        </div>
      )}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            ${styles.status} ${statusColors[status]}
            rounded-full border-white
          `}
        />
      )}
    </div>
  )
}

// Avatar Group Component
interface AvatarGroupProps {
  children: ReactNode
  max?: number
  size?: AvatarSize
  className?: string
}

export function AvatarGroup({
  children,
  max = 5,
  size = 'md',
  className = '',
}: AvatarGroupProps) {
  const childArray = Array.isArray(children) ? children : [children]
  const visibleAvatars = childArray.slice(0, max)
  const remainingCount = childArray.length - max

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {visibleAvatars.map((child, index) => (
        <div key={index} className="ring-2 ring-white rounded-full">
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={`
            ${sizeStyles[size].container} ${sizeStyles[size].text}
            rounded-full bg-neutral-100 text-neutral-600
            flex items-center justify-center font-medium
            ring-2 ring-white
          `}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}

Avatar.displayName = 'Avatar'
AvatarGroup.displayName = 'AvatarGroup'
