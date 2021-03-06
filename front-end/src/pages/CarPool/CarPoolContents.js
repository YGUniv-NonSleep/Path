
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
    isStartOpen, isArrivedOpen, startAddr, arriveAddr,request,alarmCount,requestOpen,
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
                  ????????? ????????????
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
                    <span>????????? : {effectState.member.loginId},{effectState.member.gender}
                    <Button onClick={DeleteCarCont} style={{marginLeft:'450px'}}>????????????</Button>
                    <Button onClick={PatchModal} style={{marginLeft:'10px'}}>????????????</Button>
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
                  <Button onClick={FindWay}>?????? ??? ????????????</Button>
                  {/* <Button onClick={requestCarpool}>????????????</Button> */}
                  <Button><Link to={{pathname : `/carpool/request/${effectState.id}`}}>????????????</Link></Button>
                  {showPtag ? (
                    <div>
                      <p style={{ color: "#61AB25" }}>??????</p>
                      <p style={{ color: "#FFFF00" }}>??????</p>
                      <p style={{ color: "#E87506" }}>??????</p>
                      <p style={{ color: "#D61125" }}>????????????</p>
                      <p style={{ color: "#06050D" }}>??????????????????</p>
                      <p style={{ color: "blue" }}>??? ?????? : {tDistance} km</p>
                      <p style={{ color: "blue" }}>??? ???????????? : {tTime} ???</p>
                      <p style={{ color: "blue" }}>
                        ?????? ?????? ?????? : {taxiFare} ???
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                <div id="map_div"></div>
                </>
              ):('')}
 
    {/* {request ? (
              <>
                    <Background>
                      <ModalContainer>
                        <MousePointer
                          style={{ color: "white", float: "right" }}
                          onClick={Close}>
                          X
                        </MousePointer>
                        <div style={{ color: "white", float: "center" }}>????????????</div>
                        <div style={{ color: "white", float : "center" }}><br></br>
                          ?????? ?????? <br></br> 
                          <input type="number" name="price" /><br></br>
                          ?????? ?????? <br></br> 
                          <input type="number" name="passenger" /><br></br>
                          ?????? ??????  <br></br>
                          <textarea  style={{width : "300px",height : "200px"}} name="content"/><br></br>
                          <button type="button" onClick={RequestOpen}>????????? ??????</button>
                          <button>????????? ??????</button>
                          <div  style={{ float : "center" }} id="request_map"></div>
                          <Button onClick={RequestCreate}>????????????</Button>
                        </div>
                      </ModalContainer>
                    </Background>   
                    
              </>
                ) : ("")}

                {requestOpen ? (
                    <DaumPostcode className="post-code" onComplete={requestComplete}/>
                    ) :('')}        */}

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

                  ?????? :{" "}
                  <TextField
                    id="standard-multiline-flexible"
                    name="title"
                    label="??????"
                    multiline
                    maxRows={4}
                    variant="standard"
                    size="small"
                    defaultValue={effectState.title}
                  />
                  <br></br><br></br>

                  ?????? :{" "}
                  <TextField
                    id="outlined-multiline-static"
                    label="??????"
                    name="content"
                    multiline
                    rows={4}
                    size="small"
                    defaultValue={effectState.content}
                  />
                  <br></br><br></br>

                  ???????????? : {" "}
                  <TextField
                    id="standard-multiline-flexible"
                    type="number"
                    name="recruit"
                    label="????????????"
                    multiline
                    maxRows={4}
                    size="small"
                    defaultValue={effectState.recruit}
                  />
                  <br></br><br></br>

                  ???????????? : {" "}
                  <TextField
                    id="standard-multiline-flexible"
                    type="number"
                    name="price"
                    label="????????????"
                    multiline
                    maxRows={4}
                    size="small"
                    defaultValue={effectState.price} />
                  <br></br><br></br>

                  ???????????? :{" "}
                  <TextField
                    id="standard-multiline-flexible"
                    name="local"
                    label="????????????"
                    multiline
                    maxRows={4}
                    size="small"
                    defaultValue={effectState.startLocal1}
                  />
                  <br></br><br></br>

                  ???????????? :{" "}
                  <TextField
                    id="standard-multiline-flexible"
                    label="????????????"
                    name="local"
                    multiline
                    maxRows={4}
                    size="small"
                    defaultValue={effectState.arriveLocal2}
                  />
                  <br></br><br></br>

                  ???????????? :{" "}
                  <input
                    type="date"
                    name="sdate"
                    defaultValue={effectState.sdate}
                  ></input>
                  <br></br>
              
                  ???????????? :{" "}
                  <input
                    type="date"
                    name="edate"
                    defaultValue={effectState.edate}
                  ></input>
                  <br></br>

                  ???????????? :{" "}
                  <input
                    type="time"
                    name="stime"
                    defaultValue={effectState.stime.substring(0, 5)}
                  ></input>
                  <br></br>

                  <Button type="button" onClick={openStartCode}>
                    ????????? ??????
                  </Button>
                  <p>{startAddr}</p>

                  <Button type="button" onClick={openArriveCode}>
                    ????????? ??????
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
                      ????????????
                    </Typography>
                    <input id={"file-input"} style={{ display: 'none' }} type="file" name="userfile" multiple="multiple"  />
                    </Button>
                    <br></br><br></br>

                  <Button type="submit">????????????</Button>
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