// app/register/clinic/layout.tsx

import { RegistrationLayout } from '@/layouts/registration-layout';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <RegistrationLayout>{children}</RegistrationLayout>;
}