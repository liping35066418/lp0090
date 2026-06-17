import { LineChart, BarChart3, Radar, GitCompare } from 'lucide-react';
import { ChartType, CHART_TYPE_LABELS, ThemeConfig } from '../../types';

interface ComponentPanelProps {
  theme: ThemeConfig;
  onDragStart: (e: React.DragEvent, chartType: ChartType) => void;
}

const chartItems: { type: ChartType; icon: React.ReactNode; description: string }[] = [
  {
    type: 'line',
    icon: <LineChart size={28} />,
    description: '展示数据趋势变化',
  },
  {
    type: 'bar',
    icon: <BarChart3 size={28} />,
    description: '对比分类数据大小',
  },
  {
    type: 'radar',
    icon: <Radar size={28} />,
    description: '多维度能力评估',
  },
  {
    type: 'compare',
    icon: <GitCompare size={28} />,
    description: '多组数据对比分析',
  },
];

export function ComponentPanel({ theme, onDragStart }: ComponentPanelProps) {
  return (
    <div
      style={{
        width: '240px',
        height: '100%',
        backgroundColor: theme.colors.surface,
        borderRight: `1px solid ${theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '20px 16px',
          borderBottom: `1px solid ${theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'}`,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 600,
            color: theme.colors.text,
            fontFamily: theme.typography.headingFont,
          }}
        >
          图表组件
        </h2>
        <p
          style={{
            margin: '4px 0 0 0',
            fontSize: '12px',
            color: theme.colors.accent,
          }}
        >
          拖拽组件到画布
        </p>
      </div>

      <div
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          overflowY: 'auto',
          flex: 1,
        }}
      >
        {chartItems.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
            style={{
              padding: '16px',
              backgroundColor: theme.mode === 'formal_report' ? '#F8FAFC' : '#FAFAF7',
              border: `1px dashed ${theme.colors.accent}`,
              borderRadius: theme.layout.borderRadius,
              cursor: 'grab',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.primary + '10';
              e.currentTarget.style.borderStyle = 'solid';
              e.currentTarget.style.transform = 'translateY(-2px)';
              if (theme.mode === 'formal_report') {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.mode === 'formal_report' ? '#F8FAFC' : '#FAFAF7';
              e.currentTarget.style.borderStyle = 'dashed';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onDragStartCapture={(e) => {
              (e.currentTarget as HTMLDivElement).style.opacity = '0.5';
            }}
            onDragEndCapture={(e) => {
              (e.currentTarget as HTMLDivElement).style.opacity = '1';
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: theme.mode === 'formal_report' ? '8px' : '4px',
                backgroundColor: theme.colors.primary,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '14px',
                  color: theme.colors.text,
                  marginBottom: '2px',
                }}
              >
                {CHART_TYPE_LABELS[item.type]}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: theme.colors.accent,
                  lineHeight: 1.4,
                }}
              >
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: '16px',
          borderTop: `1px solid ${theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'}`,
          backgroundColor: theme.mode === 'formal_report' ? '#F8FAFC' : '#FAFAF7',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            color: theme.colors.accent,
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '4px', color: theme.colors.text }}>
            操作提示
          </div>
          <div>• 拖拽组件到画布添加</div>
          <div>• 点击选中组件可调整</div>
          <div>• 拖拽右下角调整大小</div>
        </div>
      </div>
    </div>
  );
}
