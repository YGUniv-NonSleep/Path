import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from "../../hooks/useLoading";
import useCarPoolPost from "./hooks/useCarPoolPost";

const CommuSubCon = styled.div`
  margin-left: 130px;
`;

const CommuBoard = styled.th`
  border: 1px solid black;
`;

const CommuBoard2 = styled.td`
  border: 1px solid black;
`;

const NullCommuBoard = styled.td`
  border: 1px solid black;
  text-align: center;
`;

function CarPoolMain() {
  const { loading } = useLoading();
  const {
    viewset, getView
  } = useCarPoolPost();

  return (
    <div className="CarPool">
      <CommuSubCon>
        <table>
          <tr>
            <CommuBoard>게시글번호</CommuBoard>
            <CommuBoard>제목</CommuBoard>
            <CommuBoard>지역</CommuBoard>
            <CommuBoard>탑승인원</CommuBoard>
          </tr>
          {(viewset == null) | (viewset == "") ? (
            <tr>
              <NullCommuBoard colSpan={6}>게시글 없음</NullCommuBoard>
            </tr>
          ) : (
            viewset.map((result) => {
              return (
                <tr key={result.id}>
                  <CommuBoard2>{result.id}</CommuBoard2>
                  <CommuBoard2>
                    <Link to={{ pathname: `/carpool/${result.id}` }}>
                      {result.title}
                    </Link>
                  </CommuBoard2>
                  <CommuBoard2>{result.local}</CommuBoard2>
                  <CommuBoard2>{result.recruit}</CommuBoard2>
                </tr>
              );
            })
          )}
        </table>
        <button>
          <Link to={{ pathname: "/carpool/add" }}>등록하기</Link>
        </button>
      </CommuSubCon>
    </div>
  );
}

CarPoolMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CarPoolMain;