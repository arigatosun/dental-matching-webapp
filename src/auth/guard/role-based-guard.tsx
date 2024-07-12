'use client';

import type { Theme, SxProps } from '@mui/material/styles';

import { m } from 'framer-motion';
import { ForbiddenIllustration } from '@/assets/illustrations';
import { varBounce, MotionContainer } from '@/components/animate';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export type RoleBasedGuardProp = {
  sx?: SxProps<Theme>;
  currentRole: string;
  hasContent?: boolean;
  acceptRoles: string[];
  children: React.ReactNode;
};

export function RoleBasedGuard({
  sx,
  children,
  hasContent,
  currentRole,
  acceptRoles,
}: RoleBasedGuardProp) {
  if (typeof acceptRoles !== 'undefined' && !acceptRoles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
