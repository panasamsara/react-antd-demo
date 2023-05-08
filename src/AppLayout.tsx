import { Layout, Menu, MenuProps, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, 
  AppstoreOutlined, SettingOutlined, StockOutlined } from '@ant-design/icons';
import { Link, matchRoutes, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routers } from './Routers';

const { Header, Content, Sider } = Layout;

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
  const [isInit, setIsInit] = useState<Boolean>(false)
  
  const [current, setCurrent] = useState('/');

  useEffect(() => {
    const routes = matchRoutes(routers, location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
    const pathArr: string[] = [];
    if(routes !== null) {
      routes.forEach((item) => {
      const path = item.route.path;
        if(path) {
          pathArr.push(path);
        }
      })
    }
    
    setCurrent(location.pathname); // 设置路由高亮
    setDefaultSelectedKeys(pathArr);
    setDefaultOpenKeys(pathArr); // 设置路由展开
    setIsInit(true);
  }, [location.pathname]);
  if(!isInit) {
    return null;
  }
  
  const topMenus: MenuProps['items'] = [
    { label: '首页', key: '/', icon: <SettingOutlined />},
    { label: '计数', key: '/test', icon: <NotificationOutlined />},
    { label: '地图', key: '/map/selfMarker', icon: <AppstoreOutlined />},
    { label: 'echarts', key: '/echartsDemo', icon: <StockOutlined />},
    { label: '大屏', key: '/bigScreen/page1', icon: <LaptopOutlined />},
    { label: '大屏2', key: '/bigScreen/page2', icon: <LaptopOutlined />},
  ]
  const sideMenusUser: MenuProps['items'] = [
    { label: '用户管理', key: '/user', icon: <SettingOutlined /> ,children: [
      { label: '计数', key: '/test'},
      { label: '用户信息', key: '/user/list'},
    ]}
  ]
  const sideMenusMap: MenuProps['items'] = [
    { label: '地图', key: '/map', icon: <SettingOutlined /> ,children: [
      { label: '自定义标记', key: '/map/selfMarker'},
      { label: '运动路径', key: '/map/mapCarMove'},
      { label: '搜索', key: '/map/mapSearch'},
      { label: '定位', key: '/map/mapGeoLocation'},
      { label: '国别', key: '/map/mapCountry'},
      { label: '省份', key: '/map/mapProvince'},
      { label: '聚合', key: '/map/markerCluster'},
      { label: '飞线', key: '/map/l7'},
    ]}
  ]

  const onClick = (e:any) => {
    setCurrent(e.key);
    navigate(e.key)
  }
  return (
    <>
      <Layout style={{height: '100%'}}>
        <Header className="header">
          <div className="logo" />
          {/* 顶部菜单 */}
          <Menu theme="dark" mode="horizontal" 
            onClick={onClick} 
            selectedKeys={[current]}  
            items={topMenus} 
          />
        </Header>
        <Layout className='body-all'>
        {
          location.pathname.includes('/test') ||  location.pathname.includes('/user') ?
            <Sider width={200} className="site-layout-background">
              <Menu  mode="inline" 
                onClick={onClick} 
                // selectedKeys={[current]}  
                items={sideMenusUser} 
                style={{ height: '100%', borderRight: 0 }}
                defaultOpenKeys={['/user']}
              />
            </Sider>
            : null
          }
          {
          location.pathname.includes('/map') ?
            <Sider width={200} className="site-layout-background">
              <Menu  mode="inline" 
                onClick={onClick} 
                // selectedKeys={[current]}  
                items={sideMenusMap} 
                style={{ height: '100%', borderRight: 0 }}
                defaultOpenKeys={['/map']}
              />
            </Sider>
            : null
          }
          {/* 面包屑 */}
          <Layout style={{ backgroundColor: '#fff', borderLeft: '1px solid #f5f5f5' }}>
            <Breadcrumb style={{ margin: '16px 0' }}
              items={[
                {
                  title: 'Home',
                },
                // {
                //   title: <a href="">Application Center</a>,
                // },
                // {
                //   title: <a href="">Application List</a>,
                // },
                {
                  title: 'An Application',
                },
              ]}
            />
            <Content
              className="site-layout-background"
              style={{
                padding: 0,
                margin: 0,
                minHeight: 280,
                
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}