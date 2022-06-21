import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useTokenReissue from "../../../hooks/useTokenReissue";

function useBoardAdd() {
  let navigate = useNavigate();
  const [subAdd, setSub] = useState(null);

  const token = useTokenReissue();

  const commuSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
      type: e.target.type.value,
    }

    let formData = new FormData();
    const multipartFile = e.target.userfile.files[0];
    formData.append('multipartFile',multipartFile);

    axios.post(process.env.REACT_APP_SPRING_API+'/api/image',formData,{
      withCredentials : true,
      headers : {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res)=>{
      console.log(res);
      const imageName = res.data;
      console.log(imageName);
      return imageName;
    })
    .then(async (imageName) =>{
      const result = await createPost(imageName,data);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const createPost = async (imageName,data) => {
   
    const addData = {
      title : data.title,
      content : data.content,
      type : data.type,
      photoName : imageName
    }
    await axios.post(process.env.REACT_APP_SPRING_API + "/api/post",addData,{
      withCredentials : true,
    })
    .then((res)=>{
      console.log(res);
      setSub(res.data.body);
      alert(res.data.message);
      navigate(-1);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return { subAdd, commuSubmit,createPost }
}

export default useBoardAdd;
