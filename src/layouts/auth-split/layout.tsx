'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useBoolean } from '@/hooks/use-boolean';

import { Stack } from '@mui/material';
import Alert from '@mui/material/Alert';

import { Main, Content } from './main';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';

// ----------------------------------------------------------------------

export type AuthSplitLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  section?: {
    title?: string;
    imgUrl?: string;
    subtitle?: string;
  };
};

export function AuthSplitLayout({ sx, section, children }: AuthSplitLayoutProps) {
  const mobileNavOpen = useBoolean();
  const layoutQuery: Breakpoint = 'md';

  return (
    <LayoutSection
      headerSection={
        <HeaderBase
          disableElevation
          layoutQuery={layoutQuery}
          onOpenNav={mobileNavOpen.onTrue}
          slotsDisplay={{
            signIn: false,
            account: false, 
            menuButton: false,
            notifications: false,
          }}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
          }}
          slotProps={{ container: { maxWidth: false } }}
          sx={{ position: { [layoutQuery]: 'fixed' } }}
        />
      }
      footerSection={null}
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      cssVars={{
        '--layout-auth-content-width': '420px',
      }}
    >
      <Main layoutQuery={layoutQuery}>
        <Content layoutQuery={layoutQuery}>
          <Stack
            direction="row"
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 'calc(100vh - var(--layout-header-height))',
            }}
          >
            <Stack
              sx={{
                width: 1,
                maxWidth: 480,
                px: { xs: 2, md: 3 },
                py: { xs: 3, md: 0 },
              }}
            >
              {children}
            </Stack>
          </Stack>
        </Content>
      </Main>
    </LayoutSection>
  );
}