import { create } from 'zustand';
import { ReportState, ChartType, Position, ChartComponent, ThemeMode, DataDimension } from '../types';
import { generateData, generateRadarData, generateCompareData, getDefaultChartTitle } from '../data/mockData';
import { themes } from '../config/themes';

const generateId = () => `chart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const getDefaultSize = (type: ChartType) => {
  switch (type) {
    case 'radar':
      return { width: 320, height: 300 };
    case 'compare':
      return { width: 480, height: 320 };
    default:
      return { width: 480, height: 300 };
  }
};

const createDefaultComponent = (type: ChartType, position: Position): ChartComponent => {
  const defaultDimension: DataDimension = 'experiment_progress';
  const colors = themes['minimal_academic'].colors.chartPalette;
  const dataPoints = type === 'radar' 
    ? generateRadarData() 
    : type === 'compare' 
      ? generateCompareData() 
      : generateData(defaultDimension, 'month');

  return {
    id: generateId(),
    type,
    title: getDefaultChartTitle(type, defaultDimension),
    position,
    size: getDefaultSize(type),
    dataConfig: {
      dimension: defaultDimension,
      timeRange: 'month',
      dataPoints,
    },
    styleConfig: {
      colors,
      fontSize: 14,
      fontFamily: themes['minimal_academic'].typography.bodyFont,
      showLegend: true,
      showGrid: true,
      borderRadius: themes['minimal_academic'].layout.borderRadius,
    },
  };
};

export const useReportStore = create<ReportState>((set) => ({
  components: [],
  selectedComponentId: null,
  currentTheme: 'minimal_academic',
  isPreviewMode: false,
  reportTitle: '',

  addComponent: (type: ChartType, position: Position) =>
    set((state) => ({
      components: [...state.components, createDefaultComponent(type, position)],
      selectedComponentId: null,
    })),

  removeComponent: (id: string) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
      selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId,
    })),

  updateComponent: (id: string, updates: Partial<ChartComponent>) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),

  selectComponent: (id: string | null) =>
    set({ selectedComponentId: id }),

  switchTheme: (theme: ThemeMode) => {
    set((state) => {
      const newTheme = themes[theme];
      return {
        currentTheme: theme,
        components: state.components.map((c) => ({
          ...c,
          styleConfig: {
            ...c.styleConfig,
            colors: newTheme.colors.chartPalette,
            fontFamily: newTheme.typography.bodyFont,
            borderRadius: newTheme.layout.borderRadius,
          },
        })),
      };
    });
  },

  togglePreview: () =>
    set((state) => ({ isPreviewMode: !state.isPreviewMode })),

  clearCanvas: () =>
    set({ components: [], selectedComponentId: null }),

  setReportTitle: (title: string) =>
    set({ reportTitle: title }),
}));
