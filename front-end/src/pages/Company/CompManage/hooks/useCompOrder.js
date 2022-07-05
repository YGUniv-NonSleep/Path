import axios from "axios";
import { add } from "date-fns";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function useCompOrder(){
    const [orderList, setOrderList] = useState([]);  
    const [clickedOrderHandle, setClickedOrderHandle] = useState(false);
    const [clickedOrder, setClickedOrder] = useState(null)
    const companyId = useOutletContext();    

    function changeClickedOrderState(){
        setClickedOrderHandle( !clickedOrderHandle )
    }

    // function openDetailForm(id){

    //     axios.get(process.env.REACT_APP_SPRING_API + `/api/order/${id}`)
    //     .then((res)=>{
    //         console.log(res)
    //         setOrderList(res.data.body);            
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     }) 
    //     setClickedOrderHandle(true)
    // }

    function changeState(state , orderId){

        console.log(state )
        console.log(orderId)

        axios.patch(process.env.REACT_APP_SPRING_API + `/api/order/orderState?orderId=${orderId}&state=${state}`)
        .then((res)=>{
            getOrderList()
        })
        .catch((err)=>{
            console.log(err)
        })

    }
    

    function getOrderList(){
        axios.get(process.env.REACT_APP_SPRING_API + `/api/order/?companyId=${companyId}`)
        .then((res)=>{
            console.log(res)
            setOrderList(res.data.body);            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    useEffect(() => {
        getOrderList();
        return () => {
           setOrderList([]);
        };
      }, []);



    return {
        orderList,clickedOrderHandle,
        // openDetailForm
        changeState
        

    };
}

export default useCompOrder;