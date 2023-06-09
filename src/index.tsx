import React from 'react';
import ReactDOM from 'react-dom/client';
import './app.less';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom"
import App from './App'
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/zh_CN';
import { config as AmapReactConfig } from '@amap/amap-react';

import { Provider } from 'react-redux'
import configureStore from './store/configStore';
const store = configureStore();

// 高德地图相关
AmapReactConfig.version = '2.0'; // 默认2.0，这里可以不修改
// AmapReactConfig.key = '234b1e1d2207058b4e0d15ed5f5a7154';
AmapReactConfig.key = '7929e756475e21165771e02882453d20';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <Router>
  //   <App />
  // </Router>
  <ConfigProvider locale={locale}>
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
