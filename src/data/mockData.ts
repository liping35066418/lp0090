import { DataDimension, DataPoint, TimeRange } from '../types';

const generateWeeklyData = (base: number, variance: number): DataPoint[] => {
  const weeks = ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周'];
  return weeks.map((label, i) => ({
    label,
    value: Math.round(base + Math.sin(i * 0.5) * variance + (Math.random() - 0.5) * variance * 0.5),
  }));
};

const generateMonthlyData = (base: number, variance: number): DataPoint[] => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  return months.map((label, i) => ({
    label,
    value: Math.round(base + Math.sin(i * 0.3) * variance + (Math.random() - 0.5) * variance * 0.3),
  }));
};

const generateQuarterlyData = (base: number, variance: number): DataPoint[] => {
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
  return quarters.map((label, i) => ({
    label,
    value: Math.round(base + i * variance * 0.3 + (Math.random() - 0.5) * variance * 0.2),
  }));
};

const generateYearlyData = (base: number, variance: number): DataPoint[] => {
  const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
  return years.map((label, i) => ({
    label,
    value: Math.round(base + i * variance * 0.5 + (Math.random() - 0.5) * variance * 0.3),
  }));
};

const generateRadarData = (): DataPoint[] => [
  { label: '理论研究', value: 85 },
  { label: '实验设计', value: 72 },
  { label: '数据采集', value: 90 },
  { label: '分析处理', value: 78 },
  { label: '论文撰写', value: 65 },
  { label: '项目管理', value: 82 },
];

const generateCompareData = (): DataPoint[] => [
  { label: '实验组A', value: 78, category: '准确率' },
  { label: '实验组B', value: 85, category: '准确率' },
  { label: '对照组', value: 62, category: '准确率' },
  { label: '实验组A', value: 92, category: '召回率' },
  { label: '实验组B', value: 88, category: '召回率' },
  { label: '对照组', value: 71, category: '召回率' },
  { label: '实验组A', value: 82, category: 'F1值' },
  { label: '实验组B', value: 86, category: 'F1值' },
  { label: '对照组', value: 66, category: 'F1值' },
];

const dataGenerators: Record<DataDimension, Record<TimeRange, () => DataPoint[]>> = {
  experiment_progress: {
    week: () => generateWeeklyData(45, 20),
    month: () => generateMonthlyData(50, 25),
    quarter: () => generateQuarterlyData(40, 30),
    year: () => generateYearlyData(35, 40),
  },
  consumable_cost: {
    week: () => generateWeeklyData(2500, 800),
    month: () => generateMonthlyData(10000, 3000),
    quarter: () => generateQuarterlyData(35000, 10000),
    year: () => generateYearlyData(120000, 40000),
  },
  output_achievement: {
    week: () => generateWeeklyData(3, 2),
    month: () => generateMonthlyData(12, 5),
    quarter: () => generateQuarterlyData(40, 15),
    year: () => generateYearlyData(150, 60),
  },
};

export function generateData(dimension: DataDimension, timeRange: TimeRange): DataPoint[] {
  return dataGenerators[dimension][timeRange]();
}

export function getDefaultChartTitle(type: string, dimension: DataDimension): string {
  const typeNames: Record<string, string> = {
    line: '趋势分析',
    bar: '数据统计',
    radar: '能力评估',
    compare: '对比分析',
  };
  const dimNames: Record<DataDimension, string> = {
    experiment_progress: '实验进度',
    consumable_cost: '耗材消耗',
    output_achievement: '成果产出',
  };
  return `${dimNames[dimension]}${typeNames[type]}`;
}

export { generateRadarData, generateCompareData };
