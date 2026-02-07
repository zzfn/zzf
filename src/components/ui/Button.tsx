'use client';

import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import classNames from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'purple' | 'yellow' | 'teal' | 'danger';

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
          'border-jan-ink inline-flex items-center justify-center rounded-2xl border-2 px-4 py-2 text-sm font-semibold shadow-[3px_3px_0_var(--color-jan-ink)] transition-all duration-200 ease-out',
          'focus-visible:ring-border-accent-emphasis focus-visible:ring-offset-bg-default focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          'hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-jan-ink)]',
          'active:translate-y-0.5 active:shadow-[1px_1px_0_var(--color-jan-ink)]',
          variant === 'primary' && 'bg-jan-ink hover:bg-jan-ink-light text-white',
          variant === 'secondary' && 'bg-bg-default text-fg-default hover:bg-jan-yellow/20',
          variant === 'purple' && 'bg-jan-purple hover:bg-jan-purple-light text-white',
          variant === 'yellow' && 'bg-jan-yellow text-jan-ink hover:bg-jan-yellow-light',
          variant === 'teal' && 'bg-jan-teal hover:bg-jan-teal-light text-white',
          variant === 'danger' && 'bg-jan-coral hover:bg-jan-coral/80 text-white',
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export default Button;
