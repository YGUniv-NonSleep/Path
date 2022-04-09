import axios from "axios";
import { useParams } from "react-router-dom";
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

const CommunityContents = () => {
  const { postId } = useParams();
  console.log(postId)

  return (
    <CommuCon>
      <CommuSubCon>
        <h2>ㅎㅇ{postId}</h2>
      </CommuSubCon>
    </CommuCon>
  );
};
//     return(
//         <>
//             <h2 align="center">게시글 상세정보</h2>
//             <div className="post-view-wrapper">
//                 {/* {
//                     data ? (
//                         <>
//                            <div className="post-view-row">
//                                 <label>게시글 번호</label>
//                                 <label>{no.id}</label>
//                             </div>
//                             <div className="post-view-row">
//                                 <label>제목</label>
//                                 <label>{data.title}</label>
//                             </div>
//                             <div className="post-view-row">
//                                 <label>작성자</label>
//                                 <label>{data.member.id}</label>
//                             </div>
//                             <div className="post-view-row">
//                                 <label>조회수</label>
//                                 <label>{data.view}</label>
//                             </div>
//                             <div className="post-view-row">
//                                 <label>작성일</label>
//                                 <label>{data.writeDate}</label>
//                             </div>
//                             <div className="post-view-row">
//                                 <label>타입</label>
//                                 <label>{data.type}</label>
//                             </div>
//                             <div className="post-view-row">
//                                 <label>내용</label>
//                                 <div>
//                                  {
//                                      data.content
//                                  }
//                                 </div>
//                             </div>
//                         </>
//                     ): '해당 게시글을 찾을 수 없습니다.'
//                 }
//                 <button className="post-view-go-list-btn" onClick={()=>history.goBack()}>목록으로 돌아가기</button> */}
//             </div>
//         </>
//     );
export default CommunityContents;
