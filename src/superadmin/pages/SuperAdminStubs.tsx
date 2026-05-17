import { Card } from '@/components/ui/card';
import { LucideIcon, Shield, Boxes, BarChart3, Bell, CreditCard, Activity } from 'lucide-react';

function Stub({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      <Card className="p-10 flex flex-col items-center text-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <p className="text-sm text-muted-foreground max-w-md">
          Cette section est prête. Les fonctionnalités détaillées seront branchées sur les sources de données métiers
          dans la prochaine itération.
        </p>
      </Card>
    </div>
  );
}

export const SuperAdminRoles = () => <Stub title="Rôles" description="Matrice des rôles et permissions" icon={Shield} />;
export const SuperAdminModules = () => <Stub title="Modules" description="Activation des modules métiers" icon={Boxes} />;
export const SuperAdminAnalytics = () => <Stub title="Analytics" description="Statistiques globales et performance" icon={BarChart3} />;
export const SuperAdminNotifications = () => <Stub title="Notifications" description="Centre de notifications" icon={Bell} />;
export const SuperAdminBilling = () => <Stub title="Facturation" description="Abonnement plateforme et factures" icon={CreditCard} />;
export const SuperAdminSystemHealth = () => <Stub title="Santé système" description="État des services et performances" icon={Activity} />;
