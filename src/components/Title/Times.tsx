import Flipover from '@/components/Flipover/FlipoverBlock'
import moment from 'moment'
import { useEffect, useState } from 'react'

export default function Times() {
  const [time, setTime] = useState<string>('0000.00.00 00:00:00')

  function goToSetTime() {
    const str = moment().format('YYYY.MM.DD HH:mm:ss')
    setTime(str)
    setTimeout(goToSetTime, 1000)
  }
  useEffect(() => {
    goToSetTime()
  }, [])
  return (
    <div
      style={{
        color: 'rgb(0,239,254)',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        fontFamily: 'DS-DIGIB',
        fontSize: 26,
        marginTop: -4,
      }}
    >
      {/* {time} */}
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[0]}
        fontSize={25}
      />
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[1]}
        fontSize={25}
      />
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[2]}
        fontSize={25}
      />
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[3]}
        fontSize={25}
      />
      <span
        style={{
          display: 'inline-block',
          verticalAlign: 'text-bottom',
        }}
      >
        .
      </span>
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[5]}
        fontSize={25}
      />
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[6]}
        fontSize={25}
      />
      <span
        style={{
          display: 'inline-block',
          verticalAlign: 'text-bottom',
        }}
      >
        .
      </span>
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[8]}
        fontSize={25}
      />
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[9]}
        fontSize={25}
      />
      <span style={{ marginRight: 5 }}> </span>

      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[11]}
        fontSize={25}
      />
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[12]}
        fontSize={25}
      />
      <span
        style={{
          display: 'inline-block',
          verticalAlign: 'text-bottom',
          fontStyle: 'italic',
          position: 'relative',
          top: -5
        }}
      >
        :
      </span>
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[14]}
        fontSize={25}
      />
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[15]}
        fontSize={25}
      />
      <span
        style={{
          display: 'inline-block',
          verticalAlign: 'text-bottom',
          fontStyle: 'italic',
          position: 'relative',
          top: -5
        }}
      >
        :
      </span>
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[17]}
        fontSize={25}
      />
      <Flipover
        blockWidth={14}
        blockHeight={26}
        style={{ fontStyle: 'italic' }}
        value={time[18]}
        fontSize={25}
      />
    </div>
  )
}
