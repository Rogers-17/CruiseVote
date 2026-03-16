import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md',
    'text-sm font-medium transition-all duration-200',
    'disabled:pointer-events-none disabled:opacity-50',
    'outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    '[&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        /* Primary Gradient */
        default:
          'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.98]',

        /* Secondary */
        secondary: 'bg-white text-black hover:bg-gray-100 shadow-sm',

        /* Outline */
        outline: 'border border-white/20 text-white hover:bg-white/10',

        /* Ghost */
        ghost: 'text-white hover:bg-white/10',

        /* Link */
        link: 'text-blue-500 underline-offset-4 hover:underline',

        /* Destructive */
        destructive:
          'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
      },

      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-6 text-base',
        icon: 'h-9 w-9',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-11 w-11',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
