import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
} from '@mui/material';

import { Iconify } from '@/components/iconify';

interface ConsentItem {
  id: number;
  text: string;
  checked: boolean;
}

export function PriorConsentForm() {
  const [consentItems, setConsentItems] = useState<ConsentItem[]>([
    { id: 1, text: '白色の院内シューズをもってきてください。', checked: false },
    { id: 2, text: '事前説明を行うので勤務開始時間の10分前には到着してください。', checked: false },
    { id: 3, text: '歯科医院、クリニックでの勤務経験が3年以上ありますか。', checked: false },
    { id: 4, text: '当日遅刻される場合は速やかに医院にお電話ください。', checked: false },
  ]);
  const [newItemText, setNewItemText] = useState('');

  const handleAddItem = () => {
    if (newItemText.trim()) {
      setConsentItems([...consentItems, { id: Date.now(), text: newItemText, checked: false }]);
      setNewItemText('');
    }
  };

  const handleRemoveItem = (id: number) => {
    setConsentItems(consentItems.filter(item => item.id !== id));
  };

  const handleCheckboxChange = (id: number) => {
    setConsentItems(consentItems.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const checkedItems = consentItems.filter(item => item.checked);
    console.log(checkedItems);
    // ここで選択された同意事項をバックエンドに送信する処理を実装
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          同意事項作成
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          ※下記のメニューフォームで自由に同意事項を作成できます。
          内容入力後、＋ボタンを押すとその同意事項が追加されます。
          チェックされた項目が同意事項として表示されます。
        </Typography>
        
        {consentItems.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              }
              label={item.text}
              sx={{ flexGrow: 1 }}
            />
            <Iconify
              icon="mdi:trash-can-outline"
              width={24}
              sx={{ 
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'error.main' }
              }}
              onClick={() => handleRemoveItem(item.id)}
            />
          </Box>
        ))}

        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="新しい同意事項を入力"
          />
          <Button onClick={handleAddItem} variant="contained" sx={{ ml: 1 }}>
            追加
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined">
            後で作成する
          </Button>
          <Button type="submit" variant="contained" color="primary">
            次へ
          </Button>
        </Box>
      </form>
    </Paper>
  );
}