

import React, { useState } from 'react'
import { Space, Table, Tag, Button } from 'antd';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
const handleClick = (e,record)=>{
  e.stopPropagation();
}
const data = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '3',
    name: '周杰伦',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

export default function App() {
  
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 480,height: 212,
        position: 'relative', top: 30, overflow: 'hidden',  }}>
  
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={false}
          scroll={{y: 700}}
        />
        
      </div>
    </div>
  );
}
