import { CONFIG } from '@/config-global';

import { JwtSignInView } from '@/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return <JwtSignInView />;
}
