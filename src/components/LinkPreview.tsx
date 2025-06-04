'use client';

import { useState, useRef, useEffect } from 'react';
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
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: showPreview,
    onOpenChange: setShowPreview,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
  });

  const handleMouseEnter = (url: string) => {
    setPreviewUrl(url);
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  // Ensure the component only runs on the client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
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
        ref={refs.setReference}
        onMouseEnter={() => handleMouseEnter(href)}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
      {showPreview && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className='z-50 rounded-md border bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800'
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={handleMouseLeave}
          >
            <iframe src={previewUrl} width='400' height='300' title='Preview' frameBorder='0' />
            <div
              ref={arrowRef}
              className='absolute h-2 w-2 rotate-45 bg-white dark:bg-gray-800'
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
