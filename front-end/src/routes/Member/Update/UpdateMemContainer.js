import axios from 'axios';
import UpdateMemPresenter from './UpdateMemPresenter';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function UpdateMemContainer() {
  const navigate = useNavigate();

  const goBackPage = () => {
    navigate(-1);
  };
  const [memberId, setMemberId] = useState('');

  useEffect(() => {
    tokenReissue();
    console.log('실행됨');
  }, []);

  // === AccessToken 재발급 == //
  const tokenReissue = () => {
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/token', '', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const authorization = res.headers.authorization;
        // 이후 모든 axios 요청 헤더에 access token값 붙여서 보냄.
        axios.defaults.headers.common['authorization'] = authorization;
        console.log('AccessToken 발급 완료');
        const decoded = tokenDecode(authorization);
        setMemberId(decoded.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // === AccessToken 값 디코딩 === //
  const tokenDecode = (authorization) => {
    var decoded = jwt_decode(authorization);
    return decoded;
  };

  const [inputValue, setInputValue] = useState({
    email: '',
    phone: '',
    addr: '',
    addrDetail: '',
  });

  const { email, phone, addr, addrDetail } = inputValue;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addrError, setAddrError] = useState('');
  const [addrDetailError, setAddrDetailError] = useState('');

  const errorList = { emailError, phoneError, addrError, addrDetailError };

  const isValidInput = () => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email))
      setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      mail: email,
      phone: phone,
      addr: addr,
      addrDetail: addrDetail,
    };
    const url = process.env.REACT_APP_SPRING_API + '/api/member/' + memberId;
    axios
      .patch(url, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UpdateMemPresenter
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      errorList={errorList}
      inputValue={inputValue}
      goBackPage={goBackPage}
    ></UpdateMemPresenter>
  );
}

export default UpdateMemContainer;
