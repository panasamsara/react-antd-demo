
import "@/styles/mapStyle.less";
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

let stringToHTML = function (str) {
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;
};

export default function App() {
  const [chosenVin, setChosenVin] = useState('');
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
    bus.on(`closeDetailModal`, closeModalCallback)
    return () => {
      bus.off(`tableClick`, tableclickCallback)
      bus.off(`closeDetailModal`, closeModalCallback)
    }
  }, [])

  // 全屏展示
  const container_ref = useRef();
  let map
  useEffect(()=>{
    map = new window.AMap.Map('map-container', {
      viewMode: '2D',  // 默认使用 2D 模式
      zoom:5,  //初始化地图层级
    });
    map.on('complete', function () {
      get('/api/getAllVehicles', {}).then(res=>{
        let positions = Object.values(res.data);
        
        for (let i = 0; i < positions.length; i++) {
          let curPosition = [positions[i].longitude, positions[i].latitude];
          const marker = new window.AMap.Marker({
            position: curPosition,
            offset: new window.AMap.Pixel(-10, -34),
            content: `<div class="marker-route marker-marker-bus-from" id="${positions[i].vin}">
              <img src=${MARKER_SVG} alt="marker" />
              <input type='hidden' value='${positions[i].vin}'/>
            </div>`
              
          })
          // 给marker绑定事件
          marker.on('mouseover', function(e){
            let vin = stringToHTML( e.target._opts.content).childNodes[0].childNodes[3].value
            let pDiv = document.getElementById(vin);
 
            let div = document.createElement("div");
            div.setAttribute("id", "newDiv"); 
            div.setAttribute("class", "amap-info-window"); 
            div.innerHTML = `车辆VIN: ${vin}`;
            pDiv.appendChild(div);

            // var position = e.data.data && e.data.data.position;
            // if(position){
            //     normalMarker.setContent(
            //         `<div class="amap-info-window">
            //             车辆位置: [${e.data.vin}]
            //             <div>${position}</div>
            //         </div>`);
            //     normalMarker.setPosition(position);
            //     map.add(normalMarker);
            // }
          });
          marker.on('mouseout', function(){
              map.remove(normalMarker);
              document.getElementById('newDiv').remove();
          });
          marker.on('click', (e) => {
            // clickData_ref.current = e.target.getExtData()
            // onMarkerClick(e.target.getExtData())
          })
          map.add(marker) 
        }
        //海量点图层写法
      // 创建 AMap.LabelsLayer 图层
      // var layer = new window.AMap.LabelsLayer({
      //   zooms: [3, 20],
      //   zIndex: 1000,
      //   collision: false
      // });
      // // 将图层添加到地图
      // map.add(layer);

      // let markers = [];
      // let positions = Object.values(res.data);

      // let icon = {
      //     type: 'image',
      //     image: MARKER_SVG,
      //     anchor: 'bottom-center',
      // };

      // for (let i = 0; i < positions.length; i++) {
      //     let curPosition = [positions[i].longitude, positions[i].latitude];
      //     let curData = {
      //         position: curPosition,
      //         icon
      //     };

      //     let labelMarker = new window.AMap.LabelMarker(curData);

      //     markers.push(labelMarker);

      //     // 给marker绑定事件
      //     labelMarker.on('mouseover', function(e){
      //         var position = e.data.data && e.data.data.position;
      //         if(position){
      //             normalMarker.setContent(
      //                 `<div class="amap-info-window">
      //                     车辆VIN: ${e.data.vin}
      //                     <div>${position}</div>
      //                 </div>`);
      //             normalMarker.setPosition(position);
      //             map.add(normalMarker);
      //         }
      //     });
      //     labelMarker.on('mouseout', function(){
      //         map.remove(normalMarker);
      //     });
      //   }
      //   // 一次性将海量点添加到图层
      //   layer.add(markers);
      })
      
      // 普通点
      var normalMarker = new window.AMap.Marker({
          anchor: 'bottom-center',
          offset: [0, -15],
      });
    });


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
          <div className="map-container" id="map-container" style={{width: "100%", height: "100%", position: 'fixed'}}>
            {/* <Amap
              zoom={5}
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
              
            </Amap> */}

            
          </div>

          <ChoseCar screenRef={container_ref} cars={cars}/>
          <VideoCompo />

          {modalShow 
          ? <DetailModal /> 
          : null}
      </div>
    </div>
  );
}
