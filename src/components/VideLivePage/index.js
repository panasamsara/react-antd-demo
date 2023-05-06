import React, { PureComponent } from 'react'

// html5的video标签实现对HLS(m3u8格式)的支持
const { Hls } = window
export default class VideLivePage extends PureComponent {
  state = {
    showVideo: true,
    videoWidth: 300,
    init: true,
    hls: null,
  }

  componentDidMount() {
    const { videoId, url } = this.props
    const number = videoId.slice(-1)
    if (!this.props.terminalNo) return
    if (Hls.isSupported()) {
      const video = document.getElementById(videoId)
      const hls = new Hls()
      // const url = `http://${this.props.terminalNo}_v.${store.cfg.videoUrl}:9502/hlsram/chn${number}/index.m3u8`
      // console.log(url)
      hls.loadSource(url)
      hls.attachMedia(video)
      console.log(hls)
      console.log(video)
      this.setState({
        hls,
      })
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // video.play()
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.terminalNo !== this.props.terminalNo ||
      this.state.init ||
      prevProps.videoId !== this.props.videoId
    ) {
      this.setState({
        init: false,
      })
      const { videoId } = this.props
      const number = videoId.slice(-1)
      if (!this.props.terminalNo) return
      if (Hls.isSupported()) {
        const video = document.getElementById(videoId)
        const hls = new Hls()
        const url = `http://${this.props.terminalNo}_v.${store.cfg.videoUrl}:9502/hlsram/chn${number}/index.m3u8`
        console.log(url)
        hls.loadSource(url)
        hls.attachMedia(video)
        console.log(hls)
        console.log(video)
        this.setState({
          hls,
        })
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          // video.play()
        })
      }
    }
  }

  componentWillUnmount() {
    const { videoId } = this.props
    const video = document.getElementById(videoId)
    // eslint-disable-next-line no-unused-expressions
    video ? (video.stop ? video.stop() : null) : null
    const { hls } = this.state
    if (hls) {
      hls.loadSource('http://hlsram/chn${number}/index.m3u8')
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // video.play()
      })
    }
  }

  // getH = () => {
  //   const video = document.getElementById('phonelivevideo');
  //   const a = this.player.el();
  //   console.log(video.videoWidth);
  //   console.log(a);
  //   alert(this.player.readyState());
  //   // alert(this.player.networkState());
  //   this.playerRtmp.play();
  //   document.getElementById('exampleVideo_Flash_api').click();
  // }

  // hideVideo = () => {
  //   this.player.pause();
  //   this.player.dispose();
  //   this.player = undefined;
  // }

  render() {
    const { showVideo, videoWidth } = this.state
    const { videoId } = this.props
    const { terminalNo } = this.props

    return terminalNo ? (
      <div>
        <video
          id={videoId}
          style={{ width: `100%`, height: '260px' }}
          // className="video-js vjs-default-skin"
          controls
        />
      </div>
    ) : (
      <div
        style={{
          color: '#ffffff',
          textAlign: 'center',
          height: 300,
          background: '#000000',
          lineHeight: '300px',
        }}
      >
        视频未播放
      </div>
    )
  }
}
