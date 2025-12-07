import { useState, type FormEvent } from 'react'
import { Button } from '../primitives/Button'

interface NewsletterProps {
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  onSubmit?: (email: string) => void | Promise<void>
  variant?: 'inline' | 'stacked' | 'card'
  className?: string
}

export function Newsletter({
  title = 'Subscribe to our newsletter',
  description = 'Get the latest news and updates delivered to your inbox.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  onSubmit,
  variant = 'inline',
  className = '',
}: NewsletterProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      await onSubmit?.(email)
      setStatus('success')
      setMessage('Thank you for subscribing!')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (variant === 'card') {
    return (
      <div className={`p-8 bg-neutral-900 rounded-2xl ${className}`}>
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-neutral-400 mb-6">{description}</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : buttonText}
            </Button>
          </form>
          {status !== 'idle' && (
            <p className={`mt-4 text-sm ${status === 'success' ? 'text-success-400' : 'text-error-400'}`}>
              {message}
            </p>
          )}
          <p className="mt-4 text-xs text-neutral-500">
            We care about your data. Read our{' '}
            <a href="/privacy" className="underline hover:text-neutral-400">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    )
  }

  if (variant === 'stacked') {
    return (
      <div className={className}>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-600 mb-4">{description}</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          <Button
            type="submit"
            variant="primary"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : buttonText}
          </Button>
        </form>
        {status !== 'idle' && (
          <p className={`mt-3 text-sm ${status === 'success' ? 'text-success-600' : 'text-error-600'}`}>
            {message}
          </p>
        )}
      </div>
    )
  }

  // Default: inline variant
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 mb-4">{description}</p>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : buttonText}
        </Button>
      </form>
      {status !== 'idle' && (
        <p className={`mt-3 text-sm ${status === 'success' ? 'text-success-600' : 'text-error-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}

// Newsletter CTA Section
interface NewsletterSectionProps {
  title?: string
  description?: string
  onSubmit?: (email: string) => void | Promise<void>
  variant?: 'light' | 'dark' | 'primary'
  className?: string
}

export function NewsletterSection({
  title = 'Stay up to date',
  description = 'Subscribe to our newsletter to get the latest news, updates, and special offers.',
  onSubmit,
  variant = 'dark',
  className = '',
}: NewsletterSectionProps) {
  const bgStyles = {
    light: 'bg-neutral-50',
    dark: 'bg-neutral-900',
    primary: 'bg-primary-500',
  }

  const textStyles = {
    light: 'text-neutral-900',
    dark: 'text-white',
    primary: 'text-white',
  }

  const descStyles = {
    light: 'text-neutral-600',
    dark: 'text-neutral-400',
    primary: 'text-primary-100',
  }

  return (
    <section className={`py-16 ${bgStyles[variant]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <h2 className={`text-3xl font-bold ${textStyles[variant]} mb-2`}>{title}</h2>
            <p className={descStyles[variant]}>{description}</p>
          </div>
          <div className="w-full lg:w-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                onSubmit?.(formData.get('email') as string)
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`
                  flex-1 min-w-[280px] px-4 py-3 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-white/50
                  ${variant === 'light'
                    ? 'border border-neutral-300 bg-white'
                    : 'border border-white/20 bg-white/10 text-white placeholder-white/60'}
                `}
                required
              />
              <Button
                type="submit"
                variant={variant === 'light' ? 'primary' : 'outline'}
                className={variant !== 'light' ? '!border-white !text-white hover:!bg-white/10' : ''}
              >
                Subscribe
              </Button>
            </form>
            <p className={`mt-3 text-sm ${descStyles[variant]}`}>
              We care about your data. Read our{' '}
              <a href="/privacy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

Newsletter.displayName = 'Newsletter'
NewsletterSection.displayName = 'NewsletterSection'
