// Router.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestPage from '../pages/test';
import HomePage from '../pages/home';
import MapPage from '../pages/map/mapCountryLayer';
import YuanShengGaoDe from '../pages/map/yuanShengGaoDe';
import MapProvinceLayer from '../pages/map/mapProvinceLayer';
import MapCarMove from '../pages/map/mapCarMove';

export default function Router() {
  {/* 所有的路由配置均在 BrowserRouter 内部 */}
  return (
    <BrowserRouter>
      {/* 使用 Routes 替换曾经的 Switch */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/test' element={<TestPage />} />
        <Route path='/map' element={<MapPage />} />
        <Route path='/map2' element={<YuanShengGaoDe />} />
        <Route path='/mapProvince' element={<MapProvinceLayer />} />
        <Route path='/mapCarMove' element={<MapCarMove />} />
      </Routes>
    </BrowserRouter>
  );
}
