import { CloseOutlined, StepForwardOutlined } from '@ant-design/icons';
import { bus } from '@/utils';
import Draggable from 'react-draggable';
import { Checkbox } from 'antd';
import '@/styles/mapStyle.less';
import { useEffect, useState } from 'react';

const Detail = (props) => {
  const {vin, channelInfo} = props;
  const [checkeChannels, setCheckeChannels] = useState([]); // 存放已勾选的数组
  const [channelOptions, setChannelOptions] = useState([]); // 展示频道选项 供勾选（已过滤 ==0不展示）
  // 处理频道数据
  let options = [];
  options = channelInfo && channelInfo.channels
    ? Object.keys(channelInfo.channels).map(item=>{
      let obj = {
        label: item,
        value: item,
        disabled: channelInfo.channels[item] =='0'
      }
      return obj
    })
    : [];
  // 设置频道初始化数据 只展示 ==1的频道
  useEffect(()=>{
    let arr = options.filter(item=> !item.disabled)
    setChannelOptions(arr)
  },[channelInfo.channels]);
  
  // 复选框勾选事件，打开视频弹框
  const onChange = (checkedValues) => {
    setCheckeChannels(checkedValues);
    bus.emit('showVideo', {checkedValues:checkedValues, terminalNo: channelInfo.terminalNo})
  };
  // 监听视频的关闭按钮，将checkbox 取消勾选
  useEffect(() => {
    const closeVideoCallback = (e) => {
      let arr = channelOptions.filter(item => item.label!=e.channelLabel)
      setChannelOptions(arr)
    }
    bus.on(`closeVideo`, closeVideoCallback)
    return () => {
      bus.off(`closeVideo`, closeVideoCallback)
    }
  }, [])

  return <>
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
              {checkeChannels:checkeChannels, terminalNo: channelInfo.terminalNo})}>
              <StepForwardOutlined />
            </div>
            <div style={{ width: 48, height: 40, }} onClick={()=> bus.emit('closeModal',{})}>
              <CloseOutlined />
            </div>
            
          </div>
        </div>
        <div style={{ padding: 10, }}>
          <div style={{ margin: '5px 0' }}>
            <span>VIN码：</span>
            <span>{vin}</span>
          </div>
          <div style={{ margin: '5px 0' }}>
          <span>频道：</span>
          <div className='map-channel'>
            <Checkbox.Group 
              options={channelOptions} 
              defaultValue={['Apple']} 
              onChange={onChange} 
            />
          </div>

          </div>
        </div>
          
      </div>
    </Draggable>
  </>
};
export default Detail;