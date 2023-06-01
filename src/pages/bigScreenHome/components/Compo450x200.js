import styleClass from '@/styles/renderScreen.less';
import getImgUrl from "@/assets/images/getImgUrl";

function backCompo({
  title,
  style,
  children,
}) {
  return (
    <div className={styleClass.dragableContainer} style={{ ...style }}>
      <div style={{ width: 450, height: 200, 
        background: `url(${getImgUrl('Box_450_200')}) center no-repeat`, backgroundSize: 'contain'}}>
        
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