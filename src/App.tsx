import React, {useEffect} from 'react';
import { useRoutes } from 'react-router-dom';
import './app.less';
import { routers } from './Routers';
import { bus } from '@/utils';
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();
  // 键盘事件
  const onKeyDown = (e:any) => {
    if(e.keyCode == 37 || e.keyCode == 39){
      switch (window.location.pathname) {
        case '/bigScreen/page1':
          navigate('/bigScreen/page2')
          break;
        case '/bigScreen/page2':
          navigate('/bigScreen/page1')
          break;
      //   case 37: // 向左事件 - 位置减减
      //     console.log(222);
      //     break
      //   case 39: // 向右事件 - 位置加加
      //     console.log(333);
      //     break
      }
    }
    
  }
  useEffect(()=>{
    window.addEventListener('keydown', onKeyDown) // 添加全局事件
    return () => {
      window.removeEventListener('keydown', onKeyDown) // 销毁
    }
  },[])

  return useRoutes(routers);
}
export default App;