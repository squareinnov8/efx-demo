import { useState, type ReactNode } from 'react'

interface AccordionItemProps {
  title: string
  children: ReactNode
  isOpen?: boolean
  onToggle?: () => void
  className?: string
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
  className = '',
}: AccordionItemProps) {
  return (
    <div className={`border-b border-neutral-200 ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-base font-medium text-neutral-900">{title}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="text-neutral-600">{children}</div>
      </div>
    </div>
  )
}

// Accordion Container Component
interface AccordionProps {
  items: { title: string; content: ReactNode }[]
  allowMultiple?: boolean
  defaultOpenIndex?: number | number[]
  variant?: 'default' | 'bordered' | 'separated'
  className?: string
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIndex,
  variant = 'default',
  className = '',
}: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>(() => {
    if (defaultOpenIndex === undefined) return []
    return Array.isArray(defaultOpenIndex) ? defaultOpenIndex : [defaultOpenIndex]
  })

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  if (variant === 'separated') {
    return (
      <div className={`space-y-4 ${className}`}>
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-neutral-200 rounded-xl overflow-hidden"
          >
            <AccordionItem
              title={item.title}
              isOpen={openIndices.includes(index)}
              onToggle={() => handleToggle(index)}
              className="px-6 border-b-0"
            >
              {item.content}
            </AccordionItem>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'bordered') {
    return (
      <div className={`border border-neutral-200 rounded-xl overflow-hidden ${className}`}>
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            isOpen={openIndices.includes(index)}
            onToggle={() => handleToggle(index)}
            className={`px-6 ${index === items.length - 1 ? 'border-b-0' : ''}`}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndices.includes(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}

// FAQ Section Component
interface FAQSectionProps {
  title?: string
  subtitle?: string
  items: { title: string; content: ReactNode }[]
  columns?: 1 | 2
  className?: string
}

export function FAQSection({
  title = 'Frequently Asked Questions',
  subtitle,
  items,
  columns = 1,
  className = '',
}: FAQSectionProps) {
  if (columns === 2) {
    const midpoint = Math.ceil(items.length / 2)
    const leftItems = items.slice(0, midpoint)
    const rightItems = items.slice(midpoint)

    return (
      <section className={`py-16 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h2>
            {subtitle && (
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Accordion items={leftItems} variant="default" />
            <Accordion items={rightItems} variant="default" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
        <Accordion items={items} variant="bordered" />
      </div>
    </section>
  )
}

AccordionItem.displayName = 'AccordionItem'
Accordion.displayName = 'Accordion'
FAQSection.displayName = 'FAQSection'
