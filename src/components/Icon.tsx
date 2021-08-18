import React from 'react';
import classNames from 'classnames';

type IconProps = {
  name: string;
  onClick?: () => void;
  color?: string;
  className?: string;
  size?: number;
};

function Icon({ name, color, size, onClick, className }: IconProps): JSX.Element {
  return (
    <svg
      onClick={onClick}
      className={classNames('icon', className)}
      style={{ color, fontSize: size && `${size}px` }}
    >
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  );
}

export default Icon;
