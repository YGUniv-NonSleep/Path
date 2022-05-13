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

function CarPoolAdd() {
  const { 
    isStartOpen, isArrivedOpen, startAddr, arriveAddr, 
    createCarPost, openStartCode, openArrivedCode, handleComplete, handleComplete2
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