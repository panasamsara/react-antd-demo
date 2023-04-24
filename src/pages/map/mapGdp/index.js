import React from "react";
import "./styles.css";
import {
  Amap,
  Scale,
  Toolbar,
  CountryLayer,
  LabelsLayer,
  LabelMarker
} from "@amap/amap-react";
import { getColorByGDP } from "./colors";
import LabelsData from "./districts";

export default function App() {
  return (
    <div className="App">
      <div className="map-container" style={{width: 800, height: 720}}>
        <Amap
          showLabel={false}
          zooms={[4, 10]}
          center={[106.122082, 33.719192]}
          zoom={4}
          isHotspot={false}
          defaultCursor="pointer"
          features={[]} // 所有默认底图图层都隐藏
          showIndoorMap={false} // 不显示室内地图
        >
          <CountryLayer
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
          />
          <LabelsLayer collision={false}>
            {LabelsData.map((p, i) => (
              <LabelMarker key={i} {...p} />
            ))}
          </LabelsLayer>

          <Scale />
          <Toolbar />
        </Amap>
      </div>
    </div>
  );
}
