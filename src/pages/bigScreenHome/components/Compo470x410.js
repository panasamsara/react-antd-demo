import styleClass from '@/styles/renderScreen.less';
import getImgUrl from "@/assets/images/getImgUrl";

function backCompo({
  title,
  style,
  children,
}) {
  return (
    <div className={styleClass.dragableContainer} style={{ ...style }}>
      <div style={{ width: 470, height: 410, 
        background: `url(${getImgUrl('Box_470_410')}) center no-repeat`, backgroundSize: 'contain'}}>
        
        <h4
        style={{
            paddingLeft: 40,
            color: '#fff',
            height: 50,
            lineHeight: '60px',
            marginBottom: 1,
            textAlign: 'left',
        }}
        >
          {title}
        </h4>

        {children}
      </div>
    </div>
  )
}
export default backCompo;