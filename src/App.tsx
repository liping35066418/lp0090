import { Workbench } from './pages/Workbench';
import { Preview } from './pages/Preview';
import { useReportStore } from './store/useReportStore';

export default function App() {
  const { isPreviewMode } = useReportStore();

  return isPreviewMode ? <Preview /> : <Workbench />;
}
