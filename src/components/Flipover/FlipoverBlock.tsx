import React, { CSSProperties, useEffect, useRef, useState } from 'react'
// @ts-ignore
import styles from './flip.css'
export interface FlipRef {
  toNum: (n: number) => void
}
export interface FlipProps {
  style?: CSSProperties
  blockWidth?: number
  blockHeight?: number
  value?: any
  fontSize?: number
  onref?: (flipRef: FlipRef) => void
}

export default function Flip({
  style,
  blockWidth = 20,
  blockHeight = 30,
  value = 0,
  fontSize = 40,
  onref,
}: FlipProps) {
  const [rotate, setRotate] = useState(0)
  const [rotateBig, setRotateBig] = useState(90)
  const [transitionTime1, setTransitionTime1] = useState(0)
  const [transitionTime2, setTransitionTime2] = useState(0)
  //   const [num, setNum] = useState(initailNum)
  const num_ref = useRef(value)
  const o = {
    toNum(n: number) {
      setTransitionTime1(0.2)
      setTransitionTime2(0.3)
      setRotate(-90)
      setTimeout(() => {
        num_ref.current = n
        setRotateBig(0)
        setTimeout(() => {
          setTransitionTime1(0)
          setTransitionTime2(0)
          setRotate(0)
          setRotateBig(90)
        }, 300)
      }, 200)
    },
  }
  useEffect(() => {
    if (onref) {
      onref(o)
    }
  }, [])
  // function run() {
  //   const num = num_ref.current + 1
  //   o.toNum(num > 9 ? 0 : num)
  //   setTimeout(() => {
  //     run()
  //   }, 1000)
  // }
  useEffect(
    () => {
      if (num_ref.current !== value) {
        o.toNum(value)
      }
    },
    [value]
  )

  return (
    <div
      style={{
        fontSize: 18,
        ...style,
        width: blockWidth,
        height: blockHeight,
        display: 'inline-block',
      }}
      // className={styles.flipContainer}
    >
      <div
        // className={styles.numContainer}
        style={{ width: blockWidth, height: blockHeight, perspective: 400 }}
      >
        {/* <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            fontSize: 40,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: 400,
            transition: '.5s',
            color: 'white',
            zIndex: 1,
          }}
        /> */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            fontSize,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: 400,
            transition: `${transitionTime1}s`,
            transform: `rotateX(${rotate}deg)`,
            // color: 'white',
            zIndex: 3,
            // WebkitMaskImage:
            //   'linear-gradient(rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 1) 50%,rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)',
            // linear-gradient(rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 1) 50%,rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%) 下部分透明
            // linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 50%) 上部分透明
            //
          }}
          //   onTransitionEnd={() => {
          //   }}
        >
          <span
            style={{
              fontFamily: 'DS-DIGIB',
            }}
          >
            {num_ref.current}
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            fontSize,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: 400,
            transition: `${transitionTime2}s`,
            transform: `rotateX(${rotateBig}deg)`,
            // color: 'white',
            fontFamily: 'DS-DIGIB',
            zIndex: 3,
            // WebkitMaskImage:
            //   'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 50%)',
          }}
        >
          <span
            style={{
              fontFamily: 'DS-DIGIB',
            }}
          >
            {num_ref.current}
          </span>
        </div>
      </div>
    </div>
  )
}
