import { ThemeConfig, ThemeMode } from '../types';

export const minimalAcademicTheme: ThemeConfig = {
  mode: 'minimal_academic',
  colors: {
    primary: '#2C3E50',
    secondary: '#1E3A5F',
    background: '#FAFAF7',
    surface: '#FFFFFF',
    text: '#2C3E50',
    accent: '#5D6D7E',
    chartPalette: [
      '#2C3E50',
      '#1E3A5F',
      '#5D6D7E',
      '#85929E',
      '#ABB2B9',
      '#D5D8DC',
    ],
  },
  typography: {
    headingFont: '"Source Han Serif SC", "Noto Serif SC", serif',
    bodyFont: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    baseFontSize: 14,
  },
  layout: {
    spacing: 24,
    borderRadius: 2,
    shadowLevel: 'none',
  },
};

export const formalReportTheme: ThemeConfig = {
  mode: 'formal_report',
  colors: {
    primary: '#0F2749',
    secondary: '#C9A962',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    text: '#1A202C',
    accent: '#C9A962',
    chartPalette: [
      '#0F2749',
      '#C9A962',
      '#2D5A87',
      '#8B7355',
      '#4A7C59',
      '#B8860B',
    ],
  },
  typography: {
    headingFont: '"Source Han Sans CN", "Noto Sans SC", sans-serif',
    bodyFont: '"Source Han Sans CN", "Noto Sans SC", sans-serif',
    baseFontSize: 14,
  },
  layout: {
    spacing: 20,
    borderRadius: 8,
    shadowLevel: 'medium',
  },
};

export const themes: Record<ThemeMode, ThemeConfig> = {
  minimal_academic: minimalAcademicTheme,
  formal_report: formalReportTheme,
};

export const colorSchemes = [
  {
    name: '学术蓝灰',
    colors: ['#2C3E50', '#1E3A5F', '#5D6D7E', '#85929E', '#ABB2B9'],
  },
  {
    name: '商务藏金',
    colors: ['#0F2749', '#C9A962', '#2D5A87', '#8B7355', '#B8860B'],
  },
  {
    name: '清新科技',
    colors: ['#00B4D8', '#0077B6', '#023E8A', '#48CAE4', '#90E0EF'],
  },
  {
    name: '自然生态',
    colors: ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2'],
  },
  {
    name: '活力暖橙',
    colors: ['#D62828', '#F77F00', '#FCBF49', '#EAE2B7', '#003049'],
  },
  {
    name: '优雅紫调',
    colors: ['#7209B7', '#560BAD', '#480CA8', '#3A0CA3', '#3F37C9'],
  },
];

export const fontOptions = [
  { label: '思源宋体', value: '"Source Han Serif SC", "Noto Serif SC", serif' },
  { label: '思源黑体', value: '"Source Han Sans CN", "Noto Sans SC", sans-serif' },
  { label: 'Inter 无衬线', value: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif' },
  { label: '系统衬线', value: 'Georgia, "Times New Roman", serif' },
  { label: '系统无衬线', value: '-apple-system, BlinkMacSystemFont, sans-serif' },
];

export function getShadowClass(level: string): string {
  switch (level) {
    case 'none':
      return '';
    case 'low':
      return 'shadow-sm';
    case 'medium':
      return 'shadow-lg';
    case 'high':
      return 'shadow-2xl';
    default:
      return '';
  }
}
