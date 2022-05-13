import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../hooks/useLoading'
import useBoardHook from "./hooks/useBoardHook";

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
const MousePointer = styled.button`
  cursor: pointer;
  :hover {
    color: blue;
  }
`;

function CommunityMain() {
  const { loading } = useLoading();
  const { 
    keyword, searched, paging, pageState, 
    paging2, pageState2, paging3, pageState3, paging4, pageState4, 
    numbering, notice, noticeState, QNA, qnaState, 
    complaint, comState, FAQ, faqState, buttonState
  } = useBoardHook();
  const { 
    keywordSubmit, commuSubmit,
    noticePaging, QnAPaging, ComplaintPaging, FaQPaging, 
    NOTICE, QnA, COMPLAINT, FaQ
  } = useBoardHook();
  const postId = useBoardHook();

  return (
    <div className="Community">
      <CommuCon>
        <CommuSubCon>
          {loading ? <h2>고객센터입니다</h2> : <h2>로드 중...</h2>}
          {buttonState ? (
            <>
              <button onClick={NOTICE} value="NOTICE">
                공지사항
              </button>
              <button onClick={QnA} value="QNA">
                QNA
              </button>
              <button onClick={COMPLAINT} value="COMPLAINT">
                불만접수
              </button>
              <button onClick={FaQ} value="FAQ">
                FAQ
              </button>
            </>
          ) : (
            ""
          )}
          <form onSubmit={keywordSubmit} align="right">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              name="keyword"
            />
            <button type="submit">찾기</button>
          </form>
          <hr></hr>

          {noticeState ? (
            <>
              <table>
                <tr>
                  <CommuBoard>게시글번호</CommuBoard>
                  <CommuBoard>제목</CommuBoard>
                  <CommuBoard>작성자</CommuBoard>
                  <CommuBoard>조회수</CommuBoard>
                  <CommuBoard>날짜</CommuBoard>
                  <CommuBoard>게시글타입</CommuBoard>
                </tr>
                {(notice == null) | (notice == "") ? (
                  <tr>
                    <NullCommuBoard colSpan={6}>탭을 눌러주세요</NullCommuBoard>
                  </tr>
                ) : (
                  notice.body.map((post) => {
                    return (
                      <tr key={post.id}>
                        <CommuBoard2>{post.id}</CommuBoard2>
                        <CommuBoard2>
                          <Link
                            to={{
                              pathname: `/community/${post.id}`,
                            }}
                          >
                            {post.title}
                          </Link>
                        </CommuBoard2>
                        <CommuBoard2>{post.member.name}</CommuBoard2>
                        <CommuBoard2>{post.view}</CommuBoard2>
                        <CommuBoard2>{post.writeDate}</CommuBoard2>
                        <CommuBoard2>{post.type}</CommuBoard2>
                      </tr>
                    );
                  })
                )}
              </table>
              {numbering ? (
                <div className="noticePage">
                  <MousePointer onClick={noticePaging} value="1">
                    1&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="2">
                    2&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="3">
                    3&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="4">
                    4&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="5">
                    5&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="6">
                    6&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="7">
                    7&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="8">
                    8&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="9">
                    9&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="10">
                    10&nbsp;&nbsp;
                  </MousePointer>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {pageState ? (
            <div>
              <table>
                <tr>
                  <CommuBoard>게시글번호</CommuBoard>
                  <CommuBoard>제목</CommuBoard>
                  <CommuBoard>작성자</CommuBoard>
                  <CommuBoard>조회수</CommuBoard>
                  <CommuBoard>날짜</CommuBoard>
                  <CommuBoard>게시글타입</CommuBoard>
                </tr>
                {(paging == null) | (paging == "") ? (
                  <tr>
                    <NullCommuBoard colSpan={6}>게시글 없음</NullCommuBoard>
                  </tr>
                ) : (
                  paging.map((result) => {
                    console.log(result);
                    return (
                      <tr key={result.id}>
                        <CommuBoard2>{result.id}</CommuBoard2>
                        <CommuBoard2>
                          <Link
                            to={{
                              pathname: `/community/${result.id}`,
                            }}
                          >
                            {result.title}
                          </Link>
                        </CommuBoard2>
                        <CommuBoard2>{result.member.name}</CommuBoard2>
                        <CommuBoard2>{result.view}</CommuBoard2>
                        <CommuBoard2>{result.writeDate}</CommuBoard2>
                        <CommuBoard2>{result.type}</CommuBoard2>
                      </tr>
                    );
                  })
                )}
              </table>
              {numbering ? (
                <div className="noticePage">
                  <MousePointer onClick={noticePaging} value="1">
                    1&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="2">
                    2&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="3">
                    3&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="4">
                    4&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="5">
                    5&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="6">
                    6&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="7">
                    7&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="8">
                    8&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="9">
                    9&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={noticePaging} value="10">
                    10&nbsp;&nbsp;
                  </MousePointer>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {qnaState ? (
            <>
              <table>
                <tr>
                  <CommuBoard>게시글번호</CommuBoard>
                  <CommuBoard>제목</CommuBoard>
                  <CommuBoard>작성자</CommuBoard>
                  <CommuBoard>조회수</CommuBoard>
                  <CommuBoard>날짜</CommuBoard>
                  <CommuBoard>게시글타입</CommuBoard>
                </tr>
                {(QNA == null) | (QNA == "") ? (
                  <tr>
                    <NullCommuBoard colSpan={6}>아직 없음.</NullCommuBoard>
                  </tr>
                ) : (
                  QNA.body.map((post) => {
                    return (
                      <tr key={post.id}>
                        <CommuBoard2>{post.id}</CommuBoard2>
                        <CommuBoard2>
                          <Link
                            to={{
                              pathname: `/community/${post.id}`,
                            }}
                          >
                            {post.title}
                          </Link>
                        </CommuBoard2>
                        <CommuBoard2>{post.member.name}</CommuBoard2>
                        <CommuBoard2>{post.view}</CommuBoard2>
                        <CommuBoard2>{post.writeDate}</CommuBoard2>
                        <CommuBoard2>{post.type}</CommuBoard2>
                      </tr>
                    );
                  })
                )}
              </table>
              {numbering ? (
                <div className="qnapaging">
                  <MousePointer onClick={QnAPaging} value="1">
                    1&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="2">
                    2&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="3">
                    3&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="4">
                    4&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="5">
                    5&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="6">
                    6&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="7">
                    7&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="8">
                    8&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="9">
                    9&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="10">
                    10&nbsp;&nbsp;
                  </MousePointer>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {pageState2 ? (
            <div>
              <table>
                <tr>
                  <CommuBoard>게시글번호</CommuBoard>
                  <CommuBoard>제목</CommuBoard>
                  <CommuBoard>작성자</CommuBoard>
                  <CommuBoard>조회수</CommuBoard>
                  <CommuBoard>날짜</CommuBoard>
                  <CommuBoard>게시글타입</CommuBoard>
                </tr>
                {(paging2 == null) | (paging2 == "") ? (
                  <tr>
                    <NullCommuBoard colSpan={6}>게시글 없음</NullCommuBoard>
                  </tr>
                ) : (
                  paging2.map((result) => {
                    console.log(result);
                    return (
                      <tr key={result.id}>
                        <CommuBoard2>{result.id}</CommuBoard2>
                        <CommuBoard2>
                          <Link
                            to={{
                              pathname: `/community/${result.id}`,
                            }}
                          >
                            {result.title}
                          </Link>
                        </CommuBoard2>
                        <CommuBoard2>{result.member.name}</CommuBoard2>
                        <CommuBoard2>{result.view}</CommuBoard2>
                        <CommuBoard2>{result.writeDate}</CommuBoard2>
                        <CommuBoard2>{result.type}</CommuBoard2>
                      </tr>
                    );
                  })
                )}
              </table>
              {numbering ? (
                <div className="qnapaging">
                  <MousePointer onClick={QnAPaging} value="1">
                    1&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="2">
                    2&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="3">
                    3&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="4">
                    4&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="5">
                    5&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="6">
                    6&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="7">
                    7&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="8">
                    8&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="9">
                    9&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={QnAPaging} value="10">
                    10&nbsp;&nbsp;
                  </MousePointer>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {comState ? (
            <>
              <table>
                <tr>
                  <CommuBoard>게시글번호</CommuBoard>
                  <CommuBoard>제목</CommuBoard>
                  <CommuBoard>작성자</CommuBoard>
                  <CommuBoard>조회수</CommuBoard>
                  <CommuBoard>날짜</CommuBoard>
                  <CommuBoard>게시글타입</CommuBoard>
                </tr>
                {(complaint == null) | (complaint == "") ? (
                  <tr>
                    <NullCommuBoard colSpan={6}>아직 없음.</NullCommuBoard>
                  </tr>
                ) : (
                  complaint.body.map((post) => {
                    return (
                      <tr key={post.id}>
                        <CommuBoard2>{post.id}</CommuBoard2>
                        <CommuBoard2>
                          <Link
                            to={{
                              pathname: `/community/${post.id}`,
                            }}
                          >
                            {post.title}
                          </Link>
                        </CommuBoard2>
                        <CommuBoard2>{post.member.name}</CommuBoard2>
                        <CommuBoard2>{post.view}</CommuBoard2>
                        <CommuBoard2>{post.writeDate}</CommuBoard2>
                        <CommuBoard2>{post.type}</CommuBoard2>
                      </tr>
                    );
                  })
                )}
              </table>
              {numbering ? (
                <div className="complaintpaging">
                  <MousePointer onClick={ComplaintPaging} value="1">
                    1&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="2">
                    2&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="3">
                    3&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="4">
                    4&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="5">
                    5&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="6">
                    6&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="7">
                    7&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="8">
                    8&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="9">
                    9&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="10">
                    10&nbsp;&nbsp;
                  </MousePointer>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {pageState3 ? (
            <div>
              <table>
                <tr>
                  <CommuBoard>게시글번호</CommuBoard>
                  <CommuBoard>제목</CommuBoard>
                  <CommuBoard>작성자</CommuBoard>
                  <CommuBoard>조회수</CommuBoard>
                  <CommuBoard>날짜</CommuBoard>
                  <CommuBoard>게시글타입</CommuBoard>
                </tr>
                {(paging3 == null) | (paging3 == "") ? (
                  <tr>
                    <NullCommuBoard colSpan={6}>게시글 없음</NullCommuBoard>
                  </tr>
                ) : (
                  paging3.map((result) => {
                    console.log(result);
                    return (
                      <tr key={result.id}>
                        <CommuBoard2>{result.id}</CommuBoard2>
                        <CommuBoard2>
                          <Link
                            to={{
                              pathname: `/community/${result.id}`,
                            }}
                          >
                            {result.title}
                          </Link>
                        </CommuBoard2>
                        <CommuBoard2>{result.member.name}</CommuBoard2>
                        <CommuBoard2>{result.view}</CommuBoard2>
                        <CommuBoard2>{result.writeDate}</CommuBoard2>
                        <CommuBoard2>{result.type}</CommuBoard2>
                      </tr>
                    );
                  })
                )}
              </table>
              {numbering ? (
                <div className="complaintpaging">
                  <MousePointer onClick={ComplaintPaging} value="1">
                    1&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="2">
                    2&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="3">
                    3&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="4">
                    4&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="5">
                    5&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="6">
                    6&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="7">
                    7&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="8">
                    8&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="9">
                    9&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={ComplaintPaging} value="10">
                    10&nbsp;&nbsp;
                  </MousePointer>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {faqState ? (
            <>
              <table>
                <tr>
                  <CommuBoard>게시글번호</CommuBoard>
                  <CommuBoard>제목</CommuBoard>
                  <CommuBoard>작성자</CommuBoard>
                  <CommuBoard>조회수</CommuBoard>
                  <CommuBoard>날짜</CommuBoard>
                  <CommuBoard>게시글타입</CommuBoard>
                </tr>
                {(FAQ == null) | (FAQ == "") ? (
                  <tr>
                    <NullCommuBoard colSpan={6}>아직 없음.</NullCommuBoard>
                  </tr>
                ) : (
                  FAQ.body.map((post) => {
                    return (
                      <tr key={post.id}>
                        <CommuBoard2>{post.id}</CommuBoard2>
                        <CommuBoard2>
                          <Link
                            to={{
                              pathname: `/community/${post.id}`,
                            }}
                          >
                            {post.title}
                          </Link>
                        </CommuBoard2>
                        <CommuBoard2>{post.member.name}</CommuBoard2>
                        <CommuBoard2>{post.view}</CommuBoard2>
                        <CommuBoard2>{post.writeDate}</CommuBoard2>
                        <CommuBoard2>{post.type}</CommuBoard2>
                      </tr>
                    );
                  })
                )}
              </table>
              {numbering ? (
                <div className="faqpaging">
                  <MousePointer onClick={FaQPaging} value="1">
                    1&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="2">
                    2&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="3">
                    3&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="4">
                    4&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="5">
                    5&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="6">
                    6&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="7">
                    7&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="8">
                    8&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="9">
                    9&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="10">
                    10&nbsp;&nbsp;
                  </MousePointer>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
          {pageState4 ? (
            <div>
              <table>
                <tr>
                  <CommuBoard>게시글번호</CommuBoard>
                  <CommuBoard>제목</CommuBoard>
                  <CommuBoard>작성자</CommuBoard>
                  <CommuBoard>조회수</CommuBoard>
                  <CommuBoard>날짜</CommuBoard>
                  <CommuBoard>게시글타입</CommuBoard>
                </tr>
                {(paging4 == null) | (paging4 == "") ? (
                  <tr>
                    <NullCommuBoard colSpan={6}>게시글 없음</NullCommuBoard>
                  </tr>
                ) : (
                  paging4.map((result) => {
                    console.log(result);
                    return (
                      <tr key={result.id}>
                        <CommuBoard2>{result.id}</CommuBoard2>
                        <CommuBoard2>
                          <Link
                            to={{
                              pathname: `/community/${result.id}`,
                            }}
                          >
                            {result.title}
                          </Link>
                        </CommuBoard2>
                        <CommuBoard2>{result.member.name}</CommuBoard2>
                        <CommuBoard2>{result.view}</CommuBoard2>
                        <CommuBoard2>{result.writeDate}</CommuBoard2>
                        <CommuBoard2>{result.type}</CommuBoard2>
                      </tr>
                    );
                  })
                )}
              </table>
              {numbering ? (
                <div className="faqpaging">
                  <MousePointer onClick={FaQPaging} value="1">
                    1&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="2">
                    2&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="3">
                    3&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="4">
                    4&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="5">
                    5&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="6">
                    6&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="7">
                    7&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="8">
                    8&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="9">
                    9&nbsp;&nbsp;
                  </MousePointer>
                  <MousePointer onClick={FaQPaging} value="10">
                    10&nbsp;&nbsp;
                  </MousePointer>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {searched ? (
            <div>
              <table>
                <tr>
                  <CommuBoard>게시글번호</CommuBoard>
                  <CommuBoard>제목</CommuBoard>
                  <CommuBoard>작성자</CommuBoard>
                  <CommuBoard>조회수</CommuBoard>
                  <CommuBoard>날짜</CommuBoard>
                  <CommuBoard>게시글타입</CommuBoard>
                </tr>
                {(keyword == null) | (keyword == "") ? (
                  <tr>
                    <NullCommuBoard colSpan={6}>검색 결과 없음</NullCommuBoard>
                  </tr>
                ) : (
                  keyword.map((result) => {
                    console.log(result);
                    return (
                      <tr key={result.id}>
                        <CommuBoard2>{result.id}</CommuBoard2>
                        <CommuBoard2>
                          <Link
                            to={{
                              pathname: `/community/${result.id}`,
                            }}
                          >
                            {result.title}
                          </Link>
                        </CommuBoard2>
                        <CommuBoard2>{result.member.name}</CommuBoard2>
                        <CommuBoard2>{result.view}</CommuBoard2>
                        <CommuBoard2>{result.writeDate}</CommuBoard2>
                        <CommuBoard2>{result.type}</CommuBoard2>
                      </tr>
                    );
                  })
                )}
              </table>
              <button
                className="post-view-go-list-btn"
                onClick={() => {
                  setBoardState(true),
                    setSearched(false),
                    setNumbering(true),
                    setButtonState(true);
                }}
              >
                목록으로 돌아가기
              </button>
            </div>
          ) : (
            ""
          )}

          <button>
            <Link to={{ pathname: "/community/add" }}>등록하기</Link>
          </button>
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
