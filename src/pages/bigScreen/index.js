
import "@/styles/mapStyle.less";
import React, { useEffect, useRef } from 'react';
import getImgUrl from "@/assets/images/getImgUrl";
import Title from "@/components/Title/Title";
import PieComponent from "./components/Pie1/PieComponent";
import Pie2Component from "./components/Pie2/PieComponent";
import Pie3Component from "./components/Pie3/PieComponent";
import Pie4Component from "./components/Pie4/PieComponent";
import TopCompo from "./components/TopCompo";
import ScreenMap from "./components/ScreenMap";
import L7Map from "../map/L7";

export default function App() {
  // // 全屏展示
  // const container_ref = useRef();

  // useEffect(()=>{
  //   if (container_ref.current.requestFullscreen) {
  //     container_ref.current.requestFullscreen();
  //   } else if (container_ref.current.webkitRequestFullScreen) {
  //     container_ref.current.webkitRequestFullScreen();
  //   } else if (container_ref.current.mozRequestFullScreen) {
  //     container_ref.current.mozRequestFullScreen();
  //   } else if (container_ref.current.msRequestFullscreen) {
  //     container_ref.current.msRequestFullscreen();
  //   }
  // },[container_ref]);

    return (
      <div 
        style={{
        overflow: 'hidden',
        width: 1920,
        height: 1080,
        background: `url(${getImgUrl('BG1')}) 100% 100% no-repeat`,
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
                <Title page={'bigScreen1'} title={'东风技术中心热区试验数字化看板'}/>
              </div>
        </div>
        <div className="App">
            
            <div className="map-container" style={{width: "100%", height: "100%", position: 'fixed'}}>
                {/* <ScreenMap />  */}
                <L7Map></L7Map>

                <PieComponent />
                <Pie2Component />
                <Pie3Component />
                <Pie4Component />
                <TopCompo />
            </div>
        </div>
      </div>
    );
}
