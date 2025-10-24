'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  FloatingPortal,
} from '@floating-ui/react';

interface LinkPreviewProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkPreview({ href, children, className }: LinkPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const isBrowser = useMemo(() => typeof window !== 'undefined', []);
  const [screenWidth, setScreenWidth] = useState(() => (isBrowser ? window.screen.width : 1920));
  const [screenHeight, setScreenHeight] = useState(() => (isBrowser ? window.screen.height : 1080));

  const { refs, floatingStyles, context } = useFloating({
    open: showPreview,
    onOpenChange: setShowPreview,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowElement })],
  });
  const setReference = useCallback(
    (node: HTMLElement | null) => {
      refs.setReference(node);
    },
    [refs],
  );

  const setFloating = useCallback(
    (node: HTMLElement | null) => {
      refs.setFloating(node);
    },
    [refs],
  );

  const setArrowRef = useCallback((node: HTMLDivElement | null) => {
    setArrowElement(node);
  }, []);

  const handleMouseEnter = (url: string) => {
    setPreviewUrl(url);
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  useEffect(() => {
    if (!isBrowser) {
      return undefined;
    }
    const handleResize = () => {
      setScreenWidth(window.screen.width);
      setScreenHeight(window.screen.height);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isBrowser]);

  if (!isBrowser) {
    return (
      <a href={href} target='_blank' className={className}>
        {children}
      </a>
    );
  }

  return (
    <>
      <a
        href={href}
        target='_blank'
        className={className}
        ref={setReference}
        onMouseEnter={() => handleMouseEnter(href)}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
      {showPreview && (
        <FloatingPortal>
          <div
            ref={setFloating}
            style={floatingStyles}
            className='border-border-muted bg-bg-default z-50 rounded-md border p-2 shadow-lg'
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{
                width: `${screenWidth * 0.25}px`, // Scale the container width
                height: `${screenHeight * 0.25}px`, // Scale the container height
                overflow: 'hidden',
              }}
            >
              <iframe
                src={previewUrl}
                style={{
                  width: `${screenWidth}px`, // Use actual screen width
                  height: `${screenHeight}px`, // Use actual screen height
                  transform: 'scale(0.25)',
                  transformOrigin: 'top left',
                }}
                title='Preview'
                frameBorder='0'
              />
            </div>
            <div
              ref={setArrowRef}
              className='absolute h-2 w-2 rotate-45 bg-[color:var(--color-bg-default)]'
              style={{
                left: context.middlewareData.arrow?.x,
                top: context.middlewareData.arrow?.y,
              }}
            />
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
