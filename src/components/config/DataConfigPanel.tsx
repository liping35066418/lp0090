import { useState } from 'react';
import { ChevronDown, ChevronUp, Database, Calendar, RefreshCw } from 'lucide-react';
import { ChartComponent, ThemeConfig, DIMENSION_LABELS, TIME_RANGE_LABELS, DataDimension, TimeRange } from '../../types';
import { useReportStore } from '../../store/useReportStore';
import { generateData, getDefaultChartTitle, generateRadarData, generateCompareData } from '../../data/mockData';

interface DataConfigPanelProps {
  component: ChartComponent;
  theme: ThemeConfig;
}

export function DataConfigPanel({ component, theme }: DataConfigPanelProps) {
  const { updateComponent } = useReportStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleDimensionChange = (dimension: DataDimension) => {
    const newDataPoints = component.type === 'radar' 
      ? generateRadarData() 
      : component.type === 'compare'
        ? generateCompareData()
        : generateData(dimension, component.dataConfig.timeRange);
    
    updateComponent(component.id, {
      dataConfig: {
        ...component.dataConfig,
        dimension,
        dataPoints: newDataPoints,
      },
      title: getDefaultChartTitle(component.type, dimension),
    });
  };

  const handleTimeRangeChange = (timeRange: TimeRange) => {
    const newDataPoints = component.type === 'radar' 
      ? generateRadarData() 
      : component.type === 'compare'
        ? generateCompareData()
        : generateData(component.dataConfig.dimension, timeRange);
    
    updateComponent(component.id, {
      dataConfig: {
        ...component.dataConfig,
        timeRange,
        dataPoints: newDataPoints,
      },
    });
  };

  const handleRefreshData = () => {
    const newDataPoints = component.type === 'radar' 
      ? generateRadarData() 
      : component.type === 'compare'
        ? generateCompareData()
        : generateData(component.dataConfig.dimension, component.dataConfig.timeRange);
    
    updateComponent(component.id, {
      dataConfig: {
        ...component.dataConfig,
        dataPoints: newDataPoints,
      },
    });
  };

  if (component.type === 'radar' || component.type === 'compare') {
    return (
      <div style={{ marginBottom: '16px' }}>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 0',
            cursor: 'pointer',
            borderBottom: `1px solid ${
              theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
            }`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={16} style={{ color: theme.colors.primary }} />
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: theme.colors.text,
              }}
            >
              数据配置
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp size={16} style={{ color: theme.colors.accent }} />
          ) : (
            <ChevronDown size={16} style={{ color: theme.colors.accent }} />
          )}
        </div>

        {isExpanded && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: '12px' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: theme.colors.accent,
                  marginBottom: '8px',
                }}
              >
                当前图表使用固定评估维度
              </div>
              <button
                onClick={handleRefreshData}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${theme.colors.primary}`,
                  backgroundColor: 'transparent',
                  color: theme.colors.primary,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.primary + '10';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <RefreshCw size={14} />
                刷新数据
              </button>
            </div>

            <div
              style={{
                padding: '12px',
                backgroundColor:
                  theme.mode === 'minimal_academic' ? '#FAFAF7' : '#F8FAFC',
                borderRadius: '6px',
                fontSize: '12px',
                color: theme.colors.accent,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '6px', color: theme.colors.text }}>
                数据预览
              </div>
              <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
                {component.dataConfig.dataPoints.slice(0, 6).map((point, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '4px 0',
                      borderBottom:
                        idx < 5
                          ? `1px dashed ${
                              theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
                            }`
                          : 'none',
                    }}
                  >
                    <span>{point.label}</span>
                    <span style={{ fontWeight: 500, color: theme.colors.primary }}>
                      {point.value}
                      {point.category && (
                        <span style={{ color: theme.colors.accent, marginLeft: '4px' }}>
                          ({point.category})
                        </span>
                      )}
                    </span>
                  </div>
                ))}
                {component.dataConfig.dataPoints.length > 6 && (
                  <div style={{ textAlign: 'center', paddingTop: '8px', color: theme.colors.accent }}>
                    ... 还有 {component.dataConfig.dataPoints.length - 6} 条数据
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 0',
          cursor: 'pointer',
          borderBottom: `1px solid ${
            theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
          }`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={16} style={{ color: theme.colors.primary }} />
          <span
            style={{
              fontWeight: 600,
              fontSize: '14px',
              color: theme.colors.text,
            }}
          >
            数据配置
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp size={16} style={{ color: theme.colors.accent }} />
        ) : (
          <ChevronDown size={16} style={{ color: theme.colors.accent }} />
        )}
      </div>

      {isExpanded && (
        <div style={{ padding: '16px 0' }}>
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '12px',
                color: theme.colors.accent,
                marginBottom: '8px',
              }}
            >
              数据维度
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(
                Object.keys(DIMENSION_LABELS) as DataDimension[]
              ).map((dim) => (
                <button
                  key={dim}
                  onClick={() => handleDimensionChange(dim)}
                  style={{
                    padding: '10px 12px',
                    border: `1px solid ${
                      component.dataConfig.dimension === dim
                        ? theme.colors.primary
                        : theme.mode === 'minimal_academic'
                        ? '#E5E5E5'
                        : '#E2E8F0'
                    }`,
                    backgroundColor:
                      component.dataConfig.dimension === dim
                        ? theme.colors.primary + '10'
                        : 'transparent',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    textAlign: 'left',
                    color:
                      component.dataConfig.dimension === dim
                        ? theme.colors.primary
                        : theme.colors.text,
                    fontWeight: component.dataConfig.dimension === dim ? 500 : 400,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (component.dataConfig.dimension !== dim) {
                      e.currentTarget.style.backgroundColor =
                        theme.mode === 'minimal_academic' ? '#FAFAF7' : '#F8FAFC';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (component.dataConfig.dimension !== dim) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {DIMENSION_LABELS[dim]}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '12px',
                color: theme.colors.accent,
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Calendar size={14} />
              时间范围
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {(Object.keys(TIME_RANGE_LABELS) as TimeRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeChange(range)}
                  style={{
                    padding: '8px',
                    border: `1px solid ${
                      component.dataConfig.timeRange === range
                        ? theme.colors.primary
                        : theme.mode === 'minimal_academic'
                        ? '#E5E5E5'
                        : '#E2E8F0'
                    }`,
                    backgroundColor:
                      component.dataConfig.timeRange === range
                        ? theme.colors.primary
                        : 'transparent',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color:
                      component.dataConfig.timeRange === range
                        ? '#fff'
                        : theme.colors.text,
                    fontWeight: component.dataConfig.timeRange === range ? 500 : 400,
                    transition: 'all 0.2s',
                  }}
                >
                  {TIME_RANGE_LABELS[range]}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRefreshData}
            style={{
              width: '100%',
              padding: '10px',
              border: `1px solid ${theme.colors.primary}`,
              backgroundColor: 'transparent',
              color: theme.colors.primary,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s',
              marginBottom: '16px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.primary + '10';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <RefreshCw size={14} />
            刷新数据
          </button>

          <div
            style={{
              padding: '12px',
              backgroundColor:
                theme.mode === 'minimal_academic' ? '#FAFAF7' : '#F8FAFC',
              borderRadius: '6px',
              fontSize: '12px',
              color: theme.colors.accent,
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '6px', color: theme.colors.text }}>
              数据预览
            </div>
            <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
              {component.dataConfig.dataPoints.slice(0, 6).map((point, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '4px 0',
                    borderBottom:
                      idx < 5
                        ? `1px dashed ${
                            theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
                          }`
                        : 'none',
                  }}
                >
                  <span>{point.label}</span>
                  <span style={{ fontWeight: 500, color: theme.colors.primary }}>
                    {point.value.toLocaleString()}
                  </span>
                </div>
              ))}
              {component.dataConfig.dataPoints.length > 6 && (
                <div style={{ textAlign: 'center', paddingTop: '8px' }}>
                  ... 还有 {component.dataConfig.dataPoints.length - 6} 条数据
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
