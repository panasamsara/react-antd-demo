import { useState, useEffect, useCallback } from "react";
import Adcode from "../../constants/Adcode";
// 自定义地图（配色等 需收费） https://geohub.amap.com/mapstyle/index

function drawProivinceMask(data, map) {
  let disProvince = new window.AMap.DistrictLayer.Province({
      adcode: Adcode.map(d => d[1]).filter(item => !data.includes(item)),
      zIndex: 10,
      depth: 0,
      
      styles: {
        fill: function () {
          return "rgba(34,47,91,1)";
        },
        "province-stroke": "rgba(34,47,91,1)",
        "city-stroke": "white", // 中国地级市边界
        "county-stroke": "rgba(34,47,91,1)" // 中国区县边界
      }
  });
  // disProvince.setMap(map);
  return disProvince;
}

export default function RootPage() {

  useEffect(() => {
    let map = new window.AMap.Map("amap-container", {
        rotateEnable: false,
        doubleClickZoom: false,
        zoom: 8,
        // center: center,
        minZoom: 8,
        pitch: 0,
        zooms: [6, 15],
        mapStyle: "amap://styles/1be09ed759602bf0dc3d2499cfb87099"
    });

    drawProivinceMask("420000",map);
  
    map.on("zoomend", () => {
        const zoom = map.getZoom();
        let degree = 1;
        if (zoom <= 10) degree = 1;
        if (zoom > 10 && zoom < 14) degree = 2;
        if (zoom >= 14) degree = 3;
    })
  }, []);

  return (
    <div style={{height: "100%", position: "relative"}}>
      <span>原生高德地图</span>

      <div id="amap-container" style={{height: "600px", width: '100%'}}></div>
    </div>
  )
}