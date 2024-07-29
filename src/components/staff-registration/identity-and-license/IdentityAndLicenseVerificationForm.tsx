'use client';

import React, { useState, useRef } from 'react';
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper,
  styled,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Iconify } from '@/components/iconify';

const UploadBox = styled(Box)(({ theme }) => ({
  height: 300,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '2px dashed',
  borderColor: theme.palette.grey[300],
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
}));

const identityDocs = [
  { value: 'drivers_license', label: '運転免許証', icon: 'mdi:card-account-details-outline' },
  { value: 'passport', label: '旅券(パスポート)', icon: 'mdi:passport' },
  { value: 'my_number_card', label: '個人番号カード', icon: 'mdi:card-account-details' },
  { value: 'residence_card', label: '在留カード・特別永住者証明書', icon: 'mdi:card-account-details-star-outline' },
] as const;

const licenseDocs = [
  { value: 'dental_hygienist', label: '歯科衛生士免許証', icon: 'mdi:tooth-outline' },
  { value: 'dental_student', label: '歯科学生証', icon: 'mdi:school-outline' },
  { value: 'dental_assistant', label: '歯科助手身分証', icon: 'mdi:account-tie-outline' },
  { value: 'dental_technician', label: '歯科技工士身分証', icon: 'mdi:tools' },
] as const;

