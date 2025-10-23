'use client';

import type { FocusEvent, MouseEvent, MutableRefObject, ReactElement, ReactNode, Ref } from 'react';
import { Children, cloneElement, useCallback, useEffect, useId, useRef, useState } from 'react';
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

const Tooltip = <T extends HTMLElement = HTMLElement>({
  content,
  placement = 'top',
  children,
}: TooltipProps<T>) => {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const tooltipId = useId();

  const { refs, floatingStyles, context } = useFloating<T>({
    placement,
    middleware: [arrow({ element: arrowRef }), offset(8), flip(), shift({ padding: 8 })],
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    transform: false,
  });

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

  const mergedRef = useCallback(
    (node: T | null) => {
      if (typeof childRef === 'function') {
        childRef(node);
      } else if (childRef && typeof childRef === 'object') {
        (childRef as MutableRefObject<T | null>).current = node;
      }
      refs.setReference(node);
    },
    [childRef, refs],
  );

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
              ref={refs.setFloating}
              id={tooltipId}
              role='tooltip'
              aria-hidden={!open}
              className={classNames(
                'pointer-events-none z-[999] max-w-xs',
                'rounded-[var(--borderRadius-medium)] bg-[color:var(--bgColor-emphasis)]',
                'text-[length:var(--text-body-size-medium)] text-[color:var(--fgColor-onEmphasis)]',
                'leading-[var(--text-body-lineHeight-medium)]',
              )}
              style={floatingStyles}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.3, 0, 0.5, 1] }}
            >
              <FloatingArrow
                ref={arrowRef}
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
