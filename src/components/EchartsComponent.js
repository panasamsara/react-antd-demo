import React, { useLayoutEffect, useRef } from 'react';
import * as echarts from 'echarts';

function EchartsComponent(props) {
    const { option, customClassName } = props;

    const chartsNode = useRef(null);

    useLayoutEffect(() => {
        const mayCharts = chartsNode.current && echarts.init(chartsNode.current);
        mayCharts && mayCharts.setOption(option);
    }, [option]);

    return <div className={customClassName} ref={chartsNode} />;
}
export default EchartsComponent;