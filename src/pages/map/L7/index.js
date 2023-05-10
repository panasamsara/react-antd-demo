
import "@/styles/mapStyle.css";
import "./style.css";
import { useEffect } from 'react';
import { Scene, LineLayer, PointLayer, MapTheme } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
// import { world } from './world';
import { flypath, dot } from './flyLine';
import PLANE_SVG from "@/assets/plane.svg";
// import CAR from "@/assets/imagesMap/car.png";

export default function App() {
  useEffect(()=>{

    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        pitch: 40,
        center: [ 106, 33.16797 ],
        style: 'dark',
        zoom: 4,
        minZoom: 3,
        maxZoom: 10
      })
    });
    scene.addImage( 'plane', PLANE_SVG);

    scene.on('loaded', () => {
      // 添加地图主题选择
      const mapTheme = new MapTheme({
        position: "topleft",
        options: [
          {text: '月光银', value: 'amap://styles/c422f5c0cfced5be9fe3a83f05f28a68?isPublic=true', img: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*d-vcRLzu8WIAAAAAAAAAAAAADmJ7AQ/original', key: 'light'},
          {text: '幻影黑', value: 'amap://styles/c9f1d10cae34f8ab05e425462c5a58d7?isPublic=true', img: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*HMbRTI3XnpIAAAAAAAAAAAAADmJ7AQ/original', key: 'dark'},
          {text: '酱籽', value: 'amap://styles/wine', img: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*orY0T7QL-lwAAAAAAAAAAAAADmJ7AQ/original', key: 'wine'}
        ]
      });
      scene.addControl(mapTheme);
      // console.log(111,mapTheme.getOptions() );
      const dotData =  dot ;
        // @ts-ignore
      const flydata = flypath.map(item => {
        // @ts-ignore
        const latlng1 = item.from.split(',').map(e => {
          return e * 1;
        });
        // @ts-ignore
        const latlng2 = item.to.split(',').map(e => {
          return e * 1;
        });
        return { coord: [ latlng1, latlng2 ] };
      });
        
      // const worldLine = new LineLayer()
      //   .source(world)
      //   .color('#41fc9d')
      //   .size(0.5)
      //   .style({
      //     opacity: 0.4
      //   });
      const dotPoint = new PointLayer()
        .source(dotData, {
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat'
          }
        })
        .shape('circle')
        .color('#ffed11')
        .animate(true)
        .size(40);
      const flyLine = new LineLayer({ blend: 'normal' })
        .source(flydata, {
          parser: {
            type: 'json',
            coordinates: 'coord'
          }
        })
        .color('#ff6b34')
        .texture('plane')
        .shape('arc')
        .size(15)
        .animate({
          duration: 1,
          interval: 0.2,
          trailLength: 0.05
        })
        .style({
          textureBlend: 'replace',
          lineTexture: true, // 开启线的贴图功能
          iconStep: 10, // 设置贴图纹理的间距
        });
    
      const flyLine2 = new LineLayer()
        .source(flydata, {
          parser: {
            type: 'json',
            coordinates: 'coord'
          }
        })
        .color('#ff6b34')
        .shape('arc')
        .size(1)
        .style({
          lineType: 'dash',
          dashArray: [ 5, 5 ],
          opacity: 0.5
        });
      // scene.addLayer(worldLine);
      scene.addLayer(dotPoint);
      scene.addLayer(flyLine2);
      scene.addLayer(flyLine);
    });
  })
  
  return (
    <div className="map-page">
      <div className="App" id='map'>
      
      </div>
    </div>
  );
}
