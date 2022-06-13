import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import getStore from "../../../../store/comp";

function useCompManageMain() {
  const [myStore, setMyStore] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getMyStore() {
    axios
      .get(process.env.REACT_APP_SPRING_API + "/api/company/myStore")
      .then((res) => {
        // 새로고침 오류
        setMyStore(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    dispatch(getStore())
    // getMyStore();
    return () => {
      // console.log("unmounted")
      // 데이터 초기화가 확실히 필요한 곳에서 사용
      //setMyStore([]); 
    };
  }, []);

  useEffect(() => {
    console.log(myStore)
    if(location.pathname === "/company/manage"){
        myStore.map((item) => {
            console.log(item.id);
          });
    } else {
        console.log("생성된 업체가 존재하지 않습니다.");
      // alert("마이 업체 페이지로 이동합니다.");
      // return navigate("/company/store");
    }
  }, [myStore]);

//   useEffect(() => {
//     // console.log("a")
//     // 관리에서 마이 업체로 넘어갈 때 이전 pathname 때문에 안의 내용이 한번 더 실행됨. 수정 필요
//     if (myStore.length != 0) {
//       myStore.map((item) => {
//         console.log(item.id);
//       });
//     } else {
//       console.log("생성된 업체가 존재하지 않습니다.");
//       // alert("마이 업체 페이지로 이동합니다.");
//       // return navigate("/company/store");
//     }
//   }, [location.pathname === "/company/manage"]);

  return { myStore, getMyStore }
}

export default useCompManageMain;