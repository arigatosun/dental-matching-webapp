'use client';

import type { BoxProps } from '@mui/material/Box';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from '@/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  disableLink?: boolean;
  variant?: 'default' | 'loading';
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ width = 160, height = 80, disableLink = false, className, href = '/', variant = 'default', sx, ...other }, ref) => {
    const logo = (
      <Box
        component="img"
        src={variant === 'loading' ? "/logo/logo-icon.svg" : "/logo/logo-header.svg"}
        alt="logo"
        width="100%"
        height="100%"
      />
    );

    if (variant === 'loading') {
      return (
        <Box
          width={width}
          height={height}
          className={logoClasses.root.concat(className ? ` ${className}` : '')}
          sx={{ flexShrink: 0, display: 'inline-flex', verticalAlign: 'middle', ...sx }}
          {...other}
        >
          {logo}
        </Box>
      );
    }

    return (
      <NoSsr
        fallback={
          <Box
            width={width}
            height={height}
            className={logoClasses.root.concat(className ? ` ${className}` : '')}
            sx={{ flexShrink: 0, display: 'inline-flex', verticalAlign: 'middle', ...sx }}
          />
        }
      >
        <Box
          ref={ref}
          component={RouterLink}
          href={href}
          width={width}
          height={height}
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