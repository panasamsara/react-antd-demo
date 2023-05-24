
import "@/styles/mapStyle.less";
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { message, Button } from 'antd';
import { CloseOutlined, } from '@ant-design/icons';
import {
  Amap,
  Marker, Polyline,
  usePlugins
} from "@amap/amap-react";
import { get, post } from '@/utils/requests';
import CAR from "@/assets/imagesMap/car.png";
import MARKER_SVG from "@/assets/marker.svg";
import Title from "@/components/Title/Title";
import ChoseCar from "./components/ChoseCar";
import VideoCompo from "./components/VideoCompo";
import getImgUrl from "@/assets/images/getImgUrl";
import { bus } from '@/utils';

let stringToHTML = function (str) {
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;
};

export default function App() {
  usePlugins("AMap.MoveAnimation");
  const $marker = useRef(undefined);
  const [position, setPosition] = useState([116.478935, 39.997761]);
  const [angle, setAngle] = useState(0);
  const [pathLine, setPathLine] = useState([]);
  const [passedPath, setPassedPath] = useState([]);
  const [chosenCar, setChosenCar] = useState({});
  const [chosenVin, setChosenVin] = useState('');
  const [allVehicles, setAllVehicles] = useState({}); // 接口数据备份
  const [mapZoom, setMapZoom] = useState(5);
  const [mapCenter, setMapCenter] = useState();
  const [cars, setCars] = useState([]); // 展示点
  // 获取所有车辆，用于地图上展示车辆的点
  async function getCars() {
    const {code,data} = await get('/api/getAllVehicles', {})
    if(code==0){
      setAllVehicles(data)
      setCars(Object.values(data))
    }
  }
  useEffect(() => {
    getCars()
  }, [])

  // 全局事件监听
  useEffect(() => {
    const tableclickCallback = (e) => {
      setChosenVin(e.RowData.vin)
      setCars([e.RowData]) // 选中车辆后 只展示一个车辆的点
      setMapCenter([e.RowData.longitude, e.RowData.latitude])
      setMapZoom(17)
    }
    const getTrackCallback = (e) => {
      setMapCenter([e[0].longitude, e[0].latitude])
      setPosition([e[0].longitude, e[0].latitude])
      setPassedPath([e[0].longitude, e[0].latitude])
      let arr = e.map(item => [item.longitude, item.latitude])
      console.log('getTrack', arr) 
      setPathLine(arr)
    }
    bus.on(`tableClick`, tableclickCallback)
    bus.on(`getTrack`, getTrackCallback)
    return () => {
      bus.off(`tableClick`, tableclickCallback)
      bus.off(`getTrack`, getTrackCallback)
    }
  }, [])

  
  const container_ref = useRef();
  
  // 根据vin获取Channel 用于展示视频,默认展示第一个channel的视频
  async function getChannels(vin) {
    const {code,data, msg} = await get('/api/getChannels', {
      vin: vin
    })
    if(code==0){
      bus.emit('showDetailModal',{
        channelInfo: data, 
        vin: vin,
        chosenCar: chosenCar
      })
    }else{
      message.error(`服务错误：${msg}`)
    }
  }
  // 关闭详情弹框 展示所有车辆marker
  const closeDetail = ()=>{
    setChosenVin('')
    setPathLine([])
    setCars(Object.values(allVehicles))
  }

  const startAnim = () => {
    const marker = $marker.current;
    if (!marker) return;
    marker.moveAlong(pathLine, {
      // 每一段的时长
      duration: 1000,
      // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
      autoRotation: true
    });
  };
  const pauseAnim = useCallback(() => {
    const marker = $marker.current;
    if (!marker) return;
    marker.pauseMove();
  });
  const resumeAnim = useCallback(() => {
    const marker = $marker.current;
    if (!marker) return;
    marker.resumeMove();
  });
  const stopAnim = useCallback(() => {
    const marker = $marker.current;
    if (!marker) return;
    marker.stopMove();
  });

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
          <div className="map-container" id="map-container" style={{width: "100%", height: "100%", position: 'fixed'}}>
            <Amap
              zoom={mapZoom}
              center={mapCenter}
              onComplete={(map) => {
                map.setFitView();
              }}
            >
              {
                cars.map(item=>{
                  return <div key={item.vin}>
                    <Marker position={[item.longitude, item.latitude]} offset={[0, -40]} anchor="top-center">
                      <img src={MARKER_SVG} alt="marker" onClick={(e)=> {
                        e.stopPropagation()
                        getChannels(item.vin)
                        setChosenCar(item)
                        setChosenVin(item.vin)
                        bus.emit('changeDetailModal',{})
                      }}/>
                      {/* {
                        chosenVin == item.vin ?
                        <div style={{position: 'absolute',}}>
                          <div style={{ width: 180, height: 60, display: 'flex', flexDirection: 'column', textAlign: 'left', fontSize: 16, background: '#f3e3d3', padding: 10, borderRadius: 4, cursor: 'pointer' }}
                            onClick={()=> getChannels(item.vin)}
                          >
                            <p style={{margin: 0}}>{item.vin}</p>
                            <p style={{margin: 0}}>速度：{item.speed}</p>
                          </div>
                          <div style={{ width: 20, height: 20, borderRadius: 10,backgroundColor: '#fff', position: 'absolute', top: -5, right: -10, paddingLeft: 3,cursor: 'pointer' }}
                            onClick={closeDetail}
                          >
                            <CloseOutlined />
                          </div>
                        </div>
                         : null
                      } */}
                      
                  </Marker>
                  </div>
                })
              }
              { pathLine.length>0
                ? <Polyline
                  path={pathLine}
                  showDir
                  strokeColor="#28F" //线颜色
                  strokeWeight={8} //线宽
                /> : null
              }
              {passedPath.length > 0 && (
                <Polyline
                  path={passedPath}
                  strokeColor="#AF5" //线颜色
                  strokeWeight={8} //线宽
                />
              )}
              {passedPath.length > 0 && (
                <Marker
                  ref={$marker}
                  position={position}
                  autoRotation
                  angle={angle}
                  anchor="center"
                  onMoving={(marker, e) => {
                    setPassedPath(e.passedPath);
                    const p = marker.getPosition();
                    setPosition([p.getLng(), p.getLat()]);
                    setAngle(marker.getAngle());
                  }}
                >
                  <img src={CAR} alt="car" />
                </Marker>
              )}
            </Amap>
          </div>

          <ChoseCar screenRef={container_ref} cars={cars}/>
          
          {/* 视频播放组件 */}
          <VideoCompo screenRef={container_ref}/>

      </div>
      {passedPath.length > 0 && (
        <div className="car-move-control">
          <h4>轨迹回放控制</h4>
          <div className="input-item">
            <input
              type="button"
              className="btn"
              value="开始动画"
              onClick={startAnim}
            />
            <input
              type="button"
              className="btn"
              value="暂停动画"
              onClick={pauseAnim}
            />
          </div>
          <div className="input-item">
            <input
              type="button"
              className="btn"
              value="继续动画"
              onClick={resumeAnim}
            />
            <input
              type="button"
              className="btn"
              value="停止动画"
              onClick={stopAnim}
            />
          </div>
        </div>
      )}
    </div>
  );
}
