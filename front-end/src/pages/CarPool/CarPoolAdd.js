import DaumPostcode from "react-daum-postcode";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  ImportExport, KayakingOutlined, PropaneSharp,
} from "@mui/icons-material";
import useCarPoolAdd from "./hooks/useCarPoolAdd";



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



function CarPoolAdd() {
  const { 
    isStartOpen, isArrivedOpen, startAddr, arriveAddr, memberCars,caropenModal,choiceCarKind,choiceCarNum,
    createCarPost, openStartCode, openArrivedCode, handleComplete, handleComplete2,findCarsModal,closeCarsModal,choiceMyCar
  } = useCarPoolAdd();

  return (
    <CommuCon>
        <CommuSubCon>
        <form onSubmit={createCarPost} encType="multipart/form-data">
            <input type="text" placeholder="제목을 입력하세요" name="title" />
            <input type="text" placeholder="내용을 입력하세요" name="content" /><br></br>
            <input type="text" placeholder="탑승인원을 입력하세요" name="recruit" /><br></br>
            시작날짜 : <input type="date" name="sdate" /><br></br>
            종료날짜 : <input type="date" name="edate" /><br></br>
            출발시간 : <input type="time" name="stime" /><br></br>
            <button onClick={findCarsModal}>내 차 찾기</button><br></br>
            {caropenModal ? (
              <div>
               <Background>
                 <ModalContainer>
                  <MousePointer
                   style={{ color: "white", float: "right" }}
                    onClick={closeCarsModal}
                   >
                   X
                  </MousePointer>
                  <div style={{ color: "white", float: "center" }}>내 차 찾기</div>
                  <div style={{ color : "white"}}>
                  {memberCars.map((cars,index)=>(
                    <span key={index} onClick={(e)=>{choiceMyCar(cars,e)}}>
                      <img src={`${process.env.REACT_APP_SPRING_API}/api/image/${cars.photoName}`} style={{width : "250px",height : "150px"}}></img><br></br>
                      <p name="carKind">{cars.carKind}</p><p>{cars.carNum}</p><br></br>
                    </span>
                  ))}
                  </div>
                 </ModalContainer>
               </Background>
              </div>
            ) : ("") 
            }
            <p>{choiceCarKind}</p>
            <p>{choiceCarNum}</p> 
            <button type="button" onClick={openStartCode}>출발지 검색</button>
            <p>{startAddr}</p>
            <button type="button" onClick={openArrivedCode}>도착지 검색</button>
            <p>{arriveAddr}</p>
            <input type="file" name="userfile" multiple="multiple" />
            <button type="submit">작성하기</button>
        </form>
        <div id="popUpDom">
            {isStartOpen ? (
            <div>
                <DaumPostcode className="post-code" onComplete={handleComplete} />
            </div>
            ) : (
            ""
            )}
            {isArrivedOpen ? (
            <div>
                <DaumPostcode className="post-code" onComplete={handleComplete2} />
            </div>
            ) : (
            ""
            )}
        </div>
        </CommuSubCon>
    </CommuCon>
  );
}

export default CarPoolAdd;