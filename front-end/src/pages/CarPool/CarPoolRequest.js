
import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DaumPostcode from "react-daum-postcode";
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
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useCarPoolRequest from './hooks/useCarPoolRequest';


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
function CarPoolRequest() {

    const {requestOpen,arriveOpen,setstate,RequestOpen,requestComplete,RequestClose,RequestArrive,RequestArrClose,requestComplete2,SubmitRequest} = useCarPoolRequest();

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor : 'background.paper',
                        pt : 8,
                        pb : 6,
                    }}>
                        <Container maxWidth="sm">
                            <Typography
                              component="h1"
                              variant="h2"
                              align="center"
                              color="text.primary"
                              gutterBottom
                              fontWeight={'normal'}
                            >
                                신청하기
                            </Typography>
                            <Typography
                                variant="h5"
                                align="center"
                                color="text.secondary"
                                paragraph
                            >
                              
                            </Typography>
                        </Container>
                        <Container sx={{ py : 2}} maxWidth="md"  align="center">
                          <TextField
                            id="standard-multiline-flexible"
                            name="title"
                            label="제목"
                            multiline
                            maxRows={4}
                            variant="standard"
                            placeholder="제목을 입력하세요"
                          /><br></br><br></br><br></br>

                          <TextField 
                             id="outlined-multiline-static"
                             label="내용"
                             name="content"
                             multiline
                             rows={4}
                             placeholder="내용을 입력하세요"
                          /><br></br><br></br><br></br>
                        
                        <TextField 
                            id="outlined-multiline-static"
                            label="탑승인원"
                            name="recruit"
                            type="number"
                            multiline
                            rows={4}
                            placeholder="탑승인원을 입력하세요"
                        /><br></br><br></br><br></br>

                        <TextField 
                            id="outlined-multiline-static"
                            label="희망가격"
                            name="price"
                            type="number"
                            multiline
                            rows={4}
                            placeholder="희망가격을 입력하세요"
                        /><br></br><br></br><br></br>

                        <Button onClick={RequestOpen}>출발지 선택</Button>
                        {requestOpen ? (
                            <Modal
                            open={RequestOpen}
                            onClose={RequestClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <Container maxWidth="xs" align="center">
                            <Box sx={style}>
                            <DaumPostcode className="post-code" onComplete={requestComplete}/>
                            </Box>
                            </Container>
                            </Modal>
                            
                        ):('')}
                        <Button onClick={RequestArrive}>도착지 선택</Button>
                        {arriveOpen ? (
                            <Modal
                              open={RequestArrive}
                              onClose={RequestArrClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                              >
                              <Container maxWidth="xs" align="center">
                              <Box sx={style}>
                              <DaumPostcode className="post-code" onComplete={requestComplete2}/>
                              </Box>
                              </Container>
                              </Modal>
                        ) : ('')}
                        <div id="request_map"></div>
                        {setstate ? (
                            <Button onClick={SubmitRequest}>신청하기</Button>
                        ):('')}
                        </Container>
                    </Box>
                  
            </main>
        </ThemeProvider>
    );

}

export default CarPoolRequest;