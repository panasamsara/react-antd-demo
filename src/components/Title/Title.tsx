

// import { bus } from '@/utils'

//@ts-ignore
import iconStyle from '@/assets/iconfont/iconfont.less'

// @ts-ignore
import style from './style.less'
import Times from './Times'
import getImgUrl from "@/assets/images/getImgUrl";
import Icon, { SwapOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

export default function App(props:{page: string}) {
  const navigate = useNavigate();
  // 点击顶部按钮跳转页面
  function changeRoute(){
    const {page} = props;
    if(page == 'bigScreen1'){
      navigate('/bigScreen/page2')
    }else{
      navigate('/bigScreen/page1')
    }
  }
  return (
    <div
      style={{ height: '100%', width: '99.8%' }}
      className={style.container}
    >
      <div
        style={{
          display: 'inline-block',
          width: 25,
          height: 25,
          backgroundColor: 'rgb(59,121,252)',
          textAlign: 'center',
          lineHeight: '25px',
          overflow: 'hidden',
          borderRadius: 100,
          marginLeft: 20,
          cursor: 'pointer',
          zIndex: 99,
        }}
        onClick={async () => {
          changeRoute()
          // bus.emit('setIndex')
        }}
      >
        <SwapOutlined />
      </div>
      <div
        className={style.title}
        style={{
          fontSize: 38,
          // fontFamily: 'webfont',
          background: `url(${getImgUrl('bgg')}) 100% 100% no-repeat`,
          fontFamily: 'Microsoft YaHei',
          fontWeight: 'bold',
        }}
      >
        {/* 整车试验远程监控及分析平台
        */}
        <span
          style={{
            background: 'linear-gradient(to top, #85c0e3, #ffffff)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          东风技术中心道路试验数字化看板
        </span>
      </div>
      <div className={style.logo} />
      <div className={style.rightInfo}>
        <div
          style={{ paddingTop: 12, display: 'flex', alignItems: 'center' }}
        >
          <Times />
        </div>
      </div>
    </div>
  );
}
