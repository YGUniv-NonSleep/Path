import axios from "axios";
import { add } from "date-fns";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function useCompOrder(){
    const [OrderList, setOrderList] = useState([]);

    function getOrderList(){
        axios.get(process.env.REACT_APP_SPRING_API + `/api/order/?companyId=${1}`)
        .then((res)=>{
                    

        })
        .catch((err)=>{

        })
    }
    



    useEffect(() => {
        getOrderList();
        return () => {
           setOrderList([]);
        };
      }, []);



    return {

    };
}

export default useCompOrder;