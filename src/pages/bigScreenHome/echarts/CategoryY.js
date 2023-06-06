import React from 'react'
import ReactECharts from 'echarts-for-react'

// 柱状图
const Category = () => {
  let option = {
    xAxis: {
      type: 'value',
      axisLabel : {
        formatter: '{value}',
        textStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: [ '一星', '二星', '三星',],
      axisLabel : {
        textStyle: {
          color: '#fff'
        }
      }
    },
    series: [
      {
        data: [6, 10, 5,],
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