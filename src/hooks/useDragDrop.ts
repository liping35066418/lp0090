import { useCallback, useRef } from 'react';
import { ChartType } from '../types';
import { useReportStore } from '../store/useReportStore';

interface DragState {
  isDragging: boolean;
  dragType: 'new' | 'move';
  chartType?: ChartType;
  componentId?: string;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
}

export function useDragDrop(canvasRef: React.RefObject<HTMLDivElement>) {
  const { addComponent, updateComponent, selectComponent } = useReportStore();
  const dragState = useRef<DragState | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, chartType: ChartType) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('chartType', chartType);
    dragState.current = {
      isDragging: true,
      dragType: 'new',
      chartType,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: 0,
      offsetY: 0,
    };
  }, []);

  const handleComponentDragStart = useCallback(
    (e: React.DragEvent, componentId: string, rect: DOMRect) => {
      e.dataTransfer.effectAllowed = 'move';
      e.stopPropagation();
      dragState.current = {
        isDragging: true,
        dragType: 'move',
        componentId,
        startX: e.clientX,
        startY: e.clientY,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top,
      };
      selectComponent(componentId);
    },
    [selectComponent]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = dragState.current?.dragType === 'move' ? 'move' : 'copy';
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!canvasRef.current || !dragState.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - canvasRect.left - (dragState.current?.offsetX || 100);
      const y = e.clientY - canvasRect.top - (dragState.current?.offsetY || 50);

      if (dragState.current.dragType === 'new') {
        const chartType = e.dataTransfer.getData('chartType') as ChartType;
        if (chartType) {
          addComponent(chartType, { x: Math.max(0, x), y: Math.max(0, y) });
        }
      } else if (dragState.current.dragType === 'move' && dragState.current.componentId) {
        updateComponent(dragState.current.componentId, {
          position: { x: Math.max(0, x), y: Math.max(0, y) },
        });
      }

      dragState.current = null;
    },
    [canvasRef, addComponent, updateComponent]
  );

  const handleDragEnd = useCallback(() => {
    dragState.current = null;
  }, []);

  return {
    handleDragStart,
    handleComponentDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
}
