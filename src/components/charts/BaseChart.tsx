import { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { ChartComponent, ThemeConfig } from '../../types';
import { getChartOption } from '../../utils/chartUtils';

interface BaseChartProps {
  component: ChartComponent;
  theme: ThemeConfig;
  onResize?: () => void;
}

export function BaseChart({ component, theme }: BaseChartProps) {
  const chartRef = useRef<ReactECharts>(null);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const option = getChartOption(component, theme);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ width: '100%', height: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
}
