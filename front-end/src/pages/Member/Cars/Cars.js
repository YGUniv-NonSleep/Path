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
  Modal,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useCars from '../hooks/useCars';
import AddCarsModal from './addCars';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DeleteIcon from '@mui/icons-material/Delete';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link to="/">Path콕!</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3];

const theme = createTheme();

function CarsMain() {
  const {
    goBackPage,
    modalOpen,
    handleModalOpen,
    handleModalClose,
    inputValue,
    handleInput,
  } = useCars();

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
              차량 관리
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              차량을 등록하고 제거할 수 있습니다.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={handleModalOpen}>
                <DirectionsCarIcon sx={{ mr: 1 }} />
                차량 등록
              </Button>
              <Button variant="outlined">
                <DeleteIcon sx={{ mr: 1 }} />
                차량 삭제
              </Button>
              <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <>
                  <AddCarsModal />
                </>
              </Modal>
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
                  <Box sx={{ color: 'text.secondary' }}>현대 자동차</Box>
                  <Box
                    sx={{
                      mt: 2,
                      mb: 2,
                      color: 'text.primary',
                      fontSize: 22,
                      fontWeight: 'medium',
                    }}
                  >
                    쏘나타
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
                    중형
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

export default CarsMain;
