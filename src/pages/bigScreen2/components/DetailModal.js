import { CloseOutlined } from '@ant-design/icons';
import { bus } from '@/utils';
import Draggable from 'react-draggable';

const Detail = () => {

  return <>
    <Draggable>
      <div style={{ width: 400, height: 300, background: 'rgba(0, 0, 0, 0.5)', 
        position: 'absolute', cursor: 'move',
        left: '50%', transform: 'translateX(-50%)',
        top: '50%', transform: 'translateY(-50%)',
        color: '#fff',
        display: 'flex', flexDirection: 'column',
        textAlign: 'left', fontSize: 16, borderRadius: 4
      }}
        
      >
        <div style={{ height: 40, lineHeight : '40px', borderBottom: '1px solid #fff', paddingLeft: 10, 
          display: 'flex', justifyContent: 'space-between'
        }}>
          <div>车辆信号详情</div>
          <div style={{ width: 24, height: 40, }} onClick={()=> bus.emit('closeModal',{})}><CloseOutlined /></div>
        </div>
        <div style={{ padding: 10, }}>
          <div style={{ margin: '5px 0' }}>
            <span>VIN码：</span>
            <span>LGAG4DY30M9047195</span>
          </div>
          <div style={{ margin: '5px 0' }}>
            <span>当前位置：</span>
            <span>湖北省十堰市丹江口市丁家营镇G70福银高速</span>
          </div>
        </div>
          
      </div>
    </Draggable>
  </>
};
export default Detail;