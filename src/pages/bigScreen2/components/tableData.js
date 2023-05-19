import { Space, Table, Tag, Button } from 'antd';
import { useState, useEffect } from 'react';
import { bus } from '@/utils';

const columns = [
  {
    title: '车辆VIN',
    dataIndex: 'vin',
    key: 'vin',
    render: (text) => <a>{text}</a>,
  },
 
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={ (e)=> handleClick(e,record) }>查看</Button>
      </Space>
    ),
  },
];
const handleClick = (e,record)=>{
  e.stopPropagation();
  bus.emit('tableClick1', {RowData: record})
  bus.emit('tableClick2', {RowData: record})
}
const data = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: '王五',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


const App = (props) => {
  const {cars} = props;
  
  let tableData = cars.map(item=>{
    item.key = item.vin;
    return item
  })
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  const handlePageChange = (page) => {
    setPageNum(page)
  };
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(100);
  useEffect(() => {
    // 初始化的时候，我们默认请求第一页的数据
    // queryPersonalScenceList(1, pageSize);
  }, []);

  const paginationProps = {
    current: pageNum, //当前页码
    pageSize, // 每页数据条数
    total, // 总条数
    onChange: page => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false,
  };
  
  return <div style={{height: 700, overflow: 'hidden'}}>
    <Table 
      columns={columns} 
      dataSource={tableData} 
      pagination={false}
      scroll={{y: 700}}
    />
  </div>
};
export default App;