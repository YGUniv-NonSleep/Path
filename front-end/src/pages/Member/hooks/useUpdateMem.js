import axios from 'axios';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from '../../../utils/StringUtil';

function useUpdateMem(){
    const navigate = useNavigate();
    const [memberId, setMemberId] = useState('');

    const [inputValue, setInputValue] = useState({
      email: '',
      phone: '',
      addr: '',
      addrDetail: '',
    });
    const { email, phone, addr, addrDetail } = inputValue;

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addrError, setAddrError] = useState('');
    const [addrDetailError, setAddrDetailError] = useState('');
    const errorList = { 
        emailError, 
        phoneError, 
        addrError, 
        addrDetailError 
    };
  
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
  
    const tokenDecode = (authorization) => {
      var decoded = jwt_decode(authorization);
      return decoded;
    };
  
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
  
    const isValidInput = () => {
      let inputValid = true;
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
      const addrRegex = /^[가-힣\s0-9a-zA-Z]+$/;
  
      if (!isEmpty(email)) {
        if (!emailRegex.test(email)) {
          setEmailError('올바른 이메일 형식이 아닙니다.');
          inputValid = false;
        } else setEmailError('');
      }
  
      if (!isEmpty(phone)) {
        if (!phoneRegex.test(phone) || phone.length < 1) {
          setPhoneError('올바른 전화번호를 입력해주세요');
          inputValid = false;
        } else setPhoneError('');
      }
  
      if (!isEmpty(addr)) {
        if (!addrRegex.test(addr) || addr.length < 1) {
          setAddrError('올바른 주소를 입력해주세요');
          inputValid = false;
        } else setAddrError('');
      }
  
      if (!isEmpty(addrDetail)) {
        if (!addrRegex.test(addrDetail)) {
          setAddrDetailError('올바른 상세주소를 입력해주세요');
          inputValid = false;
        } else setAddrDetailError('');
      }
  
      if (
        isEmpty(email) &&
        isEmpty(phone) &&
        isEmpty(addr) &&
        isEmpty(addrDetail)
      ) {
        inputValid = false;
      }
  
      if (inputValid) {
        return true;
      } else {
        return false;
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!isValidInput()) return;
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
  
    useEffect(() => {
      tokenReissue();
      console.log('실행됨');
    }, []);

    return {
        inputValue, errorList, 
        navigate, goBackPage, handleInput, handleSubmit, isValidInput
    }
}

export default useUpdateMem