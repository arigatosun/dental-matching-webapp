'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  Checkbox,
  FormControlLabel,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Link,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Iconify } from '@/components/iconify';

const termsAndConditions = [
  {
    title: 'データの正確性と最新性の保証',
    content: '利用者は、Thootに提供する全ての情報（個人情報、職歴、資格情報等）が正確かつ最新であることを保証するものとします。虚偽の情報や誤解を招く情報の提供は、アカウントの停止や削除の対象となる場合があります。利用者は、登録情報に変更があった場合、速やかに更新する責任を負います。'
  },
  {
    title: 'マッチングの公平性と誠実性',
    content: 'Thootは、歯科医院と歯科衛生士のマッチングにおいて公平性を保つよう努めます。利用者は、マッチングプロセスにおいて誠実に行動し、他の利用者の権利を尊重することに同意するものとします。不適切な行為（ハラスメント、差別、詐欺的行為等）は厳しく禁止され、そのような行為が確認された場合、即時にサービスの利用を停止する場合があります。'
  },
  {
    title: '報酬と支払いに関する規定',
    content: 'Thootを通じて成立した雇用契約に基づく報酬の支払いは、Thootのプラットフォームを介して行われるものとします。歯科医院は、合意された報酬を期日までにThootに支払う責任を負い、Thootは適切な手数料を差し引いた後、歯科衛生士に報酬を支払います。直接の金銭のやり取りは禁止されており、この規定に違反した場合、サービスの利用を停止する場合があります。'
  }
];

export function TermsAndConditionsForm() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(event.target.checked);
  };

  const handleSubmit = () => {
    if (agreed) {
      console.log('利用規約に同意しました');
      // ここで登録処理を実行
      router.push('/register/clinic/completed'); // 登録後のリダイレクト先
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ mb: 4 }}>
          最後にご確認ください
        </Typography>

        <List>
          {termsAndConditions.map((term, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Iconify icon="mdi:check-circle" sx={{ color: '#0051A2', fontSize: 24 }} />
                  </ListItemIcon>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {term.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ pl: 5 }}>
                  {term.content}
                </Typography>
              </ListItem>
              {index < termsAndConditions.length - 1 && (
                <Divider variant="inset" component="li" sx={{ my: 3 }} />
              )}
            </React.Fragment>
          ))}
          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <ListItemIcon sx={{ minWidth: 40}}>
                <Iconify icon="mdi:check-circle" sx={{ color: '#0051A2', fontSize: 24 }} />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary">
                <Link href="/terms-of-service" target="_blank" rel="noopener">
                  利用規約
                </Link>
                もご確認いただき、すべてに同意した場合のみ下記にチェックしてください
              </Typography>
            </Box>
          </ListItem>
        </List>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={handleAgreeChange}
                color="primary"
              />
            }
            label={
              <Typography variant="h6">
                この内容についてすべて同意する
              </Typography>
            }
          />
        </Box>

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={!agreed}
            sx={{ 
              minWidth: 300,
              height: 56,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            登録を完了する
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}