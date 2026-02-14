'use client';

import { useState, useMemo, useRef } from 'react';
import { Button, Input } from '@/components/ui';
import { Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { marked } from 'marked';

type Article = {
  id: string;
  title: string;
  summary: string;
  similarity: number;
};

type AskResponse = {
  answer: string;
  articles: Article[];
};

export function AskSection() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AskResponse | null>(null);
  const [error, setError] = useState('');
  const [streamingAnswer, setStreamingAnswer] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // 渲染 markdown
  const renderedAnswer = useMemo(() => {
    const content = isStreaming ? streamingAnswer : response?.answer || '';
    if (!content) return '';
    return marked.parse(content, { async: false }) as string;
  }, [streamingAnswer, response?.answer, isStreaming]);

  const handleAsk = async () => {
    if (!question.trim()) {
      setError('请输入问题');
      return;
    }

    // 取消之前的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 创建新的 AbortController
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError('');
    setResponse(null);
    setStreamingAnswer('');
    setIsStreaming(true);

    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/articles/rag/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          topK: 3,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        throw new Error('请求失败');
      }

      reader = res.body?.getReader() ?? null;
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法读取响应流');
      }

      let buffer = '';
      let articles: Article[] = [];
      let accumulatedAnswer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim() || !line.startsWith('data: ')) continue;

          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);

            // 处理相关文章（数组格式）
            if (Array.isArray(parsed)) {
              articles = parsed;
            }
            // 处理流式回答（有 content 字段）
            else if (parsed.content !== undefined) {
              accumulatedAnswer += parsed.content;
              setStreamingAnswer(accumulatedAnswer);
            }
            // 兼容旧格式
            else if (parsed.type === 'answer') {
              accumulatedAnswer += parsed.content;
              setStreamingAnswer(accumulatedAnswer);
            } else if (parsed.type === 'articles') {
              articles = parsed.data || [];
            }
            // 处理完整响应（兼容非流式）
            else if (parsed.data) {
              const responseData = parsed.data;
              if (responseData.answer) {
                accumulatedAnswer = responseData.answer;
                setStreamingAnswer(accumulatedAnswer);
              }
              if (responseData.articles) {
                articles = responseData.articles;
              }
            }
          } catch (e) {
            console.error('解析流数据失败:', e, '原始数据:', data);
          }
        }
      }

      setResponse({
        answer: accumulatedAnswer,
        articles: Array.isArray(articles) ? articles : [],
      });
      setIsStreaming(false);
    } catch (err) {
      // 忽略主动取消的错误
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError(err instanceof Error ? err.message : '发生错误，请稍后重试');
      setIsStreaming(false);
    } finally {
      // 确保 reader 被正确释放
      if (reader) {
        try {
          reader.releaseLock();
        } catch {
          // reader 可能已经被释放
        }
      }
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className='space-y-6'>
      {/* 输入区域 */}
      <div className='border-jan-ink bg-bg-default overflow-hidden rounded-2xl border-2 p-6 shadow-[3px_3px_0_var(--color-jan-ink)]'>
        <div className='flex gap-3'>
          <div className='flex-1'>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='问我任何关于博客内容的问题...'
              disabled={loading}
            />
            {error && <p className='text-jan-coral mt-2 text-xs'>{error}</p>}
          </div>
          <Button
            onClick={handleAsk}
            disabled={!question.trim() || loading}
            variant='primary'
            className='gap-2'
          >
            {loading ? (
              <>
                <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                生成中
              </>
            ) : (
              <>
                <Send className='h-4 w-4' />
                提问
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 回答区域 */}
      <AnimatePresence mode='wait'>
        {(response || isStreaming) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='space-y-6'
          >
            {/* AI 回答 */}
            <div className='border-jan-ink bg-bg-default overflow-hidden rounded-2xl border-2 p-6 shadow-[3px_3px_0_var(--color-jan-ink)]'>
              <div className='mb-3 flex items-center gap-2'>
                <Sparkles className='text-jan-purple h-5 w-5' />
                <h2 className='text-fg-default text-lg font-semibold'>AI 回答</h2>
                {isStreaming && (
                  <span className='text-fg-muted ml-auto flex items-center gap-1 text-xs'>
                    <span className='bg-jan-purple inline-block h-1.5 w-1.5 animate-pulse rounded-full' />
                    生成中...
                  </span>
                )}
              </div>
              <div
                className='text-fg-default prose prose-sm dark:prose-invert max-w-none leading-relaxed'
                dangerouslySetInnerHTML={{ __html: renderedAnswer }}
              />
            </div>

            {/* 相关文章 */}
            {response?.articles && response.articles.length > 0 && (
              <div>
                <h3 className='text-fg-default mb-4 text-sm font-semibold'>
                  相关文章 ({response.articles.length})
                </h3>
                <div className='space-y-3'>
                  {response.articles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={`/post/${article.id}`}
                        className='border-jan-ink bg-bg-default group block overflow-hidden rounded-2xl border-2 p-4 shadow-[2px_2px_0_var(--color-jan-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-jan-ink)]'
                      >
                        <div className='mb-2 flex items-start justify-between gap-3'>
                          <h4 className='text-fg-default group-hover:text-jan-purple line-clamp-1 flex-1 font-medium'>
                            {article.title}
                          </h4>
                          <span className='bg-jan-yellow text-jan-ink flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold'>
                            {Math.round(article.similarity * 100)}%
                          </span>
                        </div>
                        <p className='text-fg-muted line-clamp-2 text-sm'>{article.summary}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
