import React from 'react'
import ReactECharts from 'echarts-for-react'

// 在此组件中绘制一个简单饼图
const Pie = () => {
  let option = {
    title: {
      text: '',
    },
    color: [
      '#0090ff',
      '#06d3c4',
      '#ffbc32',
      '#2ccc44',
      '#ff3976',
      '#6173d6',
      '#914ce5',
      '#42b1cc',
      '#ff55ac',
      '#0090ff',
      '#06d3c4',
      '#ffbc32',
      '#2ccc44',
      '#ff3976',
      '#6173d6',
      '#914ce5',
      '#42b1cc',
      '#ff55ac',
      '#0090ff',
      '#06d3c4',
      '#ffbc32',
      '#2ccc44',
      '#ff3976',
      '#6173d6',
      '#914ce5',
    ],
    legend: {
      data: ['M18', '风神'],
      textStyle: '#FFF',
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '外观', max: 100 },
        { name: '价格', max: 100 },
        { name: '操控', max: 100 },
        { name: '配置', max: 100 },
        { name: '舒适性', max: 100 },
        { name: '通过性', max: 100 }
      ]
    },
    series: [
      {
        name: 'M18 vs 风神',
        type: 'radar',
        data: [
          {
            value: [78, 91, 92, 80, 82, 50],
            name: '风神'
          },
          {
            value: [90, 70, 80, 92, 95, 100],
            name: 'M18'
          }
        ]
      }
    ]
  };
  return (
    <div>
      <ReactECharts option={option} style={{ height: 350 }} />
    </div>
  )
}
export default Pie