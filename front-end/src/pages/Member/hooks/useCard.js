import { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from 'axios';
import useTokenReissue from '../../../hooks/useTokenReissue';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function useCard() {
  let user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [isRemove, setIsRemove] = useState(false);

  const toggleIsRemove = () => setIsRemove(!isRemove);

  const handleRemove = (card) => {
    if (window.confirm(`선택한 ${card.cardCompany}카드를 삭제하시겠습니까?`)) {
      removeMemberCard(card.id);
      toggleIsRemove();
    } else {
      toggleIsRemove();
    }
  };

  const removeMemberCard = (cardId) => {
    axios
      .delete(process.env.REACT_APP_SPRING_API + '/api/card/' + cardId, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
        getMemberCards();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const getMemberCards = () => {
    const data = {
      memberId: user.id,
    };

    axios
      .get(
        process.env.REACT_APP_SPRING_API + '/api/cards',
        { params: data },
        { withCredentials: true }
      )
      .then((res) => {
        setCards([...res.data.body]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMemberCards();
  }, []);

  return {
    cards,
    isRemove,
    toggleIsRemove,
    handleRemove,
    requestBillingAuth,
    goBackPage,
  };
}

export default useCard;
