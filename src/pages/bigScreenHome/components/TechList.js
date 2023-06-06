

import React, { useState } from 'react'

export default function App() {
  
  return (
    <div style={{margin: '10px 26px'}}>
      <div style={{color: '#fff', marginBottom: 5, fontSize: 20,
        display: "flex", justifyContent: 'space-between'}}>
        <div>年度 </div>
        <div><span style={{fontFamily: 'DS-DIGIB', fontSize: 24}}>888 </span> 项</div>
        <div>总计 </div>
        <div><span style={{fontFamily: 'DS-DIGIB', fontSize: 24}}>8888 </span> 项</div>
      </div>
      <table
        style={{
          width: 'calc(100% - 26px)',
          
          textAlign: 'left',
          color: '#fff'
        }}
      >
        <tr>
          <th>关键技术</th>
          <th>掌握时间</th>
        </tr>
        <tr>
          <td>关键技术1</td>
          <td>2023</td>
        </tr>
        <tr>
          <td>关键技术2</td>
          <td>2022</td>
        </tr>
        <tr>
          <td>关键技术3</td>
          <td>2021</td>
        </tr>
        <tr>
          <td>关键技术4</td>
          <td>2023</td>
        </tr>
      </table>
    </div>
  );
}
