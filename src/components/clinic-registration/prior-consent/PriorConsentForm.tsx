import React, { useState } from 'react';
import { getSupabase } from '@/utils/supabase-client';
import { getDevelopmentUser } from '@/utils/auth-helper';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Iconify } from '@/components/iconify';

interface ConsentItem {
  id: number;
  text: string;
}

interface PriorConsentFormProps {
  handleNext: () => void;
  handleSkip: () => void;
  handleError: (message: string) => void;  // 追加
}

const steps = ['基本情報入力', 'プロフィール写真登録', 'マッチング条件設定', '事前同意事項作成', '医院証明書提出', '利用規約・同意'];

export function PriorConsentForm({ handleNext, handleSkip, handleError  }: PriorConsentFormProps) {
  const [consentItems, setConsentItems] = useState<ConsentItem[]>([
    { id: 1, text: '白色の院内シューズをもってきてください。' },
    { id: 2, text: '事前説明を行うので勤務開始時間の10分前には到着してください。' },
    { id: 3, text: '歯科医院、クリニックでの勤務経験が3年以上ありますか。' },
    { id: 4, text: '当日遅刻される場合は速やかに医院にお電話ください。' },
  ]);
  const [newItemText, setNewItemText] = useState('');

  const handleAddItem = () => {
    if (newItemText.trim()) {
      setConsentItems([...consentItems, { id: Date.now(), text: newItemText }]);
      setNewItemText('');
    }
  };

  const handleRemoveItem = (id: number) => {
    setConsentItems(consentItems.filter(item => item.id !== id));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const supabase = getSupabase();
      const user = await getDevelopmentUser('clinic');

      if (!user) {
        throw new Error('Failed to authenticate user');
      }

      const { data, error } = await supabase
        .from('prior_consent_items')
        .insert({
          user_id: user.id,
          consent_items: consentItems.map(item => item.text)
        })
        .single();

      if (error) throw error;

      console.log('Prior consent items saved:', data);
      handleNext();
    } catch (error) {
      console.error('Error saving prior consent items:', error);
      if (error instanceof Error) {
        handleError(error.message);
      } else {
        handleError('An unknown error occurred');
      }
    }
  };
  return (
    <Container maxWidth="md">
      <Stepper activeStep={3} alternativeLabel sx={{ mt: 0, mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        同意事項を作成しましょう
      </Typography>

      <Box sx={{ 
        bgcolor: 'rgba(0, 184, 217, 0.1)',
        border: '1px solid rgba(0, 184, 217, 0.3)',
        borderRadius: 2,
        p: 3,
        mb: 6, 
        display: 'flex', 
        alignItems: 'center'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minWidth: '32px',
          mr: 2 
        }}>
          <Iconify 
            icon="eva:info-fill" 
            width={32}
            height={32}
            sx={{ 
              color: 'rgb(0, 184, 217)',
            }} 
          />
        </Box>
        <Typography variant="body1" sx={{ color: 'rgb(0, 108, 156)' }}>
          同意事項は求職スタッフが医院からのオファーを受諾する前に、医院独自の同意事項について確認するものです。
          すべて同意しないとオファーを受諾できません。
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            同意事項作成
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            ※下記の入力フォームで自由に同意事項を作成できます。
            内容入力後、＋ボタンを押すとその同意事項が追加されます。
            リストに表示されているすべての項目が同意事項として登録されます。
            不要な項目はゴミ箱アイコンをタップして削除してください。
          </Typography>
          
          <List sx={{ mb: 4 }}>
            {consentItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Iconify
                      icon="mdi:trash-can-outline"
                      width={24}
                      sx={{ 
                        color: 'text.secondary',
                        '&:hover': { color: 'error.main' }
                      }}
                    />
                  </IconButton>
                }
                sx={{ py: 1 }}
              >
                <ListItemIcon>
                  <Iconify icon="mdi:check-circle" width={24} color="primary.main" />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: 'flex', mb: 4, alignItems: 'center' }}>
            <TextField
              fullWidth
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="新しい同意事項を入力"
              sx={{ fontSize: '1.1rem' }}
            />
            <IconButton 
              onClick={handleAddItem} 
              color="primary" 
              sx={{ 
                ml: 2,
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: '50%',
                width: 48,
                height: 48,
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              }}
            >
              <Iconify icon="mdi:plus" width={28} />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, gap: 2 }}>
            <Button
              onClick={handleSkip}
              variant="outlined"
              size="large"
              sx={{ 
                minWidth: 200,
                height: 56,
                color: 'text.secondary',
                borderColor: 'text.secondary',
                '&:hover': {
                  borderColor: 'text.primary',
                  color: 'text.primary',
                },
              }}
            >
              後で作成する
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ 
                minWidth: 200,
                height: 56,
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