import React, { useState } from "react";
import "./styles.css";
import { Amap, Marker } from "@amap/amap-react";
import MARKER_SVG from "./marker.svg";

export default function App() {
  const [center] = useState([116.473179, 39.993169]);
  const [position] = useState([116.473179, 39.993169]);
  const [position2] = useState([116.463270, 39.983260]);

  return (
    <div className="App">
      <div className="map-container" style={{width: 720, height: 720}}>
        <Amap zoom={15} center={center}>
          <Marker position={position} offset={[0, -40]} anchor="top-center">
            <img src={MARKER_SVG} alt="marker" />
            <div className="custom-marker">我的坐标是{position.join(", ")}</div>
          </Marker>

          <Marker position={position2} offset={[0, -40]} anchor="top-center">
            <img src={MARKER_SVG} alt="marker" />
            <div className="custom-marker">我的坐标是{position2.join(", ")}</div>
          </Marker>
        </Amap>
      </div>
    </div>
  );
}
