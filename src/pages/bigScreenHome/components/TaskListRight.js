

import React, { useState } from 'react'

export default function App() {
  
  return (
    <div style={{position: 'relative'}}>
      <div style={{ height: 280 ,margin: 10}}>
        <table
          style={{
            width: 'calc(100% - 26px)',
            marginTop: 10,
            marginLeft: 26,
            textAlign: 'left',
            color: '#fff'
          }}
        >
          <tr>
            <th>名称</th>
            <th>计划</th>
            <th>进展</th>
            <th>科室</th>
          </tr>
          <tr>
            <td>车型装车试制任务1</td>
            <td>6.30</td>
            <td>25%</td>
            <td>验证管理室</td>
          </tr>
          <tr>
            <td>车型装车试制任务2</td>
            <td>6.30</td>
            <td>15%</td>
            <td>验证管理室</td>
          </tr>
          <tr>
            <td>车型装车试制任务3</td>
            <td>6.30</td>
            <td>34%</td>
            <td>验证管理室</td>
          </tr>
          <tr>
            <td>车型装车试制任务4</td>
            <td>6.30</td>
            <td>60%</td>
            <td>验证管理室</td>
          </tr>
          <tr>
            <td>车型装车试制任务5</td>
            <td>6.30</td>
            <td>50%</td>
            <td>验证管理室</td>
          </tr>
          <tr>
            <td>车型装车试制任务6</td>
            <td>6.30</td>
            <td>70%</td>
            <td>验证管理室</td>
          </tr>
          <tr>
            <td>车型装车试制任务A</td>
            <td>6.30</td>
            <td>75%</td>
            <td>验证管理室</td>
          </tr>
          <tr>
            <td>车型装车试制任务B</td>
            <td>6.30</td>
            <td>35%</td>
            <td>验证管理室</td>
          </tr>
          <tr>
            <td>车型装车试制任务C</td>
            <td>6.30</td>
            <td>10%</td>
            <td>验证管理室</td>
          </tr>
          <tr>
            <td>车型装车试制任务D</td>
            <td>6.30</td>
            <td>20%</td>
            <td>验证管理室</td>
          </tr>
        </table>
      </div>
      <div style={{margin: 10}}>
        <table
          style={{
            width: 'calc(100% - 26px)',
            marginTop: 10,
            marginLeft: 26,
            textAlign: 'left',
            color: '#fff'
          }}
        >
          
          <tr>
            <td>车型装车试制任务8</td>
            <td style={{color: 'red'}}>5.30</td>
            <td style={{color: 'red'}}>85%</td>
            <td>验证管理室</td>
          </tr>
          <tr>
            <td>车型装车试制任务9</td>
            <td style={{color: 'red'}}>5.25</td>
            <td style={{color: 'red'}}>95%</td>
            <td>验证管理室</td>
          </tr>
        </table>
      </div>
      
    </div>
  );
}
