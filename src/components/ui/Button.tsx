'use client';

import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import classNames from 'classnames';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, type, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={classNames(
        'bg-bg-accent inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-fg-onEmphasis transition-colors duration-200',
        'hover:bg-[color:var(--bgColor-accent-emphasis)] focus-visible:ring-2 focus-visible:ring-[color:var(--borderColor-accent-emphasis)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bgColor-default)] focus-visible:outline-none',
        className,
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export default Button;
