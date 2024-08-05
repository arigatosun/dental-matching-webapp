import { CONFIG } from '@/config-global';
import { AuthGuard } from '@/auth/guard';
import { StaffDashboardLayout } from '@/layouts/dashboard/staff-dashboard-layout';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <StaffDashboardLayout>{children}</StaffDashboardLayout>;
  }

  return (
    <AuthGuard>
      <StaffDashboardLayout>{children}</StaffDashboardLayout>
    </AuthGuard>
  );
}