import { Space, Table, Tag, Button } from 'antd';
import { useState, useEffect } from 'react';
import { bus } from '@/utils';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <Button onClick={ (e)=> handleClick(e,record) }>操作</Button>
      </Space>
    ),
  },
];
const handleClick = (e,record)=>{
  console.log(11, record);
  e.stopPropagation();
  bus.emit('tableClick', {RowData: record})
}
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


const App = () => {
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
    // showTotal: () => (
    //   <span>总共{total}项</span>
    // ),
    total, // 总条数
    onChange: page => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false,
  };
  
  return <>
    <Table columns={columns} dataSource={data} pagination={paginationProps}/>
  </>
};
export default App;