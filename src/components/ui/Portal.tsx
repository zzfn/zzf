'use client';

import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface PortalProps {
  children: ReactNode;
  container?: Element | null;
  className?: string;
}

const Portal = ({ children, container, className }: PortalProps) => {
  const [mountNode, setMountNode] = useState<Element | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (container) {
      if (className) {
        container.className = `${container.className} ${className}`.trim();
      }
      setMountNode(container);
      return;
    }

    const element = document.createElement('div');
    if (className) {
      element.className = className;
    }
    document.body.appendChild(element);
    setMountNode(element);

    return () => {
      document.body.removeChild(element);
    };
  }, [container, className]);

  if (!mountNode) {
    return null;
  }

  return createPortal(children, mountNode);
};

export default Portal;
