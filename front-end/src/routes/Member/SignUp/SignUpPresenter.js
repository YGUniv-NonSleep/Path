import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { FormHelperText, FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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

function SignUpPresenter(props) {
  const {
    roleError,
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
  } = props.errorList;

  const { role, gender } = props.inputValue;

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
            onSubmit={props.handleSubmit}
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
                      value={role}
                      name="role"
                      onChange={props.handleInput}
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
                    onChange={props.handleInput}
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
                    onChange={props.handleInput}
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
                    onChange={props.handleInput}
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
                    onChange={props.handleInput}
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
                    onChange={props.handleInput}
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
                    onChange={props.handleInput}
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
                    onChange={props.handleInput}
                    disabled
                    defaultValue=" "
                  />
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => props.daumAddrApi()}
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
                    onChange={props.handleInput}
                    disabled
                    defaultValue=" "
                  />
                </Grid>
                <FormHelperTexts>{addrError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    id="addrDetail"
                    name="addrDetail"
                    label="상세주소"
                    onChange={props.handleInput}
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
                    onChange={props.handleInput}
                    disabled
                    defaultValue=" "
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
                            onChange={props.handleInput}
                            checked={gender === 'MALE'}
                          />
                        }
                        label="남자"
                      />
                      <FormControlLabel
                        value="female"
                        control={
                          <Radio
                            value="FEMALE"
                            onChange={props.handleInput}
                            checked={gender === 'FEMALE'}
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
                      value={props.birthday}
                      inputFormat={'yyyy-MM-dd'}
                      mask={'____-__-__'}
                      error={birthdayError !== '' || null}
                      onChange={props.handleBirthday}
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
                      <Checkbox onChange={props.handleAgree} color="primary" />
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

export default SignUpPresenter;
