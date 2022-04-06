import SignUpPresenter from './SignUpPresenter';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

function SignUpContainer() {
  // ====== 회원가입 입력 ====== //
  const [inputValue, setInputValue] = useState({
    loginId: '',
    password: '',
    rePassword: '',
    email: '',
    name: '',
    phone: '',
    addr: '',
    addrDetail: '',
    gender: 'MALE',
  });

  const {
    loginId,
    email,
    name,
    password,
    rePassword,
    phone,
    addr,
    addrDetail,
    gender,
  } = inputValue;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const [birthday, setBirthday] = useState(null);

  const handleBirthday = (date) => {
    console.log(date);
    console.log(dayjs(date).format('YYYY-MM-DD'));
    setBirthday(dayjs(date).format('YYYY-MM-DD'));
  };

  // ====== 회원가입 입력 유효성 검사 ====== //
  const [loginIdError, setLoginIdError] = useState('');
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addrError, setAddrError] = useState('');
  const [addrDetailError, setAddrDetailError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const errorList = {
    loginIdError,
    emailError,
    passwordState,
    passwordError,
    nameError,
    phoneError,
    addrError,
    addrDetailError,
    genderError,
    birthdayError,
    registerError,
  };

  const handleAgree = (e) => {
    setChecked(e.target.checked);
  };

  const isValidInput = () => {
    const loginIdRegex = /^[a-zA-Z0-9\s]+$/;
    if (!loginIdRegex.test(loginId))
      setLoginIdError('올바른 아이디 형식이 아닙니다.');
    else setLoginIdError('');

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email))
      setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

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

    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1)
      setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(phone) || phone.length < 1)
      setPhoneError('올바른 전화번호를 입력해주세요');
    else setPhoneError('');

    const addrRegex = /^[가-힣\s0-9a-zA-Z]+$/;
    if (!addrRegex.test(addr) || addr.length < 1)
      setAddrError('올바른 주소를 입력해주세요');
    else setAddrError('');

    if (!addrRegex.test(addrDetail))
      setAddrDetailError('올바른 상세주소를 입력해주세요');
    else setAddrDetailError('');

    const genderRegex = /^[A-Z]+$/;
    if (!genderRegex.test(gender) || gender.length < 1)
      setGenderError('올바른 성별을 선택해주세요');
    else setGenderError('');

    if (birthday == null) setBirthdayError('생년월일을 입력해주세요');
    else setBirthdayError('');

    if (!checked) alert('회원가입 약관에 동의해주세요.');

    if (
      loginIdRegex.test(loginId) &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&
      phoneRegex.test(phone) &&
      addrRegex.test(addr) &&
      addrRegex.test(addrDetail) &&
      genderRegex.test(gender) &&
      birthday != null &&
      checked
    ) {
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
      loginId: loginId,
      mail: email,
      name: name,
      password: password,
      phone: phone,
      addr: addr,
      addrDetail: addrDetail,
      gender: gender,
      birthday: birthday,
    };
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/signup', data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.header.statusCode != 200) {
          alert(res.data.message);
        } else {
          alert('패스콕 회원가입이 되셨습니다.');
          window.location.href = '/login';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SignUpPresenter
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      handleAgree={handleAgree}
      errorList={errorList}
      handleBirthday={handleBirthday}
      inputValue={inputValue}
      birthday={birthday}
    ></SignUpPresenter>
  );
}

export default SignUpContainer;
