
import "@/styles/mapStyle.less";
import React, { useEffect, useRef } from 'react';
import getImgUrl from "@/assets/images/getImgUrl";
import Title from "@/components/Title/Title";

import BackCompo from "./components/BackCompo";
import Compo470x200 from "./components/Compo470x200";
import Compo470x230 from "./components/Compo470x230";
import Compo470x300 from "./components/Compo470x300";
import Compo470x410 from "./components/Compo470x410";
import LeftTopNumber from "./components/LeftTopNumber";
import TableData from "./components/TableData";
import TopCompo from "./components/TopCompo";
import NumberOne from "./components/NumberOne";
import MapCompo from "./components/MapCompo";
import MapCountryLayer from "./components/mapCountryLayer";
import TaskList from "./components/TaskList";
import PeopleNumber from "./components/PeopleNumber";
import Company from "./components/Company";
import PieCompo from "./echarts/PieCompo";

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
            <div style={{ width: 500, height: 230, padding: 10, marginBottom: 10 }}>
              <Compo470x230 title='年度试验任务'>
                <LeftTopNumber/>
              </Compo470x230>
            </div>
            <div style={{ width: 500, height: 300, padding: 10, marginBottom: 10 }}>
              <Compo470x300 title='年度试验任务'>
                <TaskList/>
              </Compo470x300>
            </div>
            <div style={{ width: 500, height: 200, padding: 10, marginBottom: 10 }}>
              <Compo470x200 title='年度试验任务1'>
                <PieCompo/>
              </Compo470x200>
            </div>
            <div style={{ width: 500, height: 200, padding: 10 }}>
              <Compo470x200 title='科室'>
                <PeopleNumber/>
              </Compo470x200>
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
            <div style={{ width: 500, height: 230, padding: 10, marginBottom: 10 }}>
              <Compo470x230 title='年度试验任务'>
                <LeftTopNumber/>
              </Compo470x230>
            </div>
            <div style={{ width: 500, height: 300, padding: 10, marginBottom: 10 }}>
              <Compo470x300 title='试验任务试验进展'>
                <TaskList/>
              </Compo470x300>
            </div>
            <div style={{ width: 500, height: 410, padding: 10, marginBottom: 10 }}>
              <Compo470x410 title='公司化运营'>
                <Company/>
              </Compo470x410>
            </div>
          </div>
        </div>
    </div>
  );
}
