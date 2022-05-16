import * as React from 'react';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>4월 이용 금액</Title>
      <Typography component="p" variant="h4">
        32,100원
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        2022년 4월 22일
      </Typography>
      <div>
        <MuiLink color="primary" href="#" onClick={preventDefault}>
          더보기
        </MuiLink>
      </div>
    </React.Fragment>
  );
}
