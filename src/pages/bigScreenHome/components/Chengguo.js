

import React, { useState } from 'react'

export default function App() {
  
  return (
    <div style={{margin: '10px 26px'}}>
      <div style={{color: '#fff', marginBottom: 5, fontSize: 20, position: 'relative', left: 13,
        display: "flex", justifyContent: 'space-between'}}>
        <div style={{display: "flex", justifyContent: 'space-between'}}>
          <div style={{marginRight: 20}}>行业奖励 </div>
          <div> <span style={{fontFamily: 'DS-DIGIB', fontSize: 24}}>888 </span> 项</div>
        </div>
        <div style={{display: "flex", justifyContent: 'space-between', position: 'relative', left: -20}}>
          <div style={{marginRight: 20}}>公司奖励 </div>
          <div><span style={{fontFamily: 'DS-DIGIB', fontSize: 24}}>8888 </span> 项</div>
        </div>
        
        
      </div>
      
      <div style={{ color: '#fff', padding: 12, height: 200,
        display: 'flex', flexDirection: 'column', flexWrap: 'wrap',
        }}>
        <div style={{ height: 30,}}>
          国家一等奖
        </div>

        <div style={{ height: 30}}>
          国家二等奖
        </div>

        <div style={{ height: 30}}>
          行业一等奖
        </div>

        <div style={{ height: 30}}>
          行业二等奖
        </div>

        <div style={{ height: 30}}>
          东风公司一等奖
        </div>

        <div style={{ height: 30}}>
          东风公司一等奖
        </div>

        <div style={{ height: 30}}>
        东风公司二等奖
        </div>

        <div style={{ height: 30}}>
        技术中心一等奖
        </div>

        <div style={{ height: 30}}>
        技术中心二等奖
        </div>

        <div style={{ height: 30}}>
        技术中心三等奖
        </div>
      </div>
    </div>
    
  );
}
