

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
          <div style={{fontSize: 22, width: 120, position: 'relative', top: 0}}>完成</div>
          <div style={{fontSize: 40, color: '#fff', width: 100, fontFamily: 'DS-DIGIB',}}>8888</div>
          <div style={{fontSize: 18, position: 'relative', top: 10}}>项</div>
        </div>

        <div style={{ position: 'relative',width: 230, height: 60, padding: 10,
          background: `url(${getImgUrl('Box_230_55')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center', display: 'flex', justifyContent: 'space-between',
        }}>
          <div style={{fontSize: 22, width: 120, position: 'relative', top: 0}}>进行</div>
          <div style={{fontSize: 40, color: '#fff', width: 100, fontFamily: 'DS-DIGIB',}}>888</div>
          <div style={{fontSize: 18, position: 'relative', top: 10}}>项</div>
        </div>

        <div style={{ position: 'relative',width: 230, height: 60, padding: 10,
          background: `url(${getImgUrl('Box_230_55')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center', display: 'flex', justifyContent: 'space-between',
        }}>
          <div style={{fontSize: 22, width: 120, position: 'relative', top: 0}}>超前</div>
          <div style={{fontSize: 40, color: '#fff', width: 100, fontFamily: 'DS-DIGIB',}}>666</div>
          <div style={{fontSize: 18, position: 'relative', top: 10}}>项</div>
        </div>

        <div style={{ position: 'relative',width: 230, height: 60, padding: 10,
          background: `url(${getImgUrl('Box_230_55')}) center no-repeat`, backgroundSize: 'contain',
          color: 'rgb(0,236,252)', textAlign: 'center', display: 'flex', justifyContent: 'space-between',
        }}>
          <div style={{fontSize: 22, width: 120, position: 'relative', top: 0}}>延迟</div>
          <div style={{fontSize: 40, color: 'red', width: 100, fontFamily: 'DS-DIGIB',}}>8</div>
          <div style={{fontSize: 18, position: 'relative', top: 10}}>项</div>
        </div>
        
      </div>
    </div>
  );
}
