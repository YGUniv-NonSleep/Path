import { useEffect, useState } from 'react';
import axios from 'axios';

function useLogin() {
  const [inputValue, setInputValue] = useState({
    loginId: '',
    password: '',
  });
  const { loginId, password } = inputValue;

  const [loginIdError, setLoginIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const errorList = {
    loginIdError,
    passwordError,
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: loginId,
      password: password,
    };
    axios
      .post(process.env.REACT_APP_SPRING_API + '/login', data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        console.log(res.headers.authorization);
        onLoginSuccess(res);
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
    window.location.href = '/';
  };

  return {
    inputValue,
    handleInput,
    handleSubmit,
    onLoginSuccess,
  };
}

export default useLogin;
