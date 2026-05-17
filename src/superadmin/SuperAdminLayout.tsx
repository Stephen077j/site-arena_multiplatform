import { Outlet } from 'react-router-dom';
import { SuperAdminSidebar } from './components/SuperAdminSidebar';
import { RequireSuperAdmin } from './components/RequireSuperAdmin';

export default function SuperAdminLayout() {
  return (
    <RequireSuperAdmin>
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
        <SuperAdminSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </RequireSuperAdmin>
  );
}
