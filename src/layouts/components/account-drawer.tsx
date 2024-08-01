// account-drawer.tsx
'use client';

import type { IconButtonProps } from '@mui/material/IconButton';
import { useRouter } from '@/routes/hooks';
import { useState, useCallback } from 'react';
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
import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';
import { useAuth } from '@/hooks/useAuth';

export type AccountDrawerProps = IconButtonProps & {
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
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

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

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: user?.photoURL, alt: user?.displayName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {user?.displayName?.charAt(0).toUpperCase() || ''}
    </AnimateAvatar>
  );

  return (
    <>
      <AccountButton
        open={open}
        onClick={handleOpenDrawer}
        sx={sx}
        {...other}
      />

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

        <Scrollbar>
          <Stack alignItems="center" sx={{ pt: 8, pb: 5 }}>
            {renderAvatar}

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              {user?.displayName}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              {user?.email}
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
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={handleCloseDrawer} fullWidth />
        </Box>
      </Drawer>
    </>
  );
}