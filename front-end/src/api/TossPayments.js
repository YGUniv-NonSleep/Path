import { loadTossPayments } from '@tosspayments/payment-sdk';
import RandomString from '../utils/RandomString';

async function TossPayments(member, cart) {
    try {
        console.log("toss")

        let orderName;
        if(cart.orderCompositionList.length == 1) {
            // 상품 한 품목 일 때
            orderName = `${cart.orderCompositionList[0].name}`

        } else if(cart.orderCompositionList.length > 1) {
            // 상품 두 품목 이상일 때
            orderName = `${cart.orderCompositionList[0].name} 외 ${cart.orderCompositionList.length - 1}건`
        }

        if(member.id === 0) {
            return alert("회원 정보가 확인되지 않습니다.")
        }
        else if(cart.comId === 0) {
            return alert("업체 정보가 확인되지 않습니다.")
        }
        else {
            const clientKey = process.env.REACT_APP_TOSS_TEST_CLIENT_KEY;

            // 토스페이먼츠 객체 생성
            const loadToss = await loadTossPayments(clientKey)
            const ran = RandomString();

            // 결제 창 오픈
            await loadToss.requestPayment('카드', {
                amount: cart.totalAmount,
                orderId: ran, 
                orderName: orderName,
                customerName: member.name,
                successUrl: `https://localhost:3001/pay/success`,
                failUrl: `https://localhost:3001/pay/fail`
            })
        }

    } catch (error) {
        alert("결제가 취소되었습니다.")
        console.log(error)
    }
}

export default TossPayments