import {
  Stack,
  Typography,
  Button,
  ButtonGroup,
  TextField,
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const SearchDateBar = ({
  startDate,
  handleStartDate,
  endDate,
  handleEndDate,
  handleToday,
  handleWeekAgo,
  handleMonthAgo,
  getPaymentsDate,
  paymentPageNum,
  setPayments,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        pt: 3,
        pb: 3,
        verticalAlign: 'middle',
      }}
      spacing={4}
    >
      <ButtonGroup variant="outlined">
        <Button onClick={handleToday}>오늘</Button>
        <Button onClick={handleWeekAgo}>1주일</Button>
        <Button onClick={() => handleMonthAgo(1)}>1개월</Button>
        <Button onClick={() => handleMonthAgo(3)}>3개월</Button>
        <Button onClick={() => handleMonthAgo(6)}>6개월</Button>
        <Button onClick={() => handleMonthAgo(12)}>12개월</Button>
      </ButtonGroup>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="시작일"
          inputFormat={'yyyy-MM-dd'}
          mask={'____-__-__'}
          value={startDate}
          onChange={handleStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Typography sx={{ textAlign: 'center', m: 1, lineHeight: '3' }}>
        ~
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="종료일"
          inputFormat={'yyyy-MM-dd'}
          mask={'____-__-__'}
          value={endDate}
          onChange={handleEndDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        onClick={() => {
          setPayments([]);
          paymentPageNum.current = 0;
          getPaymentsDate();
        }}
      >
        조회
      </Button>
    </Stack>
  );
};

export default SearchDateBar;
