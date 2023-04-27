import styleClass from '@/styles/renderScreen.less';
import { CSSProperties } from 'react';

interface prop {
  style: CSSProperties
  children: any
}
function RenderCon({
  style,
  children,
}: prop) {
  return (
    <div className={styleClass.dragableContainer} style={{ ...style }}>
      <div className={styleClass.containerContentbox}>
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
export default RenderCon;