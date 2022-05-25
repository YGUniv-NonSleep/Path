import { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import axios from 'axios';
import useTokenReissue from '../../../hooks/useTokenReissue';
import { useNavigate } from 'react-router-dom';

function useCars() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const goBackPage = () => {
    navigate(-1);
  };

  return {
    goBackPage,
    modalOpen,
    handleModalOpen,
    handleModalClose,
  };
}

export default useCars;
