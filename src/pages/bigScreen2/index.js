
import "@/styles/mapStyle.less";
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { message, Select } from 'antd';
import { CloseOutlined, } from '@ant-design/icons';
import {
  Amap,
  Marker, Polyline,
  usePlugins
} from "@amap/amap-react";
import { get, post } from '@/utils/requests';
import CAR from "@/assets/imagesMap/car.png";
import MARKER_SVG from "@/assets/marker.svg";
import MARKER_RED_SVG from "@/assets/marker_red.svg";
import MARKER_GRAY_SVG from "@/assets/marker_gray.svg";
import Title from "@/components/Title/Title";
import ChoseCar from "./components/ChoseCar";
import VideoCompo from "./components/VideoCompo";
import getImgUrl from "@/assets/images/getImgUrl";
import { bus } from '@/utils';
import { useReactiveRef } from "./mapHooks";
import MarkerCluster from "./MarkerCluster";

let stringToHTML = function (str) {
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;
};
function interpolate(u, begin, end) {
  if (u < 0) u = 0;
  if (u > 1) u = 1;
  return u * (end - begin) + begin;
}

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

  // 点聚合相关
  const $clusterData = useReactiveRef([]);
  const renderMarker = useCallback((point, marker) => {
    marker.setOffset([-8, -8]);
    return point.itemData.status == '0' ?
      <img src={MARKER_GRAY_SVG} style={{color: 'red'}} alt="marker" onClick={(e)=> {
        e.stopPropagation()
        getChannels(point.itemData.vin)
        setChosenCar(point.itemData)
        setChosenVin(point.itemData.vin)
        bus.emit('changeDetailModal',{})
      }}/> 
      : 
      <img src={MARKER_SVG} style={{color: 'red'}} alt="marker" onClick={(e)=> {
        e.stopPropagation()
        getChannels(point.itemData.vin)
        setChosenCar(point.itemData)
        setChosenVin(point.itemData.vin)
        bus.emit('changeDetailModal',{})
      }}/> ;
  }, []);
  const renderCluster = useCallback((cluster, marker) => {
    const { count } = cluster;
    const data = $clusterData.current;
    const p = count / data.length;
    const u = Math.pow(p, 1 / 18);
    const v = Math.pow(p, 1 / 5);
    const hue = Math.floor(interpolate(u, 180, 0));
    const size = Math.floor(interpolate(v, 30, 60));
    const style = {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${size / 2}px`,
      backgroundColor: `hsla(${hue}, 100%, 50%, 0.7)`,
      borderColor: `hsla(${hue}, 100%, 40%, 1)`,
      boxShadow: `0 0 10px hsla(${hue}, 100%, 50%, 1)`
    };
    marker.setOffset([-size / 2, -size / 2]);
    return (
      <div className="custom-cluster" style={style}>
        {count}
      </div>
    );
  }, []);

  // 获取所有车辆，用于地图上展示车辆的点
  async function getCars() {
    const {code,data} = await get('/api/getAllVehicles', {})
    if(code==0){
      setAllVehicles(data)
      let car_arr = Object.values(data)
      car_arr.forEach(item=>{
        get('/api/getChannels', {
          vin: item.vin.trim()
        }).then(res=>{
          if(res.msg == 'request terminalNo null'){
            item.hasVideo = false
          }else{
            let channels = Object.values(res.data.channels);
            if(channels.includes('1')){
              item.hasVideo = true
            }else{
              item.hasVideo = false
            }
          }
        })
      })
      setCars(car_arr);
      //组织数据 给点聚合用
      let geo_arr = car_arr.map(item=>{
        return {
          lnglat: [item.longitude, item.latitude],
          itemData: item
        }
      })
      $clusterData.current = geo_arr
    }
  }
  useEffect(() => {
    getCars()
  }, [])

  // 全局事件监听
  useEffect(() => {
    const tableclickCallback = (e) => {
      setChosenVin(e.RowData.vin)
      // setCars([e.RowData]) // 选中车辆后 只展示一个车辆的点
      setMapCenter([e.RowData.longitude, e.RowData.latitude])
      setMapZoom(17)
    }
    const getTrackCallback = (e) => {
      setMapCenter([e[0].longitude, e[0].latitude])
      setMapZoom(12.5)
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
      vin: vin.trim()
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
    setPassedPath([])
    setCars(Object.values(allVehicles))
  }
  
  const [moveDuration, setMoveDuration] = useState(1000);
  // 轨迹动画控制方法
  const startAnim = (moveDuration) => {
    const marker = $marker.current;
    if (!marker) return;
    marker.moveAlong(pathLine, {
      // 每一段的时长
      duration: moveDuration,
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

  const handleChange = (e) => {
    stopAnim()
    setMoveDuration( parseInt(e.value) )
  };

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
              <MarkerCluster
                data={$clusterData.current}
                gridSize={80}
                averageCenter
                renderMarker={renderMarker}
                renderCluster={renderCluster}
              />
              {/* {
                cars.map(item=>{
                  return <div key={item.vin}>
                    <Marker position={[item.longitude, item.latitude]} offset={[0, -40]} anchor="top-center">
                      {
                        item.status == '0' ?
                        <img src={MARKER_GRAY_SVG} style={{color: 'red'}} alt="marker" onClick={(e)=> {
                          e.stopPropagation()
                          getChannels(item.vin)
                          setChosenCar(item)
                          setChosenVin(item.vin)
                          bus.emit('changeDetailModal',{})
                        }}/> : null
                      }
                      {
                        item.status == '2' ?
                        <img src={MARKER_RED_SVG} style={{color: 'red'}} alt="marker" onClick={(e)=> {
                          e.stopPropagation()
                          getChannels(item.vin)
                          setChosenCar(item)
                          setChosenVin(item.vin)
                          bus.emit('changeDetailModal',{})
                        }}/> : null
                      }
                      {
                        item.status == '3' ?
                        <img src={MARKER_SVG} style={{color: 'red'}} alt="marker" onClick={(e)=> {
                          e.stopPropagation()
                          getChannels(item.vin)
                          setChosenCar(item)
                          setChosenVin(item.vin)
                          bus.emit('changeDetailModal',{})
                        }}/> : null
                      }
                      
                      {
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
                      }
                      
                  </Marker>
                  </div>
                })
              } */}
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
          <CloseOutlined style={{position: 'absolute', right: 10, cursor: 'pointer'}}
            onClick={closeDetail}
          />
          <h4>轨迹回放控制</h4>
          <div>
            <span>回放速度：</span>
            <Select
              labelInValue
              defaultValue={{
                value: '1000',
                label: '1倍',
              }}
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: '1000',
                  label: '1倍',
                },
                {
                  value: '100',
                  label: '10倍',
                },
                {
                  value: '50',
                  label: '20倍',
                },
                {
                  value: '20',
                  label: '50倍',
                },
              ]}
            />
          </div>
          <div className="input-item">
            <input
              type="button"
              className="btn"
              value="开始动画"
              onClick={()=>startAnim(moveDuration)}
            />
            <input
              type="button"
              className="btn"
              value="暂停动画"
              onClick={()=>pauseAnim()}
            />
          </div>
          <div className="input-item">
            <input
              type="button"
              className="btn"
              value="继续动画"
              onClick={()=>resumeAnim()}
            />
            <input
              type="button"
              className="btn"
              value="停止动画"
              onClick={()=>stopAnim()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
