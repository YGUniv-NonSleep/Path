import { PropaneSharp } from "@mui/icons-material";
import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import axios from "axios";
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

function CommunityAdd(){
    let navigate = useNavigate();
    const [subadd,setSub] =  useState(null);
    const commuSubmit = (e) =>{
        e.preventDefault();
        var data = {
            title : e.target.title.value,
            content : e.target.content.value,
            type : e.target.type.value
        }
        var formData = new FormData();
        formData.append("userfile", e.target.userfile.files[0]);
        formData.append(
          "key", new Blob([JSON.stringify(data)], { type: "application/json" })
        );
        axios.post(process.env.REACT_APP_SPRING_API + "/api/post/create", formData, {
            //withCredentials: true,
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          })
          .then((res) => {
            console.log(res.data.body);
            setSub(res.data.body);
            alert(res.data.message);
            navigate(-1);
          })
          .catch((err) => {
            console.log(err);
          });
    }

    return(
    <div className="CommunityAdds">
         <CommuCon>
             <CommuSubCon>
                <form
                id="myForm"
                name="myForm"
                onSubmit={commuSubmit}
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
             </CommuSubCon>
         </CommuCon>
          
     
     </div>
    );
}


export default CommunityAdd;