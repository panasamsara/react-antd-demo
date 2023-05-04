

import React, { useState, useEffect } from 'react'
import RenderCompo from "@/components/RenderCompo";
import getImgUrl from "@/assets/images/getImgUrl";
import { BarsOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { get, post } from '@/utils/requests'

export default function App() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rank, setRank] = useState([])
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

  async function getDataRank() {
    const res2 = await get('/screen/vehicleareaAll', {})
    res2.data.forEach((res) => {
      if (res.projectName == null || res.projectName == '' || !res.projectName) {
        res.projectName = 'M18-2'
      }
    })
    setRank(res2.data.filter((res) => res.gpsSpeed > 0))
  }
  useEffect(() => {
    getDataRank()
    // setRank(testdata.data)
  }, [])

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
        style= {{opacity: 1}}
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
