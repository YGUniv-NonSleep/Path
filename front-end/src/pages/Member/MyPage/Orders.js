import * as React from 'react';
import MuiLink from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '2022년 4월 4일',
    '스타벅스',
    '돌체콜드브루',
    'VISA ⠀•••• 3719',
    '6,900'
  ),
  createData(
    1,
    '2022년 4월 7일',
    '스타벅스',
    '아메리카노',
    'VISA ⠀•••• 2574',
    '5,000'
  ),
  createData(
    2,
    '2022년 4월 10일',
    '투썸플레이스',
    '크림카라멜',
    'MC ⠀•••• 1253',
    '4,900'
  ),
  createData(
    3,
    '2022년 4월 13일',
    '카페봄봄',
    '아메리카노 외 1잔',
    'AMEX ⠀•••• 2000',
    '3,100'
  ),
  createData(
    4,
    '2022년 4월 16일',
    '이디야커피',
    '생수',
    'VISA ⠀•••• 5919',
    '2,500'
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>최근 주문내역</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>주문일자</TableCell>
            <TableCell>업체</TableCell>
            <TableCell>제품</TableCell>
            <TableCell>결제방법</TableCell>
            <TableCell align="right">주문금액</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount}원`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <MuiLink color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        주문내역 더보기
      </MuiLink>
    </React.Fragment>
  );
}
