

// import { bus } from '@/utils'

//@ts-ignore
import iconStyle from '@/assets/iconfont/iconfont.less'

// @ts-ignore
import style from './style.less'
import Times from './Times'
import getImgUrl from "@/assets/images/getImgUrl";

// export default function Title({ }): ReactElement {
//   function render(context: ContextDeclare) {
//     const {
//       headerFontSize = 38,
//       headerLogoFileResourceId,
//       headerLogoWidth = 150,
//       headerLogoType = 'logo1',
//       headerBgFileResourceId,
//       logoBgType,
//       // headerColor = { r: 255, g: 255, b: 255, a: 1 },
//       headerColor = { r: 0, g: 236, b: 252, a: 1 },
//     } = context
    

//     return (
//       <div
//         style={{ height: '100%', width: '99.8%' }}
//         className={style.container}
//       >
//         <div
//           style={{
//             display: 'inline-block',
//             width: 25,
//             height: 25,
//             backgroundColor: 'rgb(43,81,162)',
//             textAlign: 'center',
//             lineHeight: '25px',
//             overflow: 'hidden',
//             borderRadius: 100,
//             marginLeft: 20,
//             cursor: 'pointer',
//             zIndex: 99,
//           }}
//           onClick={async () => {
//             bus.emit('setIndex')
//           }}
//         >
//           {/* <i
//             className={`${iconStyle.iconfont} ${iconStyle['icon-qiehuan']}`}
//             style={{ fontSize: 15, color: 'white' }}
//           /> */}
//         </div>
//         <div
//           className={style.title}
//           style={{
//             fontSize: 38,
//             // fontFamily: 'webfont',
//             background: `url(${getImgUrl('bgg')}) 100% 100%`,
//             fontFamily: 'Microsoft YaHei',
//             fontWeight: 'bold',
//           }}
//         >
//           {/* 整车试验远程监控及分析平台
//            */}
//           <span
//             style={{
//               background: 'linear-gradient(to top, #85c0e3, #ffffff)',
//               WebkitBackgroundClip: 'text',
//               color: 'transparent',
//             }}
//           >
//             东风技术中心寒区试验数字化看板
//           </span>
//         </div>
//         <div className={style.logo} />
//         <div className={style.rightInfo}>
//           <div
//             style={{ paddingTop: 12, display: 'flex', alignItems: 'center' }}
//           >
//             <Times />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return <ScreenContext.Consumer>{render}</ScreenContext.Consumer>
// }

export default function App() {

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
              backgroundColor: 'rgb(43,81,162)',
              textAlign: 'center',
              lineHeight: '25px',
              overflow: 'hidden',
              borderRadius: 100,
              marginLeft: 20,
              cursor: 'pointer',
              zIndex: 99,
            }}
            // onClick={async () => {
            //   bus.emit('setIndex')
            // }}
          >
            {/* <i
              className={`${iconStyle.iconfont} ${iconStyle['icon-qiehuan']}`}
              style={{ fontSize: 15, color: 'white' }}
            /> */}
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
              东风技术中心寒区试验数字化看板
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
