import { type ReactNode } from 'react'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  name: string
  href: string
  icon: ReactNode
}

interface FooterProps {
  logo?: ReactNode
  description?: string
  columns?: FooterColumn[]
  socialLinks?: SocialLink[]
  bottomText?: string
  bottomLinks?: FooterLink[]
  variant?: 'simple' | 'columns' | 'centered'
  className?: string
}

export function Footer({
  logo,
  description,
  columns = [],
  socialLinks = [],
  bottomText = `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  bottomLinks = [],
  variant = 'columns',
  className = '',
}: FooterProps) {
  if (variant === 'simple') {
    return (
      <footer className={`bg-neutral-900 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">{bottomText}</p>
            {bottomLinks.length > 0 && (
              <div className="flex gap-6">
                {bottomLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    )
  }

  if (variant === 'centered') {
    return (
      <footer className={`bg-neutral-900 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center text-center">
            {logo && <div className="mb-6">{logo}</div>}
            {description && (
              <p className="text-neutral-400 max-w-md mb-8">{description}</p>
            )}
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 text-neutral-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
            <div className="border-t border-neutral-800 pt-8 w-full">
              <p className="text-neutral-400 text-sm">{bottomText}</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className={`bg-neutral-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {logo && <div className="mb-4">{logo}</div>}
            {description && (
              <p className="text-neutral-400 mb-6 max-w-sm">{description}</p>
            )}
            {socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-neutral-800"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-400 text-sm">{bottomText}</p>
          {bottomLinks.length > 0 && (
            <div className="flex gap-6">
              {bottomLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-neutral-400 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
