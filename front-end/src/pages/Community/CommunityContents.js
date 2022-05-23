import styled from "styled-components";
import { Link } from "react-router-dom";
import useBoardContents from "./hooks/useBoardContents";
import { useState } from "react";

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

const CommunityContents = () => {
 
  const {
    content, del, repDel, update,reply, 
    subAdd, subUpdate, userRole, buttonReact,token,
    username
  } = useBoardContents();
  const {
    navigate, getPostId, PostDelete, commuSubmit, 
    RepUpdateState, RepCreate, RepUpdate, RepDelete,PatchPostContents
  } = useBoardContents();

  const [postUpdateForm,setUpdateForm] = useState(false);
  const [createState, setCreateState] = useState(false);
  const [updateState, setUpdateState] = useState(false);

  return (
    <CommuCon>
      <CommuSubCon>
        <h2 align="center">게시글 상세정보</h2>
        <button
                onClick={PostDelete}
                style={{ position: "absolute", right: 0 }}
              >
                삭제하기
              </button>
              <button
                onClick={() => setUpdateForm((data)=>!data)}
                style={{ position: "absolute", right: 70 }}
              >
                수정하기
              </button>
        <div className="post-view-wrapper">
          {/* {content.content} */}
          {content ? (
            <>
              <div className="post-view-row">
                <label>게시글 번호 : </label>
                <label name="id">{content.id}</label>
              </div>
              <br></br>
              <div className="post-view-row">
                <label>제목 : </label>
                <label>{content.title}</label>
              </div>
              <div className="post-view-row">
                <label>작성자 : </label>
                <label>{content.loginId}</label>
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
                <div>{content.content}</div>
                <br></br>
              </div>
              <div className="post-view-row"></div> 
              {postUpdateForm ?(
                 <Background>
                 <ModalContainer>
                 <MousePointer
                   style={{ color: "white", float: "right" }}
                   //onClick={Close}
                   >
                   X
               </MousePointer>
               <div style={{ color: "white", float: "center" }}>수정하기</div>
               <div style={{ color : "white"}}>
                 <form encType="multipart/form-data" onSubmit={PatchPostContents}>
                    제목
                    <input
                      type="text"
                      name="title"
                      defaultValue={content.title}
                      ></input>
                      <br></br>
                      내용
                      <textarea style={{width : "300px",height : "350px"}}
                        type="text"
                        name="content"
                        defaultValue={content.content}
                        ></textarea>
                        <br></br>
                        타입
                        <select type="text" name="type" defaultValue={content.type}>
                          <option>NOTICE</option>
                          <option>QNA</option>
                          <option>COMPLAINT</option>
                          <option>FAQ</option>
                        </select>
                        <input type="file" name="userfile" multiple="multiple"></input>
                        <p>작성자 : {content.loginId}</p>
                        <p>조회수 : {content.view}</p>
                        <p>작성일 : {content.createdDateTime}</p>
                        <button type="submit">수정하기</button>
                 </form>
               </div>
           
                 </ModalContainer>
               </Background>
              ):('')}
            
              {createState ? (
                <Background>
                <ModalContainer>
                <MousePointer
                  style={{ color: "white", float: "right" }}
                  //onClick={Close}
                  >
                  X
              </MousePointer>
              <div style={{ color: "white", float: "center" }}>수정하기</div>
              <div  style={{ color : "white"}}>
                  <form
                    id="myForm"
                    name="myForm"
                    onSubmit={RepCreate}
                    encType="multipart/form-data"
                  >
                    제목
                    <input
                      type="text"
                      placeholder="제목을 입력하세요"
                      name="title"
                    />
                    <br></br>
                    내용
                    <textarea style={{width:"300px",height : "350px"}}
                      type="text"
                      placeholder="내용을 입력하세요"
                      name="content"
                    />
                    <br></br>
                    <select type="text" defaultValue={content.type} name="type">
                      <option>NOTICE</option>
                      <option>FAQ</option>
                      <option>COMPLAINT</option>
                      <option>QNA</option>
                    </select>
                    <br></br>
                    <input type="file" name="userfile" multiple="multiple" />
                    <br></br>
                    <button type="submit">답글등록</button>
                  </form>
                  </div>
                  </ModalContainer>
               </Background>
              ) : (
                ""
              )}
            </>
          ) : (
            "해당 게시글을 찾을 수 없습니다."
          )}
        </div>



       
        {reply ? (
          <div>
            <hr></hr>
            <h2>답글</h2>
            <div>
              {userRole.role == "ROLE_ADMIN" ? (
                <div>
                  <button onClick={() => setUpdateState((data)=>!data)}>수정</button>
                  <button onClick={RepDelete}>삭제</button>
                </div>
              ) : (
                ""
              )}
              {reply.content}
              <br></br>
              {}
              <br></br>
            </div>
            {updateState ? (
             <Background>
             <ModalContainer>
             <MousePointer
               style={{ color: "white", float: "right" }}
               //onClick={Close}
               >
               X
           </MousePointer>
           <div style={{ color: "white", float: "center" }}>수정하기</div>
           <div  style={{ color : "white"}}>
            <form onSubmit={RepUpdate} encType="multipart/form-data">
              <input
                type="text"
                defaultValue={reply.id}
                name="id"
                hidden={true}
              />
              <br></br>
              <input type="text" defaultValue={reply.title} name="title" />
              <br></br>
              <input type="text" defaultValue={reply.content} name="content" />
              <br></br>
              <select type="text" defaultValue={reply.type} name="type">
                <option>NOTICE</option>
                <option>FAQ</option>
                <option>COMPLAINT</option>
                <option>QNA</option>
              </select>
              <br></br>
              <input type="file" name="userfile" multiple="multiple" />
              <br></br>
              <button type="submit">submit</button>
            </form>
            </div>
              </ModalContainer>
          </Background>
        ) : (
          ""
        )}
          </div>
        ) : (
          <div>
            {userRole.role == "ROLE_ADMIN" ? (
              <div>
                {buttonReact ? (
                  <div>
                    <button onClick={() => setCreateState((data)=>!data)}>답글등록</button>
                    <br></br>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        )}


        <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>
          목록으로 돌아가기
        </button>
      </CommuSubCon>
    </CommuCon>
  );
};

export default CommunityContents;