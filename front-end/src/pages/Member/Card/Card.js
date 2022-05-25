import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  Grid,
  Stack,
  Box,
  Typography,
  Container,
} from '@mui/material';
import AddCardIcon from '@mui/icons-material/AddCard';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useCard from '../hooks/useCard';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link to="/">Path콕!</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

function CardMain() {
  const { requestBillingAuth, goBackPage } = useCard();
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
              <Button variant="contained" onClick={() => requestBillingAuth()}>
                <AddCardIcon sx={{ mr: 1 }} />
                카드 등록
              </Button>
              <Button variant="outlined">
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
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={14} sm={6} md={4}>
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 100,
                    minHeight: 150,
                    mr: 1,
                  }}
                >
                  <Box sx={{ color: 'text.secondary' }}>현대 카드</Box>
                  <Box
                    sx={{
                      mt: 2,
                      mb: 2,
                      color: 'text.primary',
                      fontSize: 22,
                      fontWeight: 'medium',
                    }}
                  >
                    4330-12**-****-1234
                  </Box>
                  <Box
                    sx={{
                      color: 'success.dark',
                      display: 'inline',
                      fontWeight: 'bold',
                      mx: 0.5,
                      fontSize: 14,
                    }}
                  >
                    신용
                  </Box>
                  <Box
                    sx={{
                      color: 'text.secondary',
                      display: 'inline',
                      fontSize: 14,
                      ml: 14,
                    }}
                  >
                    2021-01-01
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default CardMain;
