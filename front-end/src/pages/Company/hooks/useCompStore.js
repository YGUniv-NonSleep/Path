import axios from "axios";
import { useEffect, useState } from "react";

function useCompStore(){
  const [myStore, setMyStore] = useState([]);

  function getMyStore() {
    axios
      .get(process.env.REACT_APP_SPRING_API + "/api/company/myStore")
      .then((res) => {
        // console.log(res.data.body);
         setMyStore(res.data.body);
        //setMyStore((cur)=>[...cur, res.data.body])
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
    myStore, 
    getMyStore
  }
}

export default useCompStore;