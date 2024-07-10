import '@/global.css';

// ----------------------------------------------------------------------

import type { Viewport } from 'next';

import { CONFIG } from '@/config-global';
import { primary } from '@/theme/core/palette';
import { ThemeProvider } from '@/theme/theme-provider';
import { getInitColorSchemeScript } from '@/theme/color-scheme-script';

import { ProgressBar } from '@/components/progress-bar';
import { MotionLazy } from '@/components/animate/motion-lazy';
import { detectSettings } from '@/components/settings/server';
import { SettingsDrawer, defaultSettings, SettingsProvider } from '@/components/settings';

import { AuthProvider } from '@/auth/context/jwt';
// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const settings = CONFIG.isStaticExport ? defaultSettings : await detectSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {getInitColorSchemeScript}

        <AuthProvider>
          <SettingsProvider
            settings={settings}
            caches={CONFIG.isStaticExport ? 'localStorage' : 'cookie'}
          >
            <ThemeProvider>
              <MotionLazy>
                <ProgressBar />
                <SettingsDrawer />
                {children}
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