export function IdentityAndLicenseVerificationForm({ onNext }: { onNext: (data: any) => void }) {
  const [identityDocType, setIdentityDocType] = useState('');
  const [licenseDocType, setLicenseDocType] = useState('');
  const [identityFrontFile, setIdentityFrontFile] = useState<File | null>(null);
  const [identityBackFile, setIdentityBackFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [identityFrontPreview, setIdentityFrontPreview] = useState<string | null>(null);
  const [identityBackPreview, setIdentityBackPreview] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const identityFrontFileInputRef = useRef<HTMLInputElement>(null);
  const identityBackFileInputRef = useRef<HTMLInputElement>(null);
  const licenseFileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = (type: 'identityFront' | 'identityBack' | 'license') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        switch (type) {
          case 'identityFront':
            setIdentityFrontFile(file);
            setIdentityFrontPreview(reader.result as string);
            break;
          case 'identityBack':
            setIdentityBackFile(file);
            setIdentityBackPreview(reader.result as string);
            break;
          case 'license':
            setLicenseFile(file);
            setLicensePreview(reader.result as string);
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = (type: 'identityFront' | 'identityBack' | 'license') => () => {
    switch (type) {
      case 'identityFront':
        identityFrontFileInputRef.current?.click();
        break;
      case 'identityBack':
        identityBackFileInputRef.current?.click();
        break;
      case 'license':
        licenseFileInputRef.current?.click();
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (identityFrontFile && identityBackFile && licenseFile) {
      console.log('Submitting files:', { identityFrontFile, identityBackFile, licenseFile });
      onNext({ identityFrontFile, identityBackFile, licenseFile, identityDocType, licenseDocType });
    }
  };

  const handleLater = () => {
    console.log('Submitting later');
    router.push('/register/staff/terms-conditions');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 6, mt: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              本人確認書類
              <Typography component="span" variant="caption" sx={{ ml: 1, fontWeight: 'normal' }}>
                （いずれか1点）
              </Typography>
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="identity-document"
                name="identity-document"
                value={identityDocType}
                onChange={(e) => setIdentityDocType(e.target.value)}
              >
                <List>
                  {identityDocs.map((doc) => (
                    <ListItem key={doc.value} disablePadding sx={{ mb: 1 }}>
                      <FormControlLabel
                        value={doc.value}
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>
                              <Iconify icon={doc.icon} sx={{ color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText primary={doc.label} />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              資格免許
              <Typography component="span" variant="caption" sx={{ ml: 1, fontWeight: 'normal' }}>
                （いずれか1点）
              </Typography>
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="license-document"
                name="license-document"
                value={licenseDocType}
                onChange={(e) => setLicenseDocType(e.target.value)}
              >
                <List>
                  {licenseDocs.map((doc) => (
                    <ListItem key={doc.value} disablePadding sx={{ mb: 1 }}>
                      <FormControlLabel
                        value={doc.value}
                        control={<Radio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemIcon>
                              <Iconify icon={doc.icon} sx={{ color: 'primary.main' }} />
                            </ListItemIcon>
                            <ListItemText primary={doc.label} />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>本人確認書類（表面）</Typography>
              <Box sx={{ position: 'relative', height: 300, mb: 4 }}>
                <Fade in={!identityFrontPreview}>
                  <UploadBox onClick={handleClick('identityFront')}>
                    <Iconify icon="solar:cloud-upload-outline" width={64} sx={{ mb: 2, color: 'primary.main' }} />
                    <Typography variant="h6" color="textSecondary">
                      クリックして画像をアップロード
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      または画像をここにドラッグ＆ドロップ
                    </Typography>
                  </UploadBox>
                </Fade>
                {identityFrontPreview && (
                  <Fade in={Boolean(identityFrontPreview)}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 2,
                        overflow: 'hidden',
                        '&:hover': { '& > .overlay': { opacity: 1 } },
                      }}
                    >
                      <Box
                        component="img"
                        src={identityFrontPreview}
                        alt="Identity Front"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        className="overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s',
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={handleClick('identityFront')}
                          startIcon={<Iconify icon="mdi:refresh" />}
                        >
                          画像を変更
                        </Button>
                      </Box>
                    </Box>
                  </Fade>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>本人確認書類（裏面）</Typography>
              <Box sx={{ position: 'relative', height: 300, mb: 4 }}>
                <Fade in={!identityBackPreview}>
                  <UploadBox onClick={handleClick('identityBack')}>
                    <Iconify icon="solar:cloud-upload-outline" width={64} sx={{ mb: 2, color: 'primary.main' }} />
                    <Typography variant="h6" color="textSecondary">
                      クリックして画像をアップロード
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      または画像をここにドラッグ＆ドロップ
                    </Typography>
                  </UploadBox>
                </Fade>
                {identityBackPreview && (
                  <Fade in={Boolean(identityBackPreview)}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 2,
                        overflow: 'hidden',
                        '&:hover': { '& > .overlay': { opacity: 1 } },
                      }}
                    >
                      <Box
                        component="img"
                        src={identityBackPreview}
                        alt="Identity Back"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        className="overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s',
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={handleClick('identityBack')}
                          startIcon={<Iconify icon="mdi:refresh" />}
                        >
                          画像を変更
                        </Button>
                      </Box>
                    </Box>
                  </Fade>
                )}
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>資格免許</Typography>
              <Box sx={{ position: 'relative', height: 300, mb: 4 }}>
                <Fade in={!licensePreview}>
                  <UploadBox onClick={handleClick('license')}>
                    <Iconify icon="solar:cloud-upload-outline" width={64} sx={{ mb: 2, color: 'primary.main' }} />
                    <Typography variant="h6" color="textSecondary">
                      クリックして画像をアップロード
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      または画像をここにドラッグ＆ドロップ
                    </Typography>
                  </UploadBox>
                </Fade>
                {licensePreview && (
                  <Fade in={Boolean(licensePreview)}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 2,
                        overflow: 'hidden',
                        '&:hover': { '& > .overlay': { opacity: 1 } },
                      }}
                    >
                      <Box
                        component="img"
                        src={licensePreview}
                        alt="License"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        className="overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s',
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={handleClick('license')}
                          startIcon={<Iconify icon="mdi:refresh" />}
                        >
                          画像を変更
                        </Button>
                      </Box>
                    </Box>
                  </Fade>
                )}
              </Box>
            </Grid>
          </Grid>

          <input
            type="file"
            hidden
            ref={identityFrontFileInputRef}
            accept="image/*,.pdf"
            onChange={handleFileUpload('identityFront')}
          />
          <input
            type="file"
            hidden
            ref={identityBackFileInputRef}
            accept="image/*,.pdf"
            onChange={handleFileUpload('identityBack')}
          />
          <input
            type="file"
            hidden
            ref={licenseFileInputRef}
            accept="image/*,.pdf"
            onChange={handleFileUpload('license')}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, gap: 2 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleLater}
              sx={{ 
                minWidth: '140px',
                color: 'text.secondary',
                borderColor: 'text.secondary',
                '&:hover': {
                  borderColor: 'text.primary',
                  color: 'text.primary',
                },
              }}
            >
              後で提出する
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              disabled={!identityFrontFile || !identityBackFile || !licenseFile}
              sx={{ 
                minWidth: '140px',
                color: 'white',
              }}
            >
              次へ
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}