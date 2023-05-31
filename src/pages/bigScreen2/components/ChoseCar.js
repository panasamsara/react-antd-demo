

import React, { useState, useEffect } from 'react'
import RenderCompo from "@/components/RenderCompo";
import { BarsOutlined, CloseOutlined, YoutubeOutlined, ApiOutlined } from '@ant-design/icons';
import { Button, Modal, message, Tree } from 'antd';
import CAMERA_GREEN from "@/assets/camera_green.png";
import { bus } from '@/utils';
import TableData from "./tableData";
import { connect } from "react-redux";
import { vinChange } from "@/store/actions";
const { TreeNode } = Tree;

// 自定义树
const getTreeNode = (data) => {
  if (data && data.length > 0) {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode key={item.key} title={item.title}>
            {getTreeNode(item.children)}
          </TreeNode>
        );
      }
      return (
        item.isChild ?
        <TreeNode
          key={item.key}
          longitude={item.longitude}
          latitude={item.latitude}
          speed={item.speed}
          title={
            <div style={{display: 'flex'}}>
              <span style={{width: 200, color: item.status == '0' ? '#888' : '#fff'}}>
                {item.title }
              </span>
              <span style={{width: 90, color: item.status == '0' ? '#888' : '#fff'}}>
                { `${item.speed} km/h` }
              </span>
              <div style={{width: 30, fontSize: 18}}>{ item.status != '0'
                ? <ApiOutlined style={{color: '#12CF5E'}}/>
                : null }
              </div>
              <div style={{width: 30, fontSize: 18}}>{ item.hasVideo
                ? <img src={CAMERA_GREEN} style={{width: 20, height: 20}} alt="camera" />
                : null }
              </div>
            </div>
          }
        />
        : <TreeNode 
          key={item.key}
          title={item.title}
        />
      );
    });
  }
  return [];
};
// 数组分类，转成树形结构
export function arrayToTree(arr) {
  let typa_arr = arr.map(item=> item.type)
  let type_set = new Set(typa_arr)
  let type_only_arr = Array.from(type_set)
  let treeData = type_only_arr.map(item=>{
    return {
      title: item,
      key: item,
      isChild: false,
      children: arr.filter(i=>i.type == item).map(i=>{
        i.key = i.vin;
        i.title = i.vin;
        i.longitude = i.longitude
        i.latitude = i.latitude
        i.speed = i.speed
        i.isChild = true;
        return i
      })
    }
  })
  return treeData
}

// redux相关
const mapStateToProps = state => {
  return { choseVin: state.mapReducer.choseVin };
};
const mapDispatchToProps = dispatch => ({
  onVinChange: vin => {
    dispatch(vinChange(vin));
  },
});

function App(props) {

  const {cars} = props;
  const [treeData, setTreeData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setTreeData(arrayToTree(cars) );
  },[cars])
  
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
    setOpen(false);
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
    props.onVinChange(e.node.key) // 修改redux中vin
    bus.emit('tableClick', {RowData: e.node})
    bus.emit('changeDetailModal', {RowData: e.node})
  };
  const [checkedKeys, setCheckedKeys] = useState([]);
  const onTreeCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    setCheckedKeys(checkedKeys)
  };

  return (
    <div>
      <RenderCompo
        style={{
            width: 450,
            height: 300,
            position: 'absolute',
            top: 120,
            left: 20
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
            <div>
              <div style={{ position: 'relative',width: 450, height: 80, marginBottom: 12, padding: 12, color: '#fff',
                background: 'rgba(2, 29, 69, 0.8)', textAlign: 'left', fontSize: 20, fontWeight: 700, borderRadius: 4, marginLeft: 6
                }}>
                <div>车辆总计：{cars.length}辆</div>
                <div style={{display: 'flex'}}>
                  <div style={{marginRight: 24}}>在线车辆：{cars.filter(item=> item.status!='0').length}辆</div>
                  <div>离线车辆：{cars.filter(item=> item.status=='0').length}辆</div>
                </div>
              </div>
              <div style={{ position: 'relative',width: 450, height: 500, 
                background: 'rgba(2, 29, 69, 0.8)', textAlign: 'left', fontSize: 16, borderRadius: 4, 
                marginLeft: 6, paddingBottom: 12
                }}>
                <CloseOutlined style={{color: '#fff', position: 'absolute', right: 5, top: 5, zIndex: 999}}
                  onClick={()=>setOpen(true)}
                />
                <div className='map-tree-box'>
                  <Tree 
                    onSelect={treeSelect} 
                    checkable={true}
                    onCheck={onTreeCheck}
                    defaultCheckedKeys={checkedKeys}
                    // treeData={treeData}
                  >
                    {
                      getTreeNode(treeData)
                    }
                  </Tree>
                </div>
              </div> 
              {checkedKeys.length>0
              ? <div style={{color: '#fff', position: 'absolute', bottom: 5, left: 80}}>
                已选中：{checkedKeys.length}辆
              </div> :null
              }
              
            </div>: null
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

export default connect(mapStateToProps, mapDispatchToProps)(App);