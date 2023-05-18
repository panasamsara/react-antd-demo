import { CloseOutlined } from '@ant-design/icons';
import { bus } from '@/utils';
import Draggable from 'react-draggable';
import { Checkbox } from 'antd';
import '@/styles/mapStyle.less';

const Detail = (props) => {
  const {vin, channelInfo} = props;
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
    
  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

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
          <div style={{ width: 24, height: 40, cursor: 'pointer' }} onClick={()=> bus.emit('closeModal',{})}><CloseOutlined /></div>
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
              options={options} 
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