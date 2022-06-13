import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

function useCompStore(){
  const userInfo = useSelector((state) => state);
  const [myStore, setMyStore] = useState([]);
  const [storeDetail, setStoreDetail] = useState(null);

  //== 모달 창 제어 ==//
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
    setStoreDetail(myStore[e.target.value])
  };

  const handleClose = () => {
    if (open === true) {
      setOpen(false)
      setStoreDetail(null)
    }
  };

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
    getMyStore();
    return () => {
      console.log("unmounted")
      // 데이터 초기화가 확실히 필요한 곳에서 사용
      //setMyStore([]); 
    };
  }, []);

  return {
    myStore, storeDetail, open, 
    getMyStore, handleOpen, handleClose
  }
}

export default useCompStore;