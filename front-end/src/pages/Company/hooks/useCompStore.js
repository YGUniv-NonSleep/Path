import axios from "axios";
import { useEffect, useState } from "react";

function useCompStore(){
  const [myStore, setMyStore] = useState([]);

  //== 모달 창 제어 ==//
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    if (open === true) return setOpen(false);
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
    myStore, open, 
    getMyStore, handleOpen, handleClose
  }
}

export default useCompStore;