import React, { useState, useRef } from 'react';
import {
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  Paper,
  Switch,
  FormControlLabel,
  styled,
} from '@mui/material';
import { Iconify } from '@/components/iconify';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  textAlign: 'center',
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  textAlign: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 200,
  height: 56,
  fontSize: '1rem',
}));

interface ProfileUploadFormProps {
  onNext: (data: any) => void;
  onSkip: () => void;
}

const avatars = [
  { icon: 'mdi:account', color: '#1976d2' },
  { icon: 'mdi:account-circle', color: '#388e3c' },
  { icon: 'mdi:account-box', color: '#d32f2f' },
  { icon: 'mdi:account-tie', color: '#ffa000' },
  { icon: 'mdi:account-star', color: '#7b1fa2' },
];

export const ProfileUploadForm: React.FC<ProfileUploadFormProps> = ({ onNext, onSkip }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onNext({ selectedAvatar, profilePhoto, isPublic });
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <SectionTitle variant="h5">アバターの選択</SectionTitle>
        <DescriptionText>
          thootアプリで使用するアバターを以下のテンプレートから選択してください。
        </DescriptionText>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          {avatars.map((avatar, index) => (
            <StyledAvatar
              key={index}
              sx={{
                bgcolor: avatar.color,
                border: avatar.icon === selectedAvatar ? '2px solid #1976d2' : 'none',
              }}
              onClick={() => handleAvatarSelect(avatar.icon)}
            >
              <Iconify icon={avatar.icon} width={40} height={40} />
            </StyledAvatar>
          ))}
        </Box>

        <SectionTitle variant="h5">プロフィール写真のアップロード</SectionTitle>
        <DescriptionText>
          本人写真をアップロードしてください。明るく、顔がはっきりと写っている写真が最適です。
        </DescriptionText>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          {profilePhotoPreview ? (
            <Avatar
              src={profilePhotoPreview}
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
            startIcon={<Iconify icon="mdi:upload" />}
          >
            写真をアップロード
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            }
            label="プロフィール写真を一般公開する"
          />
        </Box>
        <DescriptionText>
          {isPublic
            ? "プロフィール写真が他のユーザーに公開されます。"
            : "プロフィール写真は非公開となり、選択したアバターがデフォルトで表示されます。"}
        </DescriptionText>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <StyledButton
            variant="outlined"
            onClick={onSkip}
          >
            後で登録する
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedAvatar && !profilePhoto}
            sx={{ color: 'white' }}
          >
            次へ
          </StyledButton>
        </Box>
      </StyledPaper>
    </Container>
  );
};