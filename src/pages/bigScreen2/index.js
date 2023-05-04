
import "@/styles/mapStyle.css";
import React, { useState } from 'react'
import {
  Amap,
  Scale,
  Toolbar,
  CountryLayer,
  TrafficLayer, RoadNetLayer , SatelliteLayer
  
} from "@amap/amap-react";
import Title from "@/components/Title/Title";
import ChoseCar from "./components/ChoseCar";
import VideoCompo from "./components/VideoCompo";
import getImgUrl from "@/assets/images/getImgUrl";

const colors = {};
const GDPSpeed = {};
function getColor(key, type) {
  if (!key) return 'rgb(200, 200, 240)';
  if (!colors[key]) {
    const gdp = GDPSpeed[key];
    if (!gdp) {
      // 没有GDP数据
      const rg = Math.random() * 155 + 50;
      colors[key] = `rgb(${rg}, ${rg}, 255)`;
    } else {
      const rg = 255 - Math.floor(((gdp - 5) / 5) * 255);
      colors[key] = 'rgb(' + rg + ',' + rg + ',255)';
    }
  }
  return colors[key];
}

export default function App() {
  const [soc, setSoc] = useState('CHN');
  const [opacity, setOpacity] = useState(0.8);

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
          <Title />
        </div>
      </div>
      <div className="App">
          <div className="map-container" style={{width: "100%", height: "100%", position: 'fixed'}}>
            <Amap
              showLabel={false}
              zooms={[4, 10]}
              center={[106.122082, 33.719192]}
              zoom={5}
              isHotspot={false}
              defaultCursor="pointer"
              features={[]} // 所有默认底图图层都隐藏
              showIndoorMap={false} // 不显示室内地图
              mapStyle='amap://styles/whitesmoke'
              >
                
                <CountryLayer
                  opacity={opacity}
                  depth={2}
                  soc={soc}
                  // styles={{
                  //   'nation-stroke': '#22ffff',
                  //   'coastline-stroke': [0.85, 0.63, 0.94, 1],
                  //   'province-stroke': 'white',
                  //   'city-stroke': 'rgba(255,255,255,0.5)', //中国特有字段
                  //   fill: (props) => {
                  //     //中国特有字段
                  //     return getColor(props.adcode_pro || props.NAME_CHN, 'country');
                  //   },
                  // }}
                />
                <TrafficLayer />
                <RoadNetLayer />
                <Scale />
                <Toolbar />
              </Amap>

              <ChoseCar />
              <VideoCompo />
          </div>
      </div>
    </div>
  );
}
