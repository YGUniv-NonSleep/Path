import DaumPostcode from "react-daum-postcode";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  ImportExport, KayakingOutlined, PropaneSharp,
} from "@mui/icons-material";
import useCarPoolAdd from "./hooks/useCarPoolAdd";
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {
  CssBaseline,
  Grid,
  Stack,
  Modal,
} from '@mui/material';


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
  width: 20rem;
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


function CarPoolAdd() {

  const { 
    isStartOpen, isArrivedOpen, startAddr, arriveAddr, memberCars,caropenModal,choiceCarKind,choiceCarNum,
    createCarPost, openStartCode, openArrivedCode, handleComplete, handleComplete2,findCarsModal,closeCarsModal,choiceMyCar,
    closeStartCode,closeArriveCode
  } = useCarPoolAdd();

  return (
    <React.Fragment>
      <Container maxWidth="xs" align="center">
        <Box sx={{bgcolor:'white',height:'100%'}}>
          <Typography
            component="h4"
            variant="h5"
            align="center"
            color="text.primary"
            gutterBottom
            fontWeight={'normal'}>
              게시글 등록
            </Typography><br></br><br></br>
            <form onSubmit={createCarPost} encType="multipart/form-data">
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
              
              <TextField 
                id="date"
                label="시작날짜"
                type="date"
                name="sdate"
                sx={{width:220}}
                InputLabelProps={{
                  shrink: true,
                }}
              /><br></br><br></br><br></br>

              <TextField 
                id="date"
                label="종료날짜"
                type="date"
                name="edate"
                sx={{width:220}}
                InputLabelProps={{
                  shrink: true,
                }}
              /><br></br><br></br><br></br>

              <TextField
                      id="time"
                      label="시작시간"
                      type="time"
                      name="stime"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      sx={{ width: 150 }}
                    /><br></br><br></br><br></br>

         <Button onClick={findCarsModal}>내 차 찾기</Button><br></br>
             {caropenModal ? (
               <div>
                <Modal
                  open={findCarsModal}
                  onClose={closeCarsModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Container maxWidth="xs" align="center">
                  <Box sx={style}>
                    <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                    >
                      내 차 찾기
                    </Typography>
                    {memberCars.map((cars,index)=>(
                      <span key={index} onClick={(e)=>{choiceMyCar(cars,e)}}>
                         <img src={`${process.env.REACT_APP_SPRING_API}/api/image/${cars.photoName}`} style={{width : "250px",height : "150px"}}></img><br></br>
                       <p name="carKind">{cars.carKind}</p><p>{cars.carNum}</p><br></br>
                      </span>
                    ))}
                  </Box>
                  </Container>
                </Modal>
               </div>
             ) : ("") 
             }
             <p>{choiceCarKind}</p>
             <p>{choiceCarNum}</p> 
             <Button type="button" onClick={openStartCode}>출발지 검색</Button>
             <p>{startAddr}</p>  
             <Button type="button" onClick={openArrivedCode}>도착지 검색</Button>
             <p>{arriveAddr}</p>
             <Button
              variant="contained"
              component="label">
            <Typography>
              파일등록
            </Typography>
            <input id={"file-input"} style={{ display: 'none' }} type="file" name="userfile" multiple="multiple"  />
            </Button>
            <br></br><br></br><br></br>
            <Button type="submit">작성하기</Button>
        </form>
        </Box>
      </Container>
             {isStartOpen ? (
              <Modal
              open={openStartCode}
              onClose={closeStartCode}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
               <Container maxWidth="xs" align="center">
                    <DaumPostcode className="post-code" onComplete={handleComplete} />
                </Container> 
              </Modal>
             ) : ('')}
             {isArrivedOpen ? (
              <Modal
              open={openArrivedCode}
              onClose={closeArriveCode}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
                <Container maxWidth="xs" align="center">
                    <DaumPostcode className="post-code" onComplete={handleComplete2} />
                </Container>
              </Modal>
             ) : ('')}
    </React.Fragment>
  );
}

export default CarPoolAdd;