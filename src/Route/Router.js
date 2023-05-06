// Router.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from '../pages/test';
import HomePage from '../pages/home';
import MapCountry from '../pages/map/mapCountryLayer';
import YuanShengGaoDe from '../pages/map/yuanShengGaoDe';
import MapProvinceLayer from '../pages/map/mapProvinceLayer';
import MapCarMove from '../pages/map/mapCarMove';
import SelfMarker from '../pages/map/selfMarker';
import MapGdp from '../pages/map/mapGdp';
import MapSearch from '../pages/map/mapSearch';
import MapGeoLocation from '../pages/map/mapGeoLocation';

export default function Router() {
  {/* 所有的路由配置均在 BrowserRouter 内部 */}
  return (
    <BrowserRouter>
      {/* 使用 Routes 替换曾经的 Switch */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/test' element={<TestPage />} />
        {/* 原生高德地图 */}
        <Route path='/mapYuanSheng' element={<YuanShengGaoDe />} />

        <Route path='/mapCountry' element={<MapCountry />} />
        <Route path='/mapProvince' element={<MapProvinceLayer />} />
        {/* 轨迹回放 */}
        <Route path='/mapCarMove' element={<MapCarMove />} />
        {/* 自定义marker */}
        <Route path='/selfMarker' element={<SelfMarker />} />
        {/* 各省GDP增速 */}
        <Route path='/mapGdp' element={<MapGdp />} />
        {/* 搜索框 */}
        <Route path='/mapSearch' element={<MapSearch />} />
        {/* 定位 GeoLocation */}
        <Route path='/mapGeoLocation' element={<MapGeoLocation />} />
      </Routes>
    </BrowserRouter>
  );
}
