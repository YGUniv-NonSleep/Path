import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useTokenReissue from '../../../hooks/useTokenReissue';

function useLogin() {
  const { tokenReissue } = useTokenReissue();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    loginId: '',
    password: '',
  });

  const handleInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: inputValue.loginId,
      password: inputValue.password,
    };
    axios
      .post(process.env.REACT_APP_SPRING_API + '/login', data, {
        withCredentials: true,
      })
      .then((res) => {
        tokenReissue();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  };

  return {
    inputValue,
    handleInput,
    handleSubmit,
  };
}

export default useLogin;
