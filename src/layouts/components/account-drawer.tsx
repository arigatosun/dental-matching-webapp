'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from '@/routes/hooks';
import { Iconify } from '@/components/iconify';
import { Scrollbar } from '@/components/scrollbar';
import { AnimateAvatar } from '@/components/animate';
import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';
import { getUserInfo, UserInfo } from '@/app/actions/user';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export type AccountDrawerProps = {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
  sx?: object;
};

export function AccountDrawer({ data = [], sx, ...other }: AccountDrawerProps) {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const { user: userInfo, error: userError } = await getUserInfo();
        if (userError) {
          setError(userError);
        } else {
          setUser(userInfo);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchUserInfo();
  }, []);

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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!user) {
    return null;
  }

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { src: user.photoURL || undefined, alt: user.displayName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${theme.vars.palette.primary.main} 0%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {user.displayName.charAt(0).toUpperCase()}
    </AnimateAvatar>
  );

  return (
    <>
      <AccountButton
        open={open}
        onClick={handleOpenDrawer}
        photoURL={user.photoURL || ''}
        displayName={user.displayName}
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
              {user.displayName}
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
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={handleCloseDrawer} fullWidth />
        </Box>
      </Drawer>
    </>
  );
}
