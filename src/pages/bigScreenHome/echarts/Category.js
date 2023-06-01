import React from 'react'
import ReactECharts from 'echarts-for-react'

// 柱状图
const Category = () => {
  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
  return (
    <div>
      <ReactECharts option={option} style={{ height: 260, marginTop: -40 }} />
    </div>
  )
}
export default Category