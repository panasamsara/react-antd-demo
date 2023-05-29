
import "@/styles/mapStyle.less";
import React, { useEffect, useRef } from 'react';
import getImgUrl from "@/assets/images/getImgUrl";
import Title from "@/components/Title/Title";
import LeftOne from "./components/LeftOne";

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
            <div style={{ width: 500, height: 1010}}>
              <div style={{ width: 500, height: 320, }}>
                <LeftOne title='板块车辆分布'/>
              </div>
              <div style={{ width: 500, height: 320, }}>
                <LeftOne title='板块车辆分布'/>
              </div>
              <div style={{ width: 500, height: 320, }}>
                <LeftOne title='板块车辆分布'/>
              </div>
            </div>
            <div style={{backgroundColor: 'yellow', width: 920, height: 1010}}>
              <div style={{backgroundColor: 'pink', width: 920, height: 320}}>21</div>
              <div style={{backgroundColor: 'green', width: 920, height: 690}}>22</div>
            </div>
            <div style={{ width: 500, height: 1010}}>
              <div style={{ width: 500, height: 320, }}>
                <LeftOne title='板块车辆分布'/>
              </div>
              <div style={{ width: 500, height: 320, }}>
                <LeftOne title='板块车辆分布'/>
              </div>
              <div style={{ width: 500, height: 320, }}>
                <LeftOne title='板块车辆分布'/>
              </div>
            </div>
          </div>
      </div>
    );
}
