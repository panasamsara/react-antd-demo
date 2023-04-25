import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link, matchRoutes, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routers } from './Routers';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function AppLayout() {
  const location = useLocation();
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
  const [isInit, setIsInit] = useState<Boolean>(false)
  // console.log(111,location );
  
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
    setDefaultSelectedKeys(pathArr);
    setDefaultOpenKeys(pathArr);
    setIsInit(true);
  }, [location.pathname]);
  if(!isInit) {
    return null;
  }
  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
            
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
              <Link to='/'>首页</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='/test'>计数</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to='/map/selfMarker'>地图</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
        {
          location.pathname.includes('/test') ||  location.pathname.includes('/user') ?
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={defaultSelectedKeys}   
                defaultOpenKeys={defaultOpenKeys}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu key="/user" icon={<UserOutlined />} title="用户管理">
                  <Menu.Item key="2">
                    <Link to='/test'>计数</Link>
                  </Menu.Item>
                  <Menu.Item key="/user/list">
                    <Link to='/user/list'>用户信息</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            : null
          }
          {
          location.pathname.includes('/map') ?
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={defaultSelectedKeys}   
                defaultOpenKeys={defaultOpenKeys}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="地图">
                  <Menu.Item key="5">
                    <Link to='/map/selfMarker'>自定义标记</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to='/map/mapCarMove'>运动路径</Link>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <Link to='/map/mapSearch'>搜索</Link>
                  </Menu.Item>
                  <Menu.Item key="9">
                    <Link to='/map/mapGeoLocation'>定位</Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Link to='/map/mapCountry'>国别</Link>
                  </Menu.Item>
                  <Menu.Item key="11">
                    <Link to='/map/mapProvince'>省份</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            : null
          }
          {/* 面包屑 */}
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
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