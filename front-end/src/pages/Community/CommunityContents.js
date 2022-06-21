import styled from "styled-components";
import { Link } from "react-router-dom";
import useBoardContents from "./hooks/useBoardContents";
import { useState } from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Stack,
  Box,
  Typography,
  Container,
  Modal,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const theme = createTheme();
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const type = [
  {
    value: 'NOTICE',
    label: 'NOTICE',
  },
  {
    value: 'QNA',
    label: 'QNA',
  },
  {
    value: 'COMPLAINT',
    label: 'COMPLAINT',
  },
  {
    value: 'FAQ',
    label: 'FAQ',
  },
]
const CommunityContents = () => {
 
  const {
    content, del, repDel, update,reply, 
    subAdd, subUpdate, userRole, buttonReact,token,
    username
  } = useBoardContents();
  const {
    navigate, getPostId, PostDelete, 
    RepUpdateState, RepCreate, RepUpdate, RepDelete,PatchPostContents
  } = useBoardContents();

  const [postUpdateForm,setUpdateForm] = useState(false);
  const [createState, setCreateState] = useState(false);
  const [updateState, setUpdateState] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false); 
  
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const [currency, setCurrency] = React.useState('NOTICE');

    const handleChange = (e) => {
      setCurrency(e.target.value);
    };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box 
          sx={{
            bgcolor : 'Background.paper',
            pt : 8,
            pb : 6,
          }}>
            <Container mawWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                fontWeight={'normal'}>
                  {content ? (
                    <>
                    {content.type}
                    </>
                  ):('')}
                  <hr></hr>
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  {content ? (
                    <>
                     <div align="center">
                      <span>{content.title}</span>
                      </div>
                    <hr></hr>
                    </>
                  ):('')}
                </Typography>
            </Container>
            <Container sx={{ py : 2}} maxWidth ="md">
              {content ? (
                <>
               <Box
                display='flex'
               >
                 <span>작성자 : {content.loginId}</span>
                 <div align="right">
                 <span style={{marginLeft:'450px'}}>조회수 : {content.view}</span>
                 <span style={{marginLeft:'10px'}}>작성일 : {content.date}</span>
                 </div>
               </Box>
                <br></br>
                <img src={`${process.env.REACT_APP_SPRING_API}/api/image/${content.photoName}`} style={{width : "750px",height:"350px"}}></img><br></br>
                {content.content}
                <br></br><br></br>
                <Button onClick={handleOpen3}>수정하기</Button>
                <Button onClick={PostDelete}>삭제하기</Button>
                <Modal
                  open={open3}
                  onClose={handleClose3}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Container maxWidth="xs" align="center">
                <Box sx={style}>
                <form encType="multipart/form-data" onSubmit={PatchPostContents}>
                <input
                  type="text"
                  defaultValue={content.id}
                  name="id"
                  hidden={true}
                />
                <TextField
                  id="standard-multiline-flexible"
                  name="title"
                  label="제목"
                  multiline
                  maxRows={4}
                  variant="standard"
                  defaultValue={content.title}
                  /><br></br><br></br><br></br><br></br>
                <TextField
                  id="outlined-multiline-static"
                  label="내용"
                  name="content"
                  multiline
                  rows={4}
                  defaultValue={content.content}
                  /><br></br><br></br>

                  <TextField
                    id="outlined-select-currency"
                    size="small"
                    select
                    label="Select"
                    name="type"
                    defaultValue={content.type}
                    value={currency}
                    onChange={handleChange}
                    helperText="게시글 타입을 선택해주세요"
                  >
                      {type.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                     ))}
                  </TextField>
                  <br></br><br></br>
                  <Button
                    variant="contained"
                    component="label">
                    <Typography>
                      파일등록
                    </Typography>
                    <input id={"file-input"} style={{ display: 'none' }} type="file" name="userfile" multiple="multiple"  />
                    </Button>
                    <br></br><br></br>
                    <Typography>작성자 : {content.loginId}</Typography>
                    <Typography>조회수 : {content.view}</Typography>
                    <Typography>작성일 : {content.date}</Typography> 
                    <Button type="submit">수정</Button> 
                </form>
                </Box>
                </Container>
                </Modal>
                
                
               
                {reply ? (
                  <div>
                    <hr></hr>
                    <h2>답글</h2>
                      {userRole.role == "ROLE_ADMIN" ? (
                        <div>
                          <Button onClick={handleOpen2}>수정</Button>
                          <Modal
                              open={open2}
                              onClose={handleClose2}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                           <Container maxWidth="xs" align="center">
                           <Box sx={style}>
                           <Typography id="modal-modal-title" variant="h6" component="h2">
                                답글수정
                           </Typography>
                           <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              <form
                                id="myForm"
                                name="myForm"
                                onSubmit={RepUpdate}
                                encType="multipart/form-data"
                              >
                              <input
                                  type="text"
                                  defaultValue={reply.id}
                                  name="id"
                                  hidden={true}
                                />
                              <TextField
                                id="standard-multiline-flexible"
                                name="title"
                                label="제목"
                                multiline
                                maxRows={4}
                                variant="standard"
                                defaultValue={reply.title}
                              /><br></br><br></br><br></br><br></br>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="내용"
                                  name="content"
                                  multiline
                                  rows={4}
                                  defaultValue={reply.content}
                                /><br></br><br></br>
                                <TextField
                                  id="outlined-select-currency"
                                  size="small"
                                  select
                                  label="Select"
                                  name="type"
                                  defaultValue={reply.type}
                                  value={currency}
                                  onChange={handleChange}
                                  helperText="게시글 타입을 선택해주세요"
                                >
                                  {type.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                                <br></br><br></br> 
                                <Button
                                  variant="contained"
                                  component="label">
                                <Typography>
                                  파일등록
                                </Typography>
                                <input id={"file-input"} style={{ display: 'none' }} type="file" name="userfile" multiple="multiple"  />
                                </Button>
                                <br></br><br></br> 
                                <Button type="submit">수정</Button>
                              </form>
                              </Typography>
                          </Box>
                           </Container>
                            </Modal>
                          <Button onClick={RepDelete}>삭제</Button>
                        </div>
                      ) : (
                        ""
                      )}
                      <img src={`${process.env.REACT_APP_SPRING_API}/api/image/${reply.photoName}`} style={{width : "750px",height:"350px"}}></img><br></br>
                      {reply.content}
                      <br></br>
                      {}
                      <br></br>
                  </div>
                  ):(
                    <div>
                    {userRole.role == "ROLE_ADMIN" ? (
                      <div>
                        {buttonReact ? (
                          <div>
                            <Button onClick={handleOpen}>답글등록</Button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                            <Container maxWidth="xs" align="center">
                            <Box sx={style}>
                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                답글등록
                              </Typography>
                              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              <form
                                id="myForm"
                                name="myForm"
                                onSubmit={RepCreate}
                                encType="multipart/form-data"
                              >
                              <TextField
                                id="standard-multiline-flexible"
                                name="title"
                                label="제목"
                                multiline
                                maxRows={4}
                                variant="standard"
                                placeholder="제목을 입력하세요"
                              /><br></br><br></br><br></br><br></br>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="내용"
                                  name="content"
                                  multiline
                                  rows={4}
                                  placeholder="내용을 입력하세요"
                                /><br></br><br></br>
                                <TextField
                                  id="outlined-select-currency"
                                  size="small"
                                  select
                                  label="Select"
                                  name="type"
                                  value={currency}
                                  onChange={handleChange}
                                  helperText="게시글 타입을 선택해주세요"
                                >
                                  {type.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </TextField>
                                <br></br><br></br> 
                                <Button
                                  variant="contained"
                                  component="label">
                                <Typography>
                                  파일등록
                                </Typography>
                                <input id={"file-input"} style={{ display: 'none' }} type="file" name="userfile" multiple="multiple"  />
                                </Button>
                                <br></br><br></br> 
                                <Button type="submit">등록</Button>
                              </form>
                              </Typography>
                            </Box>
                            </Container>
                            </Modal>
                            <br></br>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : ("")}
                  </div>
                  )}
                </>
              ):('')}
            </Container>
          </Box>
      </main>
    </ThemeProvider>
    // <CommuCon>
    //   <CommuSubCon>
    //     <h2 align="center">게시글 상세정보</h2>
    //     <button
    //             onClick={PostDelete}
    //             style={{ position: "absolute", right: 0 }}
    //           >
    //             삭제하기
    //           </button>
    //           <button
    //             onClick={() => setUpdateForm((data)=>!data)}
    //             style={{ position: "absolute", right: 70 }}
    //           >
    //             수정하기
    //           </button>
    //     <div className="post-view-wrapper">
    //       {/* {content.content} */}
    //       {content ? (
    //         <>
    //           <div className="post-view-row">
    //             <label>게시글 번호 : </label>
    //             <label name="id">{content.id}</label>
    //           </div>
    //           <br></br>
    //           <div className="post-view-row">
    //             <label>제목 : </label>
    //             <label>{content.title}</label>
    //           </div>
    //           <div className="post-view-row">
    //             <label>작성자 : </label>
    //             <label>{content.loginId}</label>
    //           </div>
    //           <div className="post-view-row">
    //             <label>조회수 : </label>
    //             <label>{content.view}</label>
    //           </div>
    //           <div className="post-view-row">
    //             <label>작성일 : </label>
    //             <label>{content.date}</label>
    //           </div>
    //           <div className="post-view-row">
    //             <label>타입 : </label>
    //             <label>{content.type}</label>
    //           </div>
    //           <div className="post-view-row">
    //             <label>내용 : </label>
    //             <div>{content.content}</div>
    //             <br></br>
    //           </div>
    //           <div className="post-view-row"></div> 
    //           {postUpdateForm ?(
    //              <Background>
    //              <ModalContainer>
    //              <MousePointer
    //                style={{ color: "white", float: "right" }}
    //                onClick={() => setUpdateForm((data)=>!data)}
    //                >
    //                X
    //            </MousePointer>
    //            <div style={{ color: "white", float: "center" }}>수정하기</div>
    //            <div style={{ color : "white"}}>
    //              <form encType="multipart/form-data" onSubmit={PatchPostContents}>
    //                 제목
    //                 <input
    //                   type="text"
    //                   name="title"
    //                   defaultValue={content.title}
    //                   ></input>
    //                   <br></br>
    //                   내용
    //                   <textarea style={{width : "300px",height : "350px"}}
    //                     type="text"
    //                     name="content"
    //                     defaultValue={content.content}
    //                     ></textarea>
    //                     <br></br>
    //                     타입
    //                     <select type="text" name="type" defaultValue={content.type}>
    //                       <option>NOTICE</option>
    //                       <option>QNA</option>
    //                       <option>COMPLAINT</option>
    //                       <option>FAQ</option>
    //                     </select>
    //                     <input type="file" name="userfile" multiple="multiple"></input>
    //                     <p>작성자 : {content.loginId}</p>
    //                     <p>조회수 : {content.view}</p>
    //                     <p>작성일 : {content.createdDateTime}</p>
    //                     <button type="submit">수정하기</button>
    //              </form>
    //            </div>
           
    //              </ModalContainer>
    //            </Background>
    //           ):('')}
            
          //     {createState ? (
          //       <Background>
          //       <ModalContainer>
          //       <MousePointer
          //         style={{ color: "white", float: "right" }}
          //         onClick={() => setCreateState((data)=>!data)}
          //         >
          //         X
          //     </MousePointer>
          //     <div style={{ color: "white", float: "center" }}>답글등록</div>
          //     <div  style={{ color : "white"}}>
          //         <form
          //           id="myForm"
          //           name="myForm"
          //           onSubmit={RepCreate}
          //           encType="multipart/form-data"
          //         >
          //           제목
          //           <input
          //             type="text"
          //             placeholder="제목을 입력하세요"
          //             name="title"
          //           />
          //           <br></br>
          //           내용
          //           <textarea style={{width:"300px",height : "350px"}}
          //             type="text"
          //             placeholder="내용을 입력하세요"
          //             name="content"
          //           />
          //           <br></br>
          //           <select type="text" defaultValue={content.type} name="type">
          //             <option>NOTICE</option>
          //             <option>FAQ</option>
          //             <option>COMPLAINT</option>
          //             <option>QNA</option>
          //           </select>
          //           <br></br>
          //           <input type="file" name="userfile" multiple="multiple" />
          //           <br></br>
          //           <button type="submit">답글등록</button>
          //         </form>
          //         </div>
          //         </ModalContainer>
          //      </Background>
          //     ) : (
          //       ""
          //     )}
          //   </>
          // ) : (
          //   "해당 게시글을 찾을 수 없습니다."
          // )}
    //     </div>



       
    //     {reply ? (
    //       <div>
    //         <hr></hr>
    //         <h2>답글</h2>
    //         <div>
    //           {userRole.role == "ROLE_ADMIN" ? (
    //             <div>
    //               <button onClick={() => setUpdateState((data)=>!data)}>수정</button>
    //               <button onClick={RepDelete}>삭제</button>
    //             </div>
    //           ) : (
    //             ""
    //           )}
    //           {reply.content}
    //           <br></br>
    //           {}
    //           <br></br>
    //         </div>
    //         {updateState ? (
    //          <Background>
    //          <ModalContainer>
    //          <MousePointer
    //            style={{ color: "white", float: "right" }}
    //            onClick={() => setUpdateState((data)=>!data)}
    //            >
    //            X
    //        </MousePointer>
    //        <div style={{ color: "white", float: "center" }}>수정하기</div>
    //        <div  style={{ color : "white"}}>
    //         <form onSubmit={RepUpdate} encType="multipart/form-data">
    //           <input
    //             type="text"
    //             defaultValue={reply.id}
    //             name="id"
    //             hidden={true}
    //           />
    //           <br></br>
    //           <input type="text" defaultValue={reply.title} name="title" />
    //           <br></br>
    //           <input type="text" defaultValue={reply.content} name="content" />
    //           <br></br>
    //           <select type="text" defaultValue={reply.type} name="type">
    //             <option>NOTICE</option>
    //             <option>FAQ</option>
    //             <option>COMPLAINT</option>
    //             <option>QNA</option>
    //           </select>
    //           <br></br>
    //           <input type="file" name="userfile" multiple="multiple" />
    //           <br></br>
    //           <button type="submit">submit</button>
    //         </form>
    //         </div>
    //           </ModalContainer>
    //       </Background>
    //     ) : (
    //       ""
    //     )}
    //       </div>
    //     ) : (
          // <div>
          //   {userRole.role == "ROLE_ADMIN" ? (
          //     <div>
          //       {buttonReact ? (
          //         <div>
          //           <button onClick={() => setCreateState((data)=>!data)}>답글등록</button>
          //           <br></br>
          //         </div>
          //       ) : (
          //         ""
          //       )}
          //     </div>
          //   ) : (
          //     ""
          //   )}
          // </div>
    //     )}


    // //     <button className="post-view-go-list-btn" onClick={() => navigate(-1)}>
    // //       목록으로 돌아가기
    // //     </button>
    // //   </CommuSubCon>
    // // </CommuCon>
  );
};

export default CommunityContents;