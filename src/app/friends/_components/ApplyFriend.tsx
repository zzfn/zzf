'use client';
import { useMessage, Input, Modal } from '@/components/ui';
import { useState } from 'react';
import { fetchData } from '../../../services/api';
import { produce } from 'immer';
const ApplyFriend = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    logo: '',
    description: '',
    isActive: true,
  });
  const message = useMessage();
  return (
    <div>
      <button
        onClick={() => setIsVisible(true)}
        className='bg-bg-emphasis text-fg-onEmphasis rounded-2xl px-8 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5'
      >
        <span>申请友链</span>
      </button>

      <Modal onCancel={() => setIsVisible(false)} visible={isVisible}>
        <div className='space-y-6 p-6'>
          <div className='text-center'>
            <h3 className='bg-gradient-to-r from-[color:var(--color-bg-accent-emphasis)] to-[color:var(--color-bg-upsell-emphasis)] bg-clip-text text-2xl font-bold text-transparent'>
              申请友链
            </h3>
            <p className='text-fg-muted/60 mt-2 text-sm'>填写您的网站信息，加入我们的朋友圈</p>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-fg-muted/80 text-sm font-medium'>站点标题</label>
              <Input
                value={formData.name}
                onChange={(event) =>
                  setFormData(
                    produce((draft) => {
                      draft.name = event.target.value;
                    }),
                  )
                }
                placeholder='输入您的站点名称'
                className='border-border-muted bg-bg-default w-full rounded-2xl border px-4 py-2.5 focus:border-[color:var(--color-border-accent-emphasis)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--color-border-accent-emphasis)_20%,transparent)]'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-fg-muted/80 text-sm font-medium'>站点地址</label>
              <Input
                value={formData.url}
                onChange={(event) =>
                  setFormData(
                    produce((draft) => {
                      draft.url = event.target.value;
                    }),
                  )
                }
                placeholder='https://example.com'
                className='border-border-muted bg-bg-default w-full rounded-2xl border px-4 py-2.5 focus:border-[color:var(--color-border-accent-emphasis)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--color-border-accent-emphasis)_20%,transparent)]'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-fg-muted/80 text-sm font-medium'>站点头像</label>
              <Input
                value={formData.logo}
                onChange={(event) =>
                  setFormData(
                    produce((draft) => {
                      draft.logo = event.target.value;
                    }),
                  )
                }
                placeholder='头像图片链接'
                className='border-border-muted bg-bg-default w-full rounded-2xl border px-4 py-2.5 focus:border-[color:var(--color-border-accent-emphasis)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--color-border-accent-emphasis)_20%,transparent)]'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-fg-muted/80 text-sm font-medium'>站点描述</label>
              <Input
                value={formData.description}
                onChange={(event) =>
                  setFormData(
                    produce((draft) => {
                      draft.description = event.target.value;
                    }),
                  )
                }
                placeholder='简单介绍一下您的网站'
                className='border-border-muted bg-bg-default w-full rounded-2xl border px-4 py-2.5 focus:border-[color:var(--color-border-accent-emphasis)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--color-border-accent-emphasis)_20%,transparent)]'
              />
            </div>
          </div>

          <button
            onClick={async () => {
              if (!Object.values(formData).every(Boolean)) {
                message?.add({
                  type: 'error',
                  content: '请填写完整信息',
                });
                return;
              }
              await fetchData({
                endpoint: '/v1/friend-links',
                fetchParams: {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData),
                },
              });
              setIsVisible(false);
            }}
            className='bg-bg-emphasis text-fg-onEmphasis w-full rounded-2xl py-3 font-medium transition-all duration-200 ease-out hover:-translate-y-0.5'
          >
            提交申请
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ApplyFriend;
