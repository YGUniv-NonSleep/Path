import {
  Button,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  Table,
  TableCell,
  Stack,
} from '@mui/material';
import React from 'react';

const PaymentsList = ({ item }) => {
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>{item.productName}</TableCell>
        <TableCell>{item.productQuantity}</TableCell>
        <TableCell>{item.productPrice.toLocaleString('ko-KR')}원</TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default PaymentsList;
