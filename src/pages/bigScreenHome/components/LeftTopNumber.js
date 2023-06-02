

import React, { useState } from 'react'
import getImgUrl from "@/assets/images/getImgUrl";

export default function App() {
  
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 470,height: 110, paddingLeft: 4,
        position: 'relative', top: 8, }}>
  
        <div style={{ position: 'relative',width: 230, height: 60, padding: 10,
          background: `url(${getImgUrl('Box_230_55')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center', display: 'flex', justifyContent: 'space-between',
        }}>
          <div style={{fontSize: 30, lineHeight: '42px', width: 120}}>完成</div>
          <div style={{fontSize: 36, color: '#fff', width: 100, }}>24</div>
          <div style={{fontSize: 30, lineHeight: '42px'}}>项</div>
        </div>

        <div style={{ position: 'relative',width: 230, height: 60, padding: 10,
          background: `url(${getImgUrl('Box_230_55')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center', display: 'flex', justifyContent: 'space-between',
        }}>
          <div style={{fontSize: 30, lineHeight: '42px', width: 120}}>进行中</div>
          <div style={{fontSize: 36, color: '#fff', width: 100, }}>244</div>
          <div style={{fontSize: 30, lineHeight: '42px'}}>项</div>
        </div>

        <div style={{ position: 'relative',width: 230, height: 60, padding: 10,
          background: `url(${getImgUrl('Box_230_55')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center', display: 'flex', justifyContent: 'space-between',
        }}>
          <div style={{fontSize: 30, lineHeight: '42px', width: 120}}>超前</div>
          <div style={{fontSize: 36, color: '#fff', width: 100, }}>78</div>
          <div style={{fontSize: 30, lineHeight: '42px'}}>项</div>
        </div>

        <div style={{ position: 'relative',width: 230, height: 60, padding: 10,
          background: `url(${getImgUrl('Box_230_55')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center', display: 'flex', justifyContent: 'space-between',
        }}>
          <div style={{fontSize: 30, lineHeight: '42px', width: 120}}>延迟</div>
          <div style={{fontSize: 36, color: 'red', width: 100, }}>12</div>
          <div style={{fontSize: 30, lineHeight: '42px'}}>项</div>
        </div>
        
      </div>
    </div>
  );
}
