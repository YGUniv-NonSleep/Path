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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height : 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const theme = createTheme();

function Boarding(){
let state = useSelector((state)=>state);
const [board, setBoard] = useState(null);
const [boardModal, setBoardModal] = useState(false);
const [boardDetail,setBoardDetail] = useState(null);
const closeBoard = () => setBoardModal(false);
    useEffect(()=>{
        console.log(state.user.id)
        axios.get(process.env.REACT_APP_SPRING_API + `/api/boarding/${state.user.id}`)
        .then((res)=>{
            console.log(res.data.body)
            setBoard(res.data.body)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const BoardingDetail = (board,e) => {
        e.preventDefault();
        setBoardModal(true);
        axios.get(process.env.REACT_APP_SPRING_API + `/api/boarding/list/${board.boardingId}`)
        .then((res)=>{
            console.log(res)
            setBoardDetail(res.data.body)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <main>
                    <Box
                        sx={{
                            bgcolor : 'background.paper',
                            pt : 8,
                            pb : 6
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
                            ????????????
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph>
                          ???????????? ??????????????? ????????? ??? ????????????.
                        </Typography> 
                       </Container>
                       <Container sx={{ py : 2 }} maxWidth="md">
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth : 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">??????</TableCell>
                                        <TableCell align="center">??????(???)</TableCell>
                                        <TableCell align="center">??????</TableCell>
                                        <TableCell align="center">?????????</TableCell>
                                        <TableCell align="center">????????????(???)</TableCell>
                                        <TableCell align="center">??????</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {board != null ? 
                                        <>
                                        {board.map((board,index)=>(
                                        <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell align="center">{index+1}</TableCell>
                                            <TableCell align="center">{board.cost}</TableCell>
                                            <TableCell align="center">{board.status}</TableCell>
                                            <TableCell align="center">{board.operationDetail.cars.member.loginId}</TableCell>
                                            <TableCell align="center">{board.carPostRequest.passenger}</TableCell>
                                            <TableCell align="center"><Button onClick={(e)=>{BoardingDetail(board,e)}}>????????????</Button></TableCell>
                                        </TableRow>
                                        ))}
                                        </>
                                    :''}
                                </TableBody>
                            </Table>
                          </TableContainer>
                       </Container>        
                       <Modal
                        open={boardModal}
                        onClose={closeBoard}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style}>
                           <Typography id="modal-modal-title" variant="h4" component="h2" align="center">
                            ???????????? ????????????
                           </Typography><br></br>
                           <Typography id="modal-modal description" sx={{ mt : 2 }} align="center">
                                {boardDetail != null ? (
                                    <>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                                        ????????????
                                    </Typography>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth : 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">????????? ??????</TableCell>
                                                    <TableCell align="center">?????? ??????</TableCell>
                                                    <TableCell align="center">?????? ??????(???)</TableCell>
                                                    <TableCell align="center">?????? ??????(???)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center"><Link to={{ pathname : `/carpool/${boardDetail.carPostRequest.carPost.id}`}}>????????? ????????????</Link></TableCell>
                                                    <TableCell align="center">{boardDetail.carPostRequest.carPost.sdate},{boardDetail.carPostRequest.carPost.stime}</TableCell>
                                                    <TableCell align="center">{boardDetail.carPostRequest.passenger}</TableCell>
                                                    <TableCell align="center">{boardDetail.carPostRequest.price}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer><br></br><br></br><br></br><br></br>
                                    <Typography id="modal-modla title" variant="h6" component="h2" align="center">
                                        ????????? ??????
                                    </Typography>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth : 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">?????? ??????</TableCell>
                                                    <TableCell align="center">?????? ??????</TableCell>
                                                    <TableCell align="center">????????? ?????????</TableCell>
                                                    <TableCell align="center">?????????</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center">{boardDetail.operationDetail.cars.carKind}</TableCell>
                                                    <TableCell align="center">{boardDetail.operationDetail.cars.carNum}</TableCell>
                                                    <TableCell align="center">{boardDetail.operationDetail.cars.member.loginId}</TableCell>
                                                    <TableCell align="center">{boardDetail.operationDetail.carPost.member.mail}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer><br></br><br></br><br></br><br></br>
                                    <Typography id="modal-modla title" variant="h6" component="h2" align="center">
                                        ?????? ??????
                                    </Typography>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth : 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">????????? ??????</TableCell>
                                                    <TableCell align="center">????????? ??????</TableCell>
                                                    <TableCell align="center">?????? ??????(???)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="center">{boardDetail.sname}</TableCell>
                                                    <TableCell align="center">{boardDetail.waccount}</TableCell>
                                                    <TableCell align="center">{boardDetail.cost}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    </>                                    
                                ):('')}
                           </Typography>
                        </Box>    
                       </Modal>
                    </Box>
                </main>
            </CssBaseline>
        </ThemeProvider>
    )
}

export default Boarding;