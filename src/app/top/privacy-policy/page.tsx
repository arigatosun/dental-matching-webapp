'use client';

import React from 'react';
import Footer from '@/components/topview/Footer';
import SimpleHeader from '@/components//topview/SimpleHeader';
import {
  Container,
  Typography,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PrivacyPolicy = () => {
  const theme = useTheme();

  const PolicySection = ({ title, content }: { title: string; content: React.ReactNode }) => (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${title}-content`}
        id={`panel-${title}-header`}
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{content}</Typography>
      </AccordionDetails>
    </Accordion>
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
            プライバシーポリシー
          </Typography>

          <Typography variant="body1" paragraph>
            Thootプライバシーポリシー（以下「本ポリシー」といいます）は、合同会社D＆M（以下「当社」といいます）が提供するサービス「Thoot」（以下「本サービス」といいます）及び当社が提供する本サービスに係るウェブサイト（以下「本サイト」といいます）における個人情報の取扱を定めたものです。
          </Typography>

          <Box sx={{ mt: 4 }}>
            <PolicySection
              title="1. 個人情報保護について"
              content="当社は、個人情報の重要性を認識し、その保護の徹底が社会的責務であると考え、本サービスをご利用の利用者から取得した個人情報を、個人情報の保護に関する法律その他関連法令及びガイドライン等を遵守するとともに、適正に取り扱うことを約束いたします。"
            />

            <PolicySection
              title="2. 組織の名称"
              content="合同会社D＆M"
            />

            <PolicySection
              title="3. 個人情報保護管理者の氏名及び連絡先"
              content="菅原 希・上野 頌子　　　 info@thoot.jp"
            />

            <PolicySection
              title="4. 個人情報の取得"
              content={
                <>
                  当社は、本サービスの提供等に必要となる個人情報を、適法かつ公正な手段を用いて取得いたします。また、当サイトではホームページの利用状況を把握するためにGoogle Analytics を利用しています。
                  <br /><br />
                  Google Analytics から提供されるCookie を使用していますが、Google Analytics によって個人を特定する情報は取得していません。Google Analytics の利用により収集されたデータは、Google社のプライバシーポリシーに基づいて管理されています。
                </>
              }
            />

            <PolicySection
              title="5. 利用目的"
              content={
                <>
                  当社は、取得した個人情報を以下に記載される利用目的の範囲でのみ利用し、利用者の合意又は法令の定めなく、目的外の利用を行わないものとします。
                  <br /><br />
                  ・本サービスの提供、案内<br />
                  ・本サイト利用者の登録事項確認及び認証<br />
                  ・利用者間のコミュニケーション<br />
                  ・当社と利用者間のコミュニケーション<br />
                  ・本サービス利用状況の調査、分析<br />
                  ・マーケティング調査、アンケートの実施<br />
                  ・本サービスの開発保守、改善、不具合対応<br />
                  ・お問い合わせ対応<br />
                  ・報酬等の歯科医院に対する請求や歯科スタッフに対する支払い<br />
                  ・上記に付帯・関連するすべての業務
                </>
              }
            />

            <PolicySection
              title="6. 個人情報の管理"
              content={
                <>
                  当社は、個人情報の漏えい、滅失若しくは棄損の防止、又はその他の安全管理のために個人情報へのアクセス権限の制限を行っています。
                  <br /><br />
                  利用者から個人情報をご提供頂く際には、通信途上における第三者の不正なアクセスに備え、暗号化技術であるSSL（secure sockets layer）による個人情報の暗号化またはこれに準ずるセキュリティ技術を施し、安全性を確保しております。
                </>
              }
            />

            <PolicySection
              title="7. 個人情報の第三者提供"
              content={
                <>
                  当社は、以下の場合において個人情報を第三者に開示することがあります。
                  <br /><br />
                  ・当社が利用目的の達成に必要な範囲で第三者に業務を委託する場合<br />
                  ・当社が合併、会社分割、事業譲渡又は当社の事業、資産若しくは株式の全部又は一部の処分をする場合<br />
                  ・その他、利用者に対して開示の同意を求め、利用者がそれに応じた場合
                </>
              }
            />

            <PolicySection
              title="8. 個人情報の開示等の請求"
              content={
                <>
                  利用者は、弊社に対してご自身の個人情報の開示等（利用目的の通知、開示、内容の訂正・追加・削除、利用の停止または消去、第三者への提供の停止）に関して、当社問合わせ窓口に申し出ることができます。
                  <br /><br />
                  合同会社D&M　問合せ窓口<br />
                  〒572-0081　大阪府寝屋川市東香里園町30-6 コウリヒルズ3B<br />
                  メールアドレス：info@thoot.jp<br />
                  (受付時間　10:00~17:00※土・日曜日、祝日、年末年始、ゴールデンウィークを除く)
                </>
              }
            />
          </Box>

          <Typography variant="body2" align="right" sx={{ mt: 4 }}>
            制定日：2024年8月6日<br />
          </Typography>
        </Paper>
      </Container>

      <Divider />
      
      <Footer />
    </Box>
  );
};

export default PrivacyPolicy;