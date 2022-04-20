import axios from "axios";
import { useEffect, useState } from "react";
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

function CommunityMain() {
  const [loading, setLoading] = useState(false);
  const [formInfo, setFormInfo] = useState(null);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    setLoading((current) => !current);
  }, []);

  function commuSubmit(e) {
    e.preventDefault();

    var data = {
      title: e.target.title.value,
      content: e.target.content.value,
      type: e.target.type.value,
      member: {
        id: 1,
      },
    };

    var formData = new FormData();
    formData.append("userfile", e.target.userfile.files[0]);
    formData.append(
      "key",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    axios
      .post(process.env.REACT_APP_SPRING_API + "/api/post/create", formData, {
        //withCredentials: true,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        // console.log(res);
        console.log(res.data.body);
        setFormInfo(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log(formInfo);
    axios
      .get(process.env.REACT_APP_SPRING_API + "/api/post/view")
      .then((response) => {
        // console.log(response.data);
        setBoard(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [formInfo]);

  return (
    <div className="Community">
      <CommuCon>
        <CommuSubCon>
          {loading ? <p>커뮤니티 화면 나왔다</p> : <h2>로드 중...</h2>}
          <div>여기다가 쓰면 됨</div>
          <form
            id="myForm"
            name="myForm"
            onSubmit={commuSubmit}
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
          {loading ? <p>커뮤니티 화면 나왔다</p> : <h2>로드 중...</h2>}
          <table>
            <tr>
              <CommuBoard>게시글번호</CommuBoard>
              <CommuBoard>제목</CommuBoard>
              <CommuBoard>작성자</CommuBoard>
              <CommuBoard>조회수</CommuBoard>
              <CommuBoard>날짜</CommuBoard>
              <CommuBoard>게시글타입</CommuBoard>
            </tr>
            {board == null || board == "" ? (
              <tr>
                <NullCommuBoard colSpan={6}>아직 없음.</NullCommuBoard>
              </tr>
            ) : (
              board.body.map((post, index) => {
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
            )}
          </table>
        </CommuSubCon>
      </CommuCon>
    </div>
  );
}

CommunityMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CommunityMain;
