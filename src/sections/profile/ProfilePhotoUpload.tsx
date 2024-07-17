import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  styled,
  Container,
} from '@mui/material';
import { Iconify } from '@/components/iconify';
import { useRouter } from 'next/navigation';

type PhotoType = 'director' | 'exterior' | 'unit' | 'reception';

interface PhotoUploadProps {
  type: PhotoType;
  title: string;
  isMain?: boolean;
}

const UploadPaper = styled(Paper)(({ theme }) => ({
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: '2px dashed',
  borderColor: theme.palette.grey[300],
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const PhotoUpload: React.FC<PhotoUploadProps> = ({ type, title, isMain = false }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>
      <UploadPaper elevation={0} onClick={handleClick}>
        {photo ? (
          <Box
            component="img"
            src={photo}
            alt={title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <>
            <Iconify icon="solar:cloud-upload-outline" width={48} sx={{ mb: 1 }} />
            <Typography variant="body2" color="textSecondary">
              クリックして画像を選択
            </Typography>
          </>
        )}
      </UploadPaper>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        accept="image/*"
        onChange={handlePhotoUpload}
      />
    </Box>
  );
};

interface ProfilePhotoUploadViewProps {
  handleNext: () => void;
  handleBack: () => void;
}

export function ProfilePhotoUploadView({ handleNext, handleBack }: ProfilePhotoUploadViewProps) {
  const router = useRouter();

 
  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <PhotoUpload type="director" title="院長写真" isMain />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PhotoUpload type="exterior" title="外観写真" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PhotoUpload type="unit" title="ユニット写真" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PhotoUpload type="reception" title="受付写真" />
            </Grid>
          </Grid>
          <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', gap: 2 }}>
  <Button onClick={handleBack} variant="outlined" size="large" sx={{ minWidth: 200 }}>
    戻る
  </Button>
  <Button onClick={handleNext} variant="contained" color="primary" size="large" sx={{ minWidth: 200, color: 'white' }}>
    次へ
  </Button>
</Box>
        </Box>
      </Container>
    </Paper>
  );
}
