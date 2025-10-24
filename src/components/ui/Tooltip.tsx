'use client';

import type { FocusEvent, MouseEvent, MutableRefObject, ReactElement, ReactNode, Ref } from 'react';
import { Children, cloneElement, useCallback, useEffect, useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FloatingArrow,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  type Placement,
} from '@floating-ui/react';
import classNames from 'classnames';
import Portal from './Portal';

interface TooltipProps<T extends HTMLElement = HTMLElement> {
  content?: ReactNode;
  placement?: Placement;
  children: ReactElement<TooltipChildProps<T>>;
}

type TriggerEventHandlers<T extends HTMLElement> = {
  onMouseEnter?: (event: MouseEvent<T>) => void;
  onMouseLeave?: (event: MouseEvent<T>) => void;
  onFocus?: (event: FocusEvent<T>) => void;
  onBlur?: (event: FocusEvent<T>) => void;
  'aria-describedby'?: string;
};

type TooltipChildProps<T extends HTMLElement> = TriggerEventHandlers<T> & {
  [key: string]: unknown;
};

function mergeRefs<T>(refsToMerge: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    refsToMerge.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as MutableRefObject<T | null>).current = node;
      }
    });
  };
}

const Tooltip = <T extends HTMLElement = HTMLElement>({
  content,
  placement = 'top',
  children,
}: TooltipProps<T>) => {
  const [open, setOpen] = useState(false);
  const [arrowElement, setArrowElement] = useState<SVGSVGElement | null>(null);
  const tooltipId = useId();

  const { refs, floatingStyles, context } = useFloating<T>({
    placement,
    middleware: [arrow({ element: arrowElement }), offset(8), flip(), shift({ padding: 8 })],
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    transform: false,
  });
  const setFloatingRef = useCallback(
    (node: HTMLElement | null) => {
      refs.setFloating(node);
    },
    [refs],
  );

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  const show = () => {
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
  };

  const child = Children.only(children);
  const childProps = child.props as TooltipChildProps<T>;
  const describedBy = childProps['aria-describedby'];
  const ariaDescribedBy = describedBy ? `${describedBy} ${tooltipId}`.trim() : tooltipId;
  const childRef = (child as unknown as { ref?: Ref<T> }).ref;

  const mergedRef = mergeRefs<T>([childRef, refs.setReference]);
  const setArrowRef = useCallback((node: SVGSVGElement | null) => {
    setArrowElement(node);
  }, []);

  const handleMouseEnter = (event: MouseEvent<T>) => {
    childProps.onMouseEnter?.(event);
    show();
  };

  const handleMouseLeave = (event: MouseEvent<T>) => {
    childProps.onMouseLeave?.(event);
    hide();
  };

  const handleFocus = (event: FocusEvent<T>) => {
    childProps.onFocus?.(event);
    show();
  };

  const handleBlur = (event: FocusEvent<T>) => {
    childProps.onBlur?.(event);
    hide();
  };

  const trigger = cloneElement(child, {
    ref: mergedRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    'aria-describedby': ariaDescribedBy,
  } as TooltipChildProps<T>);

  return (
    <>
      {trigger}
      <AnimatePresence initial={false}>
        {open ? (
          <Portal>
            <motion.div
              ref={setFloatingRef}
              id={tooltipId}
              role='tooltip'
              aria-hidden={!open}
              className={classNames(
                'pointer-events-none z-[999] max-w-xs',
                'rounded-[var(--borderRadius-medium)] bg-[color:var(--bgColor-emphasis)]',
                'text-fg-onEmphasis text-[length:var(--text-body-size-medium)]',
                'leading-[var(--text-body-lineHeight-medium)]',
              )}
              style={floatingStyles}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.3, 0, 0.5, 1] }}
            >
              <FloatingArrow
                ref={setArrowRef}
                context={context}
                className='fill-[color:var(--bgColor-emphasis)] stroke-none'
              />
              <div
                className={classNames(
                  'px-[var(--control-large-paddingInline-normal)] py-[var(--control-large-paddingBlock)]',
                  'pointer-events-none',
                )}
              >
                {content}
              </div>
            </motion.div>
          </Portal>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Tooltip;
