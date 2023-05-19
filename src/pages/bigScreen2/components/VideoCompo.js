

import React, { useEffect,useState } from 'react'
import RenderCompo from "@/components/RenderCompo";
import VideoOnLine from "@/components/VideoOnLine/VideoOnLine";
import { bus } from '@/utils';

export default function App() {
  const [terminalNo, setTerminalNo] = useState(''); 
  const [checkedValues, setCheckedValues] = useState([]); // 勾选的channel，勾选几个展示几个视频弹框

  useEffect(() => {
    const showVideoCallback = (e) => {
      setTerminalNo(e.terminalNo)
      setCheckedValues(e.checkedValues)
    }
    const closeVideoCallback = (e) => {
      console.log(111, checkedValues);
      let arr = checkedValues.splice(checkedValues.indexOf(e.channelLabel), 1);
      setCheckedValues(arr)
    }
    const closeModalCallback = (e) => {
      setCheckedValues([])
    }
    bus.on(`showVideo`, showVideoCallback); // 监听复选框勾选事件
    bus.on(`closeVideo`, closeVideoCallback); // 监听关闭事件
    bus.on(`closeDetailModal`, closeModalCallback) //监听关闭详情弹框
    return () => {
      bus.off(`showVideo`, showVideoCallback)
      bus.off(`closeVideo`, closeVideoCallback)
      bus.off(`closeDetailModal`, closeModalCallback)
    }
  }, [])
  return (
    <div>
      <RenderCompo
        style={{
            width: 240,
            height: 300,
            position: 'absolute',
            top: 120,
            right: 220
        }}
      > 
      {
        checkedValues.map(item=>{
          let i = parseInt(item.slice(2)) -1
          return <VideoOnLine channelLabel={item} key={item}
            url={`http://${terminalNo
            }_v.vd.rdas.dfmc.com.cn:9502/hlsram/${item.slice(0,2)+ 'n' +  i}/index.m3u8`}
          />
        })
      }
      </RenderCompo>

    </div>
  );
}
