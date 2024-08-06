'use client';

import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const OfferSection: React.FC = () => {
  // サンプルデータ
  const offers = [
    { id: 1, clinicName: 'さくら歯科', date: '2023/7/15', time: '9:00-17:00', status: '未回答' },
    { id: 2, clinicName: 'ひまわり歯科', date: '2023/7/18', time: '13:00-18:00', status: '承諾' },
    { id: 3, clinicName: 'もみじ歯科', date: '2023/7/20', time: '10:00-15:00', status: '辞退' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        オファー一覧
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>医院名</TableCell>
              <TableCell>日付</TableCell>
              <TableCell>時間</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>アクション</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.clinicName}</TableCell>
                <TableCell>{offer.date}</TableCell>
                <TableCell>{offer.time}</TableCell>
                <TableCell>{offer.status}</TableCell>
                <TableCell>
                  <Button variant="contained" size="small" color="primary">
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OfferSection;