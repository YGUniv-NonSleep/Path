import SignUpPresenter from './SignUpPresenter';
import { useEffect, useState, React } from 'react';
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

  const [birthday, setBirtyday] = useState(null);

  const handleBirtyday = (date) => {
    console.log(date);
    console.log(dayjs(date).format('YYYY-MM-DD'));
    setBirtyday(dayjs(date).format('YYYY-MM-DD'));
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
    // 정규표현식으로 유효성 체크 시작
    const loginIdRegex = /^[a-zA-Z0-9\s]+$/;
    if (!loginIdRegex.test(loginId))
      setLoginIdError('올바른 아이디 형식이 아닙니다.');
    else setLoginIdError('');

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email))
      setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      );
    else setPasswordState('');

    // 비밀번호 같은지 체크
    if (password !== rePassword)
      setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1)
      setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    // 전화번호 유효성 검사
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(phone) || phone.length < 1)
      setPhoneError('올바른 전화번호를 입력해주세요');
    else setPhoneError('');

    // 주소
    const addrRegex = /^[가-힣\s0-9a-zA-Z]+$/;
    if (!addrRegex.test(addr) || addr.length < 1)
      setAddrError('올바른 주소를 입력해주세요');
    else setAddrError('');

    // 상세주소
    if (!addrRegex.test(addrDetail))
      setAddrDetailError('올바른 상세주소를 입력해주세요');
    else setAddrDetailError('');

    // 성별
    const genderRegex = /^[A-Z]+$/;
    if (!genderRegex.test(gender) || gender.length < 1)
      setGenderError('올바른 성별을 선택해주세요');
    else setGenderError('');

    // 생일
    if (birthday == null) setBirthdayError('생년월일을 입력해주세요');
    else setBirthdayError('');

    // 회원가입 동의 체크
    if (!checked) alert('회원가입 약관에 동의해주세요.');

    console.log(password);
    console.log(rePassword);

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
        window.location.href = '/login';
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
      handleBirtyday={handleBirtyday}
      inputValue={inputValue}
      birthday={birthday}
    ></SignUpPresenter>
  );
}

export default SignUpContainer;
