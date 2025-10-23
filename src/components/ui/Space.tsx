import type { ReactNode } from 'react';
import classNames from 'classnames';

type SpaceSize = 'sm' | 'md' | 'lg';
type SpaceDirection = 'horizontal' | 'vertical';

interface SpaceProps {
  children: ReactNode;
  size?: SpaceSize;
  direction?: SpaceDirection;
  className?: string;
}

const sizeClasses: Record<SpaceSize, string> = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

const Space = ({ children, size = 'md', direction = 'horizontal', className }: SpaceProps) => {
  return (
    <div
      className={classNames(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Space;
