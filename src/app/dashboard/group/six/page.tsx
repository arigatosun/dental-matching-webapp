import { CONFIG } from '@/config-global';

import { BlankView } from '@/sections/blank/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Page six | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <BlankView title="Page six" />;
}
