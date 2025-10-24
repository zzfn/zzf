import type { CSSProperties, ReactNode } from 'react';

export interface GlassCardProps {
  children: ReactNode;
  /** 圆角大小，默认 2rem */
  rounded?: '2rem' | '3xl' | 'xl';
  /** 背景模糊程度，默认 xl */
  blur?: 'xl' | 'lg' | 'md';
  /** 悬停缩放效果，默认 1.02 */
  hoverScale?: '1.01' | '1.02' | '1.03' | 'none';
  /** 是否显示光晕效果 */
  showGlow?: boolean;
  /** 光晕位置 */
  glowPosition?: 'top-right' | 'top-left' | 'top-center' | 'center';
  /** 光晕颜色（CSS变量），默认 var(--color-bg-accent-emphasis) */
  glowColor?: string;
  /** 自定义渐变起始色，默认 from-[color:color-mix(in_srgb,var(--color-bg-default)_90%,transparent)] */
  gradientFrom?: string;
  /** 自定义渐变结束色，默认 to-[color:color-mix(in_srgb,var(--color-bg-muted)_80%,transparent)] */
  gradientTo?: string;
  /** 动画延迟（毫秒） */
  animationDelay?: number;
  /** 是否显示进入动画 */
  showAnimation?: boolean;
  /** 额外的容器类名 */
  className?: string;
  /** 额外的内容层类名 */
  contentClassName?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export function GlassCard({
  children,
  rounded = '2rem',
  blur = 'xl',
  hoverScale = '1.02',
  showGlow = false,
  glowPosition = 'top-right',
  glowColor = 'var(--color-bg-accent-emphasis)',
  gradientFrom,
  gradientTo,
  animationDelay,
  showAnimation = false,
  className = '',
  contentClassName = '',
  style,
}: GlassCardProps) {
  // 圆角样式映射
  const roundedClass = {
    '2rem': 'rounded-[2rem]',
    '3xl': 'rounded-3xl',
    'xl': 'rounded-xl',
  }[rounded];

  // 模糊程度映射
  const blurClass = {
    xl: 'backdrop-blur-xl',
    lg: 'backdrop-blur-lg',
    md: 'backdrop-blur-md',
  }[blur];

  // 悬停缩放映射
  const hoverScaleClass = {
    '1.01': 'hover:scale-[1.01]',
    '1.02': 'hover:scale-[1.02]',
    '1.03': 'hover:scale-[1.03]',
    'none': '',
  }[hoverScale];

  // 光晕位置映射
  const glowPositionClass = {
    'top-right': '-right-20 -top-20',
    'top-left': '-left-20 -top-20',
    'top-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }[glowPosition];

  // 默认渐变色
  const defaultGradientFrom =
    'from-[color:color-mix(in_srgb,var(--color-bg-default)_90%,transparent)]';
  const defaultGradientTo =
    'to-[color:color-mix(in_srgb,var(--color-bg-muted)_80%,transparent)]';

  // 动画类
  const animationClass = showAnimation
    ? 'animate-in fade-in slide-in-from-bottom-4 duration-700'
    : '';

  return (
    <div
      className={`${animationClass} ${className}`}
      style={animationDelay ? { animationDelay: `${animationDelay}ms`, ...style } : style}
    >
      <div
        className={`group relative overflow-hidden ${roundedClass} ${blurClass} transition-all duration-500 ${hoverScaleClass}`}
      >
        {/* 玻璃背景层 */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradientFrom || defaultGradientFrom} ${gradientTo || defaultGradientTo}`}
        />

        {/* 光晕效果（可选） */}
        {showGlow && (
          <div
            className={`absolute h-40 w-40 rounded-full opacity-20 blur-3xl transition-all duration-700 group-hover:opacity-30 ${glowPositionClass}`}
            style={{ backgroundColor: glowColor }}
          />
        )}

        {/* 内容层 */}
        <div
          className={`relative shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] ring-1 ring-border-muted ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
