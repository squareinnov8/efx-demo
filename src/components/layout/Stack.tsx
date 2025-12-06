import { forwardRef, type HTMLAttributes, type ElementType } from 'react'

type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
type StackSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  direction?: StackDirection
  align?: StackAlign
  justify?: StackJustify
  spacing?: StackSpacing
  wrap?: boolean
}

const directionStyles: Record<StackDirection, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
}

const alignStyles: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const justifyStyles: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const spacingStyles: Record<StackSpacing, string> = {
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
  16: 'gap-16',
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      as: Component = 'div',
      direction = 'column',
      align = 'stretch',
      justify = 'start',
      spacing = 4,
      wrap = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={`
          flex
          ${directionStyles[direction]}
          ${alignStyles[align]}
          ${justifyStyles[justify]}
          ${spacingStyles[spacing]}
          ${wrap ? 'flex-wrap' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Stack.displayName = 'Stack'

export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="row" {...props} />
)

HStack.displayName = 'HStack'

export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
)

VStack.displayName = 'VStack'
