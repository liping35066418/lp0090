import { useRef } from 'react';
import { ChartComponent, ThemeConfig } from '../../types';
import { ChartCard } from '../charts/ChartCard';
import { useReportStore } from '../../store/useReportStore';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  theme: ThemeConfig;
  components: ChartComponent[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onComponentDragStart: (e: React.DragEvent, componentId: string, rect: DOMRect) => void;
}

export function Canvas({
  canvasRef,
  theme,
  components,
  onDragOver,
  onDrop,
  onDragEnd,
  onComponentDragStart,
}: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectComponent, selectedComponentId } = useReportStore();

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || e.target === containerRef.current) {
      selectComponent(null);
    }
  };

  const gridSize = 20;

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        height: '100%',
        overflow: 'auto',
        backgroundColor: theme.colors.background,
        position: 'relative',
      }}
      onClick={handleCanvasClick}
    >
      <div
        ref={canvasRef}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        style={{
          position: 'relative',
          width: '1600px',
          height: '1200px',
          margin: '40px auto',
          backgroundColor: theme.colors.surface,
          backgroundImage:
            theme.mode === 'minimal_academic'
              ? `
                linear-gradient(to right, #E8E8E5 1px, transparent 1px),
                linear-gradient(to bottom, #E8E8E5 1px, transparent 1px)
              `
              : `
                linear-gradient(to right, #E2E8F0 1px, transparent 1px),
                linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)
              `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          borderRadius: theme.layout.borderRadius,
          border:
            theme.mode === 'minimal_academic'
              ? '1px solid #D5D5D0'
              : '1px solid #CBD5E1',
          boxShadow:
            theme.mode === 'formal_report'
              ? '0 8px 32px rgba(15, 39, 73, 0.1)'
              : '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        {components.length === 0 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: theme.colors.accent,
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '16px',
                opacity: 0.3,
              }}
            >
              📊
            </div>
            <div
              style={{
                fontSize: '16px',
                fontFamily: theme.typography.headingFont,
                color: theme.colors.text,
                marginBottom: '8px',
              }}
            >
              拖拽左侧组件到此处
            </div>
            <div style={{ fontSize: '13px' }}>
              开始创建您的科研汇报页面
            </div>
          </div>
        )}

        {components.map((component) => (
          <ChartCard
            key={component.id}
            component={component}
            theme={theme}
            onDragStart={onComponentDragStart}
          />
        ))}

        {selectedComponentId && (
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              padding: '8px 16px',
              backgroundColor: theme.colors.primary,
              color: '#fff',
              borderRadius: '4px',
              fontSize: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            已选中组件 · 拖动调整位置 · 拖动右下角调整大小
          </div>
        )}
      </div>
    </div>
  );
}
