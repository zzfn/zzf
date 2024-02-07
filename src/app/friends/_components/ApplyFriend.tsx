'use client';
import { Button, Input, Modal } from '@oc/design';
import { useState } from 'react';
import { fetchData } from '../../../models/api';
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
  return (
    <div>
      <Button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
      >
        和我做朋友吧
      </Button>
      <h1>ApplyFriend</h1>
      <Modal onCancel={() => setIsVisible(!isVisible)} visible={isVisible}>
        <div className='p-3'>
          <Input
            value={formData.name}
            onChange={(event) =>
              setFormData(
                produce((draft) => {
                  draft.name = event.target.value;
                }),
              )
            }
            placeholder='站点标题'
          />
          <Input
            value={formData.url}
            onChange={(event) =>
              setFormData(
                produce((draft) => {
                  draft.url = event.target.value;
                }),
              )
            }
            placeholder='站点地址'
          />
          <Input
            value={formData.logo}
            onChange={(event) =>
              setFormData(
                produce((draft) => {
                  draft.logo = event.target.value;
                }),
              )
            }
            placeholder='站点头像'
          />
          <Input
            value={formData.description}
            onChange={(event) =>
              setFormData(
                produce((draft) => {
                  draft.description = event.target.value;
                }),
              )
            }
            placeholder='站点描述'
          />
          <Button
            onClick={async () => {
              if (!Object.values(formData).every(Boolean)) {
                alert('请填写完整');
              }
              const res = await fetchData({
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
            className='w-full'
          >
            我填完啦
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default ApplyFriend;
