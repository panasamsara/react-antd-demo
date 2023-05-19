

import React, { useEffect,useState } from 'react'
import RenderCompo from "@/components/RenderCompo";
import VideoOnLine from "@/components/VideoOnLine/VideoOnLine";
import { bus } from '@/utils';
import Draggable from 'react-draggable';
import { Checkbox } from 'antd';
import { CloseOutlined, StepForwardOutlined } from '@ant-design/icons';

export default function App() {
  const [terminalNo, setTerminalNo] = useState(''); 
  const [checkedValues, setCheckedValues] = useState([]); // 勾选的channel，勾选几个展示几个视频弹框

  useEffect(() => {
    const showVideoCallback = (e) => {
      setTerminalNo(e.terminalNo)
      setCheckedValues(e.checkedValues)
    }
    const closeVideoCallback = (e) => {
      let arr = checkedValues.splice(checkedValues.indexOf(e.channelLabel), 1);
      setCheckedValues(arr)
    }
    const closeModalCallback = (e) => {
      setCheckedValues([])
    }
    bus.on(`showVideo`, showVideoCallback); // 监听复选框勾选事件
    bus.on(`closeVideo`, closeVideoCallback); // 监听关闭事件
    bus.on(`closeDetailModal`, closeModalCallback) //监听关闭详情弹框
    return () => {
      bus.off(`showVideo`, showVideoCallback)
      bus.off(`closeVideo`, closeVideoCallback)
      bus.off(`closeDetailModal`, closeModalCallback)
    }
  }, [checkedValues])
  return (
    <div>
      <RenderCompo
        style={{
            width: 240,
            height: 300,
            position: 'absolute',
            top: 120,
            right: 220
        }}
      > 
      {
        checkedValues.map(item=>{
          let i = parseInt(item.slice(2)) -1
          return <VideoOnLine channelLabel={item} key={item}
            url={`http://${terminalNo
            }_v.vd.rdas.dfmc.com.cn:9502/hlsram/${item.slice(0,2)+ 'n' +  i}/index.m3u8`}
          />
        })
      }
      </RenderCompo>
      

      <Draggable>
        <div style={{ width: 400, height: 300, background: 'rgba(0, 0, 0, 0.5)', 
          position: 'absolute', cursor: 'move',
          left: '45%', transform: 'translateX(-50%)',
          top: '40%', transform: 'translateY(-50%)',
          color: '#fff',
          display: 'flex', flexDirection: 'column',
          textAlign: 'left', fontSize: 16, borderRadius: 4
        }}
          
        >
          <div style={{ height: 40, lineHeight : '40px', borderBottom: '1px solid #fff', paddingLeft: 10, 
            display: 'flex', justifyContent: 'space-between'
          }}>
            <div>车辆信号详情</div>
            
            <div style={{ display: 'flex', width: 48, height: 40, cursor: 'pointer' }} >
              <div style={{ width: 48, height: 40, }} onClick={()=> bus.emit('showVideo',
                {checkeChannels:checkedValues, terminalNo: terminalNo})}>
                <StepForwardOutlined />
              </div>
              {/* <div style={{ width: 48, height: 40, }} onClick={()=>closeDetailModal()}>
                <CloseOutlined />
              </div> */}
              
            </div>
          </div>
          <div style={{ padding: 10, }}>
            <div style={{ margin: '5px 0' }}>
              <span>VIN码：</span>
              <span>vin</span>
            </div>
            <div style={{ margin: '5px 0' }}>
            <span>频道：</span>
            <div className='map-channel'>
              {/* <Checkbox.Group 
                options={channelOptions} 
                defaultValue={['ch1']} 
                value={checkedValues} 
                onChange={onChange} 
              /> */}
            </div>

            </div>
          </div>
            
        </div>
      </Draggable>
    </div>
  );
}
