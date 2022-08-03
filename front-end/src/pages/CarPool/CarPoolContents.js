
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import useLoading from "../../hooks/useLoading";
import useCarPoolContents from "./hooks/useCarPoolContents";
import useCarPoolRequest from "./hooks/useCarPoolRequest";
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
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CommuCon = styled.div`
  width: 390px;
  height: 100%;
`;

const CommuSubCon = styled.div`
  margin-left: 130px;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 80%;
  width: 50rem;
  height: 80%;
  padding: 16px;
  background: rgb(25, 31, 44);
  border-radius: 10px;
  text-align: center;
`;

const MousePointer = styled.div`
  cursor: pointer;
  :hover {
    color: white;
  }
`;

const theme = createTheme();
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
  height : 850
};

const CarPoolContents = () => {

  const { loading } = useLoading();
  const { 
    effectState, tDistance, tTime, taxiFare, showPtag, showModal, 
    isStartOpen, isArrivedOpen, startAddr, arriveAddr,request,alarmCount,requestOpen,blockRequest,
    Close, PatchModal, Patch, FindWay,requestCarpool,DeleteCarCont,requestComplete,
    openStartCode, handleComplete, openArriveCode, handleComplete2,RequestCreate,closeStartCode,RequestOpen,RequestClose
  } = useCarPoolContents();


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box 
          sx={{
            bgcolor : 'Background.paper',
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
                fontWeight={'normal'}>
                  게시글 상세보기
                  <hr></hr>
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph>
                  {effectState ? (
                    <>
                      <div align="center">
                        <span>{effectState.title}</span>
                      </div>
                      <hr></hr>
                    </>
                  ):('')}
              </Typography>
            </Container>
            <Container sx={{ py : 2}} maxWidth="md">
              {effectState ? (
                <>
                 <Box
                  display='flex'
                  >
                    <span>작성자 : {effectState.member.loginId},{effectState.member.gender}
                    <Button onClick={DeleteCarCont} style={{marginLeft:'450px'}}>삭제하기</Button>
                    <Button onClick={PatchModal} style={{marginLeft:'10px'}}>수정하기</Button>
                    </span>
                  </Box>
                  <br></br>
                  <img src={`${process.env.REACT_APP_SPRING_API}/api/image/${effectState.photoName}`} style={{width : "750px",height:"350px"}}></img><br></br>
                  {effectState.content}<br></br>
                  {effectState.recruit}<br></br>
                  {effectState.price}<br></br>
                  {effectState.startLocal1}<br></br>
                  {effectState.startLocal2}<br></br>
                  {effectState.arriveLocal1}<br></br>
                  {effectState.arriveLocal2}<br></br>
                  {effectState.sdate}<br></br>
                  {effectState.edate}<br></br>
                  {effectState.stime.substring(0, 5)}<br></br>
                  {effectState.cars.carNum}<br></br>
                  {effectState.cars.carKind}<br></br>
                  <Button onClick={FindWay}>경로 및 정보보기</Button>
                  {/* <Button onClick={requestCarpool}>신청하기</Button> */}
                  {blockRequest ? (
                   <Button>신청이 마감되었습니다.</Button>
                  ):(<Button><Link to={{pathname : `/carpool/request/${effectState.id}`}}>신청하기</Link></Button>)}
                  
                  {showPtag ? (
                    <div>
                      <p style={{ color: "#61AB25" }}>원활</p>
                      <p style={{ color: "#FFFF00" }}>복잡</p>
                      <p style={{ color: "#E87506" }}>혼잡</p>
                      <p style={{ color: "#D61125" }}>매우혼잡</p>
                      <p style={{ color: "#06050D" }}>교통정보없음</p>
                      <p style={{ color: "blue" }}>총 거리 : {tDistance} km</p>
                      <p style={{ color: "blue" }}>총 예상시간 : {tTime} 분</p>
                      <p style={{ color: "blue" }}>
                        예상 택시 요금 : {taxiFare} 원
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                <div id="map_div"></div>
                </>
              ):('')}

        {showModal ? (
          <Modal
            open={PatchModal}
            onClose={Close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Container maxWidth="xs" align="center">
            <Box sx={style}>
                <form
                  id="myForm"
                  name="myForm"
                  onSubmit={Patch}
                  encType="multipart/form-data"
                >
                  <input
                    type="text"
                    defaultValue={effectState.id}
                    name="id"
                    hidden={true}
                  /><br></br>

                  제목 :{" "}
                  <TextField
                    id="standard-multiline-flexible"
                    name="title"
                    label="제목"
                    multiline
                    maxRows={4}
                    variant="standard"
                    size="small"
                    defaultValue={effectState.title}
                  />
                  <br></br><br></br>

                  내용 :{" "}
                  <TextField
                    id="outlined-multiline-static"
                    label="내용"
                    name="content"
                    multiline
                    rows={4}
                    size="small"
                    defaultValue={effectState.content}
                  />
                  <br></br><br></br>

                  탑승인원 : {" "}
                  <TextField
                    id="standard-multiline-flexible"
                    type="number"
                    name="recruit"
                    label="탑승인원"
                    multiline
                    maxRows={4}
                    size="small"
                    defaultValue={effectState.recruit}
                  />
                  <br></br><br></br>

                  희망가격 : {" "}
                  <TextField
                    id="standard-multiline-flexible"
                    type="number"
                    name="price"
                    label="희망가격"
                    multiline
                    maxRows={4}
                    size="small"
                    defaultValue={effectState.price} />
                  <br></br><br></br>

                  출발지역 :{" "}
                  <TextField
                    id="standard-multiline-flexible"
                    name="local"
                    label="출발지역"
                    multiline
                    maxRows={4}
                    size="small"
                    defaultValue={effectState.startLocal1}
                  />
                  <br></br><br></br>

                  도착지역 :{" "}
                  <TextField
                    id="standard-multiline-flexible"
                    label="도착지역"
                    name="local"
                    multiline
                    maxRows={4}
                    size="small"
                    defaultValue={effectState.arriveLocal2}
                  />
                  <br></br><br></br>

                  시작날짜 :{" "}
                  <input
                    type="date"
                    name="sdate"
                    defaultValue={effectState.sdate}
                  ></input>
                  <br></br>
              
                  종료날짜 :{" "}
                  <input
                    type="date"
                    name="edate"
                    defaultValue={effectState.edate}
                  ></input>
                  <br></br>

                  출발시간 :{" "}
                  <input
                    type="time"
                    name="stime"
                    defaultValue={effectState.stime.substring(0, 5)}
                  ></input>
                  <br></br>

                  <Button type="button" onClick={openStartCode}>
                    출발지 수정
                  </Button>
                  <p>{startAddr}</p>

                  <Button type="button" onClick={openArriveCode}>
                    도착지 수정
                  </Button>
                  <p>{arriveAddr}</p>

                  {isStartOpen ? (
                    <DaumPostcode
                      className="post-code"
                      onComplete={handleComplete}
                    ></DaumPostcode>
                  ) : (
                    ""
                  )}
                  {isArrivedOpen ? (
                    <DaumPostcode
                      className="post-code"
                      onComplete={handleComplete2}
                    ></DaumPostcode>
                  ) : (
                    ""
                  )}
                   <Button
                    variant="contained"
                    component="label">
                    <Typography>
                      파일등록
                    </Typography>
                    <input id={"file-input"} style={{ display: 'none' }} type="file" name="userfile" multiple="multiple"  />
                    </Button>
                    <br></br><br></br>

                  <Button type="submit">수정하기</Button>
                </form>
            </Box>
            </Container>
          </Modal>
        ) : (
          ""
        )}
              
        </Container>
          </Box>
    </ThemeProvider>
  );
};

CarPoolContents.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CarPoolContents;