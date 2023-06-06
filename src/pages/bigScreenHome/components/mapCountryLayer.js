import { useState, useEffect } from "react"
import { Amap, Marker, Polygon, CountryLayer } from '@amap/amap-react';
import MARKER_SVG from "@/assets/marker.svg";

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

  const path1 = [
    [126.84, 49.93],
    [128.09, 49.39],
    [127.85, 48.87],
    [126.33, 49.29],
  ];
  const path2 = [
    [121.90, 53.27],
    [123.11, 53.28],
    [123.09, 52.68],
    [122.16, 52.64],
  ];
  const path3 = [
    [124.80, 44.17],
    [125.83, 43.90],
    [125.66, 43.45],
    [124.82, 43.47],
  ];

  return (
    // <div style={{ width: 890, height: 655,}}>
    <div style={{ width: 1920, height: 1010,}}>
      <Amap 
        zoom={3.5} 
        center={[110, 28]}
        showLabel={false}
        // zooms={[4, 10]}
        isHotspot={false}
        defaultCursor="pointer"
        showIndoorMap={false} // 不显示室内地图
        mapStyle='amap://styles/f74689d33353c8266c5a7d2f6a98f140'
      >
        {/* <Polygon
          path={path1}
          fillColor= "rgb(202,108,230)"
        /> */}
        <Marker position={[114.29, 30.58]} offset={[0, -40]} anchor="top-center">
            <img src={MARKER_SVG} alt="marker" />
            <div style={{ width: 60, height: 18, display: 'flex', alignItems: 'center', fontSize: 12, background: '#103A64',  color: '#fff', borderRadius: 4 }}>
              武汉100</div>
        </Marker>
        {/* <Polygon
          path={path2}
          fillColor= "rgb(6,232,215)"
        /> */}
        <Marker position={[123.90, 51.70]} offset={[0, -40]} anchor="top-center">
            <img src={MARKER_SVG} alt="marker" />
            <div style={{ width: 50, height: 18, display: 'flex', alignItems: 'center', fontSize: 12, background: '#103A64', color: '#fff', borderRadius: 4 }}>
              漠河5</div>
        </Marker>
        {/* <Polygon
          path={path3}
          fillColor= "rgb(255,206,55)"
        /> */}
        <Marker position={[124.90, 43.57]} offset={[0, -40]} anchor="top-center">
            <img src={MARKER_SVG} alt="marker" />
            <div style={{ width: 50, height: 18, display: 'flex', alignItems: 'center', fontSize: 12, background: '#103A64',  color: '#fff', borderRadius: 4 }}>
              长春10</div>
        </Marker>
        <Marker position={[112.12853 , 32.01480]} offset={[0, -40]} anchor="top-center">
            <img src={MARKER_SVG} alt="marker" />
            <div style={{ width: 60, height: 18, display: 'flex', alignItems: 'center', fontSize: 12, background: '#103A64',  color: '#fff', borderRadius: 4 }}>
              襄阳50</div>
        </Marker>
        <Marker position={[89.19730 , 42.95698 ]} offset={[0, -40]} anchor="top-center">
            <img src={MARKER_SVG} alt="marker" />
            <div style={{ width: 60, height: 18, display: 'flex', alignItems: 'center', fontSize: 12, background: '#103A64',  color: '#fff', borderRadius: 4 }}>
              新疆60</div>
        </Marker>
        {/* <CountryLayer
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
        /> */}
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
