import axios from 'axios';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { isEmpty, isBlank } from '../../../utils/StringUtil';
import { $CombinedState } from '@reduxjs/toolkit';

function useUpdateMem() {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState('');
  const [postId, setPostId] = useState('');
  const [addr, setAddr] = useState('');
  const [addrExtra, setAddrExtra] = useState('');
  const [inputValue, setInputValue] = useState({
    email: '',
    phone: '',
    addrDetail: '',
  });
  const { email, phone, addrDetail } = inputValue;

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addrError, setAddrError] = useState('');
  const [addrDetailError, setAddrDetailError] = useState('');
  const errorList = {
    emailError,
    phoneError,
    addrError,
    addrDetailError,
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
    } else setEmailError('');

    if (!isEmpty(phone)) {
      if (!phoneRegex.test(phone) || phone.length < 1) {
        setPhoneError('올바른 전화번호를 입력해주세요');
        inputValid = false;
      } else setPhoneError('');
    } else setPhoneError('');

    if (!isEmpty(addr)) {
      if (!addrRegex.test(addr) || addr.length < 1) {
        setAddrError('올바른 주소를 입력해주세요');
        inputValid = false;
      } else setAddrError('');
    } else setAddrError('');

    if (!isEmpty(addrDetail)) {
      if (!addrRegex.test(addrDetail)) {
        setAddrDetailError('올바른 상세주소를 입력해주세요');
        inputValid = false;
      } else setAddrDetailError('');
    } else setAddrDetailError('');

    console.log(isEmpty(email));
    console.log(isEmpty(phone));
    console.log(isEmpty(addrDetail));
    console.log(isBlank(postId));
    console.log(isBlank(addr));
    console.log(isBlank(addrExtra));
    console.log(email);
    console.log(phone);
    console.log(addrDetail);
    console.log(postId);
    console.log(addr);
    console.log(addrExtra);

    if (
      isEmpty(email) &&
      isEmpty(phone) &&
      isEmpty(addrDetail) &&
      isBlank(postId) &&
      isBlank(addr) &&
      isBlank(addrExtra)
    ) {
      alert('수정할 값이 없습니다.');
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
      postId: postId,
      addr: addr,
      addrDetail: addrDetail,
      addrExtra: addrExtra,
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

  const daumAddrApi = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을 때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        let addrApi = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') {
          // 사용자가 도로명 주소를 선택했을 경우
          addrApi = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addrApi = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === 'R') {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr +=
              extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
          // 조합된 참고항목을 해당 필드에 넣는다.
          document.getElementById('addrExtra').value = extraAddr;
          let extraAddrStr = extraAddr.split('(');
          extraAddrStr = extraAddrStr[1].split(')');
          setAddrExtra(extraAddrStr[0]);
        } else {
          document.getElementById('addrExtra').value = '';
          setAddrExtra('없음');
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById('postId').value = data.zonecode;
        document.getElementById('addr').value = addrApi;
        setPostId(data.zonecode);
        setAddr(addrApi);
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById('addrDetail').focus();
      },
    }).open();
  };

  function createDaumJusoScript() {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;

    return script;
  }

  useEffect(() => {
    const script = createDaumJusoScript();
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    tokenReissue();
    console.log('실행됨');
  }, []);

  return {
    inputValue,
    errorList,
    navigate,
    goBackPage,
    handleInput,
    handleSubmit,
    isValidInput,
    daumAddrApi,
  };
}

export default useUpdateMem;
