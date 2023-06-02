

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
          <div style={{ width: 930, height: 141, display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: `url(${getImgUrl('Box_450_100')}) no-repeat`, backgroundSize: '100%', width: 350, height: '100%', position: 'relative', marginRight: 50 }}>
              <div style={{ position: 'absolute',left: 20,top:15,color: 'rgb(47,215,221)', fontSize: 22 }}>年度任务</div>
              <div style={{fontFamily: 'DS-DIGIB', position: 'absolute',left:120,top:6, color: 'rgb(28,230,234)', fontSize: 70, }}>88888</div>
              <div style={{ position: 'absolute',right: 20,top:45,color: 'rgb(47,215,221)', fontSize: 18 }}>项</div>
            </div>

            <div style={{ background: `url(${getImgUrl('Box_450_100')}) no-repeat`, backgroundSize: '100%', width: 350, height: '100%', position: 'relative' }}>
              <div style={{ position: 'absolute',left: 20,top:15,color: 'rgb(47,215,221)', fontSize: 22 }}>年度节点</div>
              <div style={{fontFamily: 'DS-DIGIB', position: 'absolute',left:120,top:6, color: 'rgb(28,230,234)', fontSize: 70, }}>88888</div>
              <div style={{ position: 'absolute',right: 20,top:45,color: 'rgb(47,215,221)', fontSize: 18 }}>个</div>
            </div>
            
            </div>
        </RenderCompo>
      </div>
  );
}
