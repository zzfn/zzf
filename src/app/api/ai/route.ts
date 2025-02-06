import { fetchData } from '@/services/api';
import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const POST = async (req: NextRequest) => {
  const json = await req.json();
  const data = await fetchData({
    endpoint: `/v1/articles/summary/${json.id}`,
  });
  if (data) {
    return Response.json({ content: data });
  }
  const openai = new OpenAI({
    baseURL: 'https://api.siliconflow.cn',
    apiKey: process.env.AI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          '你是一个能够根据Markdown格式的博客内容生成简洁总结的助手。请仔细阅读以下博客内容，并生成一个简洁的纯文本总结，内容应去除所有Markdown格式元素。总结应突出文章的核心要点，保持简明扼要，不包括任何代码、列表或格式化元素。只需返回简洁、流畅的自然语言总结。',
      },
      {
        role: 'user',
        content: `请简要总结以下Markdown格式的博客内容，并输出纯文本（无任何Markdown格式）：\n\n<${json.content}>`,
      },
    ],
    model: 'deepseek-ai/DeepSeek-V3',
  });
  const summary = completion.choices[0].message.content;
  const res = await fetchData({
    endpoint: `/v1/articles/summary/${json.id}`,
    fetchParams: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summary }),
    },
  });
  return Response.json({ content: completion.choices[0].message.content });
};
