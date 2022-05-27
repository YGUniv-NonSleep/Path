import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const OrdersList = ({ payment }) => {
  let productName = '';
  const createDate = payment.paymentDate.slice(0, 10);
  const company = payment.orderItems[0].companyName;

  if (payment.orderItems.length > 1) {
    if (payment.orderItems.length > 2) {
      productName = `${payment.orderItems[0].productName}, ${
        payment.orderItems[1].productName
      } 외 ${payment.orderItems.length - 2}`;
    } else {
      productName = `${payment.orderItems[0].productName}, ${payment.orderItems[1].productName}`;
    }
  } else {
    productName = `${payment.orderItems[0].productName}`;
  }

  return (
    <TableRow>
      <TableCell>{createDate}</TableCell>
      <TableCell>{company}</TableCell>
      <TableCell>{productName}</TableCell>
      <TableCell>{payment.method}</TableCell>
      <TableCell align="right">{`${payment.price}원`}</TableCell>
    </TableRow>
  );
};

export default OrdersList;
