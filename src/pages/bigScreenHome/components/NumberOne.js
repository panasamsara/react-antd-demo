

import React, { useState } from 'react'
import getImgUrl from "@/assets/images/getImgUrl";

export default function App() {
  
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 470,height: 210,
        position: 'relative', top: 30, }}>
  
        <div style={{ position: 'relative',width: 300, height: 100,
          color: 'rgb(0,236,252)', textAlign: 'center'
        }}>
          <div style={{fontSize: 20}}>车辆总数</div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{fontSize: 42, color: '#fff'}}>1778</div>
            <div style={{position: 'relative', top: 24, marginLeft: 12}}>辆</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
