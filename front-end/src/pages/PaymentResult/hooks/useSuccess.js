import axios from "axios";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

async function useSuccess() {
    // successUrl로 받아올 값
    const [res, setRes] = useState(null)
    const { search } = useLocation();
    const query = queryString.parse(search);
    
    useEffect(()=>{
        setRes(query)
    }, [])
            
    // 결제 요청 후 성공/실패에 따라 보낼 url
    // const authorizationKey = btoa(`Basic ${process.env.REACT_APP_TOSS_TEST_SECRET_KEY}:`)
    // const success = axios.create({
    //     baseURL: `https://api.tosspayments.com/v1/payments`,
    //     headers: { 
    //         Authorization: authorizationKey,
    //         "Content-Type": "application/json"
    //     }
    // }); 
    
    // const response = await success.post(`/confirm`, {
    //     "paymentKey": res.paymentKey,
    //     "orderId": res.orderId,
    //     "amount": parseInt(res.amount)
    // }).catch((err)=>console.log(err))

    // console.log(response)

    const success = axios.create({
        baseURL: `${process.env.REACT_APP_SPRING_API}`
    }); 
    
    try {
        const response = await success.get(`/api/pay`, {
            params: {
                paymentKey: res.paymentKey,
                orderId: res.orderId,
                amount: res.amount
            }
        })
    
        console.log(response)
        // 여기서 에러처리해야하는데 에러코드로 구분해야하나?

    } catch (error) {
        console.log(error)
    }

    return {
        
    }
}

export default useSuccess