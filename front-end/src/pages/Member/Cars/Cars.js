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
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import TextField from '@mui/material/TextField';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link to="/">Path콕!</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const theme = createTheme();

function CarsMain() {
  const {
    dataModal,
    updateModal,
    setCarsView,
    carsview,
    goBackPage,
    modalOpen,
    handleModalOpen,
    handleModalClose,
    inputValue,
    handleInput,
    carsDelete,
    carsUpdate,
    updateModalOpen,
    updateModalClose,
    ModalData,
  } = useCars();

console.log(dataModal)

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
              align="center"
            >
              <Button variant="contained" onClick={handleModalOpen}>
                <DirectionsCarIcon sx={{ mr: 1 }} />
                차량 등록
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
            {carsview ?(
              <>
              {carsview.map((cars,index) => (
              <Grid item key={index} xs={14} sm={6} md={4} align="center">
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
                    <Box
                      sx={{
                        mt: 2,
                        mb: 2,
                        color: 'text.primary',
                        fontSize: 22,
                        fontWeight: 'medium',
                      }}
                    >
                      {cars.carKind}
                    </Box>
                    <Box
                      sx={{
                        mt: 2,
                        mb: 2,
                        color: 'text.primary',
                        fontSize: 22,
                        fontWeight: 'medium',
                      }}
                    >
                      {cars.carNum}
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
                      <img src={`${process.env.REACT_APP_SPRING_API}/api/image/${cars.photoName}`} style={{width : "200px",height : "150px"}}></img><br></br>
                    </Box> 
                    <Button variant="outlined" onClick={carsDelete} value={cars.id}>
                      <DeleteIcon sx={{ mr: 1 }} />
                      차량 삭제
                    </Button>
                    <Button variant="outlined" onClick={()=>{ModalData(cars)}}>
                      <BuildCircleOutlinedIcon sx={{ mr: 1 }} />
                       정보 수정
                    </Button>
                    {dataModal ?(
                    <Modal
                      open={updateModal}
                      onClose={updateModalClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Container maxWidth="xs" align="center">
                      <Box sx={style}>
                      <form encType="multipart/form-data" onSubmit={carsUpdate}>
                        <input
                          type="text"
                          name="id"
                          defaultValue={dataModal.id}
                          hidden={true}
                        />
                         <TextField
                            id="standard-multiline-flexible"
                            name="carsNum"
                            label="차량번호"
                            multiline
                            maxRows={4}
                            variant="standard"
                            defaultValue={dataModal.carNum}
                            /><br></br><br></br><br></br><br></br>
                            <TextField
                              id="standard-multiline-flexible"
                              name="carsKind"
                              label="차량종류"
                              multiline
                              maxRows={4}
                              variant="standard"
                              defaultValue={dataModal.carKind}
                            /><br></br><br></br><br></br><br></br>
                        </form>
                        </Box>   
                      </Container> 
                    </Modal> 
                    ):('')}        
                </Box>
              </Grid>
            ))}
              </>
            ):('')}
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
