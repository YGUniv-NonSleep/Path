import { useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from 'axios';
import useTokenReissue from '../../../hooks/useTokenReissue';

function useCard() {
  const { token } = useTokenReissue();

  async function requestBillingAuth() {
    console.log(token);
    const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;
    var tossPayments = await loadTossPayments(clientKey);
    tossPayments
      .requestBillingAuth('카드', {
        customerKey: token.name,
        successUrl: 'https://localhost:8080/api/card/success',
        failUrl: 'https://localhost:8080/api/card/fail',
      })
      .catch((err) => {
        if (error.code === 'USER_CANCEL') {
          // 사용자가 결제창을 닫은 경우 에러 처리
          console.log(err);
          console.log('사용자가 결제창을 닫았습니다.');
        }
      });
  }

  return {
    requestBillingAuth,
  };
}

export default useCard;
