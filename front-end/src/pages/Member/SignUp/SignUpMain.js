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
import PropTypes from "prop-types";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import useSignUp from '../hooks/useSignUp';

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
  const { // role, loginId, email, name, password, rePassword, phone, addrDetail, gender
    inputValue, errorList, 
    handleInput, handleBirthday, handleAgree, handleSubmit, daumAddrApi
  } = useSignUp();

  // valid check 
  // roleError, loginIdError, emailError, passwordState, passwordError,
  // nameError, phoneError, postIdError, addrError, addrDetailError,
  // addrExtraError, genderError, birthdayError,

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
                      error={errorList.roleError !== '' || false}
                    >
                      <MenuItem value={'ROLE_MEMBER'}>일반회원</MenuItem>
                      <MenuItem value={'ROLE_BUSINESS'}>업체회원</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <FormHelperTexts>{errorList.roleError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="loginId"
                    name="loginId"
                    label="아이디"
                    onChange={handleInput}
                    error={errorList.loginIdError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{errorList.loginIdError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    onChange={handleInput}
                    error={errorList.emailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{errorList.emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    onChange={handleInput}
                    error={errorList.passwordState !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{errorList.passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    onChange={handleInput}
                    error={errorList.passwordError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{errorList.passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    onChange={handleInput}
                    error={errorList.nameError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{errorList.nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    name="phone"
                    label="전화번호 (010-XXXX-XXXX)"
                    onChange={handleInput}
                    error={errorList.phoneError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{errorList.phoneError}</FormHelperTexts>
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
                    error={errorList.postIdError !== '' || false}
                    helperText={errorList.postIdError}
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
                    error={errorList.addrError !== '' || false}
                    helperText={errorList.addrError}
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
                    error={errorList.addrDetailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{errorList.addrDetailError}</FormHelperTexts>
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
                    error={errorList.addrExtraError !== '' || false}
                    helperText={errorList.addrExtraError}
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
                <FormHelperTexts>{errorList.genderError}</FormHelperTexts>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="생년월일"
                      value={inputValue.birthday}
                      inputFormat={'yyyy-MM-dd'}
                      mask={'____-__-__'}
                      error={errorList.birthdayError !== '' || null}
                      onChange={handleBirthday}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          name="birthday"
                          error={errorList.birthdayError !== '' || null}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <FormHelperTexts>{errorList.birthdayError}</FormHelperTexts>
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
