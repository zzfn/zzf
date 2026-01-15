'use client';

import { motion } from 'framer-motion';
import { ClayCard } from './ClayCard';
import { CheckCircle2 } from 'lucide-react';
import classNames from 'classnames';

export function ProgressDemo() {
  const steps = [
    { name: 'Introduction to Claymorphism', complete: true },
    { name: 'Color Theory & Playful Palettes', complete: true },
    { name: '3D Effects with Shadows', complete: false },
    { name: 'Building Modern UI Components', complete: false },
  ];

  return (
    <ClayCard color='blue' className='mx-auto w-full max-w-md'>
      <h3 className='text-fg-default mb-6 text-xl font-bold'>Ongoing Course Progress</h3>
      <div className='space-y-4'>
        {steps.map((step, i) => (
          <div key={i} className='group flex items-center gap-4'>
            <div
              className={classNames(
                'rounded-full p-2 transition-colors',
                step.complete
                  ? 'bg-bg-success-emphasis text-fg-onEmphasis'
                  : 'bg-bg-muted text-fg-muted',
              )}
            >
              {step.complete ? (
                <CheckCircle2 className='h-5 w-5 text-white' />
              ) : (
                <div className='flex h-5 w-5 items-center justify-center rounded-full border-2 border-white/30' />
              )}
            </div>
            <span
              className={classNames(
                'font-medium',
                step.complete ? 'text-fg-default' : 'text-fg-muted',
              )}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      <div className='mt-8 border-t border-white/20 pt-6'>
        <div className='mb-2 flex items-center justify-between'>
          <span className='text-fg-muted text-sm font-bold tracking-wider uppercase'>
            Overall Progress
          </span>
          <span className='text-fg-default text-sm font-bold'>50%</span>
        </div>
        <div className='h-4 overflow-hidden rounded-full bg-white/30'>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '50%' }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            className='bg-bg-accent-emphasis h-full rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]'
          />
        </div>
      </div>
    </ClayCard>
  );
}
