import { lazy, ReactNode, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

// 切换页面会出现闪屏现象
// 解决思路：公共页面不采用懒加载的方式 并在App.tsx去除Suspense的包裹
import AppLayout from '../AppLayout';

// 用懒加载实现优化
// const AppLayout = lazy(() => import('../AppLayout'));

const User = lazy(() => import('../pages/user/User'));
const Detail = lazy(() => import('../pages/user/Detail'));

const Home = lazy(() => import('../pages/home'));
const Test = lazy(() => import('../pages/test'));
const SelfMarker = lazy(() => import('../pages/map/selfMarker'));
const MapCarMove = lazy(() => import('../pages/map/mapCarMove'));
const MapSearch = lazy(() => import('../pages/map/mapSearch'));
const MapGeoLocation = lazy(() => import('../pages/map/mapGeoLocation'));
const MapCountry = lazy(() => import('../pages/map/mapCountryLayer'));
const MapProvinceLayer = lazy(() => import('../pages/map/mapProvinceLayer'));
const MarkerCluster = lazy(() => import('../pages/map/mapCluster'));
const L7 = lazy(() => import('../pages/map/L7'));

const EchartsDemo = lazy(() => import('../pages/echartsDemo'));
const BigScreen = lazy(() => import('../pages/bigScreen'));
const BigScreen2 = lazy(() => import('../pages/bigScreen2'));
const BigScreenHome = lazy(() => import('../pages/bigScreenHome'));


// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode =>{
  return <Suspense fallback={<h1>Loading...</h1>}>
    {children}
  </Suspense>
}

export const routers: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    //路由嵌套，子路由的元素需使用<Outlet />
    children: [
      {
        index: true,
        path: '/',
        // element: lazyLoad(<Home />)
        element: lazyLoad(<BigScreenHome />)
      }, 
      {
        path: '/bigScreen/page1',
        element: lazyLoad(<BigScreen />)
      },
      {
        path: '/bigScreen/page2',
        element: lazyLoad(<BigScreen2 />)
      },
      {
        index: true,
        path: '/test',
        element: lazyLoad(<Test />)
      }, 
      {
        path: '/user/list',
        element: lazyLoad(<User />)
      },
      {
        path: '/user/detail/:id',
        element: lazyLoad(<Detail />)
      },

      {
        path: '/map/selfMarker',
        element: lazyLoad(<SelfMarker />)
      },
      {
        path: '/map/mapCarMove',
        element: lazyLoad(<MapCarMove />)
      },
      {
        path: '/map/mapSearch',
        element: lazyLoad(<MapSearch />)
      },
      {
        path: '/map/mapGeoLocation',
        element: lazyLoad(<MapGeoLocation />)
      },
      {
        path: '/map/mapCountry',
        element: lazyLoad(<MapCountry />)
      },
      {
        path: '/map/mapProvince',
        element: lazyLoad(<MapProvinceLayer />)
      },
      {
        path: '/map/markerCluster',
        element: lazyLoad(<MarkerCluster />)
      },
      {
        path: '/map/L7',
        element: lazyLoad(<L7 />)
      },

      {
        path: '/echartsDemo',
        element: lazyLoad(<EchartsDemo />)
      },
     
    ]
  },
//   {
//     path: '/login',
//     element: lazyLoad(<Login />)
//   }

]