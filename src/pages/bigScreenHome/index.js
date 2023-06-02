
import "@/styles/mapStyle.less";
import React, { useEffect, useRef } from 'react';
import getImgUrl from "@/assets/images/getImgUrl";
import Title from "@/components/Title/Title";

import BackCompo from "./components/BackCompo";
import Compo470x150 from "./components/Compo470x150";
import Compo470x150Center from "./components/Compo470x150Center";
import Compo470x200 from "./components/Compo470x200";
import Compo470x230 from "./components/Compo470x230";
import Compo470x300 from "./components/Compo470x300";
import Compo470x390 from "./components/Compo470x390";
import Compo470x410 from "./components/Compo470x410";
import Compo450x200 from "./components/Compo450x200";
import LeftTopNumber from "./components/LeftTopNumber";

import NumberOne from "./components/NumberOne";
import MapCompo from "./components/MapCompo";
import MapCountryLayer from "./components/mapCountryLayer";
import TaskList from "./components/TaskList";
import TaskListRight from "./components/TaskListRight";
import ProductsList from "./components/ProductsList";
import PeopleNumber from "./components/PeopleNumber";
import Company from "./components/Company";
import PieCompo from "./echarts/PieCompo";

import DigitalTopCompo from "./TopCompo";
import TopCompoNew from "./TopCompoNew";

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
              <Title page={'bigScreen1'} title={'东风技术中心 质量验证'}/>
            </div>
      </div>
      
        <div className="map-container" style={{width: "100%", height: 1010, position: 'relative', display: 'flex'}}>
          <div style={{ width: 500, height: 1010, zIndex: 2}}>
            <div style={{ width: 500, height: 150, padding: 10, marginBottom: 10 }}>
              <Compo470x150 title='年度试验任务'>
                <LeftTopNumber/>
              </Compo470x150>
            </div>
            <div style={{ width: 500, height: 390, padding: 10, marginBottom: 10 }}>
              <Compo470x390 title='试验任务实时进展'>
                <TaskList/>
              </Compo470x390>
            </div>
            <div style={{ width: 500, height: 200, padding: 10, marginBottom: 10 }}>
              <Compo470x200 title='人员'>
                <PieCompo/>
              </Compo470x200>
            </div>
            <div style={{ width: 500, height: 200, padding: 10 }}>
              <Compo470x200 title='科室人员'>
                <PeopleNumber/>
              </Compo470x200>
            </div>
          </div>

          <div style={{ width: 920, height: 1010, position: 'relative'}}>
            <div style={{  zIndex: 1, position: 'absolute' }}>
              <MapCompo>
                <MapCountryLayer/>
              </MapCompo>
            </div>
            
            <TopCompoNew/>

            <div style={{ zIndex: 2,width: 920, height: 150, position: 'relative', top: 80, 
              display: 'flex', justifyContent: 'space-between'}}>
              <Compo470x150Center title='年度试验任务'>
                
              </Compo470x150Center>
              <Compo470x150Center title='年度试验任务'>
                
              </Compo470x150Center>
            </div>

            <div style={{ zIndex: 2,position: 'absolute', bottom: 40, width: 920, height: 400, 
              display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
              <Compo450x200 title='课题'>
                <ProductsList/>
              </Compo450x200>
              <Compo450x200 title='标准及URD'>
                <PieCompo/>
              </Compo450x200>
              <Compo450x200 title='关键技术'>
                <ProductsList/>
              </Compo450x200>
              <Compo450x200 title='成果'>
                <ProductsList/>
              </Compo450x200>
              {/* <div style={{width: 300, height: 306}}>
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
              </div> */}
            </div>
            
          </div>

          <div style={{ width: 500, height: 1010, zIndex: 2}}>
            <div style={{ width: 500, height: 150, padding: 10, marginBottom: 10 }}>
              <Compo470x150 title='年度试制任务'>
                <LeftTopNumber/>
              </Compo470x150>
            </div>
            <div style={{ width: 500, height: 390, padding: 10, marginBottom: 10 }}>
              <Compo470x390 title='试制任务实时进展'>
                <TaskListRight/>
              </Compo470x390>
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
