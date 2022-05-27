import axios from "axios";
import { useEffect, useState } from "react";

function useCompStore(){
  const [myStore, setMyStore] = useState([]);
  const [storeDetail, setStoreDetail] = useState(null);

  //== 모달 창 제어 ==//
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
    setStoreDetail(myStore[e.target.value-1])
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
        // console.log(res.data.body);
         setMyStore(res.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  useEffect(() => {
    getMyStore();
    return () => {
      setMyStore([]); // unmount
    };
  }, []);

  return {
    myStore, storeDetail, open, 
    getMyStore, handleOpen, handleClose
  }
}

export default useCompStore;