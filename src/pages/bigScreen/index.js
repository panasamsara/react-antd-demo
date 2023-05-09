
import "@/styles/mapStyle.css";
import React, { useState } from 'react'


import { getColorByGDP } from "./colors";

import Title from "@/components/Title/Title";
import PieComponent from "./components/Pie1/PieComponent";
import Pie2Component from "./components/Pie2/PieComponent";
import Pie3Component from "./components/Pie3/PieComponent";
import Pie4Component from "./components/Pie4/PieComponent";
import TopCompo from "./components/TopCompo";
import ScreenMap from "./components/ScreenMap";
import getImgUrl from "@/assets/images/getImgUrl";


export default function App() {
    
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
                <ScreenMap /> 
                

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
