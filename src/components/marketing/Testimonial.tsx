import { type ReactNode } from 'react'
import { Avatar } from '../primitives/Avatar'

interface TestimonialProps {
  quote: string
  author: {
    name: string
    title?: string
    company?: string
    avatar?: string
  }
  rating?: number
  variant?: 'simple' | 'card' | 'featured'
  className?: string
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-warning-500' : 'text-neutral-200'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export function Testimonial({
  quote,
  author,
  rating,
  variant = 'simple',
  className = '',
}: TestimonialProps) {
  const content = (
    <>
      {rating && (
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} filled={star <= rating} />
          ))}
        </div>
      )}
      <blockquote className={`text-neutral-700 ${variant === 'featured' ? 'text-xl' : 'text-base'}`}>
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3 mt-4">
        <Avatar
          src={author.avatar}
          name={author.name}
          size={variant === 'featured' ? 'lg' : 'md'}
        />
        <div>
          <p className="font-semibold text-neutral-900">{author.name}</p>
          {(author.title || author.company) && (
            <p className="text-sm text-neutral-500">
              {author.title}
              {author.title && author.company && ', '}
              {author.company}
            </p>
          )}
        </div>
      </div>
    </>
  )

  if (variant === 'card') {
    return (
      <div className={`p-6 bg-white rounded-xl border border-neutral-200 shadow-sm ${className}`}>
        {content}
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className={`p-8 bg-primary-50 rounded-2xl border border-primary-100 ${className}`}>
        {content}
      </div>
    )
  }

  return <div className={className}>{content}</div>
}

// Testimonial Grid Component
interface TestimonialGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3
  className?: string
}

export function TestimonialGrid({
  children,
  columns = 3,
  className = '',
}: TestimonialGridProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <div className={`grid ${colsClass[columns]} gap-8 ${className}`}>
      {children}
    </div>
  )
}

// Testimonial Section Component
interface TestimonialSectionProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function TestimonialSection({
  title = 'What Our Customers Say',
  subtitle,
  children,
  className = '',
}: TestimonialSectionProps) {
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

Testimonial.displayName = 'Testimonial'
TestimonialGrid.displayName = 'TestimonialGrid'
TestimonialSection.displayName = 'TestimonialSection'
