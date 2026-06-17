export type ChartType = 'line' | 'bar' | 'radar' | 'compare';

export type DataDimension = 'experiment_progress' | 'consumable_cost' | 'output_achievement';

export type TimeRange = 'week' | 'month' | 'quarter' | 'year';

export type ThemeMode = 'minimal_academic' | 'formal_report';

export type ShadowLevel = 'none' | 'low' | 'medium' | 'high';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface DataPoint {
  label: string;
  value: number;
  category?: string;
}

export interface DataConfig {
  dimension: DataDimension;
  timeRange: TimeRange;
  dataPoints: DataPoint[];
}

export interface StyleConfig {
  colors: string[];
  fontSize: number;
  fontFamily: string;
  showLegend: boolean;
  showGrid: boolean;
  borderRadius: number;
}

export interface ChartComponent {
  id: string;
  type: ChartType;
  title: string;
  position: Position;
  size: Size;
  dataConfig: DataConfig;
  styleConfig: StyleConfig;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  accent: string;
  chartPalette: string[];
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  baseFontSize: number;
}

export interface ThemeLayout {
  spacing: number;
  borderRadius: number;
  shadowLevel: ShadowLevel;
}

export interface ThemeConfig {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
}

export interface ReportState {
  components: ChartComponent[];
  selectedComponentId: string | null;
  currentTheme: ThemeMode;
  isPreviewMode: boolean;
  addComponent: (type: ChartType, position: Position) => void;
  removeComponent: (id: string) => void;
  updateComponent: (id: string, updates: Partial<ChartComponent>) => void;
  selectComponent: (id: string | null) => void;
  switchTheme: (theme: ThemeMode) => void;
  togglePreview: () => void;
  clearCanvas: () => void;
}

export const DIMENSION_LABELS: Record<DataDimension, string> = {
  experiment_progress: '实验进度',
  consumable_cost: '耗材消耗',
  output_achievement: '成果产出',
};

export const CHART_TYPE_LABELS: Record<ChartType, string> = {
  line: '折线图',
  bar: '柱状图',
  radar: '雷达图',
  compare: '对比图表',
};

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  week: '周',
  month: '月',
  quarter: '季度',
  year: '年',
};

export const THEME_LABELS: Record<ThemeMode, string> = {
  minimal_academic: '极简学术',
  formal_report: '正式汇报',
};
