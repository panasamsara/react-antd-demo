import React, { useEffect, useState } from 'react';
import EchartsComponent from '@/components/EchartsComponent';
import "./index.css";

// ECharts的配置信息
const EChartsConfigInfo = {
    grid: { // 控制 折线图，柱状图，散点图（气泡图）的整体样式
        top: '10%', // 控制图表距离容器的顶部的距离 可以写百分比也可以写具体的数据
        left: '5%', // 控制图表距离容器的左边的距离 可以写百分比也可以写具体的数据
        right: '5%', // 控制图表距离容器的右边的距离 可以写百分比也可以写具体的数据
        bottom: '10%', // 控制图表距离容器的底部的距离 可以写百分比也可以写具体的数据
    },
    xAxis: { // 控制图表中X周的样式功能设置
        type: 'category', // 坐标轴类型  文档中写的很详细 类型就不一一介绍
        axisTick: {  // 设置坐标轴刻度的相关设置
            show: false, 
        },
        axisLine: {  //坐标轴轴线相关设置
            lineStyle: { //坐标轴轴线样式的设置
                color: '#999',
            },
        },
    },
    yAxis: { // 控制图表中Y轴的样式功能设置
        axisLabel: {  // 坐标轴刻度标签的相关设置。
            show: false,
        },
    },
    axisLabel: { //坐标轴刻度标签的相关设置。
        color: '#666666',
        fontSize: 16,
    },
    series: [
        {
            type: 'bar', // 图标的类型
            barWidth: '40%', // 柱条的宽度
            itemStyle: { //图形样式。
                color: '#0c9',
                borderRadius: [4, 4, 0, 0],
            }, 
            label: { //图形上的文本标签样式
                show: true,
                color: '#fff',
                fontSize: 14,
                position: 'insideTop',
            },
        },
    ],
};

function Temp() {
    const [chartsConfig, setChartsConfig] = useState(EChartsConfigInfo); // 错题分布数据

    useEffect(() => {
      // 这里是模拟的动态数据， 项目中可以修改为动态数据
      chartsConfig.xAxis.data = ['单选题', '多选题', '判断题', '专项练习'];
      chartsConfig.series[0].data = [12, 45, 56, 77];

      setChartsConfig({ 
        ...chartsConfig,
      });
    }, []);

    return chartsConfig 
        && (
            <div className="App" >
                <EchartsComponent 
                option={chartsConfig} 
                customClassName='charts' 
                />
            </div>
    )
}

export default Temp;