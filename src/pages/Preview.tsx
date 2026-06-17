import { X, BookOpen, Presentation, Download } from 'lucide-react';
import { themes } from '../config/themes';
import { useReportStore } from '../store/useReportStore';
import { BaseChart } from '../components/charts/BaseChart';
import { getShadowClass } from '../config/themes';
import { THEME_LABELS, ThemeMode } from '../types';

export function Preview() {
  const { components, currentTheme, switchTheme, togglePreview } = useReportStore();
  const theme = themes[currentTheme];

  const handleExport = () => {
    alert('导出功能：在实际项目中可集成 html2canvas 或直接打印页面');
  };

  const sortedComponents = [...components].sort((a, b) => {
    if (a.position.y !== b.position.y) return a.position.y - b.position.y;
    return a.position.x - b.position.x;
  });

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: theme.colors.background,
        fontFamily: theme.typography.bodyFont,
        transition: 'all 0.3s',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '16px 24px',
          backgroundColor: theme.colors.surface,
          borderBottom: `1px solid ${
            theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
          }`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: theme.mode === 'formal_report' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={togglePreview}
            style={{
              padding: '8px 16px',
              border: `1px solid ${
                theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
              }`,
              backgroundColor: 'transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              color: theme.colors.text,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.mode === 'minimal_academic' ? '#FAFAF7' : '#F8FAFC';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={16} />
            退出预览
          </button>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 700,
                color: theme.colors.text,
                fontFamily: theme.typography.headingFont,
              }}
            >
              科研汇报预览
            </h1>
            <p
              style={{
                margin: '2px 0 0 0',
                fontSize: '12px',
                color: theme.colors.accent,
              }}
            >
              {sortedComponents.length} 个图表组件
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor:
                theme.mode === 'minimal_academic' ? '#F5F5F2' : '#F1F5F9',
              borderRadius: '8px',
              padding: '4px',
              gap: '4px',
            }}
          >
            {(['minimal_academic', 'formal_report'] as ThemeMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => switchTheme(mode)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: theme.typography.bodyFont,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.3s',
                  backgroundColor:
                    currentTheme === mode ? theme.colors.primary : 'transparent',
                  color: currentTheme === mode ? '#fff' : theme.colors.text,
                  boxShadow:
                    currentTheme === mode && theme.mode === 'formal_report'
                      ? '0 2px 8px rgba(15, 39, 73, 0.3)'
                      : 'none',
                }}
              >
                {mode === 'minimal_academic' ? (
                  <BookOpen size={16} />
                ) : (
                  <Presentation size={16} />
                )}
                {THEME_LABELS[mode]}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            style={{
              padding: '8px 20px',
              border: 'none',
              backgroundColor: theme.colors.secondary,
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: theme.typography.bodyFont,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Download size={16} />
            导出
          </button>
        </div>
      </div>

      <div
        style={{
          padding: '100px 40px 60px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            padding: '40px 20px',
            borderBottom:
              theme.mode === 'minimal_academic'
                ? '1px solid #D5D5D0'
                : '2px solid ' + theme.colors.secondary,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '36px',
              fontWeight: 700,
              color: theme.colors.primary,
              fontFamily: theme.typography.headingFont,
              letterSpacing: '1px',
            }}
          >
            科研工作汇报
          </h1>
          <p
            style={{
              margin: '16px 0 0 0',
              fontSize: '16px',
              color: theme.colors.accent,
              fontFamily: theme.typography.bodyFont,
            }}
          >
            Research Report · {new Date().getFullYear()}
          </p>
        </div>

        {components.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '100px 20px',
              color: theme.colors.accent,
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '24px', opacity: 0.3 }}>
              📊
            </div>
            <div
              style={{
                fontSize: '18px',
                color: theme.colors.text,
                marginBottom: '8px',
              }}
            >
              暂无图表组件
            </div>
            <div style={{ fontSize: '14px' }}>
              请返回工作台添加图表组件
            </div>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: theme.layout.spacing,
            }}
          >
            {sortedComponents.map((component) => (
              <div
                key={component.id}
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: component.styleConfig.borderRadius,
                  overflow: 'hidden',
                  border:
                    theme.mode === 'minimal_academic'
                      ? '1px solid #E5E5E5'
                      : '1px solid #E2E8F0',
                  height: component.size.height,
                  minHeight: '280px',
                  animation: 'fadeIn 0.5s ease-out',
                }}
                className={getShadowClass(theme.layout.shadowLevel)}
              >
                <BaseChart component={component} theme={theme} />
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: '60px',
            paddingTop: '24px',
            borderTop: `1px solid ${
              theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
            }`,
            textAlign: 'center',
            fontSize: '12px',
            color: theme.colors.accent,
          }}
        >
          © {new Date().getFullYear()} 科研可视化汇报系统 · {THEME_LABELS[currentTheme]}风格
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
