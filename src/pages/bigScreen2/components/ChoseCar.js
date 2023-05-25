

import React, { useState, useEffect } from 'react'
import RenderCompo from "@/components/RenderCompo";
import { BarsOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal, message, Tree } from 'antd';
import { bus } from '@/utils';
import TableData from "./tableData";

export function arrayToTree(arr) {
  let typa_arr = arr.map(item=> item.type)
  let type_set = new Set(typa_arr)
  let type_only_arr = Array.from(type_set)
  let treeData = type_only_arr.map(itme=>{
    return {
      title: itme,
      key: itme,
      children: arr.filter(i=>i.type == itme).map(item=>{
        item.key = item.vin;
        item.title = item.vin;
        return item
      })
    }
  })
  return treeData
}

export default function App(props) {
  const {cars} = props;
  const [treeData, setTreeData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setTreeData(arrayToTree(cars) )
  },[])
  
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
    console.log(121212);
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
  
  // 树节点 点击事件
  const treeSelect = (selectedKeys, e) => {
    bus.emit('tableClick', {RowData: e.node})
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
        <div style={{position: 'relative'}}>
          {
            open ?
            <div style={{ 
              width: 100, 
              height: 60, 
              fontSize: 52,
              color: '#1677ff' }}
              onClick={()=>showModal()}
            >
              <BarsOutlined />
            </div> : null
          }
          
          
          {
            !open ?
            <div style={{ position: 'relative',width: 450, height: 500, overflow: 'hidden', overflowY: 'scroll',
              background: 'rgba(0, 0, 0, 0.5)', textAlign: 'left', fontSize: 16, borderRadius: 4, marginLeft: 6
              }}>
              <CloseOutlined style={{color: '#fff', position: 'absolute', right: 5, top: 5}}
                onClick={()=>setOpen(false)}
              />
              <div className='map-tree-box'>
                <Tree
                  style={{background: 'transparent', color: '#fff'}}
                  treeData={treeData}
                  onSelect={treeSelect}
                />
              </div>
            </div> : null
          }
          
        </div>
        
      </RenderCompo>
      
      {/* getContainer 绑定全屏dom元素，避免弹框无法显示  */}
      {/* <Modal
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
      </Modal> */}
    </div>
  );
}
