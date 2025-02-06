'use client';
import styles from './AI.module.css';
import { useEffect, useState } from 'react';

const AI = ({ content, id }: any) => {
  const [summary, setSummary] = useState<string | null>(null);
  useEffect(() => {
    const fetchSummary = async () => {
      const summary = await fetch('/api/ai', {
        method: 'POST',
        body: JSON.stringify({ content, id }),
      });
      const json = await summary.json();
      setSummary(json.content);
    };
    fetchSummary();
  }, [content, id]);

  return (
    <div className={styles.aiWrapper}>
      <div className={styles.aiCard}>
        <div className={styles.aiHeader}>
          <div className={styles.aiIcon}>
            <svg viewBox='0 0 24 24' width='24' height='24' fill='currentColor'>
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z' />
            </svg>
          </div>
          <h3 className={styles.aiTitle}>AI 智能摘要</h3>
        </div>
        <div className={styles.aiContent}>{summary}</div>
      </div>
    </div>
  );
};
export default AI;
