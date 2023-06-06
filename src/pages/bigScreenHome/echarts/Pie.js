import React from 'react'
import ReactECharts from 'echarts-for-react'

// 在此组件中绘制一个简单饼图
const Pie = () => {
  let option = {
    tooltip: {
      trigger: 'item',
    },
    // legend: {
    //   top: '5%',
    //   left: 'center',
    // },
    title: {
      // text: '95',//主标题文本
      left: 'center',
      top: '45%',
      textStyle: {
        fontSize: 38,
        color: '#fff',
        align: 'center'
      },

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
    series: [
      {
        name: '标准',
        type: 'pie',
        // radius: ['40%', '70%'], // 中空
        avoidLabelOverlap: false,
        itemStyle: {
          // borderRadius: 10, // 圆角
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'outer',
          color: '#fff',
          fontSize: 12,
          formatter: function (params) {
            return params.name + params.value
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: false,
        },
        grid: [
          {
            top: 10,
          },
        ],
        data: [
          { name: '国标', value: 2 },
          { name: '行标', value: 10 },
          { name: '团标', value: 8 },
          { name: '企标', value: 200 },
        ],
       
      },
    ],
  }
  return (
    <div>
      <ReactECharts option={option} style={{ height: 140 , position: 'relative', top: 20}} />
    </div>
  )
}
export default Pie