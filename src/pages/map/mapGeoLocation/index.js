import React, { useState } from "react";
import "./styles.css";
import { Amap, Marker, Circle, loadPlugins, useAmap } from "@amap/amap-react";

const noop = () => {};

function GeoLocation(props) {
  const [status, setStatus] = useState("idle");
  const map = useAmap();
  const locate = async () => {
    setStatus("busy");
    const AMap = await loadPlugins("AMap.Geolocation");
    const geo = new AMap.Geolocation();
    geo.getCurrentPosition((status, result) => {
      console.log(status, result);
      const { onSuccess = noop, onFailed = noop, autoMove = false } = props;
      if (
        status === "complete" /*&& result && result.info === 'LOCATE_SUCCESS'*/
      ) {
        setStatus("success");
        onSuccess(result);
        if (map && autoMove) {
          map.setCenter(result.position);
          map.setZoom(18);
        }
      } else {
        setStatus("failed");
        onFailed(result);
      }
    });
  };

  const handleClick = () => {
    if (status === "busy") return;
    locate();
  };

  const STATUS_DICT = {
    idle: "定位",
    busy: "定位中",
    success: "定位",
    failed: "重试"
  };

  return (
    <div className="geo-location">
      <button onClick={handleClick} disabled={status === "busy"}>
        {STATUS_DICT[status]}
      </button>
    </div>
  );
}

export default function App() {
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(-1);

  return (
    <div className="App">
      <div className="map-container">
        <Amap>
          <GeoLocation
            autoMove
            onSuccess={(e) => {
              setPosition([e.position.getLng(), e.position.getLat()]);
              setRadius(e.accuracy);
            }}
          />

          {position && (
            <Marker
              position={position}
              label={{
                content: "我在这里",
                direction: "bottom"
              }}
            />
          )}
          {position && radius > 0 && (
            <Circle center={position} radius={radius} fillOpacity={0.1} />
          )}
        </Amap>
      </div>
    </div>
  );
}
