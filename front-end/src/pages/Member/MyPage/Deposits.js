import * as React from 'react';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import useMemberMain from '../hooks/useMemberMain';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({ amountByDay }) {
  let totalAmount = 0;
  amountByDay.forEach((p) => {
    totalAmount = totalAmount + p.payPrice;
  });

  let now = new Date();
  const today = `${now.getFullYear()}년 ${
    now.getMonth() + 1
  }월 ${now.getDate()}일`;

  return (
    <React.Fragment>
      <Title>4월 이용 금액</Title>
      <Typography component="p" variant="h4">
        {totalAmount}원
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {today}
      </Typography>
      <div>
        <MuiLink color="primary" href="#" onClick={preventDefault}>
          더보기
        </MuiLink>
      </div>
    </React.Fragment>
  );
}
