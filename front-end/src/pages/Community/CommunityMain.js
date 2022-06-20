import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import useLoading from '../../hooks/useLoading'
import useBoardHook from "./hooks/useBoardHook";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import { PostAdd } from "@mui/icons-material";


const CommuCon = styled.div`
  width: 100%;
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
 
  const [noticepage, setNoticePage] = React.useState(1);
  const [qnapage, setQnaPage] = React.useState(1);
  const [compage, setComPage] = React.useState(1);
  const [faqpage, setFaqPage] = React.useState(1);
  const { loading } = useLoading();
  const { 
    keyword, searched, numbering, 
    paging, pageState, paging2, pageState2, 
    paging3, pageState3, paging4, pageState4, 
    notice, QNA, complaint, FAQ,token,
    noticeState, qnaState, comState, faqState,
    keywordSubmit, categoryType,
    noticePaging, QnAPaging, ComplaintPaging, FaQPaging, 
    setBoardState, setNumbering, setButtonState,setSearched
  } = useBoardHook();
  const handleChangeNotice = (e,value) => {
    setNoticePage(value);
    noticePaging(e,value);
  };
  const handleChangeQnA = (e,value) => {
    setQnaPage(value)
    QnAPaging(e,value)
  }
  const handleChangeCom = (e,value) => {
    setComPage(value)
    ComplaintPaging(e,value)
  }
  const handleChangeFaQ = (e,value) => {
    setFaqPage(value)
    FaQPaging(e,value)
  }


  return (
    <div className="Community">
      <CommuCon>
        <CommuSubCon>
          {loading ? <h2>고객센터입니다</h2> : <h2>로드 중...</h2>}<br></br>
          <>
          <Stack direction="row" spacing={2}>
          <Button  size="small" onClick={categoryType} value="NOTICE">공지사항</Button>
          <Button  size="small" onClick={categoryType} value="QNA">QNA</Button>
          <Button  size="small" onClick={categoryType} value="COMPLAINT">불만사항</Button>
          <Button  size="small" onClick={categoryType} value="FAQ">FAQ</Button>
        </Stack>
          </>
 
          <form onSubmit={keywordSubmit} align="right">
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                size="small"
                type="text"
                placeholder="검색어를 입력하세요"
                name="keyword"
              />
            <Button type="submit">찾기</Button>
          </form>
          <hr></hr>

          {noticeState ? (
            <>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>게시글 번호</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">조회수</TableCell>
                  <TableCell align="right">날짜</TableCell>
                  <TableCell align="right">게시글 타입</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notice.body.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {post.id}
                    </TableCell>
                    
                    <TableCell align="right"><Link to={{ pathname: `/community/${post.id}` }}>
                      {post.title}
                    </Link></TableCell>
                    <TableCell align="right">{post.loginId}</TableCell>
                    <TableCell align="right">{post.view}</TableCell>
                    <TableCell align="right">{post.date}</TableCell>
                    <TableCell align="right">{post.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
              {/* {numbering ? (
                   <Stack spacing={2}>  
                   <Pagination count={10} page={page} onChange={handleChange} />             
                  </Stack>      
              ) : (
                ""
              )} */}
              <Stack spacing={2}>  
                   <Pagination count={10} page={noticepage} onChange={handleChangeNotice} />             
              </Stack>  
            </>
          ) : (
            ""
          )}
          {pageState ? (
            <div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>게시글 번호</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">조회수</TableCell>
                  <TableCell align="right">날짜</TableCell>
                  <TableCell align="right">게시글 타입</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paging.map((result) => (
                  <TableRow
                    key={result.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {result.id}
                    </TableCell>
                    <TableCell align="right"><Link to={{ pathname: `/community/${result.id}` }}>
                      {result.title}
                    </Link></TableCell>
                    <TableCell align="right">{result.loginId}</TableCell>
                    <TableCell align="right">{result.view}</TableCell>
                    <TableCell align="right">{result.date}</TableCell>
                    <TableCell align="right">{result.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
              {numbering ? (
                  <Stack spacing={2}>  
                  <Pagination count={10} page={noticepage} onChange={handleChangeNotice} />             
                 </Stack>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {qnaState ? (
            <>
              <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>게시글 번호</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">조회수</TableCell>
                  <TableCell align="right">날짜</TableCell>
                  <TableCell align="right">게시글 타입</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {QNA.body.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {post.id}
                    </TableCell>
                    <TableCell align="right"><Link to={{ pathname: `/community/${post.id}` }}>
                      {post.title}
                    </Link></TableCell>
                    <TableCell align="right">{post.loginId}</TableCell>
                    <TableCell align="right">{post.view}</TableCell>
                    <TableCell align="right">{post.date}</TableCell>
                    <TableCell align="right">{post.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
              {/* {numbering ? (
                  <Stack spacing={2}>  
                  <Pagination count={10} page={qnapage} onChange={handleChangeQnA} />             
                 </Stack>
              ) : (
                ""
              )} */}
               <Stack spacing={2}>  
                  <Pagination count={10} page={qnapage} onChange={handleChangeQnA} />             
                 </Stack>
            </>
          ) : (
            ""
          )}
          {pageState2 ? (
            <div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>게시글 번호</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">조회수</TableCell>
                  <TableCell align="right">날짜</TableCell>
                  <TableCell align="right">게시글 타입</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paging2.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {post.id}
                    </TableCell>
                    <TableCell align="right"><Link to={{ pathname: `/community/${post.id}` }}>
                      {post.title}
                    </Link></TableCell>
                    <TableCell align="right">{post.loginId}</TableCell>
                    <TableCell align="right">{post.view}</TableCell>
                    <TableCell align="right">{post.date}</TableCell>
                    <TableCell align="right">{post.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
              {/* {numbering ? (
                  <Stack spacing={2}>  
                  <Pagination count={10} page={qnapage} onChange={handleChangeQnA} />             
                 </Stack>
              ) : (
                ""
              )} */}
               <Stack spacing={2}>  
                  <Pagination count={10} page={qnapage} onChange={handleChangeQnA} />             
                 </Stack>
            </div>
          ) : (
            ""
          )}

          {comState ? (
            <>
               <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>게시글 번호</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">조회수</TableCell>
                  <TableCell align="right">날짜</TableCell>
                  <TableCell align="right">게시글 타입</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaint.body.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {post.id}
                    </TableCell>
                    <TableCell align="right"><Link to={{ pathname: `/community/${post.id}` }}>
                      {post.title}
                    </Link></TableCell>
                    <TableCell align="right">{post.loginId}</TableCell>
                    <TableCell align="right">{post.view}</TableCell>
                    <TableCell align="right">{post.date}</TableCell>
                    <TableCell align="right">{post.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
              {/* {numbering ? (
                 <Stack spacing={2}>  
                 <Pagination count={10} page={compage} onChange={handleChangeCom} />             
                </Stack>
              ) : (
                ""
              )} */}
               <Stack spacing={2}>  
                 <Pagination count={10} page={compage} onChange={handleChangeCom} />             
                </Stack>
            </>
          ) : (
            ""
          )}
          {pageState3 ? (
            <div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>게시글 번호</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">조회수</TableCell>
                  <TableCell align="right">날짜</TableCell>
                  <TableCell align="right">게시글 타입</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paging3.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {post.id}
                    </TableCell>
                    <TableCell align="right"><Link to={{ pathname: `/community/${post.id}` }}>
                      {post.title}
                    </Link></TableCell>
                    <TableCell align="right">{post.loginId}</TableCell>
                    <TableCell align="right">{post.view}</TableCell>
                    <TableCell align="right">{post.date}</TableCell>
                    <TableCell align="right">{post.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
              {/* {numbering ? (
                 <Stack spacing={2}>  
                 <Pagination count={10} page={page} onChange={handleChange} />             
                </Stack>
              ) : (
                ""
              )} */}
               <Stack spacing={2}>  
                 <Pagination count={10} page={compage} onChange={handleChangeCom} />             
                </Stack>
            </div>
          ) : (
            ""
          )}

          {faqState ? (
            <>
              <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>게시글 번호</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">조회수</TableCell>
                  <TableCell align="right">날짜</TableCell>
                  <TableCell align="right">게시글 타입</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {FAQ.body.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {post.id}
                    </TableCell>
                    <TableCell align="right"><Link to={{ pathname: `/community/${post.id}` }}>
                      {post.title}
                    </Link></TableCell>
                    <TableCell align="right">{post.loginId}</TableCell>
                    <TableCell align="right">{post.view}</TableCell>
                    <TableCell align="right">{post.date}</TableCell>
                    <TableCell align="right">{post.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
              {/* {numbering ? (
                  <Stack spacing={2}>  
                  <Pagination count={10} page={faqpage} onChange={handleChangeFaQ} />             
                 </Stack>
              ) : (
                ""
              )} */}
              <Stack spacing={2}>  
                  <Pagination count={10} page={faqpage} onChange={handleChangeFaQ} />             
                 </Stack>
            </>
          ) : (
            ""
          )}
          {pageState4 ? (
            <div>
               <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>게시글 번호</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">조회수</TableCell>
                  <TableCell align="right">날짜</TableCell>
                  <TableCell align="right">게시글 타입</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paging4.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {post.id}
                    </TableCell>
                    <TableCell align="right"><Link to={{ pathname: `/community/${post.id}` }}>
                      {post.title}
                    </Link></TableCell>
                    <TableCell align="right">{post.loginId}</TableCell>
                    <TableCell align="right">{post.view}</TableCell>
                    <TableCell align="right">{post.date}</TableCell>
                    <TableCell align="right">{post.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
              {/* {numbering ? (
                 <Stack spacing={2}>  
                 <Pagination count={10} page={page} onChange={handleChange} />             
                </Stack>
              ) : (
                ""
              )} */}
              <Stack spacing={2}>  
                  <Pagination count={10} page={faqpage} onChange={handleChangeFaQ} />             
                 </Stack>
            </div>
          ) : (
            ""
          )}

          {searched ? (
            <div>
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1000 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>게시글 번호</TableCell>
                  <TableCell align="right">제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">조회수</TableCell>
                  <TableCell align="right">날짜</TableCell>
                  <TableCell align="right">게시글 타입</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keyword.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {post.id}
                    </TableCell>
                    <TableCell align="right"><Link to={{ pathname: `/community/${post.id}` }}>
                      {post.title}
                    </Link></TableCell>
                    <TableCell align="right">{post.loginId}</TableCell>
                    <TableCell align="right">{post.view}</TableCell>
                    <TableCell align="right">{post.date}</TableCell>
                    <TableCell align="right">{post.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
              <Button
                className="post-view-go-list-btn"
                onClick={() => {
                  //setBoardState(true),
                  setSearched(false),
                  setNumbering(true),
                  setButtonState(true);
                }}
              >
                목록으로 돌아가기
              </Button>
            </div>
          ) : (
            ""
          )}

          <Button>
            <Link to={{ pathname: "/community/add" }}>등록하기</Link>
          </Button>
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
