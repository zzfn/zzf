import React, { ForwardRefRenderFunction } from 'react';
import classNames from 'classnames';

type IconSymbolsProps = {
  icon: string;
  className?: string;
  size?: number;
  onClick?: () => void;
};
const IconSymbols: ForwardRefRenderFunction<HTMLElement, IconSymbolsProps> = (
  { className, icon, onClick }: IconSymbolsProps,
  ref,
) => {
  return (
    <i
      ref={ref}
      data-icon={icon}
      onClick={onClick}
      className={classNames('symbol_icon', className)}
    >
      {icon}
    </i>
  );
};
export default React.forwardRef(IconSymbols);
