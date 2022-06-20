import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import useTokenReissue from "../../../hooks/useTokenReissue";

function useBoardContents() {
  let navigate = useNavigate();
  const { postId } = useParams(); // 파라미터
  const [content, setContent] = useState(null);
  const [del, setDelCont] = useState(null);
  const [repDel, setRepDel] = useState(null);
  const [postUpdateForm, setUpdateForm] = useState(false);
  const [ab,setAB] = useState("");
  const [update, setUpdate] = useState(null);
  const [reply, setReply] = useState(null);
 
  const [subAdd, setSub] = useState(null);
  const [updateState, setUpdateState] = useState(false);
  const [subUpdate, setSubUpdate] = useState(null);
  const [userRole, setRole] = useState("");
  const [buttonReact, setButtonReact] = useState(true);
 
  const [username, setUsername] = useState("");
  const token = useTokenReissue();

  useEffect(()=>{
    tokenReissue();
  },[])

  //=== AccessToken 재발급 == //
  const tokenReissue = () => {
    axios
      .post(process.env.REACT_APP_SPRING_API + "/api/token", "", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const authorization = res.headers.authorization;
        // 이후 모든 axios 요청 헤더에 access token값 붙여서 보냄.
        axios.defaults.headers.common["authorization"] = authorization;
        const decoded = tokenDecode(authorization);
        // tokenReissue에서 decoded 받은걸로 userName, role 등록해주면될듯
        setUsername(decoded.name);
        setRole(decoded);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // === AccessToken 값 디코딩 === //
  const tokenDecode = (authorization) => {
    var decoded = jwt_decode(authorization);
    return decoded;
  };


  // 주소 파라미터 받을때 수행할 hook
  const getPostId = () => {
    axios
      .all([
        axios.get(
          process.env.REACT_APP_SPRING_API + `/api/post/view/${postId}`
        ),
        axios.get(
          process.env.REACT_APP_SPRING_API + `/api/post/reply/${postId}`
        ),
      ])
      .then(
        axios.spread((res1, res2) => {

          console.log(res1.data.body);
          setContent(res1.data.body);

          console.log(res2.data.body);
          setReply(res2.data.body);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
 

  useEffect(() => {
    getPostId()
  }, []);

  const PostDelete = (e) => {
    e.preventDefault();
    var id = content.id;
    axios
      .delete(process.env.REACT_APP_SPRING_API + `/api/post/${id}`)
      .then((res) => {
        console.log(res.data);
        setDelCont(res.data);
        alert(res.data.message);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PatchPostContents = (e) => {
    e.preventDefault();
    var data = {
      title : e.target.title.value,
      content : e.target.content.value,
      type : e.target.type.value,
    }
    console.log(data);
    var formData = new FormData();
    formData.append("userfile", e.target.userfile.files[0]);
    formData.append(
      "key",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    axios.patch(process.env.REACT_APP_SPRING_API + `/api/post/${content.id}`,formData,
    {
      headers : {
        "Content-Type": `multipart/form-data`,
      },
    })
    .then((res)=>{
      console.log(res.data) ;
      setUpdate(res.data.body);
      alert(res.data.message);
      // window.location.reload();
    })
    .catch((err)=>{
      console.log(err)
    })

  }

  const RepCreate = (e) => {
    e.preventDefault();
    var data = {
      postId : content.id,
      title: e.target.title.value,
      content: e.target.content.value,
      type: e.target.type.value,
    };

    console.log(data);
    var formData = new FormData();
    formData.append("userfile", e.target.userfile.files[0]);
    formData.append(
      "key",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    axios
      .post(
        process.env.REACT_APP_SPRING_API + "/api/post/reply",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSub(res.data.body);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.data.message)
      });
  };

  const RepUpdate = (e) => {
    e.preventDefault();
    var data = {
      title: e.target.title.value,
      content: e.target.content.value,
      type: e.target.type.value,
    };
    console.log(data);

    var formData = new FormData();
    formData.append("userfile", e.target.userfile.files[0]);
    formData.append(
      "key",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    axios
      .patch(
        process.env.REACT_APP_SPRING_API + `/api/post/reply/${postId}`,
        formData,
        {
          //withCredentials: true,
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSubUpdate(res.data.body);
        alert(res.data.message);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RepDelete = (e) => {
    e.preventDefault();
    axios
      .delete(process.env.REACT_APP_SPRING_API +`/api/post/reply/${reply.id}`)
      .then((res) => {
        alert("답글을 삭제합니다");
        console.log(res);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    content, del, repDel, postUpdateForm, update, reply, 
    subAdd, subUpdate, userRole, buttonReact,
    username, postId,token,ab,
    navigate, getPostId, PostDelete, tokenReissue,tokenDecode,
    RepCreate, RepUpdate, RepDelete, 
    setUpdateForm,PatchPostContents
  };
}

export default useBoardContents;
