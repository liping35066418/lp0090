import { useState } from 'react';
import { ChevronDown, ChevronUp, Palette, Type, LayoutGrid, Settings } from 'lucide-react';
import { ChartComponent, ThemeConfig } from '../../types';
import { useReportStore } from '../../store/useReportStore';
import { colorSchemes, fontOptions } from '../../config/themes';

interface StyleConfigPanelProps {
  component: ChartComponent;
  theme: ThemeConfig;
}

export function StyleConfigPanel({ component, theme }: StyleConfigPanelProps) {
  const { updateComponent } = useReportStore();
  const [expandedSections, setExpandedSections] = useState({
    color: true,
    typography: true,
    layout: true,
  });

  const toggleSection = (section: 'color' | 'typography' | 'layout') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleColorSchemeChange = (colors: string[]) => {
    updateComponent(component.id, {
      styleConfig: {
        ...component.styleConfig,
        colors,
      },
    });
  };

  const handleFontSizeChange = (fontSize: number) => {
    updateComponent(component.id, {
      styleConfig: {
        ...component.styleConfig,
        fontSize,
      },
    });
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    updateComponent(component.id, {
      styleConfig: {
        ...component.styleConfig,
        fontFamily,
      },
    });
  };

  const handleToggleLegend = (showLegend: boolean) => {
    updateComponent(component.id, {
      styleConfig: {
        ...component.styleConfig,
        showLegend,
      },
    });
  };

  const handleToggleGrid = (showGrid: boolean) => {
    updateComponent(component.id, {
      styleConfig: {
        ...component.styleConfig,
        showGrid,
      },
    });
  };

  const handleTitleChange = (title: string) => {
    updateComponent(component.id, { title });
  };

  const handleBorderRadiusChange = (borderRadius: number) => {
    updateComponent(component.id, {
      styleConfig: {
        ...component.styleConfig,
        borderRadius,
      },
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div
          onClick={() => toggleSection('color')}
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
            <Palette size={16} style={{ color: theme.colors.primary }} />
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: theme.colors.text,
              }}
            >
              配色方案
            </span>
          </div>
          {expandedSections.color ? (
            <ChevronUp size={16} style={{ color: theme.colors.accent }} />
          ) : (
            <ChevronDown size={16} style={{ color: theme.colors.accent }} />
          )}
        </div>

        {expandedSections.color && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: '12px' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: theme.colors.accent,
                  marginBottom: '8px',
                }}
              >
                预设配色
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {colorSchemes.map((scheme, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleColorSchemeChange(scheme.colors)}
                    style={{
                      padding: '10px',
                      border: `1px solid ${
                        JSON.stringify(component.styleConfig.colors) ===
                        JSON.stringify(scheme.colors)
                          ? theme.colors.primary
                          : theme.mode === 'minimal_academic'
                          ? '#E5E5E5'
                          : '#E2E8F0'
                      }`,
                      backgroundColor:
                        JSON.stringify(component.styleConfig.colors) ===
                        JSON.stringify(scheme.colors)
                          ? theme.colors.primary + '10'
                          : 'transparent',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (
                        JSON.stringify(component.styleConfig.colors) !==
                        JSON.stringify(scheme.colors)
                      ) {
                        e.currentTarget.style.backgroundColor =
                          theme.mode === 'minimal_academic' ? '#FAFAF7' : '#F8FAFC';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (
                        JSON.stringify(component.styleConfig.colors) !==
                        JSON.stringify(scheme.colors)
                      ) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: theme.colors.text,
                        }}
                      >
                        {scheme.name}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {scheme.colors.map((color, colorIdx) => (
                        <div
                          key={colorIdx}
                          style={{
                            flex: 1,
                            height: '20px',
                            backgroundColor: color,
                            borderRadius: '3px',
                          }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div
          onClick={() => toggleSection('typography')}
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
            <Type size={16} style={{ color: theme.colors.primary }} />
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: theme.colors.text,
              }}
            >
              文字版式
            </span>
          </div>
          {expandedSections.typography ? (
            <ChevronUp size={16} style={{ color: theme.colors.accent }} />
          ) : (
            <ChevronDown size={16} style={{ color: theme.colors.accent }} />
          )}
        </div>

        {expandedSections.typography && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: theme.colors.accent,
                  marginBottom: '8px',
                }}
              >
                图表标题
              </div>
              <input
                type="text"
                value={component.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: `1px solid ${
                    theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
                  }`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: component.styleConfig.fontFamily,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.surface,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: theme.colors.accent,
                  marginBottom: '8px',
                }}
              >
                字体
              </div>
              <select
                value={component.styleConfig.fontFamily}
                onChange={(e) => handleFontFamilyChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: `1px solid ${
                    theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
                  }`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: theme.colors.text,
                  backgroundColor: theme.colors.surface,
                  cursor: 'pointer',
                }}
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div
                style={{
                  fontSize: '12px',
                  color: theme.colors.accent,
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>字号</span>
                <span style={{ color: theme.colors.primary, fontWeight: 500 }}>
                  {component.styleConfig.fontSize}px
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="20"
                value={component.styleConfig.fontSize}
                onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: theme.colors.primary,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <div
          onClick={() => toggleSection('layout')}
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
            <Settings size={16} style={{ color: theme.colors.primary }} />
            <span
              style={{
                fontWeight: 600,
                fontSize: '14px',
                color: theme.colors.text,
              }}
            >
              显示选项
            </span>
          </div>
          {expandedSections.layout ? (
            <ChevronUp size={16} style={{ color: theme.colors.accent }} />
          ) : (
            <ChevronDown size={16} style={{ color: theme.colors.accent }} />
          )}
        </div>

        {expandedSections.layout && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <LayoutGrid size={14} style={{ color: theme.colors.accent }} />
                  <span style={{ fontSize: '13px', color: theme.colors.text }}>
                    显示图例
                  </span>
                </div>
                <button
                  onClick={() => handleToggleLegend(!component.styleConfig.showLegend)}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: component.styleConfig.showLegend
                      ? theme.colors.primary
                      : theme.mode === 'minimal_academic'
                      ? '#D5D5D0'
                      : '#CBD5E1',
                    position: 'relative',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: component.styleConfig.showLegend ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <LayoutGrid size={14} style={{ color: theme.colors.accent }} />
                  <span style={{ fontSize: '13px', color: theme.colors.text }}>
                    显示网格
                  </span>
                </div>
                <button
                  onClick={() => handleToggleGrid(!component.styleConfig.showGrid)}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: component.styleConfig.showGrid
                      ? theme.colors.primary
                      : theme.mode === 'minimal_academic'
                      ? '#D5D5D0'
                      : '#CBD5E1',
                    position: 'relative',
                    transition: 'background-color 0.2s',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: component.styleConfig.showGrid ? '22px' : '2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: '12px',
                  color: theme.colors.accent,
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>圆角</span>
                <span style={{ color: theme.colors.primary, fontWeight: 500 }}>
                  {component.styleConfig.borderRadius}px
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="16"
                value={component.styleConfig.borderRadius}
                onChange={(e) => handleBorderRadiusChange(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: theme.colors.primary,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
