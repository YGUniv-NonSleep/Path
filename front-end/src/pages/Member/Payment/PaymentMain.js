import {
  Box,
  Container,
  CssBaseline,
  Stack,
  Typography,
  Button,
  MuiLink,
  Toolbar,
  Divider,
  IconButton,
  Paper,
  List,
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import React, { useState } from 'react';
import usePayment from '../hooks/usePayment';
import Payments from './Payments';
import SearchDateBar from './SearchDateBar';
import { MainListItems, SecondaryListItems } from '../MyPage/listItems';
import useMemberMain from '../hooks/useMemberMain';
import MenuIcon from '@mui/icons-material/Menu';
const drawerWidth = 240;
const theme = createTheme();

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const PaymentMain = () => {
  const { open, toggleDrawer, deleteMember } = useMemberMain();
  const {
    startDate,
    handleStartDate,
    endDate,
    handleEndDate,
    handleToday,
    handleWeekAgo,
    handleMonthAgo,
    getPayments,
    getPaymentsDate,
    payments,
    paymentPageNum,
    isLastPage,
    setPayments,
    isDatePage,
  } = usePayment();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', ml: 12 }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems></MainListItems>
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems
              deleteMember={deleteMember}
            ></SecondaryListItems>
          </List>
        </Drawer>
        <Box
          component={'main'}
          sx={{
            pt: 8,
            pb: 6,
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component={'h2'}
              variant="h3"
              align="center"
              gutterBottom
              fontWeight={'normal'}
              sx={{ mb: 4 }}
            >
              결제내역
            </Typography>
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
              elevation={2}
            >
              <SearchDateBar
                startDate={startDate}
                handleStartDate={handleStartDate}
                endDate={endDate}
                handleEndDate={handleEndDate}
                handleToday={handleToday}
                handleWeekAgo={handleWeekAgo}
                handleMonthAgo={handleMonthAgo}
                getPaymentsDate={getPaymentsDate}
                paymentPageNum={paymentPageNum}
                setPayments={setPayments}
              />
            </Paper>
            {payments.map((payment) => (
              <Payments key={payment.paymentId} payment={payment} />
            ))}
            <Stack
              direction="row"
              justifyContent="center"
              sx={{
                p: 2,
                verticalAlign: 'middle',
                margin: 'auto',
              }}
              spacing={2}
            >
              {!isLastPage ? (
                isDatePage ? (
                  <Button variant="contained" onClick={getPaymentsDate}>
                    버튼
                  </Button>
                ) : (
                  <Button variant="contained" onClick={getPayments}>
                    버튼
                  </Button>
                )
              ) : (
                <></>
              )}
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentMain;
