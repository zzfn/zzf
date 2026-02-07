'use client';

import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import classNames from 'classnames';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        className={classNames(
          'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-[160ms] ease-out',
          'focus-visible:ring-border-accent-emphasis focus-visible:ring-offset-bg-default focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          'hover:translate-x-1 hover:rounded-none',
          variant === 'primary' && 'bg-bg-emphasis text-fg-onEmphasis hover:bg-fg-default',
          variant === 'secondary' &&
            'text-fg-default hover:bg-bg-muted bg-transparent shadow-[inset_0_0_0_1px_currentColor]',
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export default Button;
