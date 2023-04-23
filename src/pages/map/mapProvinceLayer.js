import { useState, useEffect } from "react"
import { Amap, ProvinceLayer } from '@amap/amap-react';


export default function RootPage() {
  const [opacity, setOpacity] = useState(0.8);
  const [adcode, setAdcode] = useState([420000]);

  return (
    <div style={{ width: '100%', height: '720px',}}>
      <Amap zoom={7}>
        <ProvinceLayer
          opacity={opacity}
          depth={2}
          adcode={adcode}
          styles={{
            fill: (props) => {
              // properties为可用于做样式映射的字段，包含
              // NAME_CHN:中文名称
              // adcode_pro
              // adcode_cit
              // adcode
              const adcode = props.adcode;
              return getColor(adcode, 'province');
            },
            'province-stroke': 'cornflowerblue',
            'city-stroke': 'white', // 中国地级市边界
            'county-stroke': 'rgba(255,255,255,0.5)', // 中国区县边界
          }}
        />
      </Amap>
    </div>
  )
}
const colors = {};

function getColor(key, type) {
  if (!key) return 'rgb(200, 200, 240)';
  if (!colors[key]) {
    const gb = Math.random() * 155 + 50;
    colors[key] = 'rgb(' + gb + ',' + gb + ',255)';
  }

  return colors[key];
}
