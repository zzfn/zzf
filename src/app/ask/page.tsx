import type { Metadata } from 'next';
import { AskSection } from './_components/AskSection';

export const metadata: Metadata = {
  title: 'AI 问答',
  description: '基于文章内容的智能问答系统',
};

export default function AskPage() {
  return (
    <div className='mx-auto max-w-3xl px-4 py-10 sm:py-12'>
      <div className='mb-8 text-center'>
        <h1 className='text-fg-default mb-3 text-3xl font-bold'>AI 问答</h1>
        <p className='text-fg-muted text-sm'>基于博客文章内容，为你提供智能回答</p>
      </div>
      <AskSection />
    </div>
  );
}
