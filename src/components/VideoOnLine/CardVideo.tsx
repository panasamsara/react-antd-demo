
import React from 'react'
import LivePlayer from './LivePlayer'

export default function CardVideo(props:any) {
  const {
    url = 'http://172.16.11.82:8080/live/movie.flv',
    url2,
    height,
    width,
    style,
    channelLabel
  } = props

  const [isVideo, setIsVideo] = React.useState(false)
  React.useEffect(() => {
    setIsVideo(false)
    setTimeout(() => {
      setIsVideo(true)
    }, 1000)
  }, [url])
  return (
    <div
      style={{
        // marginLeft: 8,
        height,
        width,
        background: 'radial-gradient(black, transparent)',
        textAlign: 'center',
        color: '#fff',
        lineHeight: '90px',
        ...style,
      }}
    >
      {isVideo ? (
        <LivePlayer style={{ height }} url={url} url2={url2} channelLabel={channelLabel}/>
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
      )}
    </div>
  )
}
