'use client';

import React, { useState, useRef } from 'react';
import { 
  Typography, 
  Button, 
  Box,
  Container,
  Avatar
} from '@mui/material';

interface ProfileUploadFormProps {
  onNext: (data: any) => void;
}

export const ProfileUploadForm: React.FC<ProfileUploadFormProps> = ({ onNext }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // ここでファイルアップロードのロジックを実装
      console.log('Uploading file:', selectedFile);
      onNext({ profilePhoto: selectedFile });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        {preview ? (
          <Avatar
            src={preview}
            sx={{ width: 200, height: 200, mb: 2 }}
          />
        ) : (
          <Box
            sx={{
              width: 200,
              height: 200,
              bgcolor: 'grey.200',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
              borderRadius: '50%'
            }}
          >
            <Typography variant="body1" color="text.secondary">
              No image
            </Typography>
          </Box>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <Button
          variant="outlined"
          onClick={() => fileInputRef.current?.click()}
          sx={{ mb: 2 }}
        >
          写真を選択
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          JPG、PNG形式の画像をアップロードしてください。最大サイズは5MBです。
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button variant="outlined">
            戻る
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            次へ
          </Button>
        </Box>
      </Box>
    </Container>
  );
};