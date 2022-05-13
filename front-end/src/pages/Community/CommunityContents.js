import styled from "styled-components";
import { Link } from "react-router-dom";
import useBoardContents from "./hooks/useBoardContents";

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
  const {
    content, del, repDel, form, update, reply, createState, 
    subAdd, updateState, subUpdate, userRole, buttonReact,
    username
  } = useBoardContents();

  const {
    navigate, getPostId, PostDelete, PostUpdate, commuSubmit, 
    RepCreateState, RepUpdateState, RepCreate, RepUpdate, RepDelete,
  } = useBoardContents();

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
                <label name="id">{content.id}</label>
              </div>
              <button
                onClick={PostDelete}
                style={{ position: "absolute", right: 0 }}
              >
                삭제하기
              </button>
              <button
                onClick={PostUpdate}
                style={{ position: "absolute", right: 70 }}
              >
                수정하기
              </button>
              <br></br>
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
                <div>{content.content}</div>
                <br></br>
              </div>
              <div className="post-view-row"></div>

              {createState ? (
                <>
                  <form
                    id="myForm"
                    name="myForm"
                    onSubmit={RepCreate}
                    encType="multipart/form-data"
                  >
                    <input
                      type="text"
                      placeholder="제목을 입력하세요"
                      name="title"
                    />
                    <input
                      type="text"
                      placeholder="내용을 입력하세요"
                      name="content"
                    />
                    <select type="text" defaultValue={content.type} name="type">
                      <option>NOTICE</option>
                      <option>FAQ</option>
                      <option>COMPLAINT</option>
                      <option>QNA</option>
                    </select>
                    <input type="file" name="userfile" multiple="multiple" />
                    <button type="submit">submit</button>
                  </form>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            "해당 게시글을 찾을 수 없습니다."
          )}
        </div>
        {form ? (
          <div>
            <form onSubmit={commuSubmit} encType="multipart/form-data">
              <input
                type="text"
                name="id"
                defaultValue={content.id}
                disabled={true}
              ></input>
              <br></br>
              제목
              <input
                type="text"
                name="title"
                defaultValue={content.title}
              ></input>
              <br></br>
              내용
              <input
                type="text"
                name="content"
                defaultValue={content.content}
              ></input>
              <br></br>
              타입
              <select type="text" name="type" defaultValue={content.type}>
                <option>NOTICE</option>
                <option>FAQ</option>
                <option>COMPLAINT</option>
                <option>QNA</option>
              </select>
              <input type="file" name="userfile" multiple="multiple"></input>
              <p>작성자 : {content.member.name}</p>
              <p>조회수 : {content.view}</p>
              <p>작성일 : {content.writeDate}</p>
              <button type="submit">수정하기</button>
            </form>
          </div>
        ) : (
          ""
        )}
        {reply ? (
          <>
            <hr></hr>
            <h2>답글</h2>
            <div>
              {userRole.role == "ROLE_ADMIN" ? (
                <div>
                  <button onClick={RepUpdateState}>수정</button>
                  <button onClick={RepDelete}>삭제</button>
                </div>
              ) : (
                ""
              )}
              {reply.content}
              <br></br>
              {reply.member.name}
              <br></br>
            </div>
          </>
        ) : (
          <div>
            {userRole.role == "ROLE_ADMIN" ? (
              <div>
                {buttonReact ? (
                  <div>
                    <button onClick={RepCreateState}>답글등록</button>
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

        {updateState ? (
          <>
            <form onSubmit={RepUpdate} encType="multipart/form-data">
              <input
                type="text"
                defaultValue={reply.id}
                name="id"
                hidden={true}
              />
              <input type="text" defaultValue={reply.title} name="title" />
              <input type="text" defaultValue={reply.content} name="content" />
              <select type="text" defaultValue={reply.type} name="type">
                <option>NOTICE</option>
                <option>FAQ</option>
                <option>COMPLAINT</option>
                <option>QNA</option>
              </select>
              <input type="file" name="userfile" multiple="multiple" />
              <button type="submit">submit</button>
            </form>
          </>
        ) : (
          ""
        )}

        <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>
          목록으로 돌아가기
        </button>
      </CommuSubCon>
    </CommuCon>
  );
};

export default CommunityContents;