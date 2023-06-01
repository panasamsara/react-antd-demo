

import React, { useState } from 'react'

export default function App() {
  
  return (
    <div>
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
          <td>任务1</td>
          <td>计划1</td>
          <td>25%</td>
          <td>验证管理室</td>
        </tr>
        <tr>
          <td>任务2</td>
          <td>计划2</td>
          <td>25%</td>
          <td>验证管理室</td>
        </tr>
        <tr>
          <td>任务3</td>
          <td>计划3</td>
          <td>25%</td>
          <td>验证管理室</td>
        </tr>
        <tr>
          <td>任务4</td>
          <td>计划4</td>
          <td>25%</td>
          <td>验证管理室</td>
        </tr>
        <tr>
          <td>任务1</td>
          <td>计划1</td>
          <td>25%</td>
          <td>验证管理室</td>
        </tr>
        <tr>
          <td>任务2</td>
          <td>计划2</td>
          <td>25%</td>
          <td>验证管理室</td>
        </tr>
      </table>
    </div>
  );
}
