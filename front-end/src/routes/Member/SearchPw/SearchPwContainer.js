import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchPw from './SearchPwPresenter';
import ResetPw from './ResetPwPresenter';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function SearchPwContainer() {
  const theme = createTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isResetPw, setIsResetPw] = useState(false);
  const [inputValue, setInputValue] = useState({
    loginId: '',
    phone: '',
    password: '',
    rePassword: '',
  });
  const { loginId, phone, password, rePassword } = inputValue;
  const [loginIdError, setLoginIdError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const errorList = { loginIdError, phoneError, passwordState, passwordError };
  const [memberId, setMemberId] = useState('');

  const goBackPage = () => {
    navigate(-1);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const isValidSearchPwInput = () => {
    const loginIdRegex = /^[a-zA-Z0-9\s]+$/;
    if (!loginIdRegex.test(loginId) || loginId.length < 4)
      setLoginIdError('영문자+숫자 조합으로 4자리 이상 입력해주세요');
    else setLoginIdError('');

    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(phone) || phone.length < 1)
      setPhoneError('올바른 전화번호를 입력해주세요');
    else setPhoneError('');

    if (
      loginIdRegex.test(loginId) &&
      loginId.length >= 4 &&
      phoneRegex.test(phone) &&
      phone.length >= 1
    ) {
      console.log('유효성 검사 성공');
      return true;
    } else {
      console.log('유효성 검사 실패');
      return false;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!isValidSearchPwInput()) return;
    const data = {
      loginId: loginId,
      phone: phone,
    };
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/forgot/password', data, {
        withCredentials: true,
      })
      .then((res) => {
        alert(res.data.message);
        if (res.data.header.statusCode === 200) {
          setIsResetPw(true);
          setMemberId(res.data.body.id);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  };

  const isValidResetPwInput = () => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      );
    else setPasswordState('');

    if (password !== rePassword)
      setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    if (passwordRegex.test(password) && password === rePassword) {
      console.log('유효성 검사 성공');
      return true;
    } else {
      console.log('유효성 검사 실패');
      return false;
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!isValidResetPwInput()) return;
    const data = {
      password: password,
    };
    console.log(data);
    const url =
      process.env.REACT_APP_SPRING_API + '/api/forgot/password/' + memberId;
    console.log(url);
    axios
      .patch(url, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        goBackPage();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SearchPw
        loading={loading}
        handleSearchSubmit={handleSearchSubmit}
        handleInput={handleInput}
        errorList={errorList}
      ></SearchPw>
      {isResetPw ? (
        <ResetPw
          handleResetSubmit={handleResetSubmit}
          handleInput={handleInput}
          errorList={errorList}
        />
      ) : (
        ''
      )}
    </ThemeProvider>
  );
}

export default SearchPwContainer;
