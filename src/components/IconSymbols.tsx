import React, { ForwardRefRenderFunction } from 'react';
import classNames from 'classnames';
import { css } from '@emotion/css';

const iconCss = css`
  font-family: 'Material Symbols Outlined', emoji;
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  user-select: none;
  transition: font-variation-settings 200ms cubic-bezier(0.2, 0, 0, 1);
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
`;
type IconSymbolsProps = {
  icon: string;
  className?: string;
  size?: number;
  onClick?: () => void;
};
const IconSymbols: ForwardRefRenderFunction<HTMLElement, IconSymbolsProps> = (
  { className, icon, onClick, size }: IconSymbolsProps,
  ref,
) => {
  return (
    <i
      ref={ref}
      data-icon={icon}
      onClick={onClick}
      className={classNames(iconCss, css({ fontSize: size ? `${size}px` : 'inherit' }), className)}
    >
      {icon}
    </i>
  );
};
export default React.forwardRef(IconSymbols);
