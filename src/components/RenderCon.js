import styleClass from '@/styles/renderScreen.less';

export default function RenderCon({
  style,
  children,
}) {
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