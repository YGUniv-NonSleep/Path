import PropTypes from "prop-types";
import styled from "styled-components";

const CommuCon = styled.div`
  width: 390px;
  height: 100%;
`;
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

function CommunityPresenter(props) {
  console.log(props.board);
  return (
    <div className="Community">
      <CommuCon>
        <CommuSubCon>
          {props.loading ? <p>커뮤니티 화면 나왔다</p> : <h2>로드 중...</h2>}
          <div>여기다가 쓰면 됨</div>
          <form
            id="myForm"
            name="myForm"
            onSubmit={props.onSubmit}
            encType="multipart/form-data"
          >
            <input type="text" placeholder="???" name="title" />
            <input type="text" placeholder="???" name="content" />
            <input type="text" placeholder="type" name="type" />
            <input type="file" name="userfile" multiple="multiple" />
            <button type="submit">submit</button>
          </form>
        </CommuSubCon>
        <CommuSubCon>
          {props.loading ? <p>커뮤니티 화면 나왔다</p> : <h2>로드 중...</h2>}
          <table>
            <tr>
              <CommuBoard>게시글번호</CommuBoard>
              <CommuBoard>제목</CommuBoard>
              <CommuBoard>작성자</CommuBoard>
              <CommuBoard>조회수</CommuBoard>
              <CommuBoard>날짜</CommuBoard>
              <CommuBoard>게시글타입</CommuBoard>
            </tr>
            { props.board == null ? <tr><NullCommuBoard colSpan={6}>아직 없음.</NullCommuBoard></tr>
              : (
                props.board.body.map((post, index) => {
                  return (
                    <tr key={index}>
                      <CommuBoard2>{post.id}</CommuBoard2>
                      <CommuBoard2>{post.title}</CommuBoard2>
                      <CommuBoard2>{post.member.id}</CommuBoard2>
                      <CommuBoard2>{post.view}</CommuBoard2>
                      <CommuBoard2>{post.writeDate}</CommuBoard2>
                      <CommuBoard2>{post.type}</CommuBoard2>
                    </tr>
                  );
                })
              )
            }
          </table>
        </CommuSubCon>
      </CommuCon>
    </div>
  );
} //create
//update == created인 내용을 update하는거 ,,, created된 내용을 받아와야한다는거잖아
//update할려면 조회가 먼저
//
CommunityPresenter.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default CommunityPresenter;
