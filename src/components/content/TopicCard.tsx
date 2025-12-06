import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

interface TopicCardProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
  title: string
  icon?: ReactNode
  articleCount?: number
}

export const TopicCard = forwardRef<HTMLAnchorElement, TopicCardProps>(
  ({ href, title, icon, articleCount, className = '', ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={`
          group flex items-center gap-3
          px-4 py-3
          bg-white
          border border-neutral-200 rounded-lg
          transition-all duration-200
          hover:bg-primary-50 hover:border-primary-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${className}
        `}
        {...props}
      >
        {icon && (
          <span className="text-primary-500 shrink-0">
            {icon}
          </span>
        )}
        <span className="flex-1 font-medium text-neutral-900 group-hover:text-primary-700">
          {title}
        </span>
        {articleCount !== undefined && (
          <span className="text-sm text-neutral-500">
            {articleCount} articles
          </span>
        )}
        <svg
          className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    )
  }
)

TopicCard.displayName = 'TopicCard'

// Pill-style variant for horizontal topic lists
export const TopicPill = forwardRef<HTMLAnchorElement, TopicCardProps>(
  ({ href, title, className = '', ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={`
          inline-flex items-center
          px-4 py-2
          bg-neutral-100
          text-neutral-700
          rounded-full
          font-medium text-sm
          transition-all duration-200
          hover:bg-primary-100 hover:text-primary-700
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${className}
        `}
        {...props}
      >
        {title}
      </a>
    )
  }
)

TopicPill.displayName = 'TopicPill'
