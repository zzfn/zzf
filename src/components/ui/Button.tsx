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
          'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ease-out select-none cursor-pointer',
          'focus-visible:ring-border-accent-emphasis focus-visible:ring-offset-bg-default focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          'active:scale-[0.98]',
          variant === 'primary' && 'bg-fg-default text-bg-default shadow-xs hover:opacity-90',
          variant === 'secondary' && 'border border-border-muted/70 bg-bg-muted/40 text-fg-default hover:bg-bg-muted',
          variant === 'purple' && 'bg-purple-600 text-white shadow-xs hover:bg-purple-500',
          variant === 'yellow' && 'bg-amber-400 text-neutral-950 shadow-xs hover:bg-amber-300',
          variant === 'teal' && 'bg-teal-600 text-white shadow-xs hover:bg-teal-500',
          variant === 'danger' && 'bg-rose-600 text-white shadow-xs hover:bg-rose-500',
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export default Button;
