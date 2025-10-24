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
      const target = container;
      const classes = className
        ? className
            .split(' ')
            .map((item) => item.trim())
            .filter(Boolean)
        : [];
      if (classes.length > 0) {
        target.classList.add(...classes);
      }
      return () => {
        if (classes.length > 0) {
          target.classList.remove(...classes);
        }
      };
    }

    const element = document.createElement('div');
    if (className) {
      element.className = className;
    }
    document.body.appendChild(element);
    const rafId = window.requestAnimationFrame(() => {
      setMountNode(element);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      document.body.removeChild(element);
    };
  }, [container, className]);

  const targetNode = container ?? mountNode;

  if (!targetNode) {
    return null;
  }

  return createPortal(children, targetNode);
};

export default Portal;
