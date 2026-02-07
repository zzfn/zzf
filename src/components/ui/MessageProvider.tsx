'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import Portal from './Portal';

type MessageType = 'info' | 'success' | 'error' | 'warning';

interface MessageOptions {
  content: ReactNode;
  type?: MessageType;
  duration?: number;
}

interface InternalMessage extends MessageOptions {
  id: string;
}

interface MessageApi {
  add: (options: MessageOptions) => string;
  remove: (id: string) => void;
}

const MessageContext = createContext<MessageApi | null>(null);

const variantStyles: Record<MessageType, string> = {
  info: 'bg-[color:var(--bgColor-muted)] border border-[color:var(--borderColor-muted)] text-fg-default',
  success:
    'bg-bg-success-muted border border-[color:var(--borderColor-success-muted)] text-fg-default',
  error:
    'bg-[color:var(--bgColor-danger-muted)] border border-[color:var(--borderColor-danger-muted)] text-fg-default',
  warning:
    'bg-[color:var(--bgColor-attention-muted)] border border-[color:var(--borderColor-attention-muted)] text-fg-default',
};

const DEFAULT_DURATION = 2600;

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<InternalMessage[]>([]);
  const timersRef = useRef<Record<string, number>>({});

  const remove = useCallback((id: string) => {
    setMessages((prev) => prev.filter((item) => item.id !== id));
    const timer = timersRef.current[id];
    if (timer) {
      window.clearTimeout(timer);
      delete timersRef.current[id];
    }
  }, []);

  const add = useCallback(
    (options: MessageOptions) => {
      const id = `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const message: InternalMessage = {
        id,
        type: options.type ?? 'info',
        duration: options.duration,
        content: options.content,
      };
      setMessages((prev) => [...prev, message]);
      const duration = options.duration ?? DEFAULT_DURATION;
      if (duration > 0) {
        timersRef.current[id] = window.setTimeout(() => {
          remove(id);
        }, duration);
      }
      return id;
    },
    [remove],
  );

  useEffect(
    () => () => {
      Object.values(timersRef.current).forEach((timer) => window.clearTimeout(timer));
      timersRef.current = {};
    },
    [],
  );

  const value = useMemo<MessageApi>(
    () => ({
      add,
      remove,
    }),
    [add, remove],
  );

  return (
    <MessageContext.Provider value={value}>
      {children}
      {messages.length > 0 && (
        <Portal>
          <div className='pointer-events-none fixed top-4 right-4 z-[1200] flex w-[min(400px,calc(100vw-32px))] flex-col gap-3'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={classNames(
                  'border-border-muted pointer-events-auto rounded-2xl border p-4 text-sm shadow-md transition-all',
                  variantStyles[message.type ?? 'info'],
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </Portal>
      )}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);

export default MessageProvider;
