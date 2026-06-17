import { useEffect, useRef } from 'react';
import { themes } from '../config/themes';
import { useReportStore } from '../store/useReportStore';
import { useDragDrop } from '../hooks/useDragDrop';
import { Toolbar } from '../components/layout/Toolbar';
import { ComponentPanel } from '../components/layout/ComponentPanel';
import { Canvas } from '../components/layout/Canvas';
import { ConfigPanel } from '../components/config/ConfigPanel';

export function Workbench() {
  const { currentTheme, components, togglePreview, selectedComponentId, removeComponent } =
    useReportStore();
  const theme = themes[currentTheme];
  const canvasRef = useRef<HTMLDivElement>(null);

  const {
    handleDragStart,
    handleComponentDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useDragDrop(canvasRef);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedComponentId) {
        removeComponent(selectedComponentId);
      }
      if (e.key === 'Escape') {
        useReportStore.getState().selectComponent(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponentId, removeComponent]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.bodyFont,
        transition: 'background-color 0.3s',
      }}
    >
      <Toolbar theme={theme} onTogglePreview={togglePreview} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        <ComponentPanel theme={theme} onDragStart={handleDragStart} />

        <Canvas
          canvasRef={canvasRef}
          theme={theme}
          components={components}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          onComponentDragStart={handleComponentDragStart}
        />

        <ConfigPanel theme={theme} />
      </div>
    </div>
  );
}
