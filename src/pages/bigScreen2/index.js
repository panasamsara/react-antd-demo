
import "@/styles/mapStyle.css";
import React, { useState, useRef, useEffect } from 'react'
import { message } from 'antd';
import {
  Amap,
  Marker,
  Scale,
  CountryLayer,
  TrafficLayer, RoadNetLayer , SatelliteLayer
} from "@amap/amap-react";
import MARKER_SVG from "@/assets/marker.svg";
import Title from "@/components/Title/Title";
import ChoseCar from "./components/ChoseCar";
import VideoCompo from "./components/VideoCompo";
import getImgUrl from "@/assets/images/getImgUrl";
import { bus } from '@/utils';
import DetailModal from "./components/DetailModal";

const colors = {};
const GDPSpeed = {};
function getColor(key, type) {
  if (!key) return 'rgb(200, 200, 240)';
  if (!colors[key]) {
    const gdp = GDPSpeed[key];
    if (!gdp) {
      // 没有GDP数据
      const rg = Math.random() * 155 + 50;
      colors[key] = `rgb(${rg}, ${rg}, 255)`;
    } else {
      const rg = 255 - Math.floor(((gdp - 5) / 5) * 255);
      colors[key] = 'rgb(' + rg + ',' + rg + ',255)';
    }
  }
  return colors[key];
}

export default function App() {
  const [modalShow, setModalShow] = useState(false);
  // 全局事件监听
  useEffect(() => {
    const tableclickCallback = (e) => {
      console.log('tableclick', e) 
      message.success(`点击了${e.RowData.name}`)
    }
    const closeModalCallback = (e) => {
      setModalShow(false)
    }
    bus.on(`tableClick`, tableclickCallback)
    bus.on(`closeModal`, closeModalCallback)
    return () => {
      bus.off(`tableClick`, tableclickCallback)
      bus.off(`closeModal`, closeModalCallback)
    }
  }, [])

  // 全屏展示
  const container_ref = useRef();
  useEffect(()=>{
    if (container_ref.current.requestFullscreen) {
      container_ref.current.requestFullscreen();
    } else if (container_ref.current.webkitRequestFullScreen) {
      container_ref.current.webkitRequestFullScreen();
    } else if (container_ref.current.mozRequestFullScreen) {
      container_ref.current.mozRequestFullScreen();
    } else if (container_ref.current.msRequestFullscreen) {
      container_ref.current.msRequestFullscreen();
    }
  },[container_ref]);

  const [soc, setSoc] = useState('CHN');
  const [opacity, setOpacity] = useState(0.8);
  
  return (
    <div 
      ref={container_ref}
      style={{
      overflow: 'hidden',
      width: 1920,
      height: 1080,
      background: `url(${getImgUrl('BG1')}) 100% 100% no-repeat`,
      position: 'relative'
    }}>
      <div style={{
        width: '100%',
        height: 70,
      }}>
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Title page={'bigScreen2'}/>
        </div>
      </div>
      <div className="App">
          <div className="map-container" style={{width: "100%", height: "100%", position: 'fixed'}}>
            <Amap
              showLabel={false}
              zooms={[4, 10]}
              center={[106.122082, 33.719192]}
              zoom={5}
              isHotspot={false}
              defaultCursor="pointer"
              features={[]} // 所有默认底图图层都隐藏
              showIndoorMap={false} // 不显示室内地图
              mapStyle='amap://styles/whitesmoke'
              >
                <Marker position={[110.84, 32.53]} offset={[0, -40]} anchor="top-center">
                    <img src={MARKER_SVG} alt="marker" />
                    <div style={{ minWidth: 180, minHeight: 100, display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: 16, background: '#f3e3d3', padding: 10, borderRadius: 4, cursor: 'pointer' }}
                      onClick={()=> setModalShow(true)}
                    >
                      <p style={{margin: 0}}>LGAG3DV22MD100037</p>
                      <p style={{margin: 0}}>0.2km/h</p>
                      <p style={{margin: 0}}>无视频</p>
                    </div>
                </Marker>
                <CountryLayer
                  opacity={opacity}
                  depth={2}
                  soc={soc}
                  // styles={{
                  //   'nation-stroke': '#22ffff',
                  //   'coastline-stroke': [0.85, 0.63, 0.94, 1],
                  //   'province-stroke': 'white',
                  //   'city-stroke': 'rgba(255,255,255,0.5)', //中国特有字段
                  //   fill: (props) => {
                  //     //中国特有字段
                  //     return getColor(props.adcode_pro || props.NAME_CHN, 'country');
                  //   },
                  // }}
                />
                <TrafficLayer />
                <RoadNetLayer />
                <Scale />
              </Amap>

              <ChoseCar />
              <VideoCompo />
          </div>
          {modalShow 
          ? <DetailModal /> 
          : null}
      </div>
    </div>
  );
}
