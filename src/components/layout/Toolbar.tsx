import { Eye, Trash2, Layout, BookOpen, Presentation, FileText } from 'lucide-react';
import { ThemeConfig, THEME_LABELS, ThemeMode } from '../../types';
import { useReportStore } from '../../store/useReportStore';
import { useState } from 'react';

interface ToolbarProps {
  theme: ThemeConfig;
  onTogglePreview: () => void;
}

export function Toolbar({ theme, onTogglePreview }: ToolbarProps) {
  const { currentTheme, switchTheme, clearCanvas, components, reportTitle, setReportTitle } = useReportStore();
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(reportTitle);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setReportTitle(localTitle);
    setIsEditing(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  const handleTitleClick = () => {
    setLocalTitle(reportTitle);
    setIsEditing(true);
  };

  return (
    <div
      style={{
        height: '56px',
        backgroundColor: theme.colors.surface,
        borderBottom: `1px solid ${
          theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0'
        }`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Layout
          size={24}
          style={{ color: theme.colors.primary }}
        />
        <h1
          style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: 700,
            color: theme.colors.text,
            fontFamily: theme.typography.headingFont,
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
          }}
        >
          科研汇报可视化制作台
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'flex-start', maxWidth: '400px' }}>
        <FileText size={16} style={{ color: theme.colors.accent }} />
        <span style={{ fontSize: '13px', color: theme.colors.accent, whiteSpace: 'nowrap' }}>报告标题:</span>
        {isEditing ? (
          <input
            type="text"
            value={localTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            placeholder="请输入报告标题..."
            style={{
              flex: 1,
              padding: '6px 12px',
              border: `2px solid ${theme.colors.primary}`,
              borderRadius: '6px',
              fontSize: '13px',
              fontFamily: theme.typography.bodyFont,
              color: theme.colors.text,
              backgroundColor: theme.colors.background,
              outline: 'none',
              minWidth: '200px',
            }}
          />
        ) : (
          <div
            onClick={handleTitleClick}
            style={{
              flex: 1,
              padding: '6px 12px',
              border: `1px dashed ${theme.mode === 'minimal_academic' ? '#D5D5D0' : '#CBD5E1'}`,
              borderRadius: '6px',
              fontSize: '13px',
              fontFamily: theme.typography.bodyFont,
              color: reportTitle ? theme.colors.text : theme.colors.accent,
              backgroundColor: 'transparent',
              cursor: 'pointer',
              minWidth: '200px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.colors.primary;
              e.currentTarget.style.backgroundColor = theme.mode === 'minimal_academic' ? '#FAFAF7' : '#F8FAFC';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.mode === 'minimal_academic' ? '#D5D5D0' : '#CBD5E1';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {reportTitle || '点击输入报告标题...'}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
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
          {(['minimal_academic', 'formal_report'] as ThemeMode[]).map(
            (mode) => (
              <button
                key={mode}
                onClick={() => switchTheme(mode)}
                style={{
                  padding: '8px 20px',
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
                  color:
                    currentTheme === mode ? '#fff' : theme.colors.text,
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
            )
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            fontSize: '12px',
            color: theme.colors.accent,
            marginRight: '8px',
          }}
        >
          组件数量: {components.length}
        </div>

        <button
          onClick={clearCanvas}
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
            fontFamily: theme.typography.bodyFont,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FEF2F2';
            e.currentTarget.style.borderColor = '#FECACA';
            e.currentTarget.style.color = '#DC2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor =
              theme.mode === 'minimal_academic' ? '#E5E5E5' : '#E2E8F0';
            e.currentTarget.style.color = theme.colors.text;
          }}
        >
          <Trash2 size={16} />
          清空
        </button>

        <button
          onClick={onTogglePreview}
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
          <Eye size={16} />
          预览
        </button>
      </div>
    </div>
  );
}
