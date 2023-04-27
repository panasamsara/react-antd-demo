/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useCallback } from "react";
import "./styles.css";
import { Amap } from "@amap/amap-react";
import { useReactiveRef } from "./hooks";
import MarkerCluster from "./MarkerCluster";

export default function App() {
  const $data = useReactiveRef([]);

  useEffect(() => {
    loadData().then((points) => ($data.current = points));
  }, []);

  const renderMarker = useCallback((point, marker) => {
    marker.setOffset([-8, -8]);
    return <div className="custom-marker" />;
  }, []);
  const renderCluster = useCallback((cluster, marker) => {
    const { count } = cluster;
    const data = $data.current;
    const p = count / data.length;
    const u = Math.pow(p, 1 / 18);
    const v = Math.pow(p, 1 / 5);
    const hue = Math.floor(interpolate(u, 180, 0));
    const size = Math.floor(interpolate(v, 30, 60));
    const style = {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${size / 2}px`,
      backgroundColor: `hsla(${hue}, 100%, 50%, 0.7)`,
      borderColor: `hsla(${hue}, 100%, 40%, 1)`,
      boxShadow: `0 0 10px hsla(${hue}, 100%, 50%, 1)`
    };
    marker.setOffset([-size / 2, -size / 2]);
    return (
      <div className="custom-cluster" style={style}>
        {count}
      </div>
    );
  }, []);

  return (
    <div className="App">
      <div className="map-container">
        <Amap zoom={4} center={[105, 34]}>
          <MarkerCluster
            data={$data.current}
            gridSize={80}
            averageCenter
            renderMarker={renderMarker}
            renderCluster={renderCluster}
          />
        </Amap>
      </div>
    </div>
  );
}

function interpolate(u, begin, end) {
  if (u < 0) u = 0;
  if (u > 1) u = 1;
  return u * (end - begin) + begin;
}

function loadData() {
  return new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.onload = () => {
      resolve(window.points);
    };
    tag.src = "https://a.amap.com/jsapi_demos/static/china.js";
    document.head.appendChild(tag);
  });
}
