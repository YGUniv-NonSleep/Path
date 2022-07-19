import * as React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
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
    width: 800,
    height : 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const theme = createTheme();

function SendingConfirm(){
    let state = useSelector((state)=>state);
    const [send, setSend] = useState(null);
    const [alertState, setAlert] = useState(false);
    const [arraySend, setArraySend] = useState(null);
    const [operstate, setOperation] = useState(false);
    const [operdata, setOperDate] = useState(null);
    const nowTime = moment().format('YYYY-MM-DD-HH:mm:00');
    console.log(nowTime)
    
     

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SPRING_API + `/api/request/sending/${state.user.id}`)
        .then((res)=>{
            console.log(res.data.body)
            setSend(res.data.body);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[state])

    const checkRequest = (count,e) =>{
        e.preventDefault();
        const data = {
            postId : count.id,
            state : document.getElementsByName("accept")[0].value
        }
        console.log(data);
        axios.patch(process.env.REACT_APP_SPRING_API + '/api/request/checkRequest',data)
        .then((res)=>{
            console.log(res);
            TossPay(count);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const TossPay = (data) =>{
        console.log(data)
        if(data.approval == "accept"){
            for(var i = 0; i < 1; i++){
                var key = 1;
                key = key + 1;
              }   
              var clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
              var tossPayments = TossPayments(clientKey)
              tossPayments.requestPayment('카드',{
                amount : data.price,
                orderId : 'kxx4ZQqj922aHikc2dyct' + key,
                orderName : data.id,
                customerName : state.loginId,
                successUrl : 'https://localhost:3001/member/sendingConfirm',
                failUrl: 'http://localhost:8080/fail',
              })
        }

      }

    useEffect(()=>{
        if(send !=null){
            // console.log(send.carPost.sdate + send.carPost.stime);
            for(var i=0; i < send.length; i++){
                console.log(send[i].carPost.sdate + "-" + send[i].carPost.stime)
                
            if(nowTime == send[i].carPost.sdate + "-" + send[i].carPost.stime && send[i].approval =="accept"){
                console.log("같음")
                console.log(send[i])
                setArraySend(send[i])
                setAlert(true);
            }
            }
        }
     
    },[send])

    useEffect(()=>{
        if(operstate ==true){
            axios.get(process.env.REACT_APP_SPRING_API + `/api/operation/list/${arraySend.carPost.id}`)
            .then((res)=>{
                console.log(res.data.body);
                setOperDate(res.data.body);
                const oId = res.data.body.operationId
                return oId;
            })
            .then(async (oId)=>{
                const result = await BoardingDetail(oId);
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    },[operstate])

    const BoardingCheck = (e) =>{
        e.preventDefault();
        setAlert(false)  
        const data = {
            member : {
                id : arraySend.carPost.member.id
            },
            cost : arraySend.price,
            status : "success",
            carPost : {
                id : arraySend.carPost.id
            }, 
            cars : {
                id : arraySend.carPost.cars.id
            }         
        }
        console.log(data);
        axios.post(process.env.REACT_APP_SPRING_API + '/api/operation',data)
        .then((res)=>{
            console.log(res)
            setOperation(true);

        })
        .catch((err)=>{
            console.log(err)
        })
    } 
    

    const BoardingDetail = async(ndata) =>{
            const data = {
                operationDetail :{
                    operationId : ndata
                },
                carPostRequest : {
                    id : arraySend.id
                },
                cost : arraySend.price,
                daccount : arraySend.carPost.member.account,
                rname : arraySend.carPost.member.name,
                status : "True",
                sname : arraySend.member.name,
                waccount : arraySend.member.account,
                tradeNum : moment().format('YYYY-MM-DD-HH:mm:ss:SSS')
        }    
        console.log(data);
       await axios.post(process.env.REACT_APP_SPRING_API + "/api/boarding",data)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })     
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
            {alertState ? (
                <>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert 
                    action=
                    {
                        <Button color="inherit" size="small" onClick={BoardingCheck}>탑승</Button>
                        
                    }
                    sx={{width:'50%', marginLeft:"500px"}} severity="info">
                        <AlertTitle>탑승 가능 알림</AlertTitle>
                        탑승하실 시 탑승 버튼을 눌러주세요.
                    </Alert>
                    </Stack>
                </>
                ):('')}
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
                         내 신청내역
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
                            <TableCell align="right">게시글작성자</TableCell>
                            <TableCell align="right">승인여부</TableCell>
                            <TableCell align="center">비고</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {send != null ? 
                             <>
                            {send.map((count) => (
                            <TableRow
                            key={count.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row" name="id">
                                {count.id}
                            </TableCell>
                            <TableCell align="right">{count.carPost.startLocal1},{count.carPost.startLocal2}</TableCell>
                            <TableCell align="right">{count.carPost.arriveLocal1},{count.carPost.arriveLocal2}</TableCell>
                            <TableCell align="right">{count.carPost.price}원</TableCell>
                            <TableCell align="right">{count.carPost.member.loginId}</TableCell>
                            <TableCell align="right">{count.approval}</TableCell>
                            {count.approval !=null ?(
                                 <TableCell align="right"><Button onClick={(e)=>checkRequest(count,e)} name="accept" value="accept">확인</Button></TableCell>
                            ):('')}
                            {/* <TableCell align="center"><Button  onClick={(e)=>{handleOpen(count,e)}}>상세내역</Button></TableCell> */}
                            </TableRow>
                            ))}
                            </>
                            :''}
                        
                        </TableBody>
                    </Table>
                    </TableContainer>
                 </Container>
                </Box>
            </main>
        </ThemeProvider>
    )
}

export default SendingConfirm;