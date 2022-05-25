import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useSearchId() {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
  });
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const goBackPage = () => {
    navigate(-1);
  };

  const handleInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const isValidInput = () => {
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(inputValue.name) || inputValue.name.length < 1)
      setNameError('올바른 이름을 입력해주세요');
    else setNameError('');

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email))
      setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    if (emailRegex.test(inputValue.email) && nameRegex.test(inputValue.name)) {
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
      name: inputValue.name,
      mail: inputValue.email,
    };
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/forgot/loginid', data, {
        withCredentials: true,
      })
      .then((res) => {
        alert(
          res.data.message + '\n' + '회원 아이디 : ' + res.data.body.loginId
        );
        goBackPage();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  };

  return {
    inputValue,
    handleInput,
    handleSubmit,
    nameError,
    emailError,
    goBackPage,
  };
}

export default useSearchId;
