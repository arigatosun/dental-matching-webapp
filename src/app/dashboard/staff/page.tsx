import { Metadata } from 'next';
import { CONFIG } from '@/config-global';
import StaffDashboard from '@/components/dashboard/staff/topview/StaffDashboard';

export const metadata: Metadata = {
  title: `スタッフダッシュボード - ${CONFIG.site.name}`,
};

export default function Page() {
  return <StaffDashboard />;
}