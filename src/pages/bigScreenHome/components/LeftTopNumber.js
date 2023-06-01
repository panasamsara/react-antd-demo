

import React, { useState } from 'react'
import getImgUrl from "@/assets/images/getImgUrl";

export default function App() {
  
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 470,height: 188, paddingLeft: 4,
        position: 'relative', top: 16, }}>
  
        <div style={{ position: 'relative',width: 230, height: 90, padding: 10,
          background: `url(${getImgUrl('numberBG_23_90')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center'
        }}>
          <div style={{fontSize: 20}}>完成</div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{fontSize: 42, color: '#fff'}}>24</div>
            <div style={{position: 'relative', top: 24, marginLeft: 12}}>个</div>
          </div>
        </div>

        <div style={{ position: 'relative',width: 230, height: 90, padding: 10,
          background: `url(${getImgUrl('numberBG_23_90')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center'
        }}>
          <div style={{fontSize: 20}}>进行中</div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{fontSize: 42, color: '#fff'}}>48</div>
            <div style={{position: 'relative', top: 24, marginLeft: 12}}>个</div>
          </div>
        </div>

        <div style={{ position: 'relative',width: 230, height: 90, padding: 10,
          background: `url(${getImgUrl('numberBG_23_90')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center'
        }}>
          <div style={{fontSize: 20}}>超前</div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{fontSize: 42, color: '#fff'}}>50</div>
            <div style={{position: 'relative', top: 24, marginLeft: 12}}>个</div>
          </div>
        </div>

        <div style={{ position: 'relative',width: 230, height: 90, padding: 10,
          background: `url(${getImgUrl('numberBG_23_90')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center'
        }}>
          <div style={{fontSize: 20}}>延迟</div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{fontSize: 42, color: '#fff'}}>20</div>
            <div style={{position: 'relative', top: 24, marginLeft: 12}}>个</div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
