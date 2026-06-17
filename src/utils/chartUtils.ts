import { EChartsOption } from 'echarts';
import { ChartComponent, ThemeConfig } from '../types';
import { generateCompareData, generateRadarData } from '../data/mockData';

export function getLineChartOption(component: ChartComponent, theme: ThemeConfig): EChartsOption {
  const { dataConfig, styleConfig, title } = component;
  const { dataPoints } = dataConfig;

  return {
    title: {
      text: title,
      textStyle: {
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize + 2,
        color: theme.colors.text,
        fontWeight: 600,
      },
      left: 'center',
      top: 10,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.primary,
      textStyle: {
        color: theme.colors.text,
      },
    },
    legend: {
      show: styleConfig.showLegend,
      data: ['数值'],
      top: 40,
      textStyle: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
      },
    },
    grid: {
      show: styleConfig.showGrid,
      left: '10%',
      right: '10%',
      bottom: '15%',
      top: 70,
    },
    xAxis: {
      type: 'category',
      data: dataPoints.map((d) => d.label),
      axisLine: {
        lineStyle: {
          color: theme.colors.accent,
        },
      },
      axisLabel: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize - 2,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize - 2,
      },
      splitLine: {
        lineStyle: {
          color: theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0',
          type: theme.mode === 'minimal_academic' ? 'dashed' : 'solid',
        },
      },
    },
    series: [
      {
        name: '数值',
        type: 'line',
        data: dataPoints.map((d) => d.value),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2,
          color: styleConfig.colors[0],
        },
        itemStyle: {
          color: styleConfig.colors[0],
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: styleConfig.colors[0] + '30' },
              { offset: 1, color: styleConfig.colors[0] + '05' },
            ],
          },
        },
      },
    ],
  };
}

export function getBarChartOption(component: ChartComponent, theme: ThemeConfig): EChartsOption {
  const { dataConfig, styleConfig, title } = component;
  const { dataPoints } = dataConfig;

  return {
    title: {
      text: title,
      textStyle: {
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize + 2,
        color: theme.colors.text,
        fontWeight: 600,
      },
      left: 'center',
      top: 10,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.primary,
      textStyle: {
        color: theme.colors.text,
      },
    },
    legend: {
      show: styleConfig.showLegend,
      data: ['数值'],
      top: 40,
      textStyle: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
      },
    },
    grid: {
      show: styleConfig.showGrid,
      left: '10%',
      right: '10%',
      bottom: '15%',
      top: 70,
    },
    xAxis: {
      type: 'category',
      data: dataPoints.map((d) => d.label),
      axisLine: {
        lineStyle: {
          color: theme.colors.accent,
        },
      },
      axisLabel: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize - 2,
        rotate: dataPoints.length > 8 ? 30 : 0,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize - 2,
      },
      splitLine: {
        lineStyle: {
          color: theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0',
          type: theme.mode === 'minimal_academic' ? 'dashed' : 'solid',
        },
      },
    },
    series: [
      {
        name: '数值',
        type: 'bar',
        data: dataPoints.map((d, i) => ({
          value: d.value,
          itemStyle: {
            color: styleConfig.colors[i % styleConfig.colors.length],
            borderRadius: theme.mode === 'formal_report' ? [4, 4, 0, 0] : [2, 2, 0, 0],
          },
        })),
        barWidth: '50%',
      },
    ],
  };
}

export function getRadarChartOption(component: ChartComponent, theme: ThemeConfig): EChartsOption {
  const { styleConfig, title } = component;
  const dataPoints = generateRadarData();

  return {
    title: {
      text: title,
      textStyle: {
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize + 2,
        color: theme.colors.text,
        fontWeight: 600,
      },
      left: 'center',
      top: 10,
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.primary,
      textStyle: {
        color: theme.colors.text,
      },
    },
    legend: {
      show: styleConfig.showLegend,
      data: ['能力值'],
      bottom: 10,
      textStyle: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
      },
    },
    radar: {
      indicator: dataPoints.map((d) => ({
        name: d.label,
        max: 100,
      })),
      shape: 'polygon',
      splitNumber: 4,
      axisName: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize - 1,
      },
      splitLine: {
        lineStyle: {
          color: theme.mode === 'minimal_academic' ? '#E5E5E5' : '#CBD5E1',
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: theme.mode === 'minimal_academic'
            ? ['#FFFFFF', '#F5F5F5']
            : ['#FFFFFF', '#F1F5F9'],
        },
      },
      axisLine: {
        lineStyle: {
          color: theme.colors.accent,
        },
      },
    },
    series: [
      {
        name: '能力值',
        type: 'radar',
        data: [
          {
            value: dataPoints.map((d) => d.value),
            name: '能力值',
            areaStyle: {
              color: styleConfig.colors[0] + '40',
            },
            lineStyle: {
              color: styleConfig.colors[0],
              width: 2,
            },
            itemStyle: {
              color: styleConfig.colors[0],
            },
          },
        ],
      },
    ],
  };
}

export function getCompareChartOption(component: ChartComponent, theme: ThemeConfig): EChartsOption {
  const { styleConfig, title } = component;
  const dataPoints = generateCompareData();

  const categories = [...new Set(dataPoints.map((d) => d.category))];
  const groups = [...new Set(dataPoints.map((d) => d.label))];

  const series = categories.map((cat, catIdx) => ({
    name: cat,
    type: 'bar' as const,
    data: groups.map((group) => {
      const point = dataPoints.find((d) => d.category === cat && d.label === group);
      return point?.value || 0;
    }),
    itemStyle: {
      color: styleConfig.colors[catIdx % styleConfig.colors.length],
      borderRadius: theme.mode === 'formal_report' ? [4, 4, 0, 0] : [2, 2, 0, 0],
    },
    barGap: '10%',
  }));

  return {
    title: {
      text: title,
      textStyle: {
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize + 2,
        color: theme.colors.text,
        fontWeight: 600,
      },
      left: 'center',
      top: 10,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.primary,
      textStyle: {
        color: theme.colors.text,
      },
    },
    legend: {
      show: styleConfig.showLegend,
      data: categories,
      top: 40,
      textStyle: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
      },
    },
    grid: {
      show: styleConfig.showGrid,
      left: '10%',
      right: '10%',
      bottom: '15%',
      top: 70,
    },
    xAxis: {
      type: 'category',
      data: groups,
      axisLine: {
        lineStyle: {
          color: theme.colors.accent,
        },
      },
      axisLabel: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize - 2,
      },
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: theme.colors.text,
        fontFamily: styleConfig.fontFamily,
        fontSize: styleConfig.fontSize - 2,
      },
      splitLine: {
        lineStyle: {
          color: theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0',
          type: theme.mode === 'minimal_academic' ? 'dashed' : 'solid',
        },
      },
    },
    series,
  };
}

export function getChartOption(component: ChartComponent, theme: ThemeConfig): EChartsOption {
  switch (component.type) {
    case 'line':
      return getLineChartOption(component, theme);
    case 'bar':
      return getBarChartOption(component, theme);
    case 'radar':
      return getRadarChartOption(component, theme);
    case 'compare':
      return getCompareChartOption(component, theme);
    default:
      return getLineChartOption(component, theme);
  }
}
