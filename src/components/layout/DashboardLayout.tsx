import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import CoderCredit from './CoderCredit';

interface DashboardLayoutProps {
  title?: string;
}

export default function DashboardLayout({ title }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <TopBar title={title} />
        <div className="dashboard-content">
          <Outlet />
        </div>
        <CoderCredit variant="footer" />
      </div>
    </div>
  );
}
