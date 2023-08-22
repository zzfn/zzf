import React from 'react';
import classNames from 'classnames';
import { Tooltip } from '@oc/design';
import dayjs from 'dayjs';
import { monitorStatus } from 'api/monitor';

export default async function Page() {
  const { data } = await monitorStatus({ t: Date.now() });
  return (
    <div className='flex flex-col mx-auto max-w-3xl py-10'>
      <h3 className='text-center text-2xl'>服务状态（最近24小时）</h3>
      {data?.map(([key, values]: any) => (
        <div className='flex items-center flex-wrap lg:flex-nowrap justify-between hover:bg-muted py-3 px-3 gap-y-1' key={key}>
          <div className='flex gap-x-1'>
            <span className='font-mono w-20 p-y-2 px-3 bg-success-muted text-center rounded-2xl'>
              {(values.map(([_, n]: [number, string]) => n).filter((_: string) => _ === '1')
                .length /
                values.map(([_, n]: [number, string]) => n).length) *
                100}
              %
            </span>
            <span>{key}</span>
          </div>
          <ul className='flex gap-x-1'>
            {values.map((value: any) => (
              <Tooltip
                key={value[0]}
                content={dayjs(value[0] * 1000).format('YYYY-MM-DD hh:mm:ss')}
              >
                <li
                  className={classNames(
                    'w-2 h-4 rounded hover:scale-150 ease-in-out',
                    value[1] === '1' ? 'bg-accent' : 'bg-danger-emphasis',
                  )}
                />
              </Tooltip>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
