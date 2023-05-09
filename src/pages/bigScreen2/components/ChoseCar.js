

import React, { useState, useEffect } from 'react'
import RenderCompo from "@/components/RenderCompo";
import { BarsOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { get, post } from '@/utils/requests';
import TableData from "./tableData";
import TreeData from "./TreeData";

export default function App(props) {
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

  // 调接口
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
            left: 100
        }}
      > 
        <div style={{ width: 100, 
          height: 141, 
          fontSize: 40,
          color: '#1677ff' }}
          onClick={showModal}
        >
          <BarsOutlined />
        </div>
      </RenderCompo>
      
      {/* getContainer 绑定全屏dom元素，避免弹框无法显示  */}
      <Modal
        open={open}
        width={800}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        style= {{opacity: 1}}
        getContainer={props.screenRef.current}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            确认
          </Button>
        ]}
      >
        <TableData />

        <TreeData />
      </Modal>
    </div>
  );
}
