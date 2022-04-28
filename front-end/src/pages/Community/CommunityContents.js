import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes, { func } from "prop-types";
import { useEffect, useState } from "react";
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

const CommunityContents = () => {
  let navigate = useNavigate();
  const { postId } = useParams();  // 파라미터
  // console.log(postId);

  const [content, setContent] = useState(null);

  // 주소 파라미터 받을때 수행할 hook
  useEffect(() => { 
    axios.get(process.env.REACT_APP_SPRING_API + `/api/post/view/${postId}`)
    .then((res)=>{
      console.log(res.data.body);
      setContent(res.data.body)
    })
    .catch((err)=>{console.log(err)})
  }, [])
  return (
    <CommuCon>
      <CommuSubCon>
        <h2 align="center">게시글 상세정보</h2>
        <div className="post-view-wrapper">
          {/* {content.content} */}
          {content ? (
            <>
              <div className="post-view-row">
                <label>게시글 번호 : </label>
                <label>{content.id}</label>
              </div>
              <div className="post-view-row">
                <label>제목 : </label>
                <label>{content.title}</label>
              </div>
              <div className="post-view-row">
                <label>작성자 : </label>
                <label>{content.member.name}</label>
              </div>
              <div className="post-view-row">
                <label>조회수 : </label>
                <label>{content.view}</label>
              </div>
              <div className="post-view-row">
                <label>작성일 : </label>
                <label>{content.writeDate}</label>
              </div>
              <div className="post-view-row">
                <label>타입 : </label>
                <label>{content.type}</label>
              </div>
              <div className="post-view-row">
                <label>내용 : </label>
                <div>{content.content}</div><br></br>
              </div>
              <h2>답글</h2>
            </>
          ) : (
            "해당 게시글을 찾을 수 없습니다."
          )}
          <button
            className="post-view-go-list-btn"
            onClick={() => navigate(-1)}
          >
            목록으로 돌아가기
          </button>
          </div>
      </CommuSubCon>
    </CommuCon>
  );
};
export default CommunityContents;
