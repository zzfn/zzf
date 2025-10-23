'use client';

import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import classNames from 'classnames';

type IconButtonVariant = 'default' | 'bordered';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'default', type, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        className={classNames(
          'text-muted grid h-8 w-8 place-content-center rounded-md border border-border-transparent bg-bg-transparent transition-colors duration-200 ease-[cubic-bezier(0.3,0,0.5,1)]',
          'p-0',
          'flex-shrink-0 cursor-pointer select-none',
          'hover:text-default hover:bg-[color:var(--button-default-bgColor-hover,var(--color-btn-hover-bg))]',
          'focus-visible:ring-2 focus-visible:ring-[color:var(--borderColor-accent-emphasis)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bgColor-default)] focus-visible:outline-none',
          variant === 'bordered' && 'border-[color:var(--borderColor-default)]',
          className,
        )}
        {...props}
      />
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
