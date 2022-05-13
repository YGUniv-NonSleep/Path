import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import useLoading from "../../hooks/useLoading";
import useCarPoolContents from "./hooks/useCarPoolContents";

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

const CarPoolContents = () => {
  const { loading } = useLoading();
  const { 
    effectState, tDistance, tTime, taxiFare, showPtag, showModal, 
    isStartOpen, isArrivedOpen, startAddr, arriveAddr, 
    Close, PatchModal, Patch, FindWay, 
    openStartCode, handleComplete, openArriveCode, handleComplete2, 
  } = useCarPoolContents();

  return (
    <CommuCon>
      <CommuSubCon>
        <h2 align="center">게시글 상세정보</h2>
        {effectState ? (
          <>
            <div className="post-view-row">
              <label>게시글 번호 : </label>
              <label name="id">{effectState.id}</label>
            </div>
            <button>삭제하기</button>
            <button onClick={PatchModal}>수정하기</button>
            <div className="post-view-row">
              <label>제목 : </label>
              <label>{effectState.title}</label>
            </div>
            <div className="post-view-row">
              <label>내용 : </label>
              <div>{effectState.content}</div>
            </div>
            <div className="post-view-row">
              <label>탑승인원 : </label>
              <div>{effectState.recruit}</div>
            </div>
            <div className="post-view-row">
              <label>지역 : </label>
              <div>{effectState.local}</div>
            </div>
            <div className="post-view-row">
              <label>시작날짜 : </label>
              <div>{effectState.sdate}</div>
            </div>
            <div className="post-view-row">
              <label>종료날짜 : </label>
              <div>{effectState.edate}</div>
            </div>
            <div className="post-view-row">
              <label>출발시간 : </label>
              <div>{effectState.stime.substring(0, 5)}</div>
            </div>
            <div className="post-view-row">
              <label>차량정보 : </label>
              <br></br>
              <label>{effectState.cars.carNum}</label>
              <br></br>
              <label>{effectState.cars.carKind}</label>
              <br></br>
            </div>
            <div className="post-view-row">
              <label>회원정보 : </label>
              <br></br>
              <label>{effectState.member.loginId}</label>
              <br></br>
              <label>{effectState.member.gender}</label>
              <br></br>
            </div>
            <br></br>
            <br></br>

            <div>
              <div>
                <button onClick={FindWay}>경로 및 정보보기</button>
              </div>
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
            </div>
          </>
        ) : (
          ""
        )}
        {showModal ? (
          <Background>
            <ModalContainer>
              <MousePointer
                style={{ color: "white", float: "right" }}
                onClick={Close}
              >
                X
              </MousePointer>
              <div style={{ color: "white", float: "center" }}>수정하기</div>
              <div style={{ color: "white" }}>
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
                  />
                  <br></br>
                  제목 :{" "}
                  <input
                    type="text"
                    name="title"
                    defaultValue={effectState.title}
                  />
                  <br></br>
                  내용 :{" "}
                  <input
                    type="text"
                    name="content"
                    defaultValue={effectState.content}
                  />
                  <br></br>
                  탑승인원 :
                  <input
                    type="number"
                    name="recruit"
                    defaultValue={effectState.recruit}
                  />
                  <br></br>
                  지역 :{" "}
                  <input
                    type="text"
                    name="local"
                    defaultValue={effectState.local}
                  />
                  <br></br>
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
                  <button type="button" onClick={openStartCode}>
                    출발지 수정
                  </button>
                  <p>{startAddr}</p>
                  <button type="button" onClick={openArriveCode}>
                    도착지 수정
                  </button>
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
                  <input type="file" name="userfile" multiple="multiple" />
                  <button type="submit">수정하기</button>
                </form>
              </div>
            </ModalContainer>
          </Background>
        ) : (
          ""
        )}
      </CommuSubCon>
    </CommuCon>
  );
};

CarPoolContents.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CarPoolContents;