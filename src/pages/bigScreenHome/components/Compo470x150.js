import styleClass from '@/styles/renderScreen.less';
import getImgUrl from "@/assets/images/getImgUrl";

function backCompo({
  title,
  style,
  children,
}) {
  return (
    <div className={styleClass.dragableContainer} style={{ ...style }}>
      <div style={{ width: 470, height: 150, 
        background: `url(${getImgUrl('Box_470_150')}) center no-repeat`, backgroundSize: 'contain'}}>
        
        <h4
        style={{
            paddingLeft: 40,
            color: '#fff',
            height: 24,
            lineHeight: '46px',
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