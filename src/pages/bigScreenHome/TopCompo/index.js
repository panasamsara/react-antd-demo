

import React, { useState } from 'react'
import RenderCompo from "@/components/RenderCompo";
import getImgUrl from "@/assets/images/getImgUrl";


export default function App() {
    
    return (
      <div>
        <RenderCompo
          style={{
              width: 900,
              height: 300,
              position: 'absolute',
              top: 20,
              left: -10,
              zIndex: 2
          }}
        > 
          <div style={{ width: 930, height: 141, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ background: `url(${getImgUrl('total1')}) no-repeat`, backgroundSize: '100%', width: '32%', height: '100%', position: 'relative' }}>
                <div style={{fontFamily: 'DS-DIGIB', position: 'absolute',left:140,top:20, color: 'rgb(28,230,234)', fontSize: 70, }}>03</div>
                <div style={{ position: 'absolute',left:215,top:45,color: 'rgb(47,215,221)', fontSize: 18 }}>场地</div>
                <div style={{ position: 'absolute',left:215,top:74,color: '#66ccff', fontSize: 18 }}>个</div>
            </div>

            <div style={{fontFamily: 'DS-DIGIB', background: `url(${getImgUrl('total2')}) no-repeat`, backgroundSize: '100%', width: '32%', height: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute',left:140,top:20, color: 'rgb(28,230,234)', fontSize: 70, }}>95</div>
                <div style={{ position: 'absolute',left:215,top:45,color: 'rgb(47,215,221)', fontSize: 18 }}>车辆</div>
                <div style={{ position: 'absolute',left:215,top:74,color: '#66ccff', fontSize: 18 }}>辆</div>
            </div>

            <div style={{ fontFamily: 'DS-DIGIB',background: `url(${getImgUrl('total3')}) no-repeat`, backgroundSize: '100%', width: '32%', height: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute',left:109,top:20, color: 'rgb(28,230,234)', fontSize: 70, }}>308</div>
                <div style={{ position: 'absolute',left:215,top:45,color: 'rgb(47,215,221)', fontSize: 18 }}>人员</div>
                <div style={{ position: 'absolute',left:215,top:74,color: '#66ccff', fontSize: 18 }}>人</div>
            </div>
            </div>
        </RenderCompo>
      </div>
  );
}
