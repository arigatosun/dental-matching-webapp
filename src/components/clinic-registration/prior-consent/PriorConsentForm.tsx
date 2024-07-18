import React, { useState } from 'react';
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
} from '@mui/material';

import { useRouter } from 'next/navigation';

import { Iconify } from '@/components/iconify';

interface ConsentItem {
  id: number;
  text: string;
}

export function PriorConsentForm() {
  const router = useRouter(); 
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(consentItems);
    // ここで同意事項をバックエンドに送信する処理を実装
    
    // 送信後、次の画面（医院証明提出）に遷移
    router.push('/register/clinic/certification-upload');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom sx={{ mb: 0}}>
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
            />
            <IconButton 
              onClick={handleAddItem} 
              color="primary" 
              sx={{ 
                ml: 2,
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: '50%',
                width: 40,
                height: 40,
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              }}
            >
              <Iconify icon="mdi:plus" width={24} />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                mr: 2,
                color: 'text.secondary',
                borderColor: 'text.secondary',
                '&:hover': {
                  borderColor: 'text.primary',
                  color: 'text.primary',
                },
                minWidth: '140px'
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
                color: 'white',
                minWidth: '140px'
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