import React, { useState} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import CardVideo from './CardVideo'

function EchartsComponent(props: any) {
  const [url, setUrl] = useState()
  const [url2, setUrl2] = useState()
  const [visible, setVisible] = useState(true)
  let args = {
    cars: []
  }
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
              left: '50%',
              transform: 'translate(-40px)',
            }}
          >
            {/* {args.cars[0] && args.cars[0].terminalNo} */}
          </span>
          <div className="test" style={{ flexGrow: 1 }}>
            {args.cars[0] ? (
              <CardVideo url={url} url2={url2} style={{ height: '100%' }} />
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
                  // backgroundColor: visible == true ? '#010e22' : null,
                  justifyContent: 'center',
                  fontSize: 14,
                  position: 'relative',
                  
                }}
              >
                {visible == true ? (
                  <div
                    style={{ position: 'absolute', top: '4px', left: '175px' }}
                  >
                    <CloseOutlined
                      type="close"
                      onClick={() => setVisible(false)}
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
export default EchartsComponent;
