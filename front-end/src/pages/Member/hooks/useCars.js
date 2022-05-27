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
  const [inputValue, setInputValue] = useState({
    carKind: '',
    carNum: '',
  });

  const goBackPage = () => {
    navigate(-1);
  };

  const handleInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    // 이미지 저장 시작
    e.preventDefault();
    let formData = new FormData();
    const multipartFile = e.target.imageFile.files[0];
    formData.append('multipartFile', multipartFile);

    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/image', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        const imageName = res.data;
        console.log(imageName);
        return imageName;
      })
      .then(async (imageName) => {
        // 차량 저장 시작
        const result = await addCars(imageName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCars = async (imageName) => {
    // 이미지경로값 가져왔으니 이것으로 차량 등록 시작
    await axios
      .post(process.env.REACT_APP_SPRING_API + '/api/cars', inputValue, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(inputValue);
  return {
    goBackPage,
    modalOpen,
    handleModalOpen,
    handleModalClose,
    inputValue,
    handleInput,
    handleSubmit,
  };
}

export default useCars;
