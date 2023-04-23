import { useState, useEffect } from "react"
import { Amap, CountryLayer } from '@amap/amap-react';

const COUNTRIES = {
  CHN: {
    name: '中国',
    map: { zoom: 3, center: [108.915184, 39.109677] },
  },
  RUS: {
    name: '俄罗斯',
    map: { zoom: 3, center: [95.135754, 63.85731] },
  },
  USA: {
    name: '美国',
    map: { zoom: 3, center: [-113.877655, 52.652266] },
  },
  JPN: {
    name: '日本',
    map: { zoom: 5, center: [136.824904, 38.00712] },
  },
};

export default function RootPage() {
  const [soc, setSoc] = useState('CHN');
  const [opacity, setOpacity] = useState(0.8);

  return (
    <div style={{ width: '100%', height: '720px',}}>
      <Amap>
        <CountryLayer
          opacity={opacity}
          depth={2}
          soc={soc}
          styles={{
            'nation-stroke': '#22ffff',
            'coastline-stroke': [0.85, 0.63, 0.94, 1],
            'province-stroke': 'white',
            'city-stroke': 'rgba(255,255,255,0.5)', //中国特有字段
            fill: (props) => {
              //中国特有字段
              return getColor(props.adcode_pro || props.NAME_CHN, 'country');
            },
          }}
        />
      </Amap>
    </div>
  )
}
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
