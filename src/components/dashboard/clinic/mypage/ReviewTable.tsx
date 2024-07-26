import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Rating,
  Typography,
  TablePagination,
  Box,
  useTheme,
} from '@mui/material';
import { ReviewData } from '@/types/thoot-performance';

interface ReviewTableProps {
  reviews: ReviewData[];
}

const ReviewTable: React.FC<ReviewTableProps> = ({ reviews }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const randomizedReviews = useMemo(() => {
    return reviews.map(review => ({
      ...review,
      overallRating: +(Math.random() * 4 + 1).toFixed(1),
      cleanliness: Math.floor(Math.random() * 5) + 1,
      communication: Math.floor(Math.random() * 5) + 1,
      workability: Math.floor(Math.random() * 5) + 1,
    }));
  }, [reviews]);

  const currentReviews = randomizedReviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        レビュー一覧
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="レビューテーブル">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>名前</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>勤務日</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>総合評価</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>清潔さ</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>コミュニケーション</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>働きやすさ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentReviews.map((review) => (
              <TableRow key={review.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {review.name}
                </TableCell>
                <TableCell align="center">{review.workDate}</TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    {review.overallRating}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Rating value={review.cleanliness} readOnly size="small" />
                </TableCell>
                <TableCell align="center">
                  <Rating value={review.communication} readOnly size="small" />
                </TableCell>
                <TableCell align="center">
                  <Rating value={review.workability} readOnly size="small" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={reviews.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="表示件数"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} / ${count}`}
      />
    </Box>
  );
};

export default React.memo(ReviewTable);