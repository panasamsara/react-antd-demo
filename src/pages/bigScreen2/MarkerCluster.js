/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useCallback } from "react";
import "./styles.css";
import { useAmapComponent } from "@amap/amap-react";
// import * as ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client';

function MarkerCluster(props) {
  const renderMarker = useCallback((ctx) => {
    const point = ctx.data[0];
    const { marker } = ctx;
    const { renderMarker } = props;
    const vdom = renderMarker(point, marker);
    const dom = renderDOM(vdom);
    marker.setContent(dom);
  }, []);
  const renderCluster = useCallback((ctx) => {
    const { marker, data, count } = ctx;
    const { renderCluster } = props;
    const cluster = { data, count };
    const vdom = renderCluster(cluster, marker);
    const dom = renderDOM(vdom);
    marker.setContent(dom);
  }, []);

  const layer = useAmapComponent(
    (AMap, map) => {
      const options = [
        ("gridSize", "maxZoom", "averageCenter", "clusterByZoomChange")
      ].reduce((kv, key) => {
        const val = props[key];
        if (val !== undefined) {
          kv[key] = val;
        }
        return kv;
      }, {});
      options.renderClusterMarker = renderCluster;
      options.renderMarker = renderMarker;
      return new AMap.MarkerCluster(map, [], options);
    },
    ["AMap.MarkerCluster"]
  );

  const { data } = props;

  useEffect(() => {
    if (!layer) return;
    layer.setData(data);
  }, [layer, data]);

  return null;
}

export default MarkerCluster;

function renderDOM(vdom) {
  const div = document.createElement("div");
  // ReactDOM.render(vdom, div);
  const root = ReactDOM.createRoot(div);
  root.render(vdom);
  return div;
}
