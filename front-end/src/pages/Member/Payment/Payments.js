import {
  Button,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  Table,
  TableCell,
  Stack,
  Paper,
  Box,
  Grid,
} from '@mui/material';
import React from 'react';
import PaymentsList from './PaymentsList';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const HoverPaper = styled(Paper)`
  padding: 0 2px 2px 2px;
  opacity: 0.9;
  transition: all 0.5s ease-out;
  &:hover {
    opacity: 1;
    transform: translateY(-3px);
    transition: all 0.5s ease-out;
  }
`;

const HoverInnerPaper = styled(Paper)`
  padding: 0 2px 2px 2px;
  opacity: 0.9;
  transition: all 0.5s ease-out;
  &:hover {
    opacity: 1;
    transform: translateY(-6px);
    transition: all 0.5s ease-out;
  }
`;

const Payments = ({ payment }) => {
  const paymentDate = `${payment.paymentDate.substring(
    0,
    4
  )}년 ${payment.paymentDate.substring(5, 7)}월 ${payment.paymentDate.substring(
    8,
    10
  )}일 ${payment.paymentDate.substring(11, 16)}`;

  return (
    <Box>
      <Stack
        justifyContent="center"
        sx={{
          pt: 6,
          verticalAlign: 'middle',
          margin: 'auto',
        }}
        spacing={2}
      >
        {/* <Typography component={'h4'} variant="h4" align="center" gutterBottom>
          2022년 5월
        </Typography> */}
        <HoverPaper sx={{ borderRadius: 3, bgcolor: grey[100] }} elevation={6}>
          <Box display={'flex'}></Box>
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography
                variant="h6"
                sx={{ ml: 4, mt: 2, mb: 2 }}
                align="left"
                gutterBottom
              >
                {payment.orderItems[0].companyName}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                color="text.secondary"
                sx={{ mr: 4, mt: 2 }}
                align="right"
                gutterBottom
              >
                {paymentDate}
              </Typography>
            </Grid>
          </Grid>
          <HoverInnerPaper
            sx={{
              pb: 2,
              pl: 2,
              pr: 2,
              borderRadius: 3,
            }}
            elevation={1}
          >
            <Table size="string" sx={{ p: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>메뉴명</TableCell>
                  <TableCell>수량</TableCell>
                  <TableCell>금액</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payment.orderItems.map((item) => (
                  <PaymentsList key={item.orderItemId} item={item} />
                ))}
                <TableRow>
                  <TableCell>총금액</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {payment.price.toLocaleString('ko-KR')}원
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </HoverInnerPaper>
        </HoverPaper>
      </Stack>
    </Box>
  );
};

export default Payments;
