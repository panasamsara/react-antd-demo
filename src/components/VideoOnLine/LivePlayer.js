
import React, { useState, useEffect } from 'react'
import { BarsOutlined } from '@ant-design/icons';

// eslint-disable-next-line react/require-optimization
// import React from 'react'

export default function LivePlayer(props) {
  const { className, style, url = '', url2 = '' } = props
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    setVisible(true)
  }, [url, url2])

  return url ? (
    url.indexOf('rtmp:') !== -1 ? (
      <live-player
        controls="true"
        fluent="true"
        live="true"
        show-custom-button="true"
        stretch="false"
        video-url={url}
      />
    ) : (
      <div
        style={{
          position: 'relative',
          display: visible == false ? 'none' : 'block',
        }}
      >
        {visible && (
          <div
            style={{
              position: 'absolute',
              zIndex: '100000',
              top: '-30px',
              left: ' 180px',
            }}
          >
            <BarsOutlined
              type="close"
              onClick={() => {
                setVisible(false)
              }}
              style={{
                cursor: 'pointer',
                fontSize: 16,
                color: '#9B9B9B',
                verticalAlign: 'middle',
                // display: visible == false ? 'none' : 'block',
              }}
            />
          </div>
        )}

        {/* <div style={{ height: '310px', position: 'relative' }}> */}
        <div
          style={{
            height: '150px',
            position: 'relative',
            display: visible == false ? 'none' : 'block',
          }}
        >
          <live-player
            className={className}
            controls="true"
            fluent="true"
            hasaudio="false"
            live="true"
            show-custom-button="true"
            stretch="false"
            autoplay={true}
            style={{
              width: '100%',
              // ...style,,
            }}
            aspect="fullscreen"
            video-url={url}
          />
        </div>
        {url2 && (
          <div
            style={{
              height: '150px',
              position: 'relative',
              marginTop: '10px',
              display: visible == false ? 'none' : 'block',
            }}
          >
            <live-player
              className={className}
              controls="true"
              fluent="true"
              hasaudio="false"
              live="true"
              show-custom-button="true"
              stretch="false"
              style={{
                width: '100%',
                // ...style,
              }}
              aspect="fullscreen"
              video-url={url2 && url2}
            />
          </div>
        )}
      </div>
    )
  ) : (
    <div
      style={{
        height: '100%',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        justifyContent: 'center',
        fontSize: 25,
      }}
    >
      视频加载中...
    </div>
  )
}

// export default class LivePlayer extends Component {
//   state = {
//     Visible: true,
//   }
//   render() {
//     const { className, style, url = '', url2 = '' } = this.props
//     console.log('url: ', url)
//     console.log('url2: ', url2)
//     console.log('className: ', className)
//     // eslint-disable-next-line no-nested-ternary

//     return url ? (
//       url.indexOf('rtmp:') !== -1 ? (
//         <live-player
//           controls="true"
//           fluent="true"
//           live="true"
//           show-custom-button="true"
//           stretch="false"
//           video-url={url}
//         />
//       ) : (
//         <div style={{ position: 'relative' }}>
//           <div
//             style={{
//               position: 'absolute',
//               zIndex: '100000',
//               top: '-30px',
//               left: ' 180px',
//             }}
//           >
//             <Icon
//               type="close"
//               onClick={() => {
//                 this.setState({
//                   Visible: false,
//                 })
//               }}
//               style={{
//                 cursor: 'pointer',
//                 fontSize: 16,
//                 color: '#9B9B9B',
//                 verticalAlign: 'middle',
//               }}
//             />
//           </div>

//           {/* <div style={{ height: '310px', position: 'relative' }}> */}
//           <div style={{ height: '150px', position: 'relative' }}>
//             <live-player
//               className={className}
//               controls="true"
//               fluent="true"
//               hasaudio="false"
//               live="true"
//               show-custom-button="true"
//               stretch="false"
//               autoplay={true}
//               style={{
//                 width: '100%',
//                 // ...style,,
//               }}
//               aspect="fullscreen"
//               video-url={url}
//             />
//           </div>
//           {url2 && (
//             <div
//               style={{
//                 height: '150px',
//                 position: 'relative',
//                 marginTop: '10px',
//               }}
//             >
//               <live-player
//                 className={className}
//                 controls="true"
//                 fluent="true"
//                 hasaudio="false"
//                 live="true"
//                 show-custom-button="true"
//                 stretch="false"
//                 style={{
//                   width: '100%',
//                   // ...style,
//                 }}
//                 aspect="fullscreen"
//                 video-url={url2 && url2}
//               />
//             </div>
//           )}
//         </div>
//       )
//     ) : (
//       <div
//         style={{
//           height: '100%',
//           width: '100%',
//           textAlign: 'center',
//           display: 'flex',
//           alignItems: 'center',
//           color: 'white',
//           justifyContent: 'center',
//           fontSize: 25,
//         }}
//       >
//         视频加载中...
//       </div>
//     )
//   }
// }
