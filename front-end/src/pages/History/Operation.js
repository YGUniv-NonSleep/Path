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
function Opertaion(){
    let state = useSelector((state)=>state);
    const [oper, setOper] = useState(null); 
    const [openModal, setOpenModal] = useState(false);
    const [opderDetail, setOperDetail] = useState(null);
    const closeModal = () => setOpenModal(false);

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SPRING_API + `/api/operation/myoperation/${state.user.id}`)
        .then((res)=>{
            console.log(res)
            setOper(res.data.body)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const OperDetail = (oper,e) => {
        e.preventDefault();
        setOpenModal(true)
        axios.get(process.env.REACT_APP_SPRING_API + `/api/operation/${oper.operationId}`)
        .then((res)=>{
            console.log(res);
            setOperDetail(res.data.body);
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    return (
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
                        운행내역
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="text.secondary"
                        paragraph
                    >
                      회원님의 운행내역을 확인할 수 있습니다.
                    </Typography>   
                  </Container>
                  <Container sx={{ py : 2 }} maxWidth="md">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth : 650}} aria-label="simple table">
                            <TableHead>
                             <TableRow>
                                <TableCell align="center">번호</TableCell>
                                <TableCell align="center">금액(원)</TableCell>
                                <TableCell align="center">상태</TableCell>
                                <TableCell align="center">출발지</TableCell>
                                <TableCell align="center">도착지</TableCell>
                                <TableCell align="center">운행차량</TableCell>
                                <TableCell align="center">비고</TableCell>
                             </TableRow>
                            </TableHead>
                            <TableBody>
                            {oper != null ? 
                             <>
                            {oper.map((oper,index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" align="center">
                                {index+1}
                            </TableCell>
                            <TableCell align="center">{oper.cost}</TableCell>
                            <TableCell align="center">{oper.status}</TableCell>
                            <TableCell align="center">{oper.carPost.startLocal1},{oper.carPost.startLocal2}</TableCell>
                            <TableCell align="center">{oper.carPost.arriveLocal1},{oper.carPost.arriveLocal2}</TableCell>
                            <TableCell align="center">{oper.cars.carKind} {oper.cars.carNum}</TableCell>
                            <TableCell align="center"><Button  onClick={(e)=>{OperDetail(oper,e)}}>상세내역</Button></TableCell>
                            </TableRow>
                            ))}
                            </>
                            :''}
                            </TableBody>
                        </Table>
                    </TableContainer>
                  </Container>
                  <Modal
                    open={openModal}
                    onClose={closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h4" component="h2" align="center">
                            운행내역 상세보기
                        </Typography><br></br>
                        <Typography id="modal-modal-description" sx={{ mt : 2 }} align="center">
                                {opderDetail != null ? (
                                 <>
                                 <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                                    운행정보
                                 </Typography>
                                 <TableContainer component={Paper}>
                                    <Table sx={{ minWidth : 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">시작날짜</TableCell>
                                                <TableCell align="center">종료날짜</TableCell>
                                                <TableCell align="center">시작시간</TableCell>
                                                <TableCell align="center">운행금액</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center">{opderDetail.carPost.sdate}</TableCell>
                                                <TableCell align="center">{opderDetail.carPost.edate}</TableCell>
                                                <TableCell align="center">{opderDetail.carPost.stime}</TableCell>
                                                <TableCell align="center">{opderDetail.cost}원</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                 </TableContainer><br></br><br></br><br></br><br></br>
                                 <Typography id="modal-modla title" variant="h6" component="h2" align="center">
                                    게시글 정보
                                 </Typography>
                                 <TableContainer component={Paper}>
                                    <Table sx={{ minWidth : 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">게시글 번호</TableCell>
                                                <TableCell align="center">게시글 제목</TableCell>
                                                <TableCell align="center">출발지역</TableCell>
                                                <TableCell align="center">도착지역</TableCell>
                                                <TableCell align="center">비고</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center">{opderDetail.carPost.id}</TableCell>
                                                <TableCell align="center">{opderDetail.carPost.title}</TableCell>
                                                <TableCell align="center">{opderDetail.carPost.startLocal1},{opderDetail.carPost.startLocal2}</TableCell>
                                                <TableCell align="center">{opderDetail.carPost.arriveLocal1},{opderDetail.carPost.arriveLocal2}</TableCell>
                                                <TableCell algin="cneter"><Link to={{ pathname : `/carpool/${opderDetail.carPost.id}` }}>게시글로 이동</Link></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                 </TableContainer><br></br><br></br><br></br><br></br>
                                 <Typography id="modal-modla title" variant="h6" component="h2" align="center">
                                    운행차량 정보
                                 </Typography>
                                 <TableContainer component={Paper}>
                                    <Table sx={{ minWidth : 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">차량 종류</TableCell>
                                                <TableCell align="center">차량 번호</TableCell>
                                                <TableCell align="center">차량 사진</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center">{opderDetail.cars.carKind}</TableCell>
                                                <TableCell align="center">{opderDetail.cars.carNum}</TableCell>
                                                <TableCell align="center"><img src={`${process.env.REACT_APP_SPRING_API}/api/image/${opderDetail.cars.photoName}`} style={{width : "70px",height:"50px"}}></img><br></br></TableCell>
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
        </ThemeProvider>
    )
}

export default Opertaion;