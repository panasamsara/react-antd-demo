import styleClass from '@/styles/renderScreen.less';
import getImgUrl from "@/assets/images/getImgUrl";

function backCompo({
  title,
  style,
  children,
}) {
  return (
    <div className={styleClass.dragableContainer} style={{ ...style }}>
      <div style={{ width: 480, height: 330, 
        background: `url(${getImgUrl('shapeBox')}) center no-repeat`, backgroundSize: 'contain'}}>
        <div style={{ position: 'relative', height: 'auto', top: 28 }}>
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

        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
export default backCompo;