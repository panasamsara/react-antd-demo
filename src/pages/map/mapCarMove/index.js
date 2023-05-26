/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useRef, useEffect, useCallback } from "react";
import "./mapCarMove.css";
import { Amap, Marker, Polyline, usePlugins } from "@amap/amap-react";
import CAR from "@/assets/imagesMap/car.png";

const LINE_ARR = [
  [116.478935, 39.997761],
  [116.478939, 39.997825],
  [116.478912, 39.998549],
  [116.478912, 39.998549],
  [116.478998, 39.998555],
  [116.478998, 39.998555],
  [116.479282, 39.99856],
  [116.479658, 39.998528],
  [116.480151, 39.998453],
  [116.480784, 39.998302],
  [116.480784, 39.998302],
  [116.481149, 39.998184],
  [116.481573, 39.997997],
  [116.481863, 39.997846],
  [116.482072, 39.997718],
  [116.482362, 39.997718],
  [116.483633, 39.998935],
  [116.48367, 39.998968],
  [116.484648, 39.999861]
];

export default function App() {
  useStyle();
  const $marker = useRef(undefined);
  const [position, setPosition] = useState([116.478935, 39.997761]);
  const [angle, setAngle] = useState(0);
  const [passedPath, setPassedPath] = useState([]);

  usePlugins("AMap.MoveAnimation");

  const startAnim = useCallback(() => {
    const marker = $marker.current;
    if (!marker) return;
    marker.moveAlong(LINE_ARR, {
      // 每一段的时长
      duration: 200,
      // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
      autoRotation: true
    });
  }, []);
  const pauseAnim = useCallback(() => {
    const marker = $marker.current;
    if (!marker) return;
    marker.pauseMove();
  });
  const resumeAnim = useCallback(() => {
    const marker = $marker.current;
    if (!marker) return;
    marker.resumeMove();
  });
  const stopAnim = useCallback(() => {
    const marker = $marker.current;
    if (!marker) return;
    marker.stopMove();
  });

  return (
    <div className="App">
      <div className="map-container">
        <Amap
          zoom={17}
          onComplete={(map) => {
            map.setFitView();
          }}
        >
          <Polyline
            path={LINE_ARR}
            showDir
            strokeColor="#28F" //线颜色
            strokeWeight={8} //线宽
          />

          {passedPath.length > 0 && (
            <Polyline
              path={passedPath}
              strokeColor="#AF5" //线颜色
              strokeWeight={8} //线宽
            />
          )}

          <Marker
            ref={$marker}
            position={position}
            autoRotation
            angle={angle}
            anchor="center"
            onMoving={(marker, e) => {
              setPassedPath(e.passedPath);
              const p = marker.getPosition();
              setPosition([p.getLng(), p.getLat()]);
              setAngle(marker.getAngle());
            }}
          >
            <img src={CAR} alt="car" />
          </Marker>
        </Amap>

        <div className="input-card">
          <h4>轨迹回放控制</h4>
          <div className="input-item">
            <input
              type="button"
              className="btn"
              value="开始动画"
              onClick={startAnim}
            />
            <input
              type="button"
              className="btn"
              value="暂停动画"
              onClick={pauseAnim}
            />
          </div>
          <div className="input-item">
            <input
              type="button"
              className="btn"
              value="继续动画"
              onClick={resumeAnim}
            />
            <input
              type="button"
              className="btn"
              value="停止动画"
              onClick={stopAnim}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function useStyle() {
  useEffect(() => {
    const tag = document.createElement("link");
    tag.setAttribute("rel", "stylesheet");
    tag.setAttribute(
      "href",
      "https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"
    );
    document.head.appendChild(tag);

    return () => {
      document.head.removeChild(tag);
    };
  }, []);
}
