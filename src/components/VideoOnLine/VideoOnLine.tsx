import React, { useState} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import CardVideo from './CardVideo'
import { bus } from '@/utils';
// test_url = 'http://2008101_v.vd.rdas.dfmc.com.cn:9502/hlsram/chn0/index.m3u8'

function VideoComponent(props: any) {
  const [url2, setUrl2] = useState()
  const [visible, setVisible] = useState(true)
  const {url, channelLabel} = props;
  
  return <div >
    <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontSize: 18,
            color: 'rgb(0, 236, 252)',
            margin: '10px auto',
            position: 'absolute',
            // width: '100%',
            textAlign: 'center',
            zIndex: 999,
            transform: 'translate(-40px)',
          }}
        >
          { channelLabel }
        </span>
        <div className="test" style={{ flexGrow: 1, marginBottom: 5 }}>
          {url&& url!='' ? (
            <CardVideo url={url} url2={url2} style={{ height: '100%' }} channelLabel={channelLabel}/>
          ) : (
            <div
              style={{
                // height: '100%',
                height: '130px',
                width: '100%',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                backgroundColor: visible == true ? '#010e22' : '',
                justifyContent: 'center',
                fontSize: 14,
                position: 'relative',
                
              }}
            >
              {visible == true ? (
                <div
                  style={{ position: 'absolute', top: '4px', left: '200px' }}
                >
                  <CloseOutlined
                    type="close"
                    onClick={() => bus.emit('closeVideo',{channelLabel:channelLabel})}
                    style={{
                      cursor: 'pointer',
                      fontSize: 16,
                      color: '#9B9B9B',
                      verticalAlign: 'middle',
                    }}
                  />
                </div>
              ) : null}
              {visible == true ? '无信号' : null}
            </div>
          )}
        </div>
      </div>
  </div>;
}
export default VideoComponent;
