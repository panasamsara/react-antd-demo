import React, { useLayoutEffect, useRef } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;
interface prop {
    option: EChartsOption, 
    customClassName?: string
}
// 弃用， 使用echarts-for-react 更简洁
function EchartsComponent(props: prop) {
    const { option, customClassName } = props;

    const chartsNode = useRef(null);

    useLayoutEffect(() => {
        const mayCharts:any = chartsNode.current && echarts.init(chartsNode.current);
        mayCharts && mayCharts.setOption(option);
    }, [option]);

    return <div className={customClassName} ref={chartsNode} />;
}
export default EchartsComponent;
