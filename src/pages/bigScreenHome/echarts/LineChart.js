import React from 'react'
import ReactECharts from 'echarts-for-react'

// 在此组件中绘制一个简单饼图
const LineChart = () => {
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
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
  return (
    <div>
      <ReactECharts option={option} style={{ height: 280 }} />
    </div>
  )
}
export default LineChart