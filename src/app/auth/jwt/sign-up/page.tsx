import { CONFIG } from '@/config-global';

import { JwtSignUpView } from '@/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return <JwtSignUpView />;
}
