import { useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from 'axios';
import useTokenReissue from '../../../hooks/useTokenReissue';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function useCard() {
  let user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const goBackPage = () => {
    navigate(-1);
  };

  async function requestBillingAuth() {
    const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;
    var tossPayments = await loadTossPayments(clientKey);
    tossPayments
      .requestBillingAuth('카드', {
        customerKey: user.loginId,
        successUrl: 'https://localhost:8080/api/card/success',
        failUrl: 'https://localhost:8080/api/card/fail',
      })
      .catch((err) => {
        if (err.code === 'USER_CANCEL') {
          console.log(err);
          console.log('사용자가 결제창을 닫았습니다.');
        }
      });
  }

  return {
    requestBillingAuth,
    goBackPage,
  };
}

export default useCard;
