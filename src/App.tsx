import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ClientAuthProvider } from '@/client/lib/clientAuth';

// Front Office (client self-service)
import ClientLayout from '@/client/ClientLayout';
import ClientLogin from '@/client/pages/ClientLogin';
import ClientHome from '@/client/pages/ClientHome';
import ClientBoutique from '@/client/pages/ClientBoutique';
import ClientRestaurant from '@/client/pages/ClientRestaurant';
import ClientHotel from '@/client/pages/ClientHotel';
import ClientCart from '@/client/pages/ClientCart';
import ClientOrders from '@/client/pages/ClientOrders';
import ClientFavoris from '@/client/pages/ClientFavoris';
import ClientGym from '@/client/pages/ClientGym';
import ClientPool from '@/client/pages/ClientPool';
import ClientSalon from '@/client/pages/ClientSalon';
import ClientField from '@/client/pages/ClientField';
import ClientEvent from '@/client/pages/ClientEvent';
import ClientCybercafe from '@/client/pages/ClientCybercafe';
import ClientSpectacles from '@/client/pages/ClientSpectacles';
import ClientProfile from '@/client/pages/ClientProfile';

// Super Admin Portal
import { SuperAdminAuthProvider } from '@/superadmin/lib/superAdminAuth';
import SuperAdminLayout from '@/superadmin/SuperAdminLayout';
import SuperAdminLogin from '@/superadmin/pages/SuperAdminLogin';
import SuperAdminDashboard from '@/superadmin/pages/SuperAdminDashboard';
import SuperAdminUsers from '@/superadmin/pages/SuperAdminUsers';
import SuperAdminPlatformSettings from '@/superadmin/pages/SuperAdminPlatformSettings';
import SuperAdminAuditLogs from '@/superadmin/pages/SuperAdminAuditLogs';
import {
  SuperAdminRoles, SuperAdminModules, SuperAdminAnalytics,
  SuperAdminNotifications, SuperAdminBilling, SuperAdminSystemHealth,
} from '@/superadmin/pages/SuperAdminStubs';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ClientAuthProvider>
      <SuperAdminAuthProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Page de connexion dédiée */}
            <Route path="/login" element={<ClientLogin />} />

            {/* Front Office — client self-service */}
            <Route element={<ClientLayout />}>
              <Route path="/" element={<ClientHome />} />
              <Route path="/boutique" element={<ClientBoutique />} />
              <Route path="/restaurant" element={<ClientRestaurant />} />
              <Route path="/hotel" element={<ClientHotel />} />
              <Route path="/salle-de-sport" element={<ClientGym />} />
              <Route path="/piscine" element={<ClientPool />} />
              <Route path="/salon" element={<ClientSalon />} />
              <Route path="/terrain-foot" element={<ClientField />} />
              <Route path="/evenementiel" element={<ClientEvent />} />
              <Route path="/cybercafe" element={<ClientCybercafe />} />
              <Route path="/spectacles" element={<ClientSpectacles />} />
              <Route path="/panier" element={<ClientCart />} />
              <Route path="/mes-commandes" element={<ClientOrders />} />
              <Route path="/favoris" element={<ClientFavoris />} />
              <Route path="/profil" element={<ClientProfile />} />
            </Route>

            {/* Super Admin Portal */}
            <Route path="/super-admin/login" element={<SuperAdminLogin />} />
            <Route path="/super-admin" element={<SuperAdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<SuperAdminDashboard />} />
              <Route path="users" element={<SuperAdminUsers />} />
              <Route path="roles" element={<SuperAdminRoles />} />
              <Route path="modules" element={<SuperAdminModules />} />
              <Route path="platform-settings" element={<SuperAdminPlatformSettings />} />
              <Route path="analytics" element={<SuperAdminAnalytics />} />
              <Route path="audit-logs" element={<SuperAdminAuditLogs />} />
              <Route path="notifications" element={<SuperAdminNotifications />} />
              <Route path="billing" element={<SuperAdminBilling />} />
              <Route path="system-health" element={<SuperAdminSystemHealth />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SuperAdminAuthProvider>
    </ClientAuthProvider>
  </QueryClientProvider>
);

export default App;
