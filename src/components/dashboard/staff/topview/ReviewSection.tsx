'use client';

import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, Rating } from '@mui/material';

const ReviewSection: React.FC = () => {
  // サンプルデータ
  const reviews = [
    { id: 1, clinicName: 'さくら歯科', date: '2023/7/10', rating: 4.5, comment: '丁寧な対応でした。' },
    { id: 2, clinicName: 'ひまわり歯科', date: '2023/7/5', rating: 5, comment: 'とても助かりました。' },
    { id: 3, clinicName: 'もみじ歯科', date: '2023/6/30', rating: 4, comment: 'また機会があればお願いしたいです。' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        直近のレビュー
      </Typography>
      <List>
        {reviews.map((review) => (
          <ListItem key={review.id} alignItems="flex-start">
            <ListItemText
              primary={review.clinicName}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.primary">
                    {review.date}
                  </Typography>
                  {` - ${review.comment}`}
                </React.Fragment>
              }
            />
            <Rating value={review.rating} readOnly size="small" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ReviewSection;