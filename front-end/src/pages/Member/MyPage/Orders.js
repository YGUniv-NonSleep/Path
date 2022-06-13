import * as React from 'react';
import MuiLink from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import useMemberMain from '../hooks/useMemberMain';
import OrdersList from './OrdersList';
import { useNavigate } from 'react-router-dom';

export default function Orders({ payments }) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Title>최근 결제내역</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>결제일자</TableCell>
            <TableCell>업체</TableCell>
            <TableCell>제품</TableCell>
            <TableCell>결제방법</TableCell>
            <TableCell align="right">결제금액</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <OrdersList key={payment.paymentId} payment={payment} />
          ))}
        </TableBody>
      </Table>
      <MuiLink
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => navigate('/member/payments')}
        style={{ cursor: 'pointer' }}
      >
        결제내역 더보기
      </MuiLink>
    </React.Fragment>
  );
}
