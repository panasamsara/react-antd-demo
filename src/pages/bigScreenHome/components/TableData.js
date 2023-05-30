import "./tableData.css";

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

const getRowClassName = (record, index) => {
  let className = ''
  // oddRow 和 evenRow为我们css文件中的样式名称
  className = index % 2 === 0 ? "oddRow" : "evenRow"
  return className
}

export default function App() {
  
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: 478,height: 212,
        position: 'relative', overflow: 'hidden',paddingLeft: 4, top: 30 }}>
  
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={false}
          scroll={{y: 700}}
          rowClassName={getRowClassName} 
        />
        
      </div>
    </div>
  );
}
