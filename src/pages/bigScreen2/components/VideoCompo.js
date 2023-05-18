

import React, { useEffect,useState } from 'react'
import RenderCompo from "@/components/RenderCompo";
import VideoOnLine from "@/components/VideoOnLine/VideoOnLine";
import { bus } from '@/utils';

export default function App() {
  const [terminalNo, setTerminalNo] = useState('');
  const [checkeChannels, setCheckeChannels] = useState([]);
  useEffect(() => {
    const showVideoCallback = (e) => {
      setTerminalNo(e.terminalNo)
      setCheckeChannels(e.checkeChannels)
    }
    bus.on(`showVideo`, showVideoCallback)
    return () => {
      bus.off(`showVideo`, showVideoCallback)
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
        checkeChannels.map(item=>{
          return <VideoOnLine url={`http://${
            terminalNo
            }_v.vd.rdas.dfmc.com.cn:9502/hlsram/${item}/index.m3u8`}/>
        })
      }
      </RenderCompo>

    </div>
  );
}
