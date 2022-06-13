import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  FormHelperText,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useLogin from '../hooks/useLogin';
import GoogleIcon from '@mui/icons-material/Google';
import { green, indigo } from '@mui/material/colors';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link to="/">Your Website </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function LoginMain() {
  const { inputValue, handleInput, handleSubmit } = useLogin();

  // valid check -> loginId, password

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            로그인
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
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="loginId"
                    name="loginId"
                    value={inputValue.loginId}
                    label="아이디"
                    onChange={handleInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    value={inputValue.password}
                    label="비밀번호"
                    onChange={handleInput}
                  />
                </Grid>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                size="large"
              >
                로그인
              </Button>
              <Button
                type="button"
                onClick={() =>
                  (location.href =
                    'https://localhost:8080/oauth2/authorization/google')
                }
                fullWidth
                variant="outlined"
                sx={{ mt: 1 }}
                size="large"
              >
                Google
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={() =>
                  (location.href =
                    'https://localhost:8080/oauth2/authorization/naver')
                }
                sx={{
                  mt: 1,
                  bgcolor: green[500],
                  '&:hover': {
                    bgcolor: green[700],
                  },
                }}
                size="large"
              >
                Naver
              </Button>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={() =>
                  (location.href =
                    'https://localhost:8080/oauth2/authorization/facebook')
                }
                sx={{
                  mt: 1,
                  mb: 2,
                  bgcolor: indigo[500],
                  '&:hover': {
                    bgcolor: indigo[700],
                  },
                }}
                size="large"
              >
                FACKBOOK
              </Button>
            </FormControl>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Link to="/searchId">아이디 찾기</Link>
              </Grid>
              <Grid item xs={4}>
                <Link to="/searchPw">비밀번호 찾기</Link>
              </Grid>
              <Grid item xs={4}>
                <Link to="/signup">회원가입</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

LoginMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default LoginMain;
