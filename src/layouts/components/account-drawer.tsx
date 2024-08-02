'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from '@/routes/hooks';
import { useAuth } from '@/hooks/useAuth';
import { Iconify } from '@/components/iconify';
import { Scrollbar } from '@/components/scrollbar';
import { AnimateAvatar } from '@/components/animate';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';

export type AccountDrawerProps = React.ComponentProps<typeof IconButton> & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountDrawer({ data = [], sx, ...other }: AccountDrawerProps) {
  const theme = useTheme();
  const router = useRouter();
  const { user, loading, error } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('AccountDrawer: user', user);
    console.log('AccountDrawer: loading', loading);
    console.log('AccountDrawer: error', error);
  }, [user, loading, error]);

  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleCloseDrawer();
      router.push(path);
    },
    [handleCloseDrawer, router]
  );

  const renderAvatar = user ? (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: user.photoURL, alt: user.clinicName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {user.clinicName?.charAt(0).toUpperCase() || ''}
    </AnimateAvatar>
  ) : null;

  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Typography align="center" sx={{ p: 3, color: 'error.main' }}>
          エラー: {error}
        </Typography>
      );
    }

    if (!user) {
      return (
        <Typography align="center" sx={{ p: 3 }}>
          ユーザーがログインしていません。
        </Typography>
      );
    }

    return (
      <>
        <Stack alignItems="center" sx={{ pt: 8, pb: 5 }}>
          {renderAvatar}

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            {user.clinicName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {user.email}
          </Typography>
        </Stack>

        <Stack
          sx={{
            px: 2.5,
            pb: 3,
            borderTop: `solid 1px ${theme.vars.palette.divider}`,
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.href)}
              sx={{
                py: 1.5,
                color: 'text.secondary',
                '& svg': { width: 24, height: 24, mr: 2 },
                '&:hover': { color: 'text.primary' },
              }}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </>
    );
  };

  return (
    <>
      <AccountButton open={open} onClick={handleOpenDrawer} sx={sx} {...other} />

      <Drawer
        open={open}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'absolute' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>

        <Scrollbar>{renderContent()}</Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={handleCloseDrawer} fullWidth />
        </Box>
      </Drawer>
    </>
  );
}
