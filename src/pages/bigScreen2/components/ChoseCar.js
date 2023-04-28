

import React, { useState } from 'react'
import RenderCompo from "@/components/RenderCompo";
import getImgUrl from "@/assets/images/getImgUrl";
import { BarsOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

export default function App() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <RenderCompo
        style={{
            width: 100,
            height: 300,
            position: 'absolute',
            top: 20,
            left: 420
        }}
      > 
        <div style={{ width: 100, 
          height: 141, 
          fontSize: 40,
          color: '#fff' }}
          onClick={showModal}
        >
          <BarsOutlined />
        </div>
      </RenderCompo>

      <Modal
        open={open}
        width={800}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        style= {{opacity: 0.8}}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            确认
          </Button>
        ]}
      >
        <p>List...</p>
        <p>List...</p>
        <p>List...</p>
        <p>List...</p>
        <p>List...</p>
      </Modal>
    </div>
  );
}
