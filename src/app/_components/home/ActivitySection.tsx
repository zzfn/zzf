import { GlassCard } from '@/components/ui';

interface ActivityItem {
  label: string;
  color: string;
}

interface ActivitySectionProps {
  items: ActivityItem[];
}

export function ActivitySection({ items }: ActivitySectionProps) {
  return (
    <GlassCard
      showAnimation
      hoverScale="1.01"
      animationDelay={100}
      gradientFrom="from-[color:color-mix(in_srgb,var(--color-bg-default)_85%,transparent)]"
      gradientTo="to-[color:color-mix(in_srgb,var(--color-bg-muted)_75%,transparent)]"
      contentClassName="p-8"
      className="mb-12"
    >
      <h2 className='text-fg-default mb-6 text-lg font-bold sm:text-xl'>最近在做什么 ⚡️</h2>
      <div className='space-y-4'>
        {items.map((item) => (
          <div
            key={item.label}
            className='text-fg-muted flex items-center gap-3 text-sm font-medium transition-all duration-300 hover:translate-x-2 hover:text-[color:var(--color-fg-default)]'
          >
            <span
              className='h-2.5 w-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-125'
              style={{ backgroundColor: item.color }}
            ></span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
