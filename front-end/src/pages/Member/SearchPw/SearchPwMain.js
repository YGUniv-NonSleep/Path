import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import PropTypes from "prop-types";
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
import useLoading from '../../../hooks/useLoading'
import useSearchPw from '../hooks/useSearchPw'

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const theme = createTheme();

function SearchPwMain() {
  const { loading } = useLoading();
  const {
    isResetPw, errorList, 
    handleInput, handleSearchSubmit, handleResetSubmit
  } = useSearchPw();

  // valid check -> loginId, phone / password, rePassword

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
                      error={errorList.loginIdError !== "" || false}
                    />
                  </Grid>
                  <FormHelperTexts>{errorList.loginIdError}</FormHelperTexts>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      name="phone"
                      label="전화번호 (010-XXXX-XXXX)"
                      onChange={handleInput}
                      error={errorList.phoneError !== "" || false}
                    />
                  </Grid>
                  <FormHelperTexts>{errorList.phoneError}</FormHelperTexts>
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
                        error={errorList.passwordState !== "" || false}
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
                        error={errorList.passwordError !== "" || false}
                      />
                    </Grid>
                    <FormHelperTexts>{errorList.passwordError}</FormHelperTexts>
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
