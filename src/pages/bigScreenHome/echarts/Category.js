import React from 'react'
import ReactECharts from 'echarts-for-react'

// 柱状图
const Category = () => {
  let option = {
    xAxis: {
      type: 'category',
      data: [ '2022', '2023', '2024', '2025',],
      axisLabel : {
        textStyle: {
          color: '#fff'
        }
      }

    },
    yAxis: {
      type: 'value',
      axisLabel : {
        formatter: '{value}',
        textStyle: {
          color: '#fff'
        }
      }
    },
    series: [
      {
        data: [410, 435, 455, 470,],
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
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