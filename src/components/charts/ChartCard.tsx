import { useRef, useState } from 'react';
import { X, Move, Maximize2 } from 'lucide-react';
import { ChartComponent, ThemeConfig } from '../../types';
import { BaseChart } from './BaseChart';
import { useReportStore } from '../../store/useReportStore';
import { getShadowClass } from '../../config/themes';

interface ChartCardProps {
  component: ChartComponent;
  theme: ThemeConfig;
  onDragStart: (e: React.DragEvent, componentId: string, rect: DOMRect) => void;
}

export function ChartCard({ component, theme, onDragStart }: ChartCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { selectedComponentId, selectComponent, removeComponent, updateComponent } = useReportStore();
  const isSelected = selectedComponentId === component.id;
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectComponent(component.id);
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (cardRef.current && !isResizing) {
      const rect = cardRef.current.getBoundingClientRect();
      onDragStart(e, component.id, rect);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeComponent(component.id);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = component.size.width;
    const startHeight = component.size.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      const newWidth = Math.max(280, startWidth + deltaX);
      const newHeight = Math.max(200, startHeight + deltaY);
      updateComponent(component.id, {
        size: { width: newWidth, height: newHeight },
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={cardRef}
      draggable={!isResizing}
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
      style={{
        position: 'absolute',
        left: component.position.x,
        top: component.position.y,
        width: component.size.width,
        height: component.size.height,
        backgroundColor: theme.colors.surface,
        borderRadius: component.styleConfig.borderRadius,
        border: isSelected 
          ? `2px solid ${theme.colors.primary}` 
          : theme.mode === 'minimal_academic' 
            ? '1px solid #E5E5E5' 
            : '1px solid #E2E8F0',
        cursor: isResizing ? 'se-resize' : 'move',
        transition: isResizing ? 'none' : 'box-shadow 0.2s',
        overflow: 'hidden',
      }}
      className={getShadowClass(theme.layout.shadowLevel)}
    >
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '6px 10px',
            backgroundColor: theme.colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Move size={14} style={{ color: '#fff' }} />
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 500 }}>
              {component.title}
            </span>
          </div>
          <button
            onClick={handleDelete}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '3px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X size={14} style={{ color: '#fff' }} />
          </button>
        </div>
      )}

      <div
        style={{
          width: '100%',
          height: '100%',
          paddingTop: isSelected ? '32px' : '0',
          boxSizing: 'border-box',
        }}
      >
        <BaseChart component={component} theme={theme} />
      </div>

      {isSelected && (
        <div
          onMouseDown={handleResizeStart}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '16px',
            height: '16px',
            cursor: 'se-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.primary,
            borderTopLeftRadius: '4px',
          }}
        >
          <Maximize2 size={10} style={{ color: '#fff', transform: 'rotate(45deg)' }} />
        </div>
      )}
    </div>
  );
}
