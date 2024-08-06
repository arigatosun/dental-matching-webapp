'use client';

import React from 'react';
import Footer from '@/components/topview/Footer';
import SimpleHeader from '@/components//topview/SimpleHeader';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Business,
  Person,
  LocationOn,
  Email,
  Phone,
  Description,
  AttachMoney,
  Payment,
  Schedule,
  AssignmentReturn,
  ShoppingCart,
  Security
} from '@mui/icons-material';
  

const LegalPage = () => {
  const theme = useTheme();

  const LegalItem = ({ icon, title, content }: { icon: React.ReactNode; title: string; content: string | React.ReactNode }) => (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1}>
          {icon}
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1">{content}</Typography>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
       <SimpleHeader />
      <Container maxWidth="md" sx={{ py: 8, flex: 1 }}>
        <Paper elevation={3} sx={{
          p: 4,
          borderRadius: 2,
          background: theme.palette.background.paper,
        }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 'bold',
            color: theme.palette.primary.main,
          }}>
            特定商取引法に基づく表記
          </Typography>

          <Box sx={{ '& > *:not(:last-child)': { mb: 2 } }}>
            <LegalItem icon={<Business color="primary" />} title="販売業者" content="合同会社D＆M" />
            <Divider />
            
            <LegalItem icon={<Person color="primary" />} title="代表者" content="菅原 希・上野 頌子　" />
            <Divider />
            
            <LegalItem icon={<LocationOn color="primary" />} title="所在地" content="〒572-0081 大阪府寝屋川市東香里園町30-6 コウリヒルズ3B" />
            <Divider />
            
            <LegalItem icon={<Phone color="primary" />} title="電話番号" content="080-2536-8841（受付時間：平日10:00〜18:00）" />
            <Divider />
            
            <LegalItem icon={<Email color="primary" />} title="メールアドレス" content="info@thoot.jp" />
            <Divider />
            
            <LegalItem icon={<Description color="primary" />} title="サービスの内容" content={
              <>
                Thootは、歯科医院と歯科スタッフをつなぐオンラインマッチングサービスです。<br />
                1. 歯科医院：必要な時に、必要なスキルを持つ歯科スタッフを見つけることができます。<br />
                2. 歯科スタッフ：自分のスキルと都合に合わせて、柔軟に働く機会を見つけることができます。<br />
                3. マッチングシステム：条件に合った歯科医院・スタッフを効率的に検索・マッチングします。<br />
                4. スケジュール管理：勤務可能日や希望シフトの管理が可能です。<br />
                5. 評価システム：相互評価により、信頼性の高いマッチングを実現します。
              </>
            } />
            <Divider />
            
            <LegalItem icon={<AttachMoney color="primary" />} title="料金" content="サービス利用料：マッチング成立時に歯科医院様から報酬の30%を手数料として頂戴します。歯科スタッフ様からは料金を頂戴しません。" />
            <Divider />
            
            <LegalItem icon={<Payment color="primary" />} title="支払方法" content="クレジットカード決済、銀行振込" />
            <Divider />
            
            <LegalItem icon={<Schedule color="primary" />} title="サービス提供時期" content="ユーザー登録完了後、即時にサービスをご利用いただけます。" />
            <Divider />
            
            <LegalItem icon={<AssignmentReturn color="primary" />} title="返金ポリシー" content={
              <>
                マッチングサービスの性質上、原則として返金は行っておりません。<br />
                ただし、以下の場合は個別に対応いたします：<br />
                1. システム障害等の当社の責めに帰すべき事由によりサービスを提供できなかった場合<br />
                2. マッチング後24時間以内にキャンセルの申し出があった場合<br />
                返金をご希望の場合は、カスタマーサポートinfo@sample-company.co.jpまでご連絡ください。
              </>
            } />
            <Divider />
            
            <LegalItem icon={<ShoppingCart color="primary" />} title="決済期間" content="クレジットカード決済の場合はただちに処理されます。銀行振込の場合は、請求書発行後7日以内にお支払いいただく必要があります。" />
            <Divider />
            
            <LegalItem icon={<Security color="primary" />} title="個人情報保護方針" content={
              <>
                当社は、ユーザーの個人情報を適切に管理し、法令を遵守して取り扱います。<br />
                詳細は「プライバシーポリシー」をご確認ください。
              </>
            } />
          </Box>
        </Paper>
      </Container>

      <Divider />
      
      <Footer />
    </Box>
  );
};

export default LegalPage;