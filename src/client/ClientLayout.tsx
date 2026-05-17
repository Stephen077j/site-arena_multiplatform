import { Outlet, useLocation } from 'react-router-dom';
import ClientHeader from './components/ClientHeader';
import ClientFooter from './components/ClientFooter';
import ModuleHero, { getModuleInfo } from './components/ModuleHero';

const ClientLayout = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '').split('/')[0];
  const moduleInfo = getModuleInfo(slug);

  return (
    <div className="client-theme min-h-screen flex flex-col bg-background text-foreground">
      <ClientHeader />
      <main className="flex-1">
        {moduleInfo && <ModuleHero slug={slug} />}
        <Outlet />
      </main>
      <ClientFooter />
    </div>
  );
};

export default ClientLayout;
