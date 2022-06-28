import PropTypes from "prop-types";
import styled from "styled-components";
import {loadTossPayments} from '@tosspayments/payment-sdk'



const OderCon = styled.div`
    width: 390px;
    height: 100%;
`;

const OderSubCon = styled.div`
    margin-left: 130px;
`;

function PaymentsPresenter(props) {
    // console.log(props)

    const clientKey = 'test_ck_OAQ92ymxN34Zvz0zpbArajRKXvdk'

    async function toss(){

    const tossPayments =await loadTossPayments(clientKey)

            console.log(tossPayments)

            const rs = await tossPayments.requestPayment('카드', {            
            amount: 30000,
            orderId: 'tt9QU8awvTsGkTsn-Md0g1',
            orderName: '아메리카노 외 3개',
            customerName: '박토스',

            successUrl: process.env.REACT_APP_SPRING_API + '/api/pay',
            failUrl: process.env.REACT_APP_SPRING_API + '/api/fail',
          }).catch((err)=>{
              console.log(err)
          })

          alert(rs)

    }

    toss()

    


    

    
    
    return (
        <div className="Oder">
            <OderCon>
                <OderSubCon>
                { props.loading ? <p>pay</p> : <h2>로드 중...</h2> }
                
                <div>

                </div>

                </OderSubCon>
            </OderCon>            
        </div>
    )
}

PaymentsPresenter.propTypes = {
    // ex) prop: PropTypes.type.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default PaymentsPresenter;