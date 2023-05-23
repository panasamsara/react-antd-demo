

import React, { useState, useEffect } from 'react'
import RenderCompo from "@/components/RenderCompo";
import { BarsOutlined } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import { bus } from '@/utils';
import TableData from "./tableData";
import TreeData from "./TreeData";

export default function App(props) {
  const {cars} = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const tableclickCallback = (e) => {
      setOpen(false);
    }
    bus.on(`tableClick`, tableclickCallback)
    return () => {
      bus.off(`tableClick`, tableclickCallback)
    }
  }, [])

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
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
            top: 120,
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
        <TableData cars={cars}/>

        {/* <TreeData cars={cars}/> */}
      </Modal>
    </div>
  );
}
