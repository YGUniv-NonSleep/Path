import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function useBoardAdd() {
  let navigate = useNavigate();
  const [subAdd, setSub] = useState(null);

  const commuSubmit = (e) => {
    e.preventDefault();
    var data = {
      title: e.target.title.value,
      content: e.target.content.value,
      type: e.target.type.value,
    };
    var formData = new FormData();
    formData.append("userfile", e.target.userfile.files[0]);
    formData.append(
      "key",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    axios
      .post(process.env.REACT_APP_SPRING_API + "/api/post/create", formData, {
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
  };

  return { subAdd, commuSubmit }
}

export default useBoardAdd;
