'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  styled,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Iconify } from '@/components/iconify';

const UploadBox = styled(Box)(({ theme }) => ({
  height: 200,
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
  },
  overflow: 'hidden',
}));

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
    // 例: 一時保存してから次の画面に遷移
    console.log('Submitting later');
    router.push('/register/clinic/terms-conditions');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" gutterBottom>
          医療機関証明書類
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ◯ 保険医療機関指定通知書<br />
          ◯ 診療所開設届け<br />
          ◯ 診療所開設許可証
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <UploadBox onClick={handleClick}>
          {previewUrl ? (
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
          ) : (
            <>
              <Iconify icon="solar:cloud-upload-outline" width={48} sx={{ mb: 1 }} />
              <Typography variant="body2" color="textSecondary">
                クリックして画像を選択
              </Typography>
            </>
          )}
        </UploadBox>
        <input
          type="file"
          hidden
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileUpload}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
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
  );
}