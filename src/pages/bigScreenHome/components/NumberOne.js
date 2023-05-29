

import React, { useState } from 'react'
import getImgUrl from "@/assets/images/getImgUrl";

export default function App() {
  
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 480,height: 210,
        position: 'relative', top: 30, }}>
  
        <div style={{ position: 'relative',width: 300, height: 100,
          color: 'rgb(0,236,252)', textAlign: 'center'
        }}>
          <div style={{fontSize: 20}}>品牌数量</div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{fontSize: 42, color: '#fff'}}>24</div>
            <div style={{position: 'relative', top: 24, marginLeft: 12}}>个</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
