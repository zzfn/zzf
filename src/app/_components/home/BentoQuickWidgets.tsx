'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, Users2, Coffee, Quote, ArrowUpRight } from 'lucide-react';

export function BentoQuickWidgets() {
  const quickLinks = [
    {
      title: '全站归档',
      desc: '按分类与年份检索',
      href: '/post',
      icon: BookOpen,
      color: 'hover:border-purple-500/40 hover:bg-purple-500/5',
      iconColor: 'text-purple-500',
    },
    {
      title: '留言板',
      desc: '留下你的足迹与想法',
      href: '/guestbook',
      icon: MessageSquare,
      color: 'hover:border-blue-500/40 hover:bg-blue-500/5',
      iconColor: 'text-blue-500',
    },
    {
      title: '朋友们',
      desc: '探索友链与同好',
      href: '/friends',
      icon: Users2,
      color: 'hover:border-emerald-500/40 hover:bg-emerald-500/5',
      iconColor: 'text-emerald-500',
    },
    {
      title: '生活随笔',
      desc: '日常思考与小确幸',
      href: '/moments',
      icon: Coffee,
      color: 'hover:border-amber-500/40 hover:bg-amber-500/5',
      iconColor: 'text-amber-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className='flex flex-col gap-4'
    >
      {/* 闪念便签卡片 */}
      <div className='bento-card relative overflow-hidden p-5'>
        <div className='flex items-start gap-3'>
          <Quote size={16} className='text-fg-accent flex-shrink-0 mt-0.5 opacity-80' />
          <div>
            <p className='text-xs font-medium text-fg-default leading-relaxed'>
              “代码是严谨的逻辑构筑，设计是有温度的人文共鸣。”
            </p>
            <p className='mt-1 text-[11px] text-fg-muted font-mono'>Daily Spark</p>
          </div>
        </div>
      </div>

      {/* 快捷通道四宫格 */}
      <div className='grid grid-cols-2 gap-3'>
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={`group bento-card flex flex-col justify-between p-4 transition-all duration-200 ${item.color}`}
            >
              <div className='flex items-center justify-between'>
                <Icon size={18} className={item.iconColor} />
                <ArrowUpRight
                  size={14}
                  className='text-fg-muted opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                />
              </div>
              <div className='mt-3'>
                <h4 className='text-xs font-semibold text-fg-default'>{item.title}</h4>
                <p className='text-[11px] text-fg-muted truncate mt-0.5'>{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
