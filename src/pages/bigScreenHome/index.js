
import "@/styles/mapStyle.less";
import React, { useEffect, useRef } from 'react';
import getImgUrl from "@/assets/images/getImgUrl";
import Title from "@/components/Title/Title";

import BackCompo from "./components/BackCompo";
import LeftTopNumber from "./components/LeftTopNumber";
import TableData from "./components/TableData";
import TopCompo from "./components/TopCompo";
import NumberOne from "./components/NumberOne";
import MapCompo from "./components/MapCompo";
import MapCountryLayer from "./components/mapCountryLayer";
import PieCompo from "./echarts/PieCompo";
import LineChart from "./echarts/LineChart";
import Category from "./echarts/Category";
import Radar from "./echarts/Radar";

export default function App() {
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
        
          <div className="map-container" style={{width: "100%", height: 1010, position: 'relative', display: 'flex'}}>
            <div style={{ width: 500, height: 1010, zIndex: 2}}>
              <div style={{ width: 500, height: 320, padding: 10 }}>
                <BackCompo title='平台车辆统计'>
                  <LeftTopNumber/>
                </BackCompo>
              </div>
              <div style={{ width: 500, height: 320, padding: 10 }}>
                <BackCompo title='板块车辆分布（柱状图）'>
                  <Category/>
                </BackCompo>
              </div>
              <div style={{ width: 500, height: 320, padding: 10 }}>
                <BackCompo title='板块车辆分布（折线图）'>
                  <LineChart/>
                </BackCompo>
              </div>
            </div>
            <div style={{ width: 920, height: 1010, position: 'relative'}}>
              <div style={{ width: 1920, height: 1010, zIndex: 1 }}>
                <MapCompo>
                  <MapCountryLayer/>
                </MapCompo>
              </div>
              <div style={{ position: 'absolute', bottom: 0, width: 920, height: 320, display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: 300, height: 306}}>
                  <TopCompo title='板块车辆分布'>
                    <NumberOne/>
                  </TopCompo>
                </div>
                <div style={{width: 300, height: 306}}>
                  <TopCompo title='板块车辆分布'>
                    <NumberOne/>
                  </TopCompo>
                </div>
                <div style={{width: 300, height: 306}}>
                  <TopCompo title='板块车辆分布'>
                    <NumberOne/>
                  </TopCompo>
                </div>
              </div>
              
            </div>
            <div style={{ width: 500, height: 1010, zIndex: 2}}>
              <div style={{ width: 500, height: 320, padding: 10}}>
                <BackCompo title='板块车辆分布'>
                  <LeftTopNumber/>
                </BackCompo>
              </div>
              <div style={{ width: 500, height: 320, padding: 10 }}>
                <BackCompo title='板块车辆分布'>
                  <LeftTopNumber/>
                </BackCompo>
              </div>
              <div style={{ width: 500, height: 320, padding: 10 }}>
                <BackCompo title='板块车辆分布（饼图）'>
                  <PieCompo/>
                </BackCompo>
              </div>
            </div>
          </div>
      </div>
    );
}
