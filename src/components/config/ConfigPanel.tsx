import { ThemeConfig, CHART_TYPE_LABELS } from '../../types';
import { useReportStore } from '../../store/useReportStore';
import { DataConfigPanel } from './DataConfigPanel';
import { StyleConfigPanel } from './StyleConfigPanel';
import { Info } from 'lucide-react';

interface ConfigPanelProps {
  theme: ThemeConfig;
}

export function ConfigPanel({ theme }: ConfigPanelProps) {
  const { components, selectedComponentId } = useReportStore();
  const selectedComponent = components.find((c) => c.id === selectedComponentId);

  return (
    <div
      style={{
        width: '320px',
        height: '100%',
        backgroundColor: theme.colors.surface,
        borderLeft: `1px solid ${
          theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
        }`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '20px 16px',
          borderBottom: `1px solid ${
            theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
          }`,
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
          配置面板
        </h2>
        <p
          style={{
            margin: '4px 0 0 0',
            fontSize: '12px',
            color: theme.colors.accent,
          }}
        >
          {selectedComponent ? '调整选中组件的属性' : '选择一个组件进行配置'}
        </p>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {selectedComponent ? (
          <div>
            <div
              style={{
                padding: '12px',
                backgroundColor:
                  theme.mode === 'minimal_academic' ? '#FAFAF7' : '#F8FAFC',
                borderRadius: '6px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  backgroundColor: theme.colors.primary,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {CHART_TYPE_LABELS[selectedComponent.type].charAt(0)}
              </div>
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: theme.colors.text,
                  }}
                >
                  {CHART_TYPE_LABELS[selectedComponent.type]}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: theme.colors.accent,
                  }}
                >
                  {selectedComponent.dataConfig.dataPoints.length} 条数据
                </div>
              </div>
            </div>

            <DataConfigPanel component={selectedComponent} theme={theme} />
            <StyleConfigPanel component={selectedComponent} theme={theme} />
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              color: theme.colors.accent,
            }}
          >
            <Info size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
            <div
              style={{
                fontSize: '14px',
                color: theme.colors.text,
                marginBottom: '8px',
              }}
            >
              未选中组件
            </div>
            <div style={{ fontSize: '12px', lineHeight: 1.6 }}>
              点击画布上的图表组件
              <br />
              即可进行数据和样式配置
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          padding: '16px',
          borderTop: `1px solid ${
            theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
          }`,
          backgroundColor:
            theme.mode === 'formal_report' ? '#F8FAFC' : '#FAFAF7',
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
            快捷操作
          </div>
          <div>• 点击组件选中并配置</div>
          <div>• 按 Delete 删除选中组件</div>
          <div>• 拖拽组件调整位置</div>
        </div>
      </div>
    </div>
  );
}
