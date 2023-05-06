
import "@/styles/mapStyle.css";
import React, { useState } from 'react'
import {
  Amap,
  usePlugins,
  Polygon,
  Marker
} from "@amap/amap-react";
// import { Map, Marker, Polygon } from 'react-amap'

import { getColorByGDP } from "./colors";
import MARKER_SVG from "@/assets/marker.svg";
import Title from "@/components/Title/Title";
import PieComponent from "./components/Pie1/PieComponent";
import Pie2Component from "./components/Pie2/PieComponent";
import Pie3Component from "./components/Pie3/PieComponent";
import Pie4Component from "./components/Pie4/PieComponent";
import TopCompo from "./components/TopCompo";
import getImgUrl from "@/assets/images/getImgUrl";

// const { AMap } = window
// console.log('AMap-', AMap)
export default function App() {
    usePlugins(['AMap.ToolBar','AMap.MoveAnimation'])
    const path1 = [
        // 111.87,31.91  113.76,31.84  114.94,29.72  111.12,30.30
        // 126.84,49.93  128.09,49.39 127.85,48.87 126.33,49.29
        [126.84, 49.93],
        [128.09, 49.39],
        [127.85, 48.87],
        [126.33, 49.29],
    ];
    const path2 = [
        // 102.51,31.39  105.63,31.65  104.92,29.61  102.11,29.00
        // 121.90,53.27 123.11,53.28 123.09,52.78 122.16,52.74
        [121.90, 53.27],
        [123.11, 53.28],
        [123.09, 52.68],
        [122.16, 52.64],
    ];
    const path3 = [
        // 102.51,31.39  105.63,31.65  104.92,29.61  102.11,29.00
        // 124.80,44.17 125.83,43.90 125.66,43.45 124.82,43.47
        [124.80, 44.17],
        [125.83, 43.90],
        [125.66, 43.45],
        [124.82, 43.47],
    ];

    return (
      <div style={{
        overflow: 'hidden',
        height: '100%',
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
                <Title page={'bigScreen1'}/>
              </div>
        </div>
        <div className="App">
            
            <div className="map-container" style={{width: "100%", height: "100%", position: 'fixed'}}>
                
                <Amap
                showLabel={false}
                zooms={[4, 10]}
                center={[110.122082, 37.719192]}
                zoom={5}
                isHotspot={false}
                defaultCursor="pointer"
                showIndoorMap={false} // 不显示室内地图
                mapStyle='amap://styles/f74689d33353c8266c5a7d2f6a98f140'
                >
                    {/* <CountryLayer
                        zIndex={10}
                        SOC="CHN"
                        depth={1}
                        styles={{
                        "nation-stroke": "#ff0000",
                        "coastline-stroke": "#0088ff",
                        "province-stroke": "grey",
                        fill: (props) => {
                            return getColorByGDP(props.adcode_pro);
                        }
                        }}
                    /> */}
                    <Polygon
                        path={path1}
                    />
                    <Marker position={[126.84, 49.53]} offset={[0, -40]} anchor="top-center">
                        <img src={MARKER_SVG} alt="marker" />
                        <div style={{ width: 120, height: 25, display: 'flex', alignItems: 'center', fontSize: 16, background: '#fff', padding: 10, borderRadius: 4 }}>
                            孙吴，车辆51</div>
                    </Marker>
                </Amap>

                {/* <Map
                    zoom={5}
                    center={[108.55, 43.86]}
                    useAMapUI
                    mapStyle='amap://styles/f74689d33353c8266c5a7d2f6a98f140'
                    amapkey={'7929e756475e21165771e02882453d20'}
                >
                    <Polygon
                        visiable={true}
                        path={path1}
                        style={{
                            strokeColor: "rgb(206,58,142)",
                            fillColor: "rgb(202,108,230)",
                            zIndex: 50,
                        }}
                    />
                    <Marker visiable={true} position={new AMap.LngLat(126.84, 49.53)} />
                    <Marker
                        visiable={true}
                        style={{ fontSize: 18 }}
                        icon=''
                        draggable={false}
                        bubble={true}
                        position={AMap && new AMap.LngLat(121.57, 49.36)}
                    >
                        <div style={{ width: 120, height: 25, display: 'flex', alignItems: 'center', fontSize: 16, background: '#fff', padding: 10, borderRadius: 4 }}>孙吴，车辆51</div>
                    </Marker>
                    <Polygon
                        visiable={true}
                        path={path2}
                        style={{
                            strokeColor: "#fff",
                            fillColor: "rgb(6,232,215)",
                            zIndex: 50
                        }}
                    />
                    <Marker visiable={true} position={new AMap.LngLat(122.50, 53.00)} />
                    <Marker
                        visiable={true}
                        icon=''
                        draggable={false}
                        bubble={true}
                        position={AMap && new AMap.LngLat(121.10, 51.70)}
                    >
                        <div style={{ width: 120, height: 25, display: 'flex', alignItems: 'center', fontSize: 16, background: '#fff', padding: 10, borderRadius: 4 }}>漠河，车辆63</div>
                    </Marker>
                    <Polygon
                        visiable={true}
                        path={path3}
                        style={{
                            strokeColor: "#fff",
                            fillColor: "rgb(255,206,55)",
                            zIndex: 50
                        }}
                    />
                    <Marker visiable={true} position={new AMap.LngLat(124.90, 43.57)} />
                    <Marker
                        visiable={true}
                        icon=''
                        draggable={false}
                        bubble={true}
                        position={AMap && new AMap.LngLat(119.50, 43.17)}
                    >
                        <div style={{ width: 120, height: 25, display: 'flex', alignItems: 'center', fontSize: 16, background: '#fff', padding: 10, borderRadius: 4 }}>长春，车辆5</div>
                    </Marker>
                </Map> */}
        
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
