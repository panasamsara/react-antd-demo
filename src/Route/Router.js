// Router.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from '../pages/root';
import HomePage from '../pages/home';

export default function Router() {
  {/* 所有的路由配置均在 BrowserRouter 内部 */}
  return (
    <BrowserRouter>
      {/* 使用 Routes 替换曾经的 Switch */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/root' element={<RootPage />} />
      </Routes>
    </BrowserRouter>
  );
}
