import { Navigate, useLocation } from 'react-router-dom';
import { useSuperAdminAuth } from '../lib/superAdminAuth';
import { Loader2 } from 'lucide-react';

export function RequireSuperAdmin({ children }: { children: React.ReactNode }) {
  const { loading, user, isSuperAdmin } = useSuperAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isSuperAdmin) {
    return <Navigate to="/super-admin/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
