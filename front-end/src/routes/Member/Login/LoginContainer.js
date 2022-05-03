import { useEffect, useState } from 'react';
import LoginPresenter from './LoginPresenter';
import axios from 'axios';

function LoginContainer() {
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

  const isValidInput = () => {
    const loginIdRegex = /^[a-zA-Z0-9\s]+$/;
    if (!loginIdRegex.test(loginId) || loginId.length < 4)
      setLoginIdError('영문자+숫자 조합으로 4자리 이상 입력해주세요');
    else setLoginIdError('');

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordError(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      );
    else setPasswordError('');

    if (loginIdRegex.test(loginId) && passwordRegex.test(password)) {
      console.log('유효성 검사 성공');
      return true;
    } else {
      console.log('유효성 검사 실패');
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidInput()) return;
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

  return (
    <LoginPresenter
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      errorList={errorList}
    ></LoginPresenter>
  );
}
export default LoginContainer;
