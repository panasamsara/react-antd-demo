import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import Router from "./Route/Router";
import {BrowserRouter as Router} from "react-router-dom"
import App from './App'

// 高德地图相关
import { config as AmapReactConfig } from '@amap/amap-react';
AmapReactConfig.version = '2.0'; // 默认2.0，这里可以不修改
AmapReactConfig.key = '234b1e1d2207058b4e0d15ed5f5a7154';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <App />
  </Router>
  // <React.StrictMode>
  //   <Router />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
