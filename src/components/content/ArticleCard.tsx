import { forwardRef, type HTMLAttributes } from 'react'

// Author info type
interface Author {
  name: string
  avatar?: string
  href?: string
}

// Tag/category type
interface Tag {
  label: string
  href?: string
  color?: 'gray' | 'primary' | 'blue' | 'green' | 'purple' | 'pink' | 'orange'
}

interface ArticleCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  href: string
  image: string
  imageAlt?: string
  title: string
  description: string
  author?: Author
  date?: string
  tags?: Tag[]
  variant?: 'default' | 'horizontal'
}

// Tag color styles
const tagColors = {
  gray: 'bg-neutral-50 text-neutral-700 border-neutral-200',
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  blue: 'bg-info-50 text-info-700 border-info-100',
  green: 'bg-success-50 text-success-700 border-success-100',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  pink: 'bg-pink-50 text-pink-700 border-pink-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
}

// Article Tag Component
const ArticleTag = ({ label, color = 'gray', href }: Tag) => {
  const colorClasses = tagColors[color] || tagColors.gray
  const Component = href ? 'a' : 'span'

  return (
    <Component
      href={href}
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-sm font-medium rounded-full
        border
        transition-colors
        ${colorClasses}
        ${href ? 'hover:bg-neutral-100' : ''}
      `}
    >
      {label}
    </Component>
  )
}

export const ArticleCard = forwardRef<HTMLElement, ArticleCardProps>(
  (
    {
      href,
      image,
      imageAlt = '',
      title,
      description,
      author,
      date,
      tags,
      variant = 'default',
      className = '',
      ...props
    },
    ref
  ) => {
    if (variant === 'horizontal') {
      return (
        <article
          ref={ref}
          className={`group ${className}`}
          {...props}
        >
          <a href={href} className="flex gap-6">
            {/* Image */}
            <div className="shrink-0 w-80 h-52 rounded-xl overflow-hidden bg-neutral-100">
              <img
                src={image}
                alt={imageAlt || title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col py-1">
              {/* Author & Date */}
              {(author || date) && (
                <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                  {author && (
                    <>
                      {author.avatar && (
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <span className="font-medium text-neutral-900">{author.name}</span>
                    </>
                  )}
                  {author && date && <span className="text-neutral-300">•</span>}
                  {date && <time>{date}</time>}
                </div>
              )}

              {/* Title */}
              <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors leading-tight">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-neutral-600 leading-relaxed line-clamp-2">
                {description}
              </p>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag, idx) => (
                    <ArticleTag key={idx} {...tag} />
                  ))}
                </div>
              )}
            </div>
          </a>
        </article>
      )
    }

    // Default vertical card
    return (
      <article
        ref={ref}
        className={`group ${className}`}
        {...props}
      >
        <a href={href} className="block">
          {/* Image */}
          <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 mb-5">
            <img
              src={image}
              alt={imageAlt || title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Author & Date */}
          {(author || date) && (
            <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
              {author && (
                <>
                  {author.avatar && (
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <span className="font-medium text-neutral-900">{author.name}</span>
                </>
              )}
              {author && date && <span className="text-neutral-300">•</span>}
              {date && <time>{date}</time>}
            </div>
          )}

          {/* Title with arrow */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors leading-snug">
              {title}
            </h3>
            <svg
              className="shrink-0 w-5 h-5 mt-0.5 text-neutral-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>

          {/* Description */}
          <p className="mt-2 text-neutral-600 leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, idx) => (
                <ArticleTag key={idx} {...tag} />
              ))}
            </div>
          )}
        </a>
      </article>
    )
  }
)

ArticleCard.displayName = 'ArticleCard'

// Featured/Hero variant - larger prominent card
interface FeaturedArticleCardProps extends Omit<ArticleCardProps, 'variant'> {
  layout?: 'overlay' | 'side-by-side'
}

export const FeaturedArticleCard = forwardRef<HTMLElement, FeaturedArticleCardProps>(
  (
    {
      href,
      image,
      imageAlt = '',
      title,
      description,
      author,
      date,
      tags,
      layout = 'side-by-side',
      className = '',
      ...props
    },
    ref
  ) => {
    if (layout === 'overlay') {
      return (
        <article
          ref={ref}
          className={`group relative ${className}`}
          {...props}
        >
          <a href={href} className="block">
            {/* Image with overlay */}
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-100 relative">
              <img
                src={image}
                alt={imageAlt || title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/40 to-transparent" />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm font-medium text-white bg-white/20 rounded-full backdrop-blur-sm"
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-tight max-w-3xl">
                  {title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-lg text-white/80 max-w-2xl line-clamp-2">
                  {description}
                </p>

                {/* Author & Date */}
                {(author || date) && (
                  <div className="flex items-center gap-3 mt-5 text-sm text-white/80">
                    {author?.avatar && (
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
                      />
                    )}
                    <div>
                      {author && <span className="font-medium text-white block">{author.name}</span>}
                      {date && <time className="text-white/60">{date}</time>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </a>
        </article>
      )
    }

    // Side-by-side layout
    return (
      <article
        ref={ref}
        className={`group ${className}`}
        {...props}
      >
        <a href={href} className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Image */}
          <div className="aspect-[16/10] md:aspect-auto md:h-full rounded-2xl overflow-hidden bg-neutral-100">
            <img
              src={image}
              alt={imageAlt || title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center py-2">
            {/* Author & Date */}
            {(author || date) && (
              <div className="flex items-center gap-3 text-sm text-neutral-600 mb-4">
                {author?.avatar && (
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                {author && <span className="font-medium text-neutral-900">{author.name}</span>}
                {author && date && <span className="text-neutral-300">•</span>}
                {date && <time>{date}</time>}
              </div>
            )}

            {/* Title */}
            <h3 className="text-2xl lg:text-3xl font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors leading-tight">
              {title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-lg text-neutral-600 leading-relaxed line-clamp-3">
              {description}
            </p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {tags.map((tag, idx) => (
                  <ArticleTag key={idx} {...tag} />
                ))}
              </div>
            )}
          </div>
        </a>
      </article>
    )
  }
)

FeaturedArticleCard.displayName = 'FeaturedArticleCard'

// Blog post list item - minimal style for lists
interface BlogPostItemProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  href: string
  title: string
  description?: string
  author?: Author
  date?: string
  image?: string
}

export const BlogPostItem = forwardRef<HTMLElement, BlogPostItemProps>(
  (
    {
      href,
      title,
      description,
      author,
      date,
      image,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <article
        ref={ref}
        className={`group py-6 border-b border-neutral-200 last:border-0 ${className}`}
        {...props}
      >
        <a href={href} className="flex gap-6">
          {/* Content */}
          <div className="flex-1">
            {/* Author & Date */}
            {(author || date) && (
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                {author && <span className="font-medium text-neutral-700">{author.name}</span>}
                {author && date && <span>•</span>}
                {date && <time>{date}</time>}
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="mt-1 text-neutral-600 line-clamp-2">
                {description}
              </p>
            )}
          </div>

          {/* Optional image */}
          {image && (
            <div className="shrink-0 w-32 h-24 rounded-lg overflow-hidden bg-neutral-100">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </a>
      </article>
    )
  }
)

BlogPostItem.displayName = 'BlogPostItem'
