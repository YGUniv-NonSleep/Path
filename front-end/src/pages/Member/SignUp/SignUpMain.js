import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { isEmpty } from '../../../utils/StringUtil.js';
import {
  Avatar, Button, TextField, FormControlLabel, Checkbox, 
  Grid, Box, Typography, Container, InputLabel, 
  Radio, RadioGroup, FormLabel, Select, MenuItem, 
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { FormHelperText, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const theme = createTheme();

function SignUpMain() {
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
      });
  };

  const daumAddrApi = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addrApi = ''; // 주소 변수
        var extraAddr = ''; // 참고항목 변수

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
          var extraAddrStr = extraAddr.split('(');
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

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            padding: '180px 0 0 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h4">
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      회원유형
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="role"
                      label="회원유형"
                      value={inputValue.role}
                      name="role"
                      onChange={handleInput}
                      error={roleError !== '' || false}
                    >
                      <MenuItem value={'ROLE_MEMBER'}>일반회원</MenuItem>
                      <MenuItem value={'ROLE_BUSINESS'}>업체회원</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <FormHelperTexts>{roleError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="loginId"
                    name="loginId"
                    label="아이디"
                    onChange={handleInput}
                    error={loginIdError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{loginIdError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    onChange={handleInput}
                    error={emailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    onChange={handleInput}
                    error={passwordState !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    onChange={handleInput}
                    error={passwordError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    onChange={handleInput}
                    error={nameError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    name="phone"
                    label="전화번호 (010-XXXX-XXXX)"
                    onChange={handleInput}
                    error={phoneError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{phoneError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      mr: 2,
                      verticalAlign: 'middle',
                    }}
                    required
                    id="postId"
                    name="postId"
                    label="우편번호"
                    onChange={handleInput}
                    disabled
                    defaultValue=" "
                    error={postIdError !== '' || false}
                    helperText={postIdError}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => daumAddrApi()}
                    endIcon={<LocalPostOfficeIcon />}
                  >
                    주소찾기
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    id="addr"
                    name="addr"
                    label="주소"
                    onChange={handleInput}
                    disabled
                    defaultValue=" "
                    error={addrError !== '' || false}
                    helperText={addrError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    id="addrDetail"
                    name="addrDetail"
                    label="상세주소"
                    onChange={handleInput}
                    error={addrDetailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{addrDetailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    id="addrExtra"
                    name="addrExtra"
                    label="참고항목"
                    onChange={handleInput}
                    disabled
                    defaultValue=" "
                    error={addrExtraError !== '' || false}
                    helperText={addrExtraError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      성별
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="male"
                      name="gender"
                    >
                      <FormControlLabel
                        value="male"
                        control={
                          <Radio
                            value="MALE"
                            onChange={handleInput}
                            checked={inputValue.gender === 'MALE'}
                          />
                        }
                        label="남자"
                      />
                      <FormControlLabel
                        value="female"
                        control={
                          <Radio
                            value="FEMALE"
                            onChange={handleInput}
                            checked={inputValue.gender === 'FEMALE'}
                          />
                        }
                        label="여자"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <FormHelperTexts>{genderError}</FormHelperTexts>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="생년월일"
                      value={birthday}
                      inputFormat={'yyyy-MM-dd'}
                      mask={'____-__-__'}
                      error={birthdayError !== '' || null}
                      onChange={handleBirthday}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          name="birthday"
                          error={birthdayError !== '' || null}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <FormHelperTexts>{birthdayError}</FormHelperTexts>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAgree} color="primary" />
                    }
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUpMain;
