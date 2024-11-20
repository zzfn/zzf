'use client';
import { useMessage, Input, Modal } from '@oc/design';
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
        className='group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-white shadow-lg transition-all hover:scale-105'
      >
        <span className='relative z-10'>申请友链</span>
        <div className='absolute inset-0 -z-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 blur transition-opacity group-hover:opacity-50'></div>
      </button>

      <Modal onCancel={() => setIsVisible(false)} visible={isVisible}>
        <div className='space-y-6 p-6'>
          <div className='text-center'>
            <h3 className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent'>
              申请友链
            </h3>
            <p className='text-muted/60 mt-2 text-sm'>填写您的网站信息，加入我们的朋友圈</p>
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-muted/80 text-sm font-medium'>站点标题</label>
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
                className='border-border/50 w-full rounded-lg border bg-white/50 px-4 py-2.5 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-muted/80 text-sm font-medium'>站点地址</label>
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
                className='border-border/50 w-full rounded-lg border bg-white/50 px-4 py-2.5 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-muted/80 text-sm font-medium'>站点头像</label>
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
                className='border-border/50 w-full rounded-lg border bg-white/50 px-4 py-2.5 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-muted/80 text-sm font-medium'>站点描述</label>
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
                className='border-border/50 w-full rounded-lg border bg-white/50 px-4 py-2.5 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
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
            className='w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]'
          >
            提交申请
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ApplyFriend;
