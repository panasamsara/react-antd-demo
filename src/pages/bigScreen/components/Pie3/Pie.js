import React from 'react'
import ReactECharts from 'echarts-for-react'

// 在此组件中绘制一个简单饼图
const Pie = () => {
  let option = {
    // tooltip: {
    //   trigger: 'item',
    // },
    // legend: {
    //   top: '5%',
    //   left: 'center',
    // },
    title: {
      text: '308',//主标题文本
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
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'], // 中空
        avoidLabelOverlap: false,
        itemStyle: {
          // borderRadius: 10, // 圆角
          borderColor: '#fff',
          borderWidth: 2,
          // shadowColor: '#000',
          // shadowBlur: 3,
          // shadowOffsetX:10,
          // shadowOffsetY:10,
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          fontSize: 12,
          formatter: function (params) {
            return params.value
          }
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
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
          { name: 'T公司', value: 4, },
          { name: '相关方', value: 64, },
          { name: '技术中心', value: 189, },
          { name: '达安中心', value: 13, },
          { name: '猛士科技', value: 3, },
          { name: '东风卓联', value: 35, },
        ],
       
      },
    ],
  }
  return (
    <div>
      <ReactECharts option={option} style={{ height: 350 }} />
    </div>
  )
}
export default Pie