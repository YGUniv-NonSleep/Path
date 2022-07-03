import axios from "axios";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearCart } from '../../../store/cart';

async function useSuccess() {
    // successUrl에서 처리할 작업
    // const [res, setRes] = useState(null)
    const { search } = useLocation();
    const navigator = useNavigate();
    const query = queryString.parse(search);
    const cart = useSelector((state) => state.cart);
    const memberId = useSelector((state) => state.user.id);
    const dispatch = useDispatch();

    const success = axios.create({
        baseURL: `${process.env.REACT_APP_SPRING_API}`,
        headers: { "Content-Type": "application/json" }
    }); 

    async function paymentVerification() {
        if (cart.totalAmount !== parseInt(query.amount)) {
            alert("결제된 금액이 일치하지 않습니다.")
            navigator("/pay/fail")
        }
        if(memberId == 0) return alert("회원 정보를 받아오지 못하였습니다.")
        console.log(memberId)
        let reqData = {
            totalAmount: cart.totalAmount,
            suppliedAmount: cart.totalAmount,
            paymentKey: query.paymentKey,
            tossOrderId: query.orderId,
            memberId: parseInt(memberId),
        }

        let products = [];
        cart.orderCompositionList.map((item)=>{
            products.push({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                detailOptionList: item.detailOptionList
            })    
        });
        reqData.orderCompositionList = products;
        console.log(reqData)
        const response = await success.post(`/api/order/product`, reqData)
        if (response.data.body.tossOrderId != null) {
            dispatch(clearCart())
            // setRes()
        }
    }
    
    useEffect(()=>{
        if (query != undefined && cart != undefined) {
            paymentVerification()
        } 
    }, [])

    // const success = axios.create({
    //     baseURL: `${process.env.REACT_APP_SPRING_API}`
    // }); 
    
    // try {
    //     const response = await success.get(`/api/pay`, {
    //         params: {
    //             paymentKey: res.paymentKey,
    //             orderId: res.orderId,
    //             amount: res.amount
    //         }
    //     })
    
    //     console.log(response)
    //     // 여기서 에러처리해야하는데 에러코드로 구분해야하나?

    // } catch (error) {
    //     console.log(error)
    // }

    return {
        
    }
}

export default useSuccess