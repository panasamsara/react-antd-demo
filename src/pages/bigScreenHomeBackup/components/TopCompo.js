import styleClass from '@/styles/renderScreen.less';
import getImgUrl from "@/assets/images/getImgUrl";

function backCompo({
  title,
  style,
  children,
}) {
  return (
    <div className={styleClass.dragableContainer} style={{ ...style }}>
      <div style={{ width: 300, height: 300, 
        background: `url(${getImgUrl('shapeBox')}) center no-repeat`, backgroundSize: 'contain'}}>
        <div style={{ position: 'relative', height: 'auto', top: 60 }}>
          <h4
          style={{
              paddingLeft: 40,
              color: '#fff',
              height: 46,
              lineHeight: '46px',
              marginBottom: 1,
              textAlign: 'left',
          }}
          >
          {title}
          </h4>
        </div>

        <div style={{position: 'relative', top: 46}}>
          {children}
        </div>
      </div>
    </div>
  )
}
export default backCompo;