import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  Stack,
  Box,
  Typography,
  Container,
  Grid,
} from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useCard from '../hooks/useCard';
import Card from './Card';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link to="/">Path콕!</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function CardMain() {
  const {
    cards,
    isRemove,
    toggleIsRemove,
    handleRemove,
    requestBillingAuth,
    goBackPage,
  } = useCard();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              fontWeight={'normal'}
            >
              카드 관리
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              카드를 등록하고 제거할 수 있습니다.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={requestBillingAuth}>
                <AddCardIcon sx={{ mr: 1 }} />
                카드 등록
              </Button>
              <Button variant="outlined" onClick={toggleIsRemove}>
                <CreditCardOffIcon sx={{ mr: 1 }} />
                카드 삭제
              </Button>
            </Stack>
            <Stack sx={{ pt: 3 }} direction="row" justifyContent="center">
              <Button
                variant="outlined"
                onClick={goBackPage}
                sx={{
                  bgcolor: 'background.paper',
                  pt: 1,
                  pb: 1,
                }}
              >
                돌아가기
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                isRemove={isRemove}
                handleRemove={handleRemove}
              />
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default CardMain;
