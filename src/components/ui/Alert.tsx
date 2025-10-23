import type { ReactNode } from 'react';
import classNames from 'classnames';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  variant?: AlertVariant;
}

const variantStyles: Record<AlertVariant, string> = {
  info: 'bg-[color:var(--bgColor-muted)] border-[color:var(--borderColor-muted)]',
  success: 'bg-bg-success-muted border-[color:var(--borderColor-success-muted)]',
  warning:
    'bg-[color:var(--bgColor-attention-muted)] border-[color:var(--borderColor-attention-muted)]',
  error: 'bg-[color:var(--bgColor-danger-muted)] border-[color:var(--borderColor-danger-muted)]',
};

const Alert = ({ title, children, className, variant = 'info' }: AlertProps) => {
  return (
    <div
      className={classNames(
        'not-prose text-default rounded-2xl border px-4 py-3 text-sm shadow-sm',
        variantStyles[variant],
        className,
      )}
    >
      {title && <div className='mb-1 text-sm font-semibold'>{title}</div>}
      {children}
    </div>
  );
};

export default Alert;
