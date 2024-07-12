'use client';

import type { BoxProps } from '@mui/material/Box';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import { useTheme } from '@mui/material/styles';
import { RouterLink } from '@/routes/components';
import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  disableLink?: boolean;
  variant?: 'default' | 'loading' | 'mini';
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ width = 160, height = 80, disableLink = false, className, href = '/', variant = 'default', sx, ...other }, ref) => {
    const getLogoSrc = () => {
      switch (variant) {
        case 'loading':
          return "/logo/logo-icon.svg";
        case 'mini':
          return "/logo/logo-mini.svg";
        default:
          return "/logo/logo-header.svg";
      }
    };

    const logoWidth = variant === 'mini' ? 40 : width;
    const logoHeight = variant === 'mini' ? 40 : height;

    const logo = (
      <Box
        component="img"
        src={getLogoSrc()}
        alt="logo"
        width="100%"
        height="100%"
      />
    );

    const logoBox = (
      <Box
        width={logoWidth}
        height={logoHeight}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        sx={{ flexShrink: 0, display: 'inline-flex', verticalAlign: 'middle', ...sx }}
        {...other}
      >
        {logo}
      </Box>
    );

    if (variant === 'loading' || variant === 'mini') {
      return logoBox;
    }

    return (
      <NoSsr
        fallback={logoBox}
      >
        <Box
          ref={ref}
          component={RouterLink}
          href={href}
          width={logoWidth}
          height={logoHeight}
          className={logoClasses.root.concat(className ? ` ${className}` : '')}
          aria-label="logo"
          sx={{
            flexShrink: 0,
            display: 'inline-flex',
            verticalAlign: 'middle',
            ...(disableLink && { pointerEvents: 'none' }),
            ...sx,
          }}
          {...other}
        >
          {logo}
        </Box>
      </NoSsr>
    );
  }
);

Logo.displayName = 'Logo';