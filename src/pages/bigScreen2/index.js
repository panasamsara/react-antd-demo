
import "@/styles/mapStyle.css";
import React, { useState, useRef, useEffect } from 'react'
import { message } from 'antd';
import {
  Amap,
  Marker,
  usePlugins
} from "@amap/amap-react";
import { get, post } from '@/utils/requests';
import MARKER_SVG from "@/assets/marker.svg";
import Title from "@/components/Title/Title";
import ChoseCar from "./components/ChoseCar";
import VideoCompo from "./components/VideoCompo";
import getImgUrl from "@/assets/images/getImgUrl";
import { bus } from '@/utils';
import DetailModal from "./components/DetailModal";

export default function App() {
  
  const [modalShow, setModalShow] = useState(false);
  usePlugins(['AMap.ToolBar','AMap.MoveAnimation'])
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

  const [chosenVin, setChosenVin] = useState('');
  const [cars, setCars] = useState([]);
  // 调接口
  async function getDataRank() {
    const {code,data} = await get('/api/getAllVehicles', {})
    if(code==0){
      // console.log(111, Object.keys(data) );
      setCars(Object.values(data))
    }
  }
  useEffect(() => {
    getDataRank()
    // setRank(testdata.data)
  }, [])
  
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
          <Title page={'bigScreen2'} title={'东风技术中心远程数据采集系统'}/>
        </div>
      </div>
      <div className="App">
          <div className="map-container" style={{width: "100%", height: "100%", position: 'fixed'}}>
            <Amap
              // zooms={[2, 12]}
              // center={[106.122082, 33.719192]}
              zoom={5}
              // mapStyle='amap://styles/whitesmoke'
            >
              {
                cars.map(item=>{
                  return <div key={item.vin}>
                    <Marker position={[item.longitude, item.latitude]} offset={[0, -40]} anchor="top-center">
                      <img src={MARKER_SVG} alt="marker" onClick={(e)=> {
                        e.stopPropagation()
                        setChosenVin(item.vin)
                        setModalShow(false)
                      }}/>
                      {
                        
                        <div style={{ width: 180, height: 100, display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: 16, background: '#f3e3d3', padding: 10, borderRadius: 4, cursor: 'pointer' }}
                          onClick={()=> setModalShow(true)}
                        >
                          <p style={{margin: 0}}>{item.vin}</p>
                          <p style={{margin: 0}}>速度：{item.speed}</p>
                          <p style={{margin: 0}}>无视频</p>
                        </div> 
                      }
                      
                  </Marker>
                  </div>
                })
              }
              
            </Amap>

            <ChoseCar screenRef={container_ref} cars={cars}/>
            <VideoCompo />
          </div>
          {modalShow 
          ? <DetailModal /> 
          : null}
      </div>
    </div>
  );
}
