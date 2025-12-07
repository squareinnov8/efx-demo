import { type ReactNode } from 'react'
import { Avatar } from '../primitives/Avatar'

interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'website'
  href: string
}

interface TeamMemberProps {
  name: string
  role: string
  bio?: string
  avatar?: string
  socialLinks?: SocialLink[]
  variant?: 'simple' | 'card' | 'horizontal'
  className?: string
}

const socialIcons: Record<SocialLink['platform'], ReactNode> = {
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  website: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  ),
}

export function TeamCard({
  name,
  role,
  bio,
  avatar,
  socialLinks = [],
  variant = 'card',
  className = '',
}: TeamMemberProps) {
  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center gap-6 p-6 bg-white rounded-xl border border-neutral-200 ${className}`}>
        <Avatar src={avatar} name={name} size="xl" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-900">{name}</h3>
          <p className="text-primary-600 text-sm font-medium">{role}</p>
          {bio && <p className="mt-2 text-sm text-neutral-600">{bio}</p>}
          {socialLinks.length > 0 && (
            <div className="flex gap-3 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialIcons[link.platform]}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'simple') {
    return (
      <div className={`text-center ${className}`}>
        <Avatar src={avatar} name={name} size="2xl" className="mx-auto" />
        <h3 className="mt-4 text-lg font-semibold text-neutral-900">{name}</h3>
        <p className="text-primary-600 text-sm font-medium">{role}</p>
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-3 mt-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.href}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialIcons[link.platform]}
              </a>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Default: card variant
  return (
    <div
      className={`
        flex flex-col items-center text-center p-6
        bg-white rounded-xl border border-neutral-200 shadow-sm
        hover:shadow-md transition-shadow
        ${className}
      `}
    >
      <Avatar src={avatar} name={name} size="2xl" />
      <h3 className="mt-4 text-lg font-semibold text-neutral-900">{name}</h3>
      <p className="text-primary-600 text-sm font-medium">{role}</p>
      {bio && <p className="mt-3 text-sm text-neutral-600">{bio}</p>}
      {socialLinks.length > 0 && (
        <div className="flex gap-3 mt-4">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialIcons[link.platform]}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// Team Grid Component
interface TeamGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

export function TeamGrid({
  children,
  columns = 4,
  className = '',
}: TeamGridProps) {
  const colsClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid ${colsClass[columns]} gap-8 ${className}`}>
      {children}
    </div>
  )
}

// Team Section Component
interface TeamSectionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function TeamSection({
  title = 'Meet Our Team',
  subtitle,
  children,
  className = '',
}: TeamSectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}

TeamCard.displayName = 'TeamCard'
TeamGrid.displayName = 'TeamGrid'
TeamSection.displayName = 'TeamSection'
