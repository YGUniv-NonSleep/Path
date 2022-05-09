import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import styled from "styled-components";
import PropTypes from "prop-types";
//import { Box, FormControl, Grid, TextField, Button } from "@mui/material";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  FormHelperText,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const theme = createTheme();

function SearchPwMain() {
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
      <div className="searchPw">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              padding: "60px 0 0 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <KeyIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              비밀번호 찾기
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSearchSubmit}
              sx={{ mt: 3 }}
            >
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      autoFocus
                      fullWidth
                      id="loginId"
                      name="loginId"
                      label="아이디"
                      onChange={handleInput}
                      error={loginIdError !== "" || false}
                    />
                  </Grid>
                  <FormHelperTexts>{loginIdError}</FormHelperTexts>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      name="phone"
                      label="전화번호 (010-XXXX-XXXX)"
                      onChange={handleInput}
                      error={phoneError !== "" || false}
                    />
                  </Grid>
                  <FormHelperTexts>{phoneError}</FormHelperTexts>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                >
                  비밀번호 찾기
                </Button>
              </FormControl>
            </Box>
          </Box>
        </Container>
      </div>
      {isResetPw ? (
        <div className="resetPw">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                padding: "50px 0 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <KeyIcon />
              </Avatar>
              <Typography component="h1" variant="h4">
                비밀번호 재설정
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={handleResetSubmit}
              >
                <FormControl component="fieldset" variant="standard">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        type="password"
                        id="password"
                        name="password"
                        label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                        onChange={handleInput}
                        error={passwordState !== "" || false}
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
                        error={passwordError !== "" || false}
                      />
                    </Grid>
                    <FormHelperTexts>{passwordError}</FormHelperTexts>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                  >
                    비밀번호 재설정
                  </Button>
                </FormControl>
              </Box>
            </Box>
          </Container>
        </div>
      ) : (
        ""
      )}
    </ThemeProvider>
  );
}

export default SearchPwMain;
