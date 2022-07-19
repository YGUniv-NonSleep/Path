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

var geocoder = new kakao.maps.services.Geocoder();
    var map, markerInfo;
    var marker_s, marker_e,marker,waypoint;
    var drawInfoArr = [];
    var resultInfoArr = [];
    var drawInfoArr2 = [];
    var chktraffic = [];
    var resultdrawArr = [];
    var resultMarkerArr = [];
    var trafficInfochk = "Y";
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
function Confirmation(){
    let state = useSelector((state)=>state);
    const [count, setAlarmCount] = useState(null);
    const [open,setOpen] = useState(false);
    const [conts,setConts] = useState(null);
    const handleClose = () => setOpen(false);

    
useEffect(()=>{
    if(conts !=null){
        Map()
    }
},[conts])

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


const Accept = (e) => {
    e.preventDefault();

    const data = {
        postId : conts.id,
        approval : document.getElementsByName("accept")[0].value
    }
    console.log(data)
    axios.patch(process.env.REACT_APP_SPRING_API + '/api/request/approval',data)
    .then((res)=>{
        console.log(res)
        alert("승인되었습니다.");
        window.location = '/member/Confirmation';
    })
    .catch((err)=>{
        console.log(err)
    })
}


const Reject = (e) => {
    e.preventDefault();
    
    const data = {
        postId : conts.id,
        approval : document.getElementsByName("reject")[0].value
    }
    console.log(data);
    axios.patch(process.env.REACT_APP_SPRING_API + '/api/request/approval',data)
    .then((res)=>{
        console.log(res)
        alert("거절되었습니다.");
        window.location = '/member/Confirmation';
    })
    .catch((err)=>{
        console.log(err)
    })
}

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

const Map = () => {
    map = new Tmapv2.Map("map_detail",{
        center : new Tmapv2.LatLng(conts.carPost.startLatitude,conts.carPost.startLongitude),
        width : "750px",
        height : "550px",
        zoom : 8,
        zoomControl : true,
        scrollwheel : true,
    });
    marker_s = new Tmapv2.Marker({
        position : new Tmapv2.LatLng(conts.carPost.startLatitude,conts.carPost.startLongitude),
        icon : "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png",
        iconSize : new Tmapv2.Size(24,38),
        map: map
    });
    marker_e = new Tmapv2.Marker({
        position : new Tmapv2.LatLng(conts.carPost.arriveLatitude,conts.carPost.arriveLongitude),
        icon :  "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png",
        iconSize : new Tmapv2.Size(24,38),
        map : map
    })
    marker = new Tmapv2.Marker({
        position : new Tmapv2.LatLng(conts.startLatitude,conts.startLongitude),
        icon : "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_1.png",
        iconSize : new Tmapv2.Size(24,38),
        map:map
    });
    resultMarkerArr.push(marker);
    marker = new Tmapv2.Marker({
        position : new Tmapv2.LatLng(conts.arriveLatitude,conts.arriveLongitude),
        icon : "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_b_m_2.png",
        iconSize : new Tmapv2.Size(24,38),
        map : map
    });
    resultMarkerArr.push(marker);




    var headers = {};
    headers["appKey"] = "l7xx76f78a49e0724d6b999d58cb6a37677a";
    var params = {
      startName: "출발",
      startX: conts.carPost.startLongitude,
      startY: conts.carPost.startLatitude,
      startTime: "202206301314",
      endName: "도착",
      endX: conts.carPost.arriveLongitude,
      endY: conts.carPost.arriveLatitude,
     viaPoints: [
        {
          "viaPointId": "test01",
          "viaPointName": "test01",
          "viaX": conts.startLongitude,
          "viaY": conts.startLatitude,
        },
        {
            "viaPointId": "test02",
            "viaPointName": "test02",
            "viaX": conts.arriveLongitude,
            "viaY": conts.arriveLatitude,
          },
    ],
    reqCoordType: "WGS84GEO",
    resCoordType : "EPSG3857",
    searchOption : "0",
    }
    var routeLayer;
    axios.post("https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1&format=json",params,
    {
        headers :{
            appKey :"l7xx76f78a49e0724d6b999d58cb6a37677a",
        },
    }
    ).then((res)=>{
        console.log(res);
        var resultData = res.data.properties;
        var resultFeatures = res.data.features;
        if(resultInfoArr.length>0){
            for(var i in resultInfoArr){
                resultInfoArr[i].setMap(null);
            }
            resultInfoArr=[];
        }
        
        for(var i in resultFeatures) {
            var geometry = resultFeatures[i].geometry;
            var properties = resultFeatures[i].properties;
            var polyline_;
            drawInfoArr = [];
            
            if(geometry.type == "LineString") {
                for(var j in geometry.coordinates){
                    // 경로들의 결과값(구간)들을 포인트 객체로 변환 
                    var latlng = new Tmapv2.Point(geometry.coordinates[j][0], geometry.coordinates[j][1]);
                    // 포인트 객체를 받아 좌표값으로 변환
                    var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                    // 포인트객체의 정보로 좌표값 변환 객체로 저장
                    var convertChange = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
                    
                    drawInfoArr.push(convertChange);
                }

                polyline_ = new Tmapv2.Polyline({
                    path : drawInfoArr,
                    strokeColor : "#FF0000",
                    strokeWeight: 6,
                    map : map
                });
                resultInfoArr.push(polyline_);
                
            }else{
                var markerImg = "";
                var size = "";			//아이콘 크기 설정합니다.
                
                if(properties.pointType == "S"){	//출발지 마커
                    markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_s.png";	
                    size = new Tmapv2.Size(24, 38);
                }else if(properties.pointType == "E"){	//도착지 마커
                    markerImg = "http://tmapapi.sktelecom.com/upload/tmap/marker/pin_r_m_e.png";
                    size = new Tmapv2.Size(24, 38);
                }else{	//각 포인트 마커
                    markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                    size = new Tmapv2.Size(8, 8);
                }
                
                // 경로들의 결과값들을 포인트 객체로 변환 
                var latlon = new Tmapv2.Point(geometry.coordinates[0], geometry.coordinates[1]);
                // 포인트 객체를 받아 좌표값으로 다시 변환
                var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);
                  
                console.log(convertPoint._lat, convertPoint._lng);
                 var marker_p = new Tmapv2.Marker({
                      position: new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng),
                      icon : markerImg,
                      iconSize : size,
                      map:map
                  });

                  console.log(convertPoint._lat)
                  console.log(convertPoint._lng)
                  
                  resultMarkerArr.push(marker_p);
            }
        }
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
                      <Typography id="modal-modal-description" sx={{ mt : 2}} align="center">
                          {conts !=null ? 
                          <>
                             {conts.carPost.title}<br></br>
                             {conts.content}<br></br>
                             {conts.passenger}명<br></br>
                             {conts.price}원<br></br>
                             {conts.member.loginId}, {conts.member.gender}
                             <div id="map_detail"></div>
                            {conts.approval == "accept" ? (
                            <>
                                <Typography>승인된 신청서입니다.</Typography>
                            </>):(
                            <>  
                            {conts.approval =="reject" ? (
                            <>
                                <Typography>거절된 신청서입니다.</Typography>
                            </>)
                            :(
                            <>
                             <Button onClick={Accept}  name="accept" value="accept">승인</Button><Button onClick={Reject}  name="reject" value="reject">거절</Button>
                            </>
                            )}
                            </>)}
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