import axios from 'axios';
import { loadTossPayments } from '@tosspayments/payment-sdk'
// import { useDispatch, useSelector } from 'react-redux';
import RandomString from '../utils/RandomString';

async function TossPayments(member, cart) {
    try {
        // const member = useSelector((state) => state.user)
        // const cart = useSelector((state) => state.cart)
        let orderName;
        if(cart.orderCompositionList.length == 1) {
            // 상품 한 품목 일 때
            orderName = `${cart.orderCompositionList[0].name}`

        } else if(cart.orderCompositionList.length > 1) {
            // 상품 두 품목 이상일 때
            orderName = `${cart.orderCompositionList[0].name} 외 ${cart.orderCompositionList.length - 1}건`
        }

        if(member.id === 0) return
        else if(cart.comId === 0) return
        else {
            const clientKey = process.env.REACT_APP_TOSS_TEST_CLIENT_KEY;

            // 토스페이먼츠 객체 생성
            const loadToss = await loadTossPayments(clientKey)
            const ran = RandomString();
            console.log(ran)
            console.log(ran.length)
            console.log("tt9QU8awvTsGkTsn-Md0g1_q".length)

            // 결제 창 오픈
            let result = await loadToss.requestPayment('카드', {
                amount: cart.totalAmount,
                orderId: ran, 
                orderName: orderName,
                customerName: member.name,
                successUrl: `https://localhost:3001/pay/success`,
                failUrl: `https://localhost:3001/pay/fail`

            }).catch((err)=>{
                console.log(err)
            })
            // https://docs.tosspayments.com/reference/js-sdk#%EA%B2%B0%EC%A0%9C-%EC%9A%94%EC%B2%AD%EC%97%90-%EC%84%B1%EA%B3%B5%ED%96%88%EC%9D%84-%EB%95%8C
            // https://github.com/tosspayments/node-sample/blob/main/routes/index.js
            // return
        }

    } catch (error) {
        alert("결제가 취소되었습니다.")
        console.log(error)
    }
}

export default TossPayments