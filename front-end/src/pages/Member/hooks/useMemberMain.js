import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function useMemberMain(){
  const [memberId, setMemberId] = useState("");
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const tokenReissue = () => {
    axios
      .post(process.env.REACT_APP_SPRING_API + "/api/token", "", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const authorization = res.headers.authorization;
        axios.defaults.headers.common["authorization"] = authorization;
        console.log("AccessToken 발급 완료");
        const decoded = tokenDecode(authorization);
        setMemberId(decoded.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tokenDecode = (authorization) => {
    var decoded = jwt_decode(authorization);
    console.log(decoded);
    return decoded;
  };

  useEffect(() => {
    tokenReissue();
  }, []);

  const userLogOut = () => {
    axios
      .delete(process.env.REACT_APP_SPRING_API + "/api/token", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMember = () => {
    userLogOut();
    const url = process.env.REACT_APP_SPRING_API + "/api/member/" + memberId;
    axios
      .delete(url, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.header.statusCode == 200) {
          alert(res.data.message);
          setMemberId("");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

    return {
        memberId, open, 
        toggleDrawer, userLogOut, deleteMember, 
        tokenReissue, tokenDecode
    }  
}

export default useMemberMain