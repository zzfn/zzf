'use client';

import type { MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import { useEffect } from 'react';
import Portal from './Portal';

interface ModalProps {
  visible: boolean;
  onCancel?: () => void;
  children: ReactNode;
  className?: string;
}

const Modal = ({ visible, onCancel, children, className }: ModalProps) => {
  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      onCancel?.();
    }
  };

  return (
    <Portal>
      <div
        role='presentation'
        onClick={handleBackdropClick}
        className='fixed inset-0 z-[1100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 transition-all duration-300'
      >
        <div
          role='dialog'
          aria-modal='true'
          className={classNames(
            'bento-card w-full max-w-lg p-6 shadow-2xl transition-all duration-300',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
