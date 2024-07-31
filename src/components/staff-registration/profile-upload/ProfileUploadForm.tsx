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
  Alert,
  Snackbar,
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

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 200,
  height: 56,
  fontSize: '1rem',
}));

interface ProfileUploadFormProps {
  onNext: (data: { file: File; isPublic: boolean }) => Promise<void>;
  onSkip: () => void;
}

export const ProfileUploadForm: React.FC<ProfileUploadFormProps> = ({ onNext, onSkip }) => {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async () => {
    if (!profilePhoto) {
      setError('プロフィール写真を選択してください。');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await onNext({ file: profilePhoto, isPublic });
    } catch (err) {
      setError('アップロード中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
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
        <Alert severity="info" sx={{ mb: 2 }}>
          プロフィール写真を公開設定にすることで、オファー数が増える可能性が高くなります。
          非公開に設定した場合でも、マッチング後には医院側があなたの写真を閲覧できます。
        </Alert>
        <DescriptionText>
          {isPublic
            ? "プロフィール写真が他のユーザーに公開されます。これにより、あなたのプロフィールの魅力が高まり、より多くのオファーを受け取る可能性が増えます。"
            : "プロフィール写真は非公開となりますが、マッチング後に医院側が閲覧できるようになります。初期段階では公開されませんが、マッチング成立後はお互いの情報共有のために開示されます。"}
        </DescriptionText>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <StyledButton
            variant="outlined"
            onClick={onSkip}
            disabled={isLoading}
          >
            後で登録する
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!profilePhoto || isLoading}
            sx={{ color: 'white' }}
          >
            {isLoading ? '処理中...' : '次へ'}
          </StyledButton>
        </Box>
      </StyledPaper>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Container>
  );
};