import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function login() {

  const accessToken = null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const jsonData = {
      username : data.get("username"),
      password : data.get("password")
    };
    console.log(jsonData);
    axios.post(
      process.env.REACT_APP_SPRING_API+"/login", jsonData
      ).then((res) => {
        console.log('로그인 연결 성공');
        onLoginSuccess(res);
      }).catch((err) => {
        console.log(err);
        console.log('로그인 실패');
      });
  };

  const onLoginSuccess = (res) => {
    console.log(res);
    console.log(res.headers);
    console.log(res.headers.authorization);
    const { accessToken } = res.headers.authorization;
    // API 요청마다 헤더에 accessToken 포함하여 보내도록 설정
    axios.defaults.headers.common['authorization'] = accessToken;
    console.log('로그인 성공');
  }

  const testSubmit = (event) => {
    event.preventDefault();
    axios.get(
      process.env.REACT_APP_SPRING_API+"/api/user"
    ).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            padding: "180px 0 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username Address"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button onClick={testSubmit}>
              테스트 버튼
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default login;
