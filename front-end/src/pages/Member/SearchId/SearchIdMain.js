import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  Grid,
  TextField,
  Button,
  Container,
  CssBaseline,
  Avatar,
  FormHelperText,
  createTheme,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { LockOpen } from "@mui/icons-material";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const theme = createTheme();

const SearchIdCon = styled.div`
  width: 390px;
  height: 100%;
`;

const SearchIdSubCon = styled.div`
  margin-left: 130px;
`;

function SearchIdMain({ history }) {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
  });
  const { name, email } = inputValue;
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const errorList = { nameError, emailError };
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

  const isValidInput = () => {
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1)
      setNameError("올바른 이름을 입력해주세요");
    else setNameError("");

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email))
      setEmailError("올바른 이메일 형식이 아닙니다.");
    else setEmailError("");

    if (emailRegex.test(email) && nameRegex.test(name)) {
      console.log("유효성 검사 성공");
      return true;
    } else {
      console.log("유효성 검사 실패");
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidInput()) return;
    const data = {
      name: name,
      mail: email,
    };
    axios
      .post(process.env.REACT_APP_SPRING_API + "/api/forgot/loginid", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert(
          res.data.message + "\n" + "회원 아이디 : " + res.data.body.loginId
        );
        goBackPage();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.message);
      });
  };

  return (
    <SearchIdCon>
      <SearchIdSubCon>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl component="fieldset" variant="standard">
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="이름"
                value={name}
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="이메일"
                value={email}
                onChange={handleInput}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              아이디 찾기
            </Button>
          </FormControl>
        </Box>
      </SearchIdSubCon>
    </SearchIdCon>
  );
}

SearchIdMain.propTypes = {
  // ex) prop: PropTypes.type.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchIdMain;
