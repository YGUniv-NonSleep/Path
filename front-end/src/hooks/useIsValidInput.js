import { useEffect, useState } from 'react';

function useIsValidInput() {
  const [loginIdError, setLoginIdError] = useState('');
  const [passwordState, setPasswordState] = useState(''); // 비밀번호 규칙
  const [passwordError, setPasswordError] = useState(''); // 비밀번호 재입력 확인
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [checked, setChecked] = useState(false);
  const [postIdError, setPostIdError] = useState('');
  const [addrDetailError, setAddrDetailError] = useState('');
  const [addrExtraError, setAddrExtraError] = useState('');
  const [addrError, setAddrError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');

  // 추후 utils로 이동
  // util 함수로 만들어서 export 예정

  if (role == '' || role == undefined) setRoleError('회원유형을 선택해주세요');
  else setRoleError('');

  const loginIdRegex = /^[a-zA-Z0-9\s]+$/;
  if (!loginIdRegex.test(loginId) || loginId.length < 4)
    setLoginIdError('영문자+숫자 조합으로 4자리 이상 입력해주세요');
  else setLoginIdError('');

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  if (!passwordRegex.test(password))
    setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
  else setPasswordState('');

  const rePasswordRegex = () => {
    if (password !== rePassword)
      setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');
  };

  const nameRegex = /^[가-힣a-zA-Z]+$/;
  if (!nameRegex.test(name) || name.length < 1)
    setNameError('올바른 이름을 입력해주세요');
  else setNameError('');

  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
  else setEmailError('');

  const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
  if (!phoneRegex.test(phone) || phone.length < 1)
    setPhoneError('올바른 전화번호를 입력해주세요');
  else setPhoneError('');

  const addrDetailRegex = /^[가-힣\s0-9a-zA-Z]+$/;
  if (!isEmpty(addrDetail)) {
    if (!addrRegex.test(addrDetail))
      setAddrDetailError('올바른 상세주소를 입력해주세요');
    else setAddrDetailError('');
  }

  if (isEmpty(addrExtra)) setAddrExtraError('주소 찾기를 해주세요');
  else setAddrExtraError('');

  if (isEmpty(addr)) setAddrError('주소 찾기를 해주세요');
  else setAddrError('');

  if (isEmpty(postId)) setPostIdError('주소 찾기를 해주세요');
  else setPostIdError('');

  const genderRegex = /^[A-Z]+$/;
  if (!genderRegex.test(gender) || gender.length < 1)
    setGenderError('올바른 성별을 선택해주세요');
  else setGenderError('');

  if (birthday == null) setBirthdayError('생년월일을 입력해주세요');
  else setBirthdayError('');

  if (checked == false) alert('회원가입 약관에 동의해주세요.');

  return {};
}

export default useIsValidInput;
