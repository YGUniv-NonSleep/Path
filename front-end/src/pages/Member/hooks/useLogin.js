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
        onLoginSuccess(res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  };

  const onLoginSuccess = (res) => {
    const authorization = res.headers.authorization;
    axios.defaults.headers.common['authorization'] = authorization; // axios 모든 요청 헤더에 토큰값 넣기
    tokenReissue();
  };

  return {
    inputValue,
    handleInput,
    handleSubmit,
  };
}

export default useLogin;
