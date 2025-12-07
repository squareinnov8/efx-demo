interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  siblingCount?: number
  variant?: 'default' | 'simple' | 'minimal'
  className?: string
}

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const ChevronDoubleLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
  </svg>
)

const ChevronDoubleRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
  </svg>
)

function generatePaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'dots')[] {
  const totalNumbers = siblingCount * 2 + 3 // siblings + current + first + last
  const totalBlocks = totalNumbers + 2 // + 2 for dots

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const showLeftDots = leftSiblingIndex > 2
  const showRightDots = rightSiblingIndex < totalPages - 1

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1)
    return [...leftRange, 'dots', totalPages]
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
    )
    return [1, 'dots', ...rightRange]
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  )
  return [1, 'dots', ...middleRange, 'dots', totalPages]
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
  siblingCount = 1,
  variant = 'default',
  className = '',
}: PaginationProps) {
  const pages = generatePaginationRange(currentPage, totalPages, siblingCount)

  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-between ${className}`}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className={`
            inline-flex items-center gap-1 text-sm font-medium
            ${canGoPrevious ? 'text-neutral-700 hover:text-primary-600' : 'text-neutral-300 cursor-not-allowed'}
          `}
        >
          <ChevronLeftIcon />
          Previous
        </button>
        <span className="text-sm text-neutral-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className={`
            inline-flex items-center gap-1 text-sm font-medium
            ${canGoNext ? 'text-neutral-700 hover:text-primary-600' : 'text-neutral-300 cursor-not-allowed'}
          `}
        >
          Next
          <ChevronRightIcon />
        </button>
      </div>
    )
  }

  if (variant === 'simple') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className={`
            p-2 rounded-lg border
            ${canGoPrevious
              ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              : 'border-neutral-200 text-neutral-300 cursor-not-allowed'}
          `}
        >
          <ChevronLeftIcon />
        </button>
        <span className="px-4 text-sm text-neutral-600">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className={`
            p-2 rounded-lg border
            ${canGoNext
              ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
              : 'border-neutral-200 text-neutral-300 cursor-not-allowed'}
          `}
        >
          <ChevronRightIcon />
        </button>
      </div>
    )
  }

  // Default variant
  return (
    <nav className={`flex items-center gap-1 ${className}`} aria-label="Pagination">
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={!canGoPrevious}
          className={`
            p-2 rounded-lg
            ${canGoPrevious
              ? 'text-neutral-700 hover:bg-neutral-100'
              : 'text-neutral-300 cursor-not-allowed'}
          `}
          aria-label="First page"
        >
          <ChevronDoubleLeftIcon />
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className={`
          p-2 rounded-lg
          ${canGoPrevious
            ? 'text-neutral-700 hover:bg-neutral-100'
            : 'text-neutral-300 cursor-not-allowed'}
        `}
        aria-label="Previous page"
      >
        <ChevronLeftIcon />
      </button>

      {pages.map((page, index) => {
        if (page === 'dots') {
          return (
            <span key={`dots-${index}`} className="px-3 py-2 text-neutral-400">
              ...
            </span>
          )
        }

        const isActive = page === currentPage
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium
              transition-colors
              ${isActive
                ? 'bg-primary-500 text-white'
                : 'text-neutral-700 hover:bg-neutral-100'}
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={`
          p-2 rounded-lg
          ${canGoNext
            ? 'text-neutral-700 hover:bg-neutral-100'
            : 'text-neutral-300 cursor-not-allowed'}
        `}
        aria-label="Next page"
      >
        <ChevronRightIcon />
      </button>

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoNext}
          className={`
            p-2 rounded-lg
            ${canGoNext
              ? 'text-neutral-700 hover:bg-neutral-100'
              : 'text-neutral-300 cursor-not-allowed'}
          `}
          aria-label="Last page"
        >
          <ChevronDoubleRightIcon />
        </button>
      )}
    </nav>
  )
}

Pagination.displayName = 'Pagination'
