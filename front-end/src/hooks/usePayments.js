import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import RandomString from '../utils/RandomString';

function usePayments() {
    const member = useSelector((state) => state.user)
    const cart = useSelector((state) => state.cart)
    
    const clientKey = 'test_ck_OAQ92ymxN34Zvz0zpbArajRKXvdk'
    // let tossOrderId;
    let paymentKey; // successUrl로 받아올 값
    let orderName;
    if(cart.orderCompositionList.length == 1) {
        // 상품 한 품목 일 때
        orderName = `${cart.orderCompositionList[0].name}`

    } else if(cart.orderCompositionList.length > 1) {
        // 상품 두 품목 이상일 때
        orderName = `${cart.orderCompositionList[0].name} 외 ${cart.orderCompositionList.length - 1}건`
    }

    async function tossPayments(){
        try {
            const tossPayments = await loadTossPayments(clientKey)
            const result = await tossPayments.requestPayment('CARD', {
                amount: cart.totalAmount,
                orderId: RandomString(),
                orderName: orderName,
                customerName: member.name,
                successUrl: process.env.REACT_APP_SPRING_API + '/api/pay',
                failUrl: process.env.REACT_APP_SPRING_API + '/api/fail',
            })

        } catch (error) {
            console.log(error)
        }
    }

    // method(data, {}, callback)
    // https://docs.tosspayments.com/reference/js-sdk
    // https://tossdev.github.io/api.html#resultcallback
    // return 
}

export default usePayments