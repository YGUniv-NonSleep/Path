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
      setRoleError('??????????????? ??????????????????');
    else setRoleError('');

    const loginIdRegex = /^[a-zA-Z0-9\s]+$/;
    if (!loginIdRegex.test(loginId) || loginId.length < 4)
      setLoginIdError('?????????+?????? ???????????? 4?????? ?????? ??????????????????');
    else setLoginIdError('');

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email))
      setEmailError('????????? ????????? ????????? ????????????.');
    else setEmailError('');

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState(
        '??????+?????????+???????????? ???????????? 8?????? ?????? ??????????????????!'
      );
    else setPasswordState('');

    if (password !== rePassword)
      setPasswordError('??????????????? ???????????? ????????????.');
    else setPasswordError('');

    const nameRegex = /^[???-???a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1)
      setNameError('????????? ????????? ??????????????????.');
    else setNameError('');

    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(phone) || phone.length < 1)
      setPhoneError('????????? ??????????????? ??????????????????');
    else setPhoneError('');

    const addrRegex = /^[???-???\s0-9a-zA-Z]+$/;
    if (!isEmpty(addrDetail)) {
      if (!addrRegex.test(addrDetail))
        setAddrDetailError('????????? ??????????????? ??????????????????');
      else setAddrDetailError('');
    }

    if (isEmpty(addrExtra)) setAddrExtraError('?????? ????????? ????????????');
    else setAddrExtraError('');

    if (isEmpty(addr)) setAddrError('?????? ????????? ????????????');
    else setAddrError('');

    if (isEmpty(postId)) setPostIdError('?????? ????????? ????????????');
    else setPostIdError('');

    const genderRegex = /^[A-Z]+$/;
    if (!genderRegex.test(gender) || gender.length < 1)
      setGenderError('????????? ????????? ??????????????????');
    else setGenderError('');

    if (birthday == null) setBirthdayError('??????????????? ??????????????????');
    else setBirthdayError('');

    if (!checked) alert('???????????? ????????? ??????????????????.');

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
          alert('????????? ??????????????? ???????????????.');
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
        // ???????????? ???????????? ????????? ???????????? ??? ????????? ????????? ???????????? ??????.

        // ??? ????????? ?????? ????????? ?????? ????????? ????????????.
        // ???????????? ????????? ?????? ?????? ????????? ??????('')?????? ????????????, ?????? ???????????? ?????? ??????.
        let addrApi = ''; // ?????? ??????
        let extraAddr = ''; // ???????????? ??????

        //???????????? ????????? ?????? ????????? ?????? ?????? ?????? ?????? ????????????.
        if (data.userSelectedType === 'R') {
          // ???????????? ????????? ????????? ???????????? ??????
          addrApi = data.roadAddress;
        } else {
          // ???????????? ?????? ????????? ???????????? ??????(J)
          addrApi = data.jibunAddress;
        }

        // ???????????? ????????? ????????? ????????? ???????????? ??????????????? ????????????.
        if (data.userSelectedType === 'R') {
          // ??????????????? ?????? ?????? ????????????. (???????????? ??????)
          // ???????????? ?????? ????????? ????????? "???/???/???"??? ?????????.
          if (data.bname !== '' && /[???|???|???]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // ???????????? ??????, ??????????????? ?????? ????????????.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr +=
              extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          // ????????? ??????????????? ?????? ??????, ???????????? ????????? ?????? ???????????? ?????????.
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
          // ????????? ??????????????? ?????? ????????? ?????????.
          document.getElementById('addrExtra').value = extraAddr;
          let extraAddrStr = extraAddr.split('(');
          extraAddrStr = extraAddrStr[1].split(')');
          setAddrExtra(extraAddrStr[0]);
        } else {
          document.getElementById('addrExtra').value = '';
          setAddrExtra('');
        }

        // ??????????????? ?????? ????????? ?????? ????????? ?????????.
        document.getElementById('postId').value = data.zonecode;
        document.getElementById('addr').value = addrApi;
        setPostId(data.zonecode);
        setAddr(addrApi);
        // ????????? ???????????? ????????? ????????????.
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
