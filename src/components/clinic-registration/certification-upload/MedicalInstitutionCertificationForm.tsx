'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  styled,
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

const requiredDocuments = [
  '保険医療機関指定通知書',
  '診療所開設届け',
  '診療所開設許可証',
];

export function MedicalInstitutionCertificationForm() {
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCertificateFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      console.log('File uploaded:', file.name);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (certificateFile) {
      console.log('Submitting file:', certificateFile.name);
      // ここでバックエンドへのファイル送信処理を実装する
    }
    // 送信後、次の画面（利用規約・同意）に遷移
    router.push('/register/clinic/terms-conditions');
  };

  const handleLater = () => {
    // 後で提出する処理をここに実装
    console.log('Submitting later');
    router.push('/register/clinic/terms-conditions');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 6, mt: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ width: '45%' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              必要書類
              <Typography component="span" variant="caption" sx={{ ml: 1, fontWeight: 'normal' }}>
                （いずれか1点）
              </Typography>
            </Typography>
            <List>
              {requiredDocuments.map((doc, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon>
                    <Iconify icon="mdi:file-document-outline" sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={doc} />
                </ListItem>
              ))}
            </List>
          </Box>
         
        </Box>

        <form onSubmit={handleSubmit}>
        <Box sx={{ position: 'relative', height: 300, mb: 4 }}>
          <Fade in={!previewUrl}>
            <UploadBox onClick={handleClick}>
              <Iconify icon="solar:cloud-upload-outline" width={64} sx={{ mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" color="textSecondary">
                クリックして画像をアップロード
              </Typography>
              <Typography variant="body2" color="textSecondary">
                または画像をここにドラッグ＆ドロップ
              </Typography>
            </UploadBox>
          </Fade>
          {previewUrl && (
            <Fade in={Boolean(previewUrl)}>
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
                  src={previewUrl}
                  alt="Uploaded certificate"
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
                    onClick={handleClick}
                    startIcon={<Iconify icon="mdi:refresh" />}
                  >
                    画像を変更
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}
        </Box>
        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept="image/*,.pdf"
          onChange={handleFileUpload}
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
              disabled={!certificateFile}
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