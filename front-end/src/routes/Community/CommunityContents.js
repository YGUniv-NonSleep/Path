import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode';


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
  const [content, setContent] = useState(null);
  const [del, setDelCont] = useState(null);
  const [repdel, setRepDel] = useState(null);
  const [form, setForm] = useState(false);
  const [update,setUpdate] = useState(null);
  const [reply, setReply] = useState(null);
  const [createState, setCreateState] = useState(false);
  const [subadd,setSub] = useState(null);
  const [updateState,setUpdateState] = useState(false);
  const [subupdate,setSubUpdate] = useState(null);
     

  
  
//  const [username, setUsername] = useState('');
//  // === AccessToken 재발급 == //
//  const tokenReissue = () => {
//   axios
//     .post(process.env.REACT_APP_SPRING_API + '/api/token', '', {
//       withCredentials: true,
//     })
//     .then((res) => {
//       console.log(res.data);
//       const authorization = res.headers.authorization;
//       // 이후 모든 axios 요청 헤더에 access token값 붙여서 보냄.
//       axios.defaults.headers.common['authorization'] = authorization;
//       console.log('AccessToken 발급 완료');
//       const decoded = tokenDecode(authorization);
//       setUsername(decoded.name);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// // === AccessToken 값 디코딩 === //
// const tokenDecode = (authorization) => {
//   var decoded = jwt_decode(authorization);
//   console.log(decoded);
//   return decoded;
// };
// useEffect(() => {
//   tokenReissue();
// }, []);
  


  // 주소 파라미터 받을때 수행할 hook
  useEffect(() => {
    axios.all([
      axios.get(process.env.REACT_APP_SPRING_API + `/api/post/view/${postId}`),
      axios.get(process.env.REACT_APP_SPRING_API + "/api/post/reply/view?id="+postId)
    ]) 
    .then(axios.spread((res1,res2)=>{
      console.log(res1.data.body);
      setContent(res1.data.body);

      console.log(res2.data.body);
      setReply(res2.data.body);
    })
  )
  .catch((err)=>{console.log(err)})
  }, [])

  const PostDelete = (e) =>{
    e.preventDefault();
    var id = content.id;
    axios.delete(process.env.REACT_APP_SPRING_API + "/api/post/delete/"+id)
    .then((res)=>{
      console.log(res.data);
      setDelCont(res.data);
      alert(res.data.message);
      navigate(-1);
      
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const PostUpdate = (e) =>{
    e.preventDefault();
    setForm(true)
  }

  const commuSubmit = (e) =>{
    e.preventDefault();
    var data = {
            id : e.target.id.defaultValue,
            title : e.target.title.value,
            content : e.target.content.value,
            type : e.target.type.value,
            member : content.member
    }
    console.log(data);
    var formData = new FormData();
    formData.append("userfile", e.target.userfile.files[0]);
    formData.append(
      "key", new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    axios.patch(process.env.REACT_APP_SPRING_API + "/api/post/update",formData,{
      headers : {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then((res)=>{
      console.log(res.data.body);
      setUpdate(res.data.body);
      alert(res.data.message);
      navigate(-1);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const RepCreateState = (e) =>{
    e.preventDefault();
    setCreateState(true);
  }

  const RepUpdateState = (e) =>{
    e.preventDefault();
    setUpdateState(true);
  }


  const RepCreate = (e) =>{
    var data = {
      parent : {id:content.id},
      title : e.target.title.value,
      content : e.target.content.value,
      type : e.target.type.value
    }
    var formData = new FormData();
    formData.append("userfile", e.target.userfile.files[0]);
    formData.append(
      "key", new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    axios.post(process.env.REACT_APP_SPRING_API + "/api/post/reply/create", formData, {
        //withCredentials: true,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSub(res.data.body);
        alert(res.data.message)
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const RepUpdate = (e) =>{
    var data = {
      id : reply.id,
      title : e.target.title.value,
      content : e.target.content.value,
      type : e.target.type.value
    }
    var formData = new FormData();
    formData.append("userfile", e.target.userfile.files[0]);
    formData.append(
      "key", new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    axios.patch(process.env.REACT_APP_SPRING_API + "/api/post/reply/update", formData, {
        //withCredentials: true,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSubUpdate(res.data.body);
        alert(res.data.message)
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const RepDelete = (e) =>{
    axios.delete(process.env.REACT_APP_SPRING_API + "/api/post/reply/delete?postId="+reply.id)
    .then((res)=>{
      alert("답글을 삭제합니다");
      console.log(res.data);
      setRepDel(res.data);
      alert(res.data.message);
      navigate(-1);
      
    })
    .catch((err)=>{
      console.log(err);
    });

  }
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
              <button onClick={PostDelete} style={{position: 'absolute', right: 0,}}>삭제하기</button>
              <button onClick={PostUpdate} style={{position: 'absolute', right: 70,}}>수정하기</button><br></br>
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
              <div className="post-view-row">
              </div>
      
             

              {createState ? 
                <>
              <form 
               id="myForm"
               name="myForm"
               onSubmit={RepCreate}
               encType="multipart/form-data"
               >
                <input type="text" placeholder="제목을 입력하세요" name="title" />
                <input type="text" placeholder="내용을 입력하세요" name="content" />
                <select type="text" placeholder="type" name="type" >
                    <option>NOTICE</option>
                    <option>FAQ</option>
                    <option>COMPLAINT</option>
                    <option>QNA</option>
                </select>
                <input type="file" name="userfile" multiple="multiple" />
                <button type="submit">submit</button>
               </form>
                </>
              :''
              }
            </>
          ) : (
            "해당 게시글을 찾을 수 없습니다."
          )}
          </div>
          {form ?
            <div>
              <form onSubmit={commuSubmit} encType="multipart/form-data">
                <input type="text" name="id" defaultValue={content.id} disabled={true}></input><br></br>
                제목 
                <input type="text" name="title" defaultValue={content.title}></input><br></br>
                내용 
                <input type="text" name="content" defaultValue={content.content}></input><br></br>
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
            :''
          }
          {
            reply ?
            <>
            <hr></hr>
            <h2>답글</h2>
            <div>
              {reply.content}<br></br>
              {reply.member.name}<br></br>
              <button onClick={RepUpdateState}>수정</button>
              <button onClick={RepDelete}>삭제</button>
            </div>
            </>
            :<div>
              <button onClick={RepCreateState}>답글등록</button><br></br>
            </div> 
          }

            {updateState ?
              <>
              <form 
               id="myForm"
               name="myForm"
               onSubmit={RepUpdate}
               encType="multipart/form-data"
               >
                <input type="text" placeholder={reply.title} name="title" />
                <input type="text" placeholder={reply.content} name="content" />
                <select type="text" placeholder={reply.type} name="type" >
                    <option>NOTICE</option>
                    <option>FAQ</option>
                    <option>COMPLAINT</option>
                    <option>QNA</option>
                </select>
                <input type="file" name="userfile" multiple="multiple" />
                <button type="submit">submit</button>
               </form>
              </>
              :''
            }



           <button
            className="post-view-go-list-btn"
            onClick={() => navigate(-1)}
          >
            목록으로 돌아가기
          </button>

         

      </CommuSubCon>
    </CommuCon>
  );
};
export default CommunityContents;
