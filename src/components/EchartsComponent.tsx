import React, { useLayoutEffect, useRef } from 'react';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;
interface prop {
    option: EChartsOption, 
    customClassName?: string
}
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