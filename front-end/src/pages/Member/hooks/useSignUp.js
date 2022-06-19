import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from '../../../utils/StringUtil';

function useSignUp() {
  const [postId, setPostId] = useState('');
  const [addr, setAddr] = useState('');
  const [addrExtra, setAddrExtra] = useState('');
  const [birthday, setBirthday] = useState('');
  const [inputValue, setInputValue] = useState({
    role: '',
    loginId: '',
    password: '',
    rePassword: '',
    email: '',
    name: '',
    phone: '',
    addrDetail: '',
    gender: 'MALE',
  });
  const {
    role,
    loginId,
    email,
    name,
    password,
    rePassword,
    phone,
    addrDetail,
    gender,
  } = inputValue;

  const [roleError, setRoleError] = useState('');
  const [loginIdError, setLoginIdError] = useState('');
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [postIdError, setPostIdError] = useState('');
  const [addrDetailError, setAddrDetailError] = useState('');
  const [addrExtraError, setAddrExtraError] = useState('');
  const [addrError, setAddrError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const errorList = {
    roleError,
    loginIdError,
    emailError,
    passwordState,
    passwordError,
    nameError,
    phoneError,
    postIdError,
    addrError,
    addrDetailError,
    addrExtraError,
    genderError,
    birthdayError,
  };
  const navigate = useNavigate();

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

  const handleBirthday = (date) => {
    setBirthday(dayjs(date).format('YYYY-MM-DD'));
  };

  const handleAgree = (e) => {
    setChecked(e.target.checked);
  };

  const isValidInput = () => {
    if (role == '' || role == undefined)
      setRoleError('회원유형을 선택해주세요');
    else setRoleError('');

    const loginIdRegex = /^[a-zA-Z0-9\s]+$/;
    if (!loginIdRegex.test(loginId) || loginId.length < 4)
      setLoginIdError('영문자+숫자 조합으로 4자리 이상 입력해주세요');
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

    if (!checked) alert('회원가입 약관에 동의해주세요.');

    if (
      !isEmpty(role) &&
      loginIdRegex.test(loginId) &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&
      phoneRegex.test(phone) &&
      isEmpty(addrDetail)
        ? true
        : addrRegex.test(addrDetail) &&
          genderRegex.test(gender) &&
          birthday != null &&
          checked
    )
      return true;
    else return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidInput()) return;
    const data = {
      role: role,
      loginId: loginId,
      mail: email,
      name: name,
      password: password,
      phone: phone,
      postId: postId,
      addr: addr,
      addrDetail: addrDetail,
      addrExtra: addrExtra,
      gender: gender,
      birthday: birthday,
    };
    axios
      .post(process.env.REACT_APP_SPRING_API + '/api/member', data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.data.header.statusCode != 200) {
          alert(res.data.message);
        } else {
          alert('패스콕 회원가입이 되셨습니다.');
          goBackPage();
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
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
          setAddrExtra('');
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

  return {
    inputValue,
    errorList,
    navigate,
    goBackPage,
    handleInput,
    handleBirthday,
    handleAgree,
    isValidInput,
    handleSubmit,
    daumAddrApi,
    createDaumJusoScript,
    birthday,
  };
}

export default useSignUp;
