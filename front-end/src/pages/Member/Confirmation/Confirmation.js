import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(){
    return (
        <Typography variant="body2" color="text.scondary" align="center">
         {'Copyright © '}
         <Link to="/">Path콕!</Link>{new Date().getFullYear()}
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
function Confirmation(){
    let state = useSelector((state)=>state);
    const [count, setAlarmCount] = useState(null);
    const [open,setOpen] = useState(false);
    const [conts,setConts] = useState(null);
    const handleClose = () => setOpen(false);
  
    



useEffect(()=>{
    axios.get(process.env.REACT_APP_SPRING_API + `/api/request/${state.user.id}`)
    .then((res)=>{
        console.log(res.data.body)
        setAlarmCount(res.data.body);
    })
    .catch((err)=>{
        console.log(err)
    })
},[state])

const handleOpen = (count,e) =>{
    e.preventDefault();
    setOpen(true);
    axios.get(process.env.REACT_APP_SPRING_API + `/api/request/conts/${count.id}`)
    .then((res)=>{
        console.log(res.data.body);
        setConts(res.data.body);
    })
    .catch((err)=>{
        console.log(err)
    })
}

    return (
     <ThemeProvider theme={theme}>
         <CssBaseline />
         <main>
            <Box
              sx={{
                  bgcolor : 'background.paper',
                  pt: 8 ,
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
                        신청서 확인
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                     카풀 게시글에 대한 신청서를 확인할 수 있습니다.
                     </Typography>
                  </Container>
                  <Container sx={{ py: 2 }} maxWidth="md">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell align="right">출발지</TableCell>
                            <TableCell align="right">도착지</TableCell>
                            <TableCell align="right">희망금액</TableCell>
                            <TableCell align="right">신청자</TableCell>
                            <TableCell align="center">비고</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {count != null ? 
                             <>
                            {count.map((count) => (
                            <TableRow
                            key={count.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {count.id}
                            </TableCell>
                            <TableCell align="right">{count.carPost.startLocal1},{count.carPost.startLocal2}</TableCell>
                            <TableCell align="right">{count.carPost.arriveLocal1},{count.carPost.arriveLocal2}</TableCell>
                            <TableCell align="right">{count.price}원</TableCell>
                            <TableCell align="right">{count.member.loginId}</TableCell>
                            <TableCell align="center"><Button  onClick={(e)=>{handleOpen(count,e)}}>상세내역</Button></TableCell>
                            </TableRow>
                            ))}
                            </>
                            :''}
                        
                        </TableBody>
                    </Table>
                    </TableContainer>
                 </Container>
                 <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                          신청서 상세보기
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt : 2}}>
                          {conts !=null ? 
                          <>
                             {conts.content}<br></br>
                             {conts.passenger}명<br></br>
                             {conts.price}원<br></br>
                          </>
                          :''}
                      </Typography>
                    </Box> 
                 </Modal>
            </Box>
         </main>
        <Copyright />
     </ThemeProvider>   
    );
}

export default Confirmation;