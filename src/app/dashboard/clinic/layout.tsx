import { CONFIG } from '@/config-global';
import { DashboardLayout } from '@/layouts/dashboard';
import dynamic from 'next/dynamic';

const AuthGuard = dynamic(() => import('@/auth/guard/auth-guard').then((mod) => mod.AuthGuard), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (typeof window === 'undefined' || CONFIG.auth.skip) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
