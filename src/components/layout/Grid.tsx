import { forwardRef, type HTMLAttributes } from 'react'

type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'none'
type GridGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: GridCols
  colsSm?: GridCols
  colsMd?: GridCols
  colsLg?: GridCols
  colsXl?: GridCols
  gap?: GridGap
  gapX?: GridGap
  gapY?: GridGap
}

interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'full'
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6
}

const colStyles: Record<GridCols, string> = {
  none: 'grid-cols-none',
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
}

const smColStyles: Record<GridCols, string> = {
  none: 'sm:grid-cols-none',
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  12: 'sm:grid-cols-12',
}

const mdColStyles: Record<GridCols, string> = {
  none: 'md:grid-cols-none',
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  12: 'md:grid-cols-12',
}

const lgColStyles: Record<GridCols, string> = {
  none: 'lg:grid-cols-none',
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  12: 'lg:grid-cols-12',
}

const xlColStyles: Record<GridCols, string> = {
  none: 'xl:grid-cols-none',
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
  12: 'xl:grid-cols-12',
}

const gapStyles: Record<GridGap, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
}

const gapXStyles: Record<GridGap, string> = {
  0: 'gap-x-0',
  1: 'gap-x-1',
  2: 'gap-x-2',
  3: 'gap-x-3',
  4: 'gap-x-4',
  5: 'gap-x-5',
  6: 'gap-x-6',
  8: 'gap-x-8',
  10: 'gap-x-10',
  12: 'gap-x-12',
}

const gapYStyles: Record<GridGap, string> = {
  0: 'gap-y-0',
  1: 'gap-y-1',
  2: 'gap-y-2',
  3: 'gap-y-3',
  4: 'gap-y-4',
  5: 'gap-y-5',
  6: 'gap-y-6',
  8: 'gap-y-8',
  10: 'gap-y-10',
  12: 'gap-y-12',
}

const colSpanStyles: Record<1 | 2 | 3 | 4 | 5 | 6 | 12 | 'full', string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  12: 'col-span-12',
  full: 'col-span-full',
}

const rowSpanStyles: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      cols = 1,
      colsSm,
      colsMd,
      colsLg,
      colsXl,
      gap = 4,
      gapX,
      gapY,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          grid
          ${colStyles[cols]}
          ${colsSm ? smColStyles[colsSm] : ''}
          ${colsMd ? mdColStyles[colsMd] : ''}
          ${colsLg ? lgColStyles[colsLg] : ''}
          ${colsXl ? xlColStyles[colsXl] : ''}
          ${gapX !== undefined ? gapXStyles[gapX] : gapY !== undefined ? '' : gapStyles[gap]}
          ${gapY !== undefined ? gapYStyles[gapY] : ''}
          ${gapX !== undefined && gapY === undefined ? '' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Grid.displayName = 'Grid'

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ colSpan, rowSpan, className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          ${colSpan ? colSpanStyles[colSpan] : ''}
          ${rowSpan ? rowSpanStyles[rowSpan] : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GridItem.displayName = 'GridItem'
