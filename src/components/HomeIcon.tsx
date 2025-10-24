/**
 * HomeIcon 组件
 *
 * 显示一个复杂的装饰性主页图标
 * SVG源文件位于: /public/icons/home-icon.svg
 *
 * 注意：此SVG使用CSS变量进行主题化，需要内联渲染以继承样式
 */

import type { CSSProperties } from 'react';

interface HomeIconProps {
  /** 图标宽度（像素），默认300 */
  width?: number;
  /** 图标高度（像素），默认300 */
  height?: number;
  /** 额外的类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

const HomeIcon = ({
  width = 300,
  height = 300,
  className = '',
  style
}: HomeIconProps) => {
  return (
    <object
      type="image/svg+xml"
      data="/icons/home-icon.svg"
      width={width}
      height={height}
      className={className}
      style={style}
      aria-label="Home icon"
    >
      {/* Fallback for browsers that don't support object tag */}
      <img
        src="/icons/home-icon.svg"
        alt="Home icon"
        width={width}
        height={height}
      />
    </object>
  );
};

export default HomeIcon;
