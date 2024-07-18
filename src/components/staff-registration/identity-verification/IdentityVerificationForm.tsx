'use client';

import React, { useState, useRef } from 'react';
import { 
  Typography, 
  Button, 
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';

interface IdentityVerificationFormProps {
  onNext: (data: any) => void;
}

export const IdentityVerificationForm: React.FC<IdentityVerificationFormProps> = ({ onNext }) => {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const frontFileInputRef = useRef<HTMLInputElement>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (side: 'front' | 'back') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (side === 'front') {
        setFrontFile(file);
      } else {
        setBackFile(file);
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === 'front') {
          setFrontPreview(reader.result as string);
        } else {
          setBackPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (frontFile && backFile) {
      // ここでファイルアップロードのロジックを実装
      console.log('Uploading front file:', frontFile);
      console.log('Uploading back file:', backFile);
      onNext({ frontFile, backFile });
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>表面</Typography>
              {frontPreview ? (
                <CardMedia
                  component="img"
                  image={frontPreview}
                  alt="ID Front"
                  sx={{ height: 200, objectFit: 'contain' }}
                />
              ) : (
                <Box sx={{ height: 200, bgcolor: 'grey.200', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">画像なし</Typography>
                </Box>
              )}
              <Button
                variant="outlined"
                fullWidth
                onClick={() => frontFileInputRef.current?.click()}
                sx={{ mt: 2 }}
              >
                表面の画像を選択
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect('front')}
                style={{ display: 'none' }}
                ref={frontFileInputRef}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>裏面</Typography>
              {backPreview ? (
                <CardMedia
                  component="img"
                  image={backPreview}
                  alt="ID Back"
                  sx={{ height: 200, objectFit: 'contain' }}
                />
              ) : (
                <Box sx={{ height: 200, bgcolor: 'grey.200', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">画像なし</Typography>
                </Box>
              )}
              <Button
                variant="outlined"
                fullWidth
                onClick={() => backFileInputRef.current?.click()}
                sx={{ mt: 2 }}
              >
                裏面の画像を選択
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect('back')}
                style={{ display: 'none' }}
                ref={backFileInputRef}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button variant="outlined">
          戻る
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!frontFile || !backFile}
        >
          次へ
        </Button>
      </Box>
    </Container>
  );
};