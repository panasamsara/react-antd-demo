import styleClass from '@/styles/renderScreen.less';
import getImgUrl from "@/assets/images/getImgUrl";

function mapCompo({
  title,
  style,
  children,
}) {
  return (
    <div className={styleClass.dragableContainer} style={{ ...style }}>
      <div style={{ width: 920, height: 720, position: 'relative', top: 20,}}>
        {/* <div style={{ position: 'relative', height: 'auto', top: 8 }}>
          <h4
          style={{
              paddingLeft: 40,
              color: '#fff',
              height: 46,
              lineHeight: '46px',
              marginBottom: 1,
              textAlign: 'left',
              fontSize: 20
          }}
          >
          {title}
          </h4>
        </div> */}

        {/* <div style={{position: 'relative', top: 10, left: 16, width: 1920, height: 1010,}}> */}
        <div style={{position: 'relative', left: -500, width: 1920, height: 1010}}>
          {children}
        </div>
      </div>
    </div>
  )
}
export default mapCompo;