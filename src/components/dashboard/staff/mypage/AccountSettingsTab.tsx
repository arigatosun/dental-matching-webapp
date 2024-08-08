// src/components/dashboard/clinic/AccountSettingsTab.tsx
'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Container,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function AccountSettingsTab() {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Email change requested');
  };

  const handlePasswordChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Password change requested');
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 2, px: { xs: 2, sm: 4, md: 2 } }}>
      <Grid container spacing={3}>
        {/* メールアドレス変更セクション */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              メールアドレス変更
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              現在登録しているメールアドレスを変更できます。
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="現在のメールアドレス"
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="新しいメールアドレス"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="新しいメールアドレス (再入力)"
                  value={confirmNewEmail}
                  onChange={(e) => setConfirmNewEmail(e.target.value)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleEmailChange}
                  sx={{ mt: 2, bgcolor: '#FFA0A0', color: 'white', '&:hover': { bgcolor: '#FF8080' } }}
                >
                  変更を保存
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* パスワード変更セクション */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              パスワード変更
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              ログイン時のパスワードを変更できます。
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={showCurrentPassword ? 'text' : 'password'}
                  label="現在のパスワード"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => togglePasswordVisibility('current')}
                          edge="end"
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={showNewPassword ? 'text' : 'password'}
                  label="新しいパスワード"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => togglePasswordVisibility('new')}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="新しいパスワード (再入力)"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => togglePasswordVisibility('confirm')}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  パスワードは大文字1つ以上、小文字1つ以上、数字を含む8文字以上で設定してください。
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handlePasswordChange}
                  sx={{ mt: 2, bgcolor: '#FFA0A0', color: 'white', '&:hover': { bgcolor: '#FF8080' } }}
                >
                  変更を保存
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}